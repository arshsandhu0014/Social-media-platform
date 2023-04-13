const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost/socialmedia';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
