import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Item schema with specified properties
const PlayerSchema = new Schema(
  {
    playerId: { type: String, required: true, unique: true },
    playerName: { type: String, required: true },
    score: { type: Number, default: 0 },
    region: {
      type: String,
      enum: ["AFRICA", "EUROPE", "ASIA"],
      required: true,
    },
    gameMode: { type: String, enum: ["solo", "squad"], required: true },
    lastUpdated: { type: Date, default: Date.now },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 24),
    }, // TTL 24h
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PlayerSchema.index({ score: -1 }); // Descending index for faster leaderboard queries
PlayerSchema.index({ region: 1, gameMode: 1, score: -1 }); // Compound index for filtered queries
PlayerSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export default mongoose.model("PlayerModel", PlayerSchema, "players");
