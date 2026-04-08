const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const config = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Routes
const authRoutes = require('./routes/authRoutes');
const pgRoutes = require('./routes/pgRoutes');
const roomRoutes = require('./routes/roomRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const billRoutes = require('./routes/billRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

// Init app
const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pgs', pgRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/complaints', complaintRoutes);

// Serve static files
app.use(express.static('public'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));


// Error handler
app.use(errorHandler);

logger.info(`Server configured for ${config.nodeEnv} mode`);

module.exports = app;

