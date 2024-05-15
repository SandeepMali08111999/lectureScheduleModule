// controllers/adminController.js
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");

const User = require("../models/User");

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const courseImage = req.files["course_image"][0];

    const newCourse = new Course({
      name,
      level,
      description,
      image: courseImage.path,
    });

    await newCourse.save();

    // Fetch all courses after saving the new course
    const courses = await Course.find();

    // Fetch instructors data
    const instructors = await User.find({ role: "Instructor" });

    const lectures = await Lecture.find();
    // Pass the courses variable to the view
    res.render("admin/adminPanel", { courses, instructors, lectures });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a lecture to a course
exports.addLectureToCourse = async (req, res) => {
  try {
    const { courseId, title, date } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found.");

    const lecture = new Lecture({
      title,
      date,
      courseId,
    });

    await lecture.save();
    res.redirect("/admin/adminPanel");
  } catch (error) {
    console.error("Error adding lecture to course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAdminPanel = async (req, res) => {
  try {
    const courses = await Course.find();
    const instructors = await User.find({ role: "Instructor" });
    const lectures = await Lecture.find().populate("courseId"); // Populate the courseId field with the corresponding course data
    res.render("admin/adminPanel", { courses, instructors, lectures });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.assignLecture = async (req, res) => {
  try {
    const { lectureId, instructorId } = req.body;
    const lecture = await Lecture.findById(lectureId);
    const instructor = await User.findById(instructorId);

    if (!lecture || !instructor) {
      return res
        .status(404)
        .json({ message: "Lecture or Instructor not found" });
    }

    // Check if the instructor is already assigned to a lecture on the same date
    const existingAssignment = await Lecture.findOne({
      instructorId,
      date: lecture.date,
    });
    if (existingAssignment) {
      return res.status(400).json({
        message: "Instructor already assigned to a lecture on this date",
      });
    }

    // Assign the lecture to the instructor
    lecture.instructorId = instructorId;
    await lecture.save();
    res.status(200).json({
      message: "Lecture assigned to the Instructor ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
