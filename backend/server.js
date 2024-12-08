const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
dotenv.config({ path: "./.env" });
const app = require("./app");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Handle socket connections
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("send_message", (data) => {
//     console.log("Message received:", data);
//     io.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err));

const port = 5000;
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});
