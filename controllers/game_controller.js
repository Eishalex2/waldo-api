const asyncHandler = require('express-async-handler');
const Game = require('../models/game');

exports.game_list = asyncHandler(async (req, res, next) => {
  res.send("GET all games");
});

exports.game_detail = asyncHandler(async (req, res, next) => {
  res.send(`Get individual game ${req.params.gameId}`);
});