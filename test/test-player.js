/* eslint-env mocha*/

const dotenv = require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const Player = require('../player.js');
const HpCard = require('../card.js');
const mongoose = require('mongoose');
const Deck = require('../models/deck.js');
const Card = require('../models/card.js');

mongoose.connect(process.env.DB_HOST, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

describe('player constructor', () => {
  it('creates a new player', () => {
    const player = new Player({ name: 'Tom', playerClass: 'Hunter', deck: [] });
    expect(player.board).to.have.lengthOf(2);
    expect(player.board[0].name).to.equal('Tom');
    expect(player.board[0].playerClass).to.equal('Hunter');
    expect(player.board[1].playerClass).to.equal('Hunter');
  });
});
describe('player gainMana', () => {
  let player;
  beforeEach(() => {
    player = new Player({ name: 'Tom', playerClass: 'Hunter', deck: [] });
  });
  it('raises players mana', () => {
    player.gainMana(1);
    expect(player.mana).to.equal(1);
    expect(player.manaCap).to.equal(1);
    player.gainMana(3);
    expect(player.mana).to.equal(4);
    expect(player.manaCap).to.equal(4);
  });
  it('does not raise players mana above maxMana', () => {
    player.gainMana(11);
    expect(player.mana).to.equal(10);
  });
});
describe('player drawCards', () => {
  let player;
  beforeEach((done) => {
    const playerDeck = [];
    Deck.findById('57928747ce12d761294bc3f1')
    .populate('cards.cardId')
    .exec((err, deck) => {
      if (err) { throw err; }
      for (const card of deck.cards) {
        for (let i = 0; i < card.cardCount; i++) {
          playerDeck.push(new HpCard(card.cardId));
        }
      }
      player = new Player({ name: 'Tom', playerClass: deck.playerClass, deck: playerDeck });
      done();
    });
  });
  it('draws card(s) when deck is not empty and hand has room', () => {
    player.drawCards(1);
    expect(player.deck).to.have.lengthOf(29);
    expect(player.hand).to.have.lengthOf(1);
    player.drawCards(3);
    expect(player.deck).to.have.lengthOf(26);
    expect(player.hand).to.have.lengthOf(4);
  });
  it('draws 0 cards when hand is full and burns them', () => {
    player.drawCards(15);
    expect(player.discarded).to.have.lengthOf(5);
    expect(player.hand).to.have.lengthOf(10);
  });
  it('causes fatigue damage when deck is empty', () => {
    player.drawCards(31);
    expect(player.deck).to.have.lengthOf(0);
    expect(player.board[0].health).to.equal(29);
    player.drawCards(1);
    expect(player.board[0].health).to.equal(27);
    player.drawCards(1);
    expect(player.board[0].health).to.equal(24);
  });
});
