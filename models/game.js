const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  image_link: { type: String, required: true }
});

module.exports = mongoose.model('Game', GameSchema);