const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: token missing', data: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user payload to request for downstream handlers
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('authMiddleware jwt verify error:', err && err.message);
    return res.status(401).json({ success: false, message: 'Token tidak valid atau kedaluwarsa.', data: null });
  }
};
