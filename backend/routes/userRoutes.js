const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

// Multer memory storage for streaming to Cloudinary
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/user/:id (public)
router.get('/:id', userController.getProfile);

// POST /api/user/:id/avatar (protected)
router.post('/:id/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);

// PUT /api/user/:id (protected) - update profile
router.put('/:id', authMiddleware, express.json(), userController.updateProfile);

module.exports = router;
