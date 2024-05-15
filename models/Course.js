const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
});

module.exports = mongoose.model('Course', CourseSchema);
