require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://to-do-it-node.vercel.app", // Frontend URL (Vercel URL for your UI)
  credentials: true, // Allow credentials like cookies or tokens to be sent in the requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow headers needed for your requests
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Specify allowed methods
};

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../ui")));

// Example route
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
