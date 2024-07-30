const mongoose = require('mongoose');

const myURI = 'mongodb+srv://jonyghebrial:3CCBYJIB0k3eoLwW@cluster0.jyogzss.mongodb.net/pokedex?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(myURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err.message);
  }
};

module.exports = connectDB;