const express = require("express");
const morgan = require("morgan");

const path = require("path");
const app = express();

// Setup Express JSON
app.use(express.json());

// Setup CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Logger Middleware
app.use(morgan("combined"));

// Setup Routes - For more convenice and code readability
const lessons = require("./routes/api/lessons");
const orders = require("./routes/api/orders");
const spaces = require("./routes/api/spaces");

app.use("/api/lessons", lessons);
app.use("/api/orders", orders);
app.use("/api/spaces", spaces);

// Static File Middleware - Serve from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Default route / GET request to serve index.html
app.get("/", async (req, res) => {
  loadLessonsCollection();
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server on port 3000
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
