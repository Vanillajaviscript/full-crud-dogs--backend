require('dotenv').config();
const express = require('express');
const colors = require('colors');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection');
const Dogs = require('./models/dogSchema');
const { errorHandler } = require('./middleware/errorMiddleware')
connectDB();
//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', require('./routes/userRoutes'))
app.use(cors());
app.use(logger('dev'));
app.use(errorHandler)
//check for user logged in
//if user is not logged in redirect to log in screen
app.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to the China Dog Rescue!"});
})

app.get('/dogs', async(req, res) => {
  try {
    res.json(await (await Dogs.find({})).reverse())
  } catch (error) {
    res.status(400).json(error);
  }
});

//Delete
app.delete('/dogs/:id', async(req, res) => {
  try {
    res.json( await Dogs.findByIdAndDelete(req.params.id))
  } catch (error) {
    res.status(400).json(error);
  }
});

//Update
app.put('/dogs/:id', async (req, res) => {
  try {
    res.json(await Dogs.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  } catch (error) {
    res.status(400).json(error);
  }
})

//Create
app.post('/dogs', async (req, res) => {
  try{
    console.log(req.body)
  res.status(201).json(await Dogs.create(req.body))
  } catch (error) {
    res.status(400).json(error);
  }
})

//Show
app.get('/dogs/:id', async (req, res) => {
  try {
    res.json( await Dogs.findById(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => console.log(`Server is live on ${PORT}`));