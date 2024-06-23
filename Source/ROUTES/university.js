const express = require("express");
const router = express.Router();
const universityController = require("../APP/CONTROLLERS/UniversityController");

router.use("/", universityController.university);
router.use("/:slug", universityController.show);

module.exports = router;
