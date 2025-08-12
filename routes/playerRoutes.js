import express from "express";
import PlayerModel from "../model/playerModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const player = await PlayerModel.create(req.body);
    res.json({ message: "Player created successfully", data: player });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/top/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 10;
  try {
    const topPlayers = await PlayerModel.find()
      .sort({ score: -1 })
      .limit(count);
    res.json({
      message: `Top ${count} players details fetched successfully.`,
      data: topPlayers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/filter", async (req, res) => {
  const { region, gameMode, count } = req.query;
  const query = {};
  if (region) query.region = region;
  if (gameMode) query.gameMode = gameMode;

  try {
    const filteredPlayers = await PlayerModel.find(query)
      .sort({ score: -1 })
      .limit(parseInt(count) || 10);
    res.json({
      message: "Specific players list fetched successfully.",
      data: filteredPlayers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
