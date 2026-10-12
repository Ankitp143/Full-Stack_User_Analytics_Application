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

// Serve test tracker webpage
app.use('/tracker', express.static(path.join(__dirname, '../tracker')));

// API Routes
app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
