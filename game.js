/* eslint-env node*/

const EventEmitter = require('events').EventEmitter;
const defaults = require('./game-defaults.js');
const Player = require('./player.js');

class Game extends EventEmitter {
  constructor(players) {
    super();
    this.turn = 1;
    this.players = [
      new Player({
        name: players[0].name,
        playerClass: players[0].playerClass,
        deck: players[0].deck,
      }),
      new Player({
        name: players[1].name,
        playerClass: players[1].playerClass,
        deck: players[1].deck,
      })];
    // determine who goes first
    if (Math.round((Math.random() * (1 - 0)) + 0)) {
      const temp = this.players[1];
      this.players[1] = this.players[0];
      this.players[0] = temp;
    }
    this.once('start', () => {
      this.players[0].drawCards(defaults.initialCards);
      this.players[1].drawCards(defaults.initialCards + 1);
    });
    this.on('new turn', () => {
      this.turn = this.turn === 0 ? 1 : 0;
      const player = this.players[this.turn];
      player.drawCards(1);
      player.gainMana(1);
      for (const minion of player.board) {
        minion.hasAction = true;
      }
    });
  }
}

module.exports = Game;
