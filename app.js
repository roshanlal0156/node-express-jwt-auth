const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
mongoose.set('strictQuery', false);
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://roshanlal0156:yw4pm9d0yZyXNd04@cluster0.c5oypqs.mongodb.net/node-auth?authSource=admin&replicaSet=atlas-jzh6nw-shard-0&ssl=true';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies')); 
app.use(authRoutes);