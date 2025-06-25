require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipeRouter = require('./routes/recipeRoutes');
const authRouter = require('./routes/authRoutes');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/recipes', recipeRouter);
app.use('/auth', authRouter);

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync DB:', err);
  });
