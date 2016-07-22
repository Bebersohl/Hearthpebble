/* eslint-env node*/

const shortid = require('shortid');

class Minion {
  constructor(values) {
    this.id = shortid.generate();
    this.health = values.health;
    this.attack = values.attack;
    this.name = values.name;
    this.type = values.type;
    this.playerClass = values.playerClass;
    this.entourage = [];
    this.mechanics = [];
    this.playRequirements = [];
    this.hasAction = false;
  }
}

module.exports = Minion;
