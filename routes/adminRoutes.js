// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  addCourse,
  addLectureToCourse,
  assignLecture,
  getAdminPanel,
  addInstructor,
} = require("../controllers/adminController");
const multer = require("multer");
const createDynamicStorage = require("../utils/uploadImage");
const Course = require("../models/Course");

const store = multer({ storage: createDynamicStorage("Course_Images") });
const imageUpload = store.fields([{ name: "course_image", maxCount: 1 }]);

// Add a new course
router.post("/add-course", imageUpload, addCourse);

// Add a new lecture to a course
router.post("/add-lecture-to-course", addLectureToCourse);

// Assign a lecture to an instructor
router.post("/assign-lecture", assignLecture);

// //add a new instructor
// router.post("/add-instructor", addInstructor); 

// Fetch and render courses in admin panel
router.get("/adminPanel",getAdminPanel);

module.exports = router;
