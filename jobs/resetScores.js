import PlayerModel from "../model/playerModel.js";

const startScoreResetJob = () => {
  setInterval(async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    console.log(`Performing daily reset at ${new Date().toISOString()}`);
    try {
      await PlayerModel.updateMany(
        { lastUpdated: { $gte: startOfDay, $lte: endOfDay } },
        {
          $set: {
            score: 0,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          },
        }
      );
    } catch (err) {
      console.error("Error during daily score reset:", err);
    }
  }, 1000 * 60 * 60 * 12); // Every 12 hours
};

export default startScoreResetJob;
