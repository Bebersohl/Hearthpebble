/* eslint-env node*/

const shortid = require('shortid');

class Card {
  constructor(values) {
    this.id = shortid.generate();
    this.entourage = values.entourage;
    this.mechanics = values.mechanics;
    this.playRequirements = values.playRequirements;
    this.health = values.health;
    this.rarity = values.rarity;
    this.attack = values.attack;
    this.name = values.name;
    this.race = values.race;
    this.cost = values.cost;
    this.type = values.type;
    this.text = values.text;
    this.oldCardId = values.id;
  }
}

module.exports = Card;
