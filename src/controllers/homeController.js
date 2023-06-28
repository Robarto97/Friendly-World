const router = require("express").Router();

const animalManager = require("../managers/animalManager");

router.get("/", async (req, res) => {
  const animals = await animalManager
    .getAll()
    .sort({ _id: -1 })
    .limit(3)
    .lean();
  res.render("home", { animals });
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", async (req, res) => {
  const { location } = req.query;
  const animals = await animalManager.getFromSearch(location);
  res.render("search", { animals, location });
});

module.exports = router;
