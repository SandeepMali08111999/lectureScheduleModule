const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Lecture', LectureSchema);
