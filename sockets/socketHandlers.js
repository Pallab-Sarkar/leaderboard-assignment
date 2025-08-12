import PlayerModel from "../model/playerModel.js";

const socketHandlers = (io, socket) => {
  console.log("New client connected:", socket.id);

  socket.on("updateScore", async (data) => {
    try {
      const { playerId, playerName, score, region, gameMode } = data;

      const player = await PlayerModel.findOneAndUpdate(
        { playerId },
        {
          playerName,
          score,
          region,
          gameMode,
          lastUpdated: Date.now(),
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h TTL
        },
        { upsert: true, new: true }
      );

      io.emit("scoreUpdated", player);
    } catch (err) {
      console.error("Error updating score:", err);
    }
  });

  socket.on("getTopPlayers", async (count = 10) => {
    try {
      const topPlayers = await PlayerModel.find()
        .sort({ score: -1 })
        .limit(count)
        .lean();
      socket.emit("topPlayers", topPlayers);
    } catch (err) {
      console.error("Error fetching top players:", err);
    }
  });

  socket.on("getFilteredPlayers", async ({ region, gameMode, count = 10 }) => {
    try {
      const query = {};
      if (region) query.region = region;
      if (gameMode) query.gameMode = gameMode;

      const filteredPlayers = await PlayerModel.find(query)
        .sort({ score: -1 })
        .limit(count)
        .lean();

      socket.emit("filteredPlayers", filteredPlayers);
    } catch (err) {
      console.error("Error fetching filtered players:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
};

export default socketHandlers;
