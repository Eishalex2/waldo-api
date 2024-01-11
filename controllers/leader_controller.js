const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Leader = require('../models/leader');

exports.get_leaders = asyncHandler(async (req, res, next) => {
  const leaders = await Leader.find({ completion_time: 1}).exec();

  res.json(leaders);
})

exports.leader_list = asyncHandler(async (req, res, next) => {
  const leaders = await Leader.find({game: req.params.gameId}).sort({completion_time: 1}).exec();

  res.json(leaders);
});

exports.leader_create = [
  body("username", "Username is required")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(asyncHandler(async (value) => {
      const user = await Leader.findOne({ username: value });
      if (user) {
        throw new Error("Username already taken. Try something else.")
      }
    })),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const leader = new Leader({
      username: req.body.username,
      completion_time: req.body.completion_time,
      timestamp: new Date(),
      game: req.params.gameId
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      await leader.save();
      res.json(leader);
    }
  })
]