const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema(
  {
      id: Number,
      name: String,
      gender: String,
      breed: String,
      age: String,
      location: String,
      img: String,
  },
  {timestamps: true}
);

const Dogs = mongoose.model("Dogs", dogSchema);



module.exports = Dogs