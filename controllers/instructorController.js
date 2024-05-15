const Lecture = require("../models/Lecture");

exports.viewAssignedLectures = async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters
    const lectures = await Lecture.find({ instructorId: userId }).populate(
      "courseId"
    );

    if (!lectures || lectures.length === 0) {
      return res
        .status(404)
        .json({ message: "No lectures found for this instructor." });
    }

    // Map the lectures to the required format
    const formattedLectures = lectures.map((lecture) => ({
      courseName: lecture.courseId.name, // Access the course name through populated field
      title: lecture.title,
      date: lecture.date.toDateString(),
    }));
    console.log(formattedLectures);

    res.render("instructor/instructorPanel", { formattedLectures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
