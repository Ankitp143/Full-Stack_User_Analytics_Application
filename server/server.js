const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 1. API Routes
app.use('/api', eventRoutes);

// 2. Static tracker script
app.use('/tracker', express.static(path.join(__dirname, '../tracker')));

// 3. Demo test webpage at /demo
app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '../tracker/index.html'));
});

// 4. Serve React Dashboard static files
app.use(express.static(path.join(__dirname, '../dashboard/dist')));

// SPA fallback for any other route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dashboard/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
