// Import required modules
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const firebaseAdmin = require("firebase-admin");
require("dotenv").config(); // Load environment variables from .env file

// Initialize Express and HTTP server
const app = express();
const PORT = 4000;
const server = http.createServer(app);

// Initialize Firebase Admin SDK
const serviceAccount = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

// Middleware
app.use(cors());

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

// Define routes
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
