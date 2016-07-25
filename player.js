/* eslint-env node*/
const EventEmitter = require('events').EventEmitter;
const defaults = require('./game-defaults.js');
const Minion = require('./minion.js');
const _ = require('underscore');

class Player extends EventEmitter {
  constructor(values) {
    super();
    this.board = [
      new Minion({
        health: 30,
        type: 'Hero',
        name: values.name,
        playerClass: values.playerClass,
      }),
      new Minion({
        type: 'HeroPower',
        playerClass: values.playerClass,
      })];
    this.deck = values.deck;
    this.hand = [];
    this.discarded = [];
    this.graveyard = [];
    this.secrets = [];
    this.mana = 0;
    this.manaCap = 0;
    this.fatigue = 0;
    this.status = 'mulligan';
    this.once('mulligan', (rejectedCardIDs) => {
      for (let i = 0; i < this.hand.length; i++) {
        for (let j = 0; j < rejectedCardIDs.length; j++) {
          if (this.hand[i].id === rejectedCardIDs[j]) {
            this.deck.push(this.hand.splice(i, 1));
          }
        }
      }
      this.deck = _.shuffle(this.deck);
      this.drawCards(rejectedCardIDs.length);
      this.status = 'play';
    });
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
