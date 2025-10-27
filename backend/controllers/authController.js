const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

function isValidMahasiswaEmail(email) {
  const regex = /^(\d{2})\d+@student\.unsika\.ac\.id$/;
  const match = email.match(regex);
  if (!match) return false;
  const tahunAngkatan = parseInt('20' + match[1], 10);
  const tahunSekarang = new Date().getFullYear();
  return tahunSekarang - tahunAngkatan <= 7;
}

exports.register = (req, res) => {
  // Accept both frontend field names and backend expected names
  let { roles_id, role, nama, fullName, jenis_kelamin, email, password, foto_profil } = req.body;

  // Map frontend fullName -> nama
  if (!nama && fullName) nama = fullName;

  // frontend sometimes sends role as string ('student'|'client') — map to roles_id
  if (!roles_id && role) {
    if (role === 'student' || role === 'mahasiswa') roles_id = 1;
    else if (role === 'client' || role === 'klien') roles_id = 2;
  }

  // Validasi field wajib (jenis_kelamin optional)
  if (!roles_id || !nama || !email || !password) {
    return res.status(400).json({ success: false, message: 'Field roles, nama, email, dan password wajib diisi.', data: null });
  }

  // foto_profil tidak wajib, default null jika tidak diisi
  const fotoProfilValue = typeof foto_profil !== 'undefined' ? foto_profil : null;

  // jenis_kelamin optional: kalau tidak dikirim set null
  if (typeof jenis_kelamin === 'undefined') jenis_kelamin = null;

  // Validasi email mahasiswa
  if (roles_id == 1) {
    if (!isValidMahasiswaEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email mahasiswa tidak valid atau angkatan lebih dari 7 tahun.', data: null });
    }
  }

  // Cek email sudah terdaftar atau belum
  userModel.findByEmail(email, async (err, results) => {
    if (err) {
      console.error('DB error on findByEmail:', err);
      return res.status(500).json({ success: false, message: 'Gagal registrasi.', data: null });
    }

    if (results && results.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar.', data: null });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    userModel.createUser({ roles_id, nama, jenis_kelamin, email, password: hashedPassword, foto_profil: fotoProfilValue }, (err, result) => {
      if (err) {
        console.error('DB error on createUser:', err);
        return res.status(500).json({ success: false, message: 'Gagal registrasi.', data: null });
      }

      const userId = result.insertId;

      // Ambil data user yang baru dibuat (tanpa password)
      userModel.getById(userId, (err2, rows) => {
        if (err2 || !rows || rows.length === 0) {
          return res.status(201).json({ success: true, message: 'Registrasi berhasil.', data: { id: userId } });
        }

        const createdUser = rows[0];

        // Buat token JWT
        const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({ success: true, message: 'Registrasi berhasil.', data: { token, user: createdUser } });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findByEmail(email, async (err, results) => {
    // Cek error / keberadaan user
    if (err) {
      console.error('DB error on findByEmail (login):', err);
      return res.status(500).json({ success: false, message: 'Gagal proses login.', data: null });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ success: false, message: 'Email tidak ditemukan.', data: null });
    }

    const user = results[0];

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Password salah.', data: null });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    // Kembalikan user (tanpa password) dan token
    const safeUser = {
      id: user.id,
      nama: user.nama,
      email: user.email,
      roles_id: user.roles_id,
      jenis_kelamin: user.jenis_kelamin,
      foto_profil: user.foto_profil
    };

    res.json({ success: true, message: 'Login berhasil.', data: { token, user: safeUser } });
  });
};

/**
 * GET /auth/me
 * expects Authorization: Bearer <token>
 */
exports.me = (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: token missing', data: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    userModel.getById(userId, (err, rows) => {
      if (err) {
        console.error('DB error on getById (me):', err);
        return res.status(500).json({ success: false, message: 'Gagal mengambil user.', data: null });
      }

      if (!rows || rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan.', data: null });
      }

      const user = rows[0];
      return res.json({ success: true, message: 'OK', data: { user } });
    });
  } catch (err) {
    console.error('JWT verify error:', err);
    return res.status(401).json({ success: false, message: 'Token tidak valid atau kedaluwarsa.', data: null });
  }
};

/**
 * POST /auth/logout
 * Stateless logout — client should delete token.
 */
exports.logout = (req, res) => {
  // If you implement token revocation, add logic here.
  return res.json({ success: true, message: 'Logout berhasil.', data: null });
};

/**
 * Get user profile with project counts and average rating
 * Response shape: { code, message, data }
 */
exports.profile = (req, res) => {
  const userId = req.params.id;

  // Ambil data user dasar
  userModel.findById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Gagal mengambil data user.', data: null });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan.', data: null });
    }

    const user = results[0];

    // Hitung proyek ditangani
    userModel.countProjectsByStatus(userId, 'ditangani', (err2, rows1) => {
      if (err2) {
        return res.status(500).json({ success: false, message: 'Gagal menghitung proyek.', data: null });
      }

      const proyekDitangani = (rows1 && rows1[0] && rows1[0].cnt) ? rows1[0].cnt : 0;

      // Hitung proyek selesai
      userModel.countProjectsByStatus(userId, 'selesai', (err3, rows2) => {
        if (err3) {
          return res.status(500).json({ success: false, message: 'Gagal menghitung proyek.', data: null });
        }

        const proyekSelesai = (rows2 && rows2[0] && rows2[0].cnt) ? rows2[0].cnt : 0;

        // Ambil rata-rata rating
        userModel.getAverageRating(userId, (err4, rows3) => {
          if (err4) {
            return res.status(500).json({ success: false, message: 'Gagal mengambil rating.', data: null });
          }

          const rataRating = (rows3 && rows3[0] && rows3[0].avg_rating) ? Number(rows3[0].avg_rating) : null;

          // Gabungkan dan kembalikan response
          const payload = {
            id: user.id,
            nama: user.nama,
            email: user.email,
            roles_id: user.roles_id,
            jenis_kelamin: user.jenis_kelamin,
            foto_profil: user.foto_profil,
            proyek_ditangani: proyekDitangani,
            proyek_selesai: proyekSelesai,
            rata_rating: rataRating
          };

          return res.json({ success: true, message: 'Berhasil mengambil profil.', data: payload });
        });
      });
    });
  });
};
