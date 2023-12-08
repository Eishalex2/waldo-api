const express = require('express');
const router = express.Router();

const leader_controller = require('../controllers/leader_controller');
const game_controller = require('../controllers/game_controller');

router.get("/", (req, res, next) => res.send("Homepage"));

/// Leaderboard ///

// Add new leaderboard entry
router.post('/leaders/:gameId', leader_controller.leader_create);

// Get leaderboard entries for a game
router.get('/leaders/:gameId', leader_controller.leader_list);

/// Game ///

// Get all games
router.get('/games', game_controller.game_list);

// Get individual game
router.get('/games/:gameId', game_controller.game_detail);

module.exports = router;
