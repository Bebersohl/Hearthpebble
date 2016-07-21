/* eslint-env node*/

const EventEmitter = require('events').EventEmitter;
const defaults = require('./game-defaults.js');

class Player extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.deck = [];
    this.hand = [];
    this.discarded = [];
    this.graveyard = [];
    this.secrets = [];
    this.board = [];
    this.mana = 0;
    this.manaCap = 0;
    this.fatigue = 0;
  }
  gainMana(amount) {
    for (let i = 0; i < amount; i++) {
      if (this.manaCap < defaults.maxMana) {
        this.manaCap += 1;
        this.mana = this.manaCap;
      } else {
        this.mana = this.manaCap;
      }
    }
  }
  drawCards(amount) {
    for (let i = 0; i < amount; i++) {
      if (this.deck.length > 0) {
        // deck still has cards
        if (this.hand.length >= defaults.maxHandLength) {
          // hand is full
          this.discarded.push(this.deck.shift());
        } else {
          // hand has room
          this.hand.push(this.deck.shift());
        }
      } else {
        // deck is empty
        this.fatigue += 1;
        this.board[0].health -= this.fatigue;
      }
    }
  }
}

module.exports = Player;
