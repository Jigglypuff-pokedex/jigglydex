const mongoose = require('mongoose');

const myURI = 'mongodb+srv://jonyghebrial:DvEMJ80TqXjBdOjG@cluster0.jyogzss.mongodb.net/pokedex';
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));