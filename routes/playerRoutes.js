import express from "express";
import PlayerModel from "../model/playerModel.js";

const router = express.Router();

router.get("/top/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 10;
  try {
    const topPlayers = await PlayerModel.find()
      .sort({ score: -1 })
      .limit(count);
    res.json(topPlayers);
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
    res.json(filteredPlayers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
