const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Public list and detail
router.get('/', projectController.list);
router.get('/:id', projectController.getById);

// Protected create
router.post('/', authMiddleware, express.json(), projectController.create);

// Apply to project (protected)
router.post('/:id/apply', authMiddleware, express.json(), projectController.apply);

// Proposals
router.get('/:id/proposals', authMiddleware, projectController.getProposals);
router.post('/:id/proposals/:proposalId/accept', authMiddleware, projectController.acceptProposal);
router.post('/:id/proposals/:proposalId/reject', authMiddleware, projectController.rejectProposal);

module.exports = router;
