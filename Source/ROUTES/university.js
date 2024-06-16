const express = require("express");
const router = express.Router();
const universityController = require("../APP/CONTROLLERS/UniversityController");

router.use("/:slug", universityController.show);
router.use("/", universityController.university);

module.exports = router;
