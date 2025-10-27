const db = require('../db');

module.exports = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM user WHERE email = ?', [email], callback);
  },
  createUser: (data, callback) => {
    db.query(
      'INSERT INTO user (roles_id, nama, jenis_kelamin, email, password, foto_profil) VALUES (?, ?, ?, ?, ?, ?)',
      [data.roles_id, data.nama, data.jenis_kelamin, data.email, data.password, data.foto_profil],
      callback
    );
  }
  ,
  getById: (id, callback) => {
    db.query('SELECT id, roles_id, nama, jenis_kelamin, email, foto_profil FROM user WHERE id = ?', [id], callback);
  }
  ,
  findById: (id, callback) => {
    db.query('SELECT id, roles_id, nama, jenis_kelamin, email, foto_profil FROM user WHERE id = ?', [id], callback);
  },
  countProjectsByStatus: (userId, status, callback) => {
    db.query('SELECT COUNT(*) AS cnt FROM projects WHERE user_id = ? AND status = ?', [userId, status], callback);
  },
  getAverageRating: (userId, callback) => {
    db.query('SELECT AVG(rating) AS avg_rating FROM ratings WHERE user_id = ?', [userId], callback);
  }
  ,
  updateFotoProfil: (userId, url, callback) => {
    db.query('UPDATE user SET foto_profil = ? WHERE id = ?', [url, userId], callback);
  }
  ,
  updateProfile: (userId, data, callback) => {
    const fields = [];
    const values = [];

    if (typeof data.nama !== 'undefined') {
      fields.push('nama = ?');
      values.push(data.nama);
    }
    if (typeof data.jenis_kelamin !== 'undefined') {
      fields.push('jenis_kelamin = ?');
      values.push(data.jenis_kelamin);
    }
    if (typeof data.bio !== 'undefined') {
      fields.push('bio = ?');
      values.push(data.bio);
    }

    if (fields.length === 0) return callback(null, { affectedRows: 0 });

    const sql = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    values.push(userId);
    db.query(sql, values, callback);
  }
};
