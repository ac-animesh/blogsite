const mongoose = require("mongoose");

const DB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true }, () => {
      console.log("MongoDB is Connected !!");
    });
    mongoose.connection
      .once("open", () => {
        console.log("Connected");
      })
      .on("error", (err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
