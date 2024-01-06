const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors"); // Added CORS middleware
const bodyParser = require("body-parser"); // Added body-parser middleware
const database = require("./database/connectDB.js");
const userRouter = require("./routes/userRoutes.js");
const cityRouter = require("./routes/cityRoutes.js");
const postRouter = require("./routes/postRoutes.js");

const app = express();

// Connect to the database
database.connectDb();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Load environment variables in development
if (process.env.NODE_ENV !== "production") {
  dotEnv.config();
}

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Server is running....");
});

// routes
app.use("/api/users", userRouter);
app.use("/api/cities", cityRouter);
app.use("/api/posts", postRouter);
app.use("/uploads", express.static("./uplodes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}....`);
});
