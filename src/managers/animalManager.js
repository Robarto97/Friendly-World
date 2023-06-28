const Animal = require("../models/Animal");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find().lean();
exports.getFromSearch = async (location) => {
  let result = await Animal.find().lean();

  if (location) {
    result = result.filter((animal) =>
      animal.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return result;
};

exports.getOne = (animalId) => Animal.findById(animalId).populate("owner");

exports.donate = async (animalId, user) => {
  const animal = await Animal.findById(animalId);
  animal.donations.push({ user });
  return animal.save();
};

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);
