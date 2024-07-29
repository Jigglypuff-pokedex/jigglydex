const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dashboardRoutes = require('./routes/dashboard.js');
const favoritesRoutes = require('./routes/favorites.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jigglydex', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
// Handle Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
// Handle Mongoose connection error
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// Accept incoming requests from the front end which is on another server
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
);

app.use(express.static(path.resolve(__dirname, '../client/dist')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/dashboard', dashboardRoutes);

app.use('/favorites', favoritesRoutes);

// 404 error
app.all('*', (req, res) => {
    res.sendStatus(404);
});

//Global Error Handling
app.use((err, req, res, next) => {
    console.log(err)
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