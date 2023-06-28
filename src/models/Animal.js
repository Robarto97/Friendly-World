const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  years: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  kind: {
    type: String,
    required: true,
    minLength: 3,
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\//,
  },
  need: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  location: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  donations: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
