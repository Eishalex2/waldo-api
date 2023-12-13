const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  name: { type: String, required: true },
  image_link: { type: String, required: true },
  coords: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Item', ItemSchema);