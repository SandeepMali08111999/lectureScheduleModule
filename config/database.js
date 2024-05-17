const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("db connected sucessfully");
  } catch (error) {
    console.log("error in connecting database", error);
    process.exit(1);
  }
};

module.exports = connectDB;
