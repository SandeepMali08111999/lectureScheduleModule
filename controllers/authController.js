const bcrypt = require("bcrypt");
const User = require("../models/User");
const Course = require("../models/Course"); // Import the Course model
exports.getRegister = async (req, res) => {
  res.render("register");
};

exports.getLogin = async (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists with this email." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email, role });
  await user.save();

  res.redirect("/");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: "Invalid credentials" });
  // Generate JWT token here
  if (user.role == "Admin") {
    res.redirect("/admin/adminPanel");
  } else {
    res.redirect(`/instructor/view-assigned-lectures?userId=${user._id}`);
  }
};

exports.logOut = async (req, res) => {
  res.redirect("/");
};
