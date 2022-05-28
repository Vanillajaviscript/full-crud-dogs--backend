const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

////////////////REGISTER////////////////////////////////
const registerUser = asyncHandler (async (req, res) => {
  const { name, email, password} = req.body;
//Make a conditional statement that checks for all fields being entered
  if(!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }
  //Check if user already exists
  const userExists = await User.findOne({email})
    if(userExists) {
      res.status(400)
      throw new Error("User already exists!")
    }
  //Hashes the password so that the database doesn't include plain text passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creates a new user with a hashed password
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
//Creates the user along with the JWT
  if(user) {
    res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  })
  } else {
  res.status(400)
  throw new Error("Invalid user data")
  }
})
/////////////////LOGIN////////////////////////////
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
  })
}else {
  res.status(401)
  throw new Error("Invalid credentials")
}
})

const getDogs = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getDogs
}