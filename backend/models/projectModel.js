const db = require('../db');

module.exports = {
  createProject: (data, callback) => {
    const sql = `INSERT INTO projects (user_id, title, description, category, budget_min, budget_max, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    const params = [data.user_id, data.title, data.description, data.category || null, data.budget_min || null, data.budget_max || null, data.status || 'open'];
    db.query(sql, params, callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM projects WHERE id = ?', [id], callback);
  },

  list: (filters, limit, offset, callback) => {
    // Basic filtering: category, user_id, status
    let where = [];
    let params = [];
    if (filters.category) {
      where.push('category = ?');
      params.push(filters.category);
    }
    if (filters.user_id) {
      where.push('user_id = ?');
      params.push(filters.user_id);
    }
    if (filters.status) {
      where.push('status = ?');
      params.push(filters.status);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const sql = `SELECT * FROM projects ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit || 20, offset || 0);
    db.query(sql, params, callback);
  },

  updateProject: (id, data, callback) => {
    const fields = [];
    const params = [];
    if (data.title) { fields.push('title = ?'); params.push(data.title); }
    if (data.description) { fields.push('description = ?'); params.push(data.description); }
    if (typeof data.category !== 'undefined') { fields.push('category = ?'); params.push(data.category); }
    if (typeof data.budget_min !== 'undefined') { fields.push('budget_min = ?'); params.push(data.budget_min); }
    if (typeof data.budget_max !== 'undefined') { fields.push('budget_max = ?'); params.push(data.budget_max); }
    if (typeof data.status !== 'undefined') { fields.push('status = ?'); params.push(data.status); }

    if (fields.length === 0) return callback(null, { affectedRows: 0 });

    const sql = `UPDATE projects SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`;
    params.push(id);
    db.query(sql, params, callback);
  },

  // Applications / proposals
  createApplication: (projectId, userId, proposal, callback) => {
    const sql = `INSERT INTO project_applications (project_id, user_id, proposal, status, created_at) VALUES (?, ?, ?, 'pending', NOW())`;
    db.query(sql, [projectId, userId, proposal], callback);
  },

  listApplications: (projectId, callback) => {
    db.query('SELECT * FROM project_applications WHERE project_id = ? ORDER BY created_at DESC', [projectId], callback);
  },

  setApplicationStatus: (applicationId, status, callback) => {
    db.query('UPDATE project_applications SET status = ? WHERE id = ?', [status, applicationId], callback);
  }
};
