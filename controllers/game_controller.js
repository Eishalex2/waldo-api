const asyncHandler = require('express-async-handler');
const Game = require('../models/game');
const Item = require('../models/item');
const path = require('path');

exports.game_list = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find({}).exec();

  res.json(allGames);
});

exports.game_detail = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.gameId).exec();

  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  res.json(game);
});

// Get all items for a game
exports.get_items = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({game: req.params.gameId});

  res.json(allItems);
});

exports.game_image = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.gameId).exec();

  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  const link = path.join(__dirname, '..', game.image_link)

  res.sendFile(link);
});

exports.item_image = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ $and: [{ game: req.params.gameId }, {_id: req.params.itemId }]}).exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  const link = path.join(__dirname, '..', item[0].image_link)

  res.sendFile(link);
})