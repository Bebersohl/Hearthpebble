/* eslint-env mocha*/
const dotenv = require('dotenv').config();
const Game = require('./game.js');
const HpCard = require('./card.js');
const Deck = require('./models/deck.js');
const Card = require('./models/card.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

let game;
module.exports = function getTestData(cb) {
  Deck.findById('5796b2f090c6f596f9e8d62d')
  .populate('cards.cardId')
  .exec((err, deck) => {
    if (err) { throw err; }

    game = new Game([
      {
        name: 'Tom',
        playerClass: deck.playerClass,
        deck: [],
      }, {
        name: 'Bob',
        playerClass: deck.playerClass,
        deck: [],
      }]);
    for (const card of deck.cards) {
      for (let i = 0; i < card.cardCount; i++) {
        game.players[0].deck.push(new HpCard(card.cardId));
        game.players[1].deck.push(new HpCard(card.cardId));
      }
    }
  }).then(() => {
    cb(game);
  });
};
