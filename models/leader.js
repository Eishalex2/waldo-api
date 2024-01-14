const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const LeaderSchema = new Schema({
  username: { type: String, required: true },
  completion_time: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true }
});

LeaderSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_SHORT);
});

module.exports = mongoose.model('Leader', LeaderSchema);