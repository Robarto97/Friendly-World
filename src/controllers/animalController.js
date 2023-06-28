const router = require("express").Router();

const animalManager = require("../managers/animalManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/dashboard", async (req, res) => {
  const animals = await animalManager.getAll().lean();

  res.render("animals/dashboard", { animals });
});

router.get("/create", isAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/create", isAuth, async (req, res) => {
  const animalData = { ...req.body, owner: req.user._id };

  try {
    await animalManager.create(animalData);

    res.redirect("/animals/dashboard");
  } catch (error) {
    res.render("animals/create", { error: getErrorMessage(error) });
  }
});

router.get("/:animalId/delete", isAuth, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    await animalManager.delete(animalId);

    res.redirect("/animals/dashboard");
  } catch (error) {
    res.render("animals/details", { error: "Error with deleting animal" });
  }
});

router.get("/:animalId/edit", isAuth, async (req, res) => {
  try {
    const animal = await animalManager.getOne(req.params.animalId).lean();
    res.render("animals/edit", { animal });
  } catch (error) {
    res.render("404");
  }
});

router.post("/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animalData = req.body;
  try {
    await animalManager.edit(animalId, animalData);

    res.redirect(`/animals/${animalId}`);
  } catch (error) {
    res.render("animals/edit", {
      error: "Unable to update animal",
      ...animalData,
    });
  }
});

router.get("/:animalId", async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const animal = await animalManager.getOne(animalId).lean();
    const isOwner = req.user?._id == animal.owner._id;
    const hasDonated = !!animal.donations.find((x) => x.user == req.user._id);

    res.render("animals/details", { animal, isOwner, hasDonated });
  } catch (error) {
    res.render("animals/dashboard", { error: getErrorMessage(error) });
  }
});

router.get("/:animalId/donate", isAuth, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    await animalManager.donate(animalId, req.user._id);
    res.redirect(`/animals/${animalId}`);
  } catch (error) {
    res.redirect(`/animals/${animalId}`, { error: "Problem with donating" });
  }
});

module.exports = router;
