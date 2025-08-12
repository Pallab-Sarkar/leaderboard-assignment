import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import playerRoutes from "./routes/playerRoutes.js";
import socketHandlers from "./sockets/socketHandlers.js";
import startScoreResetJob from "./jobs/resetScores.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/", playerRoutes);

// Socket.io handlers
io.on("connection", (socket) => socketHandlers(io, socket));

// Start daily reset job
startScoreResetJob();

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
