const express = require("express");
const router = express.Router();
const { viewAssignedLectures } = require("../controllers/instructorController");

// View assigned lectures
router.get("/view-assigned-lectures", viewAssignedLectures);

module.exports = router;
