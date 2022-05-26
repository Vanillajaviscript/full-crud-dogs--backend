require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
require('./config/connection');
const Dogs = require('./models/dogSchema');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('root directory');
})

app.get('/dogs', async(req, res) => {
  try {
    res.json(await Dogs.find({}))
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
  res.json(await Dogs.create(req.body))
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