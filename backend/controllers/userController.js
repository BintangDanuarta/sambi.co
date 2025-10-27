const userModel = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary from env (ensure CLOUDINARY_* present in .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * GET /api/user/:id
 * returns profile data including proyek_ditangani, proyek_selesai, rata_rating
 */
exports.getProfile = (req, res) => {
  const userId = req.params.id;

  userModel.findById(userId, (err, userRows) => {
    if (err) {
      console.error('getProfile findById error', err);
      return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }

    if (!userRows || userRows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found', data: null });
    }

    const user = userRows[0];

    // Count projects: in_progress => proyek_ditangani, completed => proyek_selesai
    userModel.countProjectsByStatus(userId, 'in_progress', (err2, inProgressRows) => {
      if (err2) {
        console.error('countProjectsByStatus in_progress error', err2);
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
      }

      const proyek_ditangani = (inProgressRows && inProgressRows[0] && inProgressRows[0].cnt) ? inProgressRows[0].cnt : 0;

      userModel.countProjectsByStatus(userId, 'completed', (err3, completedRows) => {
        if (err3) {
          console.error('countProjectsByStatus completed error', err3);
          return res.status(500).json({ success: false, message: 'Internal server error', data: null });
        }

        const proyek_selesai = (completedRows && completedRows[0] && completedRows[0].cnt) ? completedRows[0].cnt : 0;

        userModel.getAverageRating(userId, (err4, avgRows) => {
          if (err4) {
            console.error('getAverageRating error', err4);
            return res.status(500).json({ success: false, message: 'Internal server error', data: null });
          }

          const rata_rating = (avgRows && avgRows[0] && avgRows[0].avg_rating) ? parseFloat(avgRows[0].avg_rating) : null;

          // Build response user object (only safe fields)
          const userSafe = {
            id: user.id,
            roles_id: user.roles_id,
            nama: user.nama,
            jenis_kelamin: user.jenis_kelamin,
            email: user.email,
            foto_profil: user.foto_profil
          };

          return res.json({
            success: true,
            message: 'Success',
            data: {
              user: userSafe,
              proyek_ditangani,
              proyek_selesai,
              rata_rating
            }
          });
        });

      });
    });
  });
};

/**
 * POST /api/user/:id/avatar
 * Accepts multipart/form-data with field 'avatar'
 */
exports.uploadAvatar = async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded', data: null });
  }

  // Authorization: ensure authenticated user matches the :id param
  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: 'Unauthorized', data: null });
  }

  if (String(req.user.id) !== String(userId)) {
    return res.status(403).json({ success: false, message: 'Forbidden: cannot upload avatar for another user', data: null });
  }

  try {
    const fileBuffer = req.file.buffer;
    const mime = req.file.mimetype || 'application/octet-stream';
    const base64 = fileBuffer.toString('base64');
    const dataUri = `data:${mime};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: process.env.CLOUDINARY_FOLDER || 'sambi/avatars',
      public_id: `user_${userId}_${Date.now()}`,
      overwrite: true,
      resource_type: 'image'
    });

    const url = uploadResult.secure_url;

    // Save to DB
    userModel.updateFotoProfil(userId, url, (err, result) => {
      if (err) {
        console.error('DB updateFotoProfil error', err);
        return res.status(500).json({ success: false, message: 'Failed to save avatar URL', data: null });
      }

      return res.json({ success: true, message: 'Avatar uploaded', data: { url } });
    });
  } catch (err) {
    console.error('Cloudinary upload error', err);
    return res.status(500).json({ success: false, message: 'Upload failed', data: null });
  }
};

/**
 * PUT /api/user/:id
 * Update user profile (protected)
 */
exports.updateProfile = (req, res) => {
  const userId = req.params.id;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: 'Unauthorized', data: null });
  }

  if (String(req.user.id) !== String(userId)) {
    return res.status(403).json({ success: false, message: 'Forbidden: cannot update another user', data: null });
  }

  const { nama, jenis_kelamin, bio } = req.body;

  userModel.updateProfile(userId, { nama, jenis_kelamin, bio }, (err, result) => {
    if (err) {
      console.error('updateProfile error', err);
      return res.status(500).json({ success: false, message: 'Failed to update profile', data: null });
    }

    // Return updated user
    userModel.getById(userId, (err2, rows) => {
      if (err2) {
        console.error('getById after update error', err2);
        return res.status(500).json({ success: false, message: 'Failed to retrieve updated user', data: null });
      }

      const user = rows && rows[0] ? rows[0] : null;
      return res.json({ success: true, message: 'Profile updated', data: { user } });
    });
  });
};
