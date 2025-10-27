require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/payment', paymentRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET','POST'] } });

// Simple namespace / room strategy: clients can join room `user_<id>` to receive user-specific events
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
  });
});

// Make io available to request handlers
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.io ready for real-time connections`);
});
