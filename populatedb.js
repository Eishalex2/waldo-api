#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Game = require("./models/game");
const Item = require("./models/item");

const games = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGames();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function gameCreate(index, title, image_link) {
  const game = new Game({ title: title, image_link: image_link });
  
  await game.save();
  games[index] = game;
  console.log(`Added game: ${title}`);
}

async function itemCreate(index, game, name, image_link, coords) {
  const item = new Item({ game: game, name: name, image_link: image_link, coords: coords});

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createGames() {
  console.log("Adding games");
  await Promise.all([
    gameCreate(0, "Grandbazaar", "/public/images/game-1.jpg"),
    gameCreate(1, "Future City", "/public/images/game-2.jpg"),
    gameCreate(2, "Infinite Expanses", "/public/images/game-3.jpg"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, games[0], "Food stall", "/public/images/game-1-items/cart.png", {"x": 941, "y": 400}),
    itemCreate(1, games[0], "Orange cat", "/public/images/game-1-items/orange-cat.png", {"x": 265, "y": 421}),
    itemCreate(2, games[0], "Yellow suitcase", "/public/images/game-1-items/suitcase.png", {"x": 590, "y": 335}),
    itemCreate(3, games[0], "Pink bag", "/public/images/game-1-items/pink-bag.png", {"x": 1154, "y": 689}),
    itemCreate(4, games[0], "Shopping bag", "/public/images/game-1-items/shopping-bag.png", {"x": 133, "y": 692}),

    itemCreate(5, games[1], "Pencil in chair", "/public/images/game-2-items/pencil-in-chair.png", {"x": 1365, "y": 378}),
    itemCreate(6, games[1], "Octopus with hat", "/public/images/game-2-items/octopus-with-hat.png", {"x": 414, "y": 590}),
    itemCreate(7, games[1], "BB-8", "/public/images/game-2-items/BB8.png", {"x": 847, "y": 1096}),
    itemCreate(8, games[1], "Sad pickle", "/public/images/game-2-items/sad-pickle.png", {"x": 1496, "y": 744}),
    itemCreate(9, games[1], "Penguin assistant", "/public/images/game-2-items/penguin-assistant.png", {"x": 84, "y": 998}),

    itemCreate(10, games[2], "Basketball", "/public/images/game-3-items/basketball.png", {"x": 1406, "y": 882}),
    itemCreate(11, games[2], "Wave", "/public/images/game-3-items/wave.png", {"x": 522, "y": 4796}),
    itemCreate(12, games[2], "Resigned", "/public/images/game-3-items/resigned.png", {"x": 837, "y": 3073}),
    itemCreate(13, games[2], "Alien", "/public/images/game-3-items/alien.png", {"x": 2570, "y": 7933}),
    itemCreate(14, games[2], "Guitar", "/public/images/game-3-items/guitar.png", {"x": 1072, "y": 4955})
  ]);
}