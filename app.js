// app.js
const express = require("express");
const connectDB = require("./config/database");
const { createServer } = require("http");
const path = require("path");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const port = process.env.PORT || 4000;

const server = createServer(app);

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the routes
app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);
app.use("/auth", authRoutes);
app.use((req, res) => {
  res.render("index");
});

async function main() {
  console.log(`Server running on port: ${port}`);
}

server.listen(port, async () => {
  try {
    await connectDB();
    main();
  } catch (e) {
    console.error(e.message);
    process.exit(1); // Exit the process if there's an error connecting to DB
  }
});
