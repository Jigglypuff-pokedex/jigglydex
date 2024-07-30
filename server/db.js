const mongoose = require('mongoose');

const myURI = 'mongodb+srv://jonyghebrial:3CCBYJIB0k3eoLwW@cluster0.jyogzss.mongodb.net/pokedex';

const connectDB = async () => {
  try {
    await mongoose.connect(myURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex is no longer necessary
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err.message);
  }
};

module.exports = connectDB;