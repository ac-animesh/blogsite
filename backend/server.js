require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const auth = require("./middleware/authMiddleware");

// Middlewares
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", auth, upload.single("myFile"), (req, res) => {
  res.status(200).json({ message: "File has been Uploaded" });
});

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/user/", require("./routes/usersRoutes"));
app.use("/api/post/", require("./routes/postsRoutes"));
app.use("/api/refresh/", require("./routes/refreshRoute"));
app.use("/api/categories/", require("./routes/categoriesRoutes"));

app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});
connectDB();
