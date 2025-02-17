// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const wardRoutes = require("./routes/ward");
// Import your routes
const adminRoutes = require("./routes/admin"); // Adjust if using ward.js
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Optional: Create default admin after DB connection
    const createDefaultAdmin = require('./utils/createDefaultAdmin');
    createDefaultAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the e-Village Portal API');
});

// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/admin', require('./routes/admin'));  // <-- New protected admin route
app.use('/api/employee', require('./routes/employee'));
app.use('/api/family', require('./routes/family'));  // New family route
app.use("/api/admin/ward", wardRoutes);
// Mount routes so that /api/admin is the base path
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on (http://localhost:${PORT})`));
