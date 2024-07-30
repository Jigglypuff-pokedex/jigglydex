const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const dashboardRoutes = require('./routes/dashboard.js');
const favoritesRoutes = require('./routes/favorites.js');
const authRoutes = require('./routes/auth.js'); // Import the auth routes

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api', authRoutes); // Update this line to use /api prefix

// 404 error
app.all('*', (req, res) => {
  res.sendStatus(404);
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});