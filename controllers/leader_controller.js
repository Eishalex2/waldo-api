const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Leader = require('../models/leader');

exports.leader_list = asyncHandler(async (req, res, next) => {
  res.send(`GET Leaderboard list for game ${req.params.gameId}`);
});

exports.leader_create = asyncHandler(async (req, res, next) => {
  res.send("POST new leader");
});