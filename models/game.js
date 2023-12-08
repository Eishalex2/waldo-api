const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  image_link: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      image_link: { type: String, required: true },
      coords: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
      }
    }
  ]
});

module.exports = mongoose.model('Game', GameSchema);