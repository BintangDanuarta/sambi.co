const db = require('../db');
const crypto = require('crypto');

// POST /api/payment/intent
exports.createIntent = async (req, res) => {
  const { amount, projectId } = req.body;
  if (!amount) return res.status(400).json({ success: false, message: 'Amount required', data: null });

  // If TRIPAY_MODE=development simulate response
  if (process.env.TRIPAY_MODE === 'development') {
    const reference = `DEV-${Date.now()}`;
    const paymentUrl = `https://tripay-sim.local/pay/${reference}`;

    // store transaction in wallet_transactions as pending
    const sql = `INSERT INTO wallet_transactions (user_id, amount, transaction_type, status, note, created_at) VALUES (?, ?, 'payment', 'pending', ?, NOW())`;
    const userId = req.user && req.user.id ? req.user.id : null;
    db.query(sql, [userId, amount, `tripay_sim:${reference}`], (err) => {
      if (err) console.error('createIntent insert tx err', err);
      // respond with simulated payload
      return res.json({ success: true, message: 'Simulated payment created', data: { reference, paymentUrl } });
    });
    return;
  }

  // TODO: implement real Tripay API call when moving to production
  return res.status(501).json({ success: false, message: 'Tripay integration not implemented', data: null });
};

// POST /api/tripay/callback
exports.tripayCallback = (req, res) => {
  // Accept webhook payload from Tripay sandbox/production and update wallet_transactions accordingly
  const payload = req.body;
  console.log('Tripay callback received:', payload);
  // In sandbox mode, we accept and mark the transaction as completed if matching reference
  const reference = payload && payload.reference ? payload.reference : null;
  if (reference) {
    db.query('UPDATE wallet_transactions SET status = ? WHERE note = ?', ['completed', `tripay_sim:${reference}`], (err) => {
      if (err) console.error('tripayCallback update err', err);
      return res.json({ success: true });
    });
  } else {
    return res.json({ success: true });
  }
};
