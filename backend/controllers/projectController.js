const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');

// GET /api/projects
exports.list = (req, res) => {
  const { page = 1, limit = 20, category, user_id, status } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  projectModel.list({ category, user_id, status }, Number(limit), offset, (err, rows) => {
    if (err) {
      console.error('projects.list error', err);
      return res.status(500).json({ success: false, message: 'Failed to list projects', data: null });
    }
    return res.json({ success: true, message: 'OK', data: rows });
  });
};

// GET /api/projects/:id
exports.getById = (req, res) => {
  const id = req.params.id;
  projectModel.getById(id, (err, rows) => {
    if (err) {
      console.error('projects.getById error', err);
      return res.status(500).json({ success: false, message: 'Failed to get project', data: null });
    }
    if (!rows || rows.length === 0) return res.status(404).json({ success: false, message: 'Not found', data: null });
    return res.json({ success: true, message: 'OK', data: rows[0] });
  });
};

// POST /api/projects
exports.create = (req, res) => {
  const { title, description, category, budget_min, budget_max } = req.body;
  // Require authenticated user
  if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized', data: null });

  const payload = { user_id: req.user.id, title, description, category, budget_min, budget_max, status: 'open' };
  projectModel.createProject(payload, (err, result) => {
    if (err) {
      console.error('projects.create error', err);
      return res.status(500).json({ success: false, message: 'Failed to create project', data: null });
    }

    const projectId = result.insertId;
    projectModel.getById(projectId, (err2, rows) => {
      if (err2) {
        console.error('projects.create getById error', err2);
        return res.status(201).json({ success: true, message: 'Project created', data: { id: projectId } });
      }
      // Notify via socket if possible
      try { const io = req.app && req.app.get('io'); if (io) io.emit('project_created', rows[0]); } catch(e){}
      return res.status(201).json({ success: true, message: 'Project created', data: rows[0] });
    });
  });
};

// POST /api/projects/:id/apply
exports.apply = (req, res) => {
  const projectId = req.params.id;
  const { proposal } = req.body;
  if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized', data: null });

  projectModel.createApplication(projectId, req.user.id, proposal || null, (err, result) => {
    if (err) {
      console.error('projects.apply error', err);
      return res.status(500).json({ success: false, message: 'Failed to apply', data: null });
    }

    // Notify project owner via socket (get project owner)
    projectModel.getById(projectId, (err2, rows) => {
      if (!err2 && rows && rows[0]) {
        const project = rows[0];
        try { const io = req.app && req.app.get('io'); if (io) io.to(`user_${project.user_id}`).emit('new_application', { projectId, applicantId: req.user.id }); } catch(e){}
      }
    });

    return res.status(201).json({ success: true, message: 'Application submitted', data: { id: result.insertId } });
  });
};

// GET /api/projects/:id/proposals
exports.getProposals = (req, res) => {
  const projectId = req.params.id;
  projectModel.listApplications(projectId, (err, rows) => {
    if (err) {
      console.error('projects.getProposals error', err);
      return res.status(500).json({ success: false, message: 'Failed to get proposals', data: null });
    }
    return res.json({ success: true, message: 'OK', data: rows });
  });
};

// POST /api/projects/:projectId/proposals/:proposalId/accept
exports.acceptProposal = (req, res) => {
  const { projectId, proposalId } = { projectId: req.params.id, proposalId: req.params.proposalId };
  // Only project owner can accept — verify
  projectModel.getById(projectId, (err, rows) => {
    if (err || !rows || rows.length === 0) return res.status(404).json({ success: false, message: 'Project not found', data: null });
    const project = rows[0];
    if (!req.user || String(req.user.id) !== String(project.user_id)) return res.status(403).json({ success: false, message: 'Forbidden', data: null });

    projectModel.setApplicationStatus(proposalId, 'accepted', (err2) => {
      if (err2) return res.status(500).json({ success: false, message: 'Failed to accept', data: null });
      // update project status to in_progress
      projectModel.updateProject(projectId, { status: 'in_progress' }, (err3) => {
        if (!err3) try { const io = req.app && req.app.get('io'); if (io) io.emit('proposal_accepted', { projectId, proposalId }); } catch(e){}
        return res.json({ success: true, message: 'Proposal accepted', data: null });
      });
    });
  });
};

// POST /api/projects/:projectId/proposals/:proposalId/reject
exports.rejectProposal = (req, res) => {
  const { projectId, proposalId } = { projectId: req.params.id, proposalId: req.params.proposalId };
  projectModel.getById(projectId, (err, rows) => {
    if (err || !rows || rows.length === 0) return res.status(404).json({ success: false, message: 'Project not found', data: null });
    const project = rows[0];
    if (!req.user || String(req.user.id) !== String(project.user_id)) return res.status(403).json({ success: false, message: 'Forbidden', data: null });

    projectModel.setApplicationStatus(proposalId, 'rejected', (err2) => {
      if (err2) return res.status(500).json({ success: false, message: 'Failed to reject', data: null });
      return res.json({ success: true, message: 'Proposal rejected', data: null });
    });
  });
};
