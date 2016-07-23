/* eslint-env mocha*/
const chai = require('chai');
const expect = chai.expect;
const Game = require('../game.js');
const HpCard = require('../card.js');
const Deck = require('../models/deck.js');

describe('game constructor', () => {
  it('creates a new game', () => {
    const game = new Game([
      {
        name: 'Tom',
        playerClass: 'Hunter',
        deck: [],
      }, {
        name: 'Bob',
        playerClass: 'Mage',
        deck: [],
      }]);
    expect(game.players).to.have.lengthOf(2);
    expect(game.players[0].board).to.have.lengthOf(2);
    expect(game.players[1].board).to.have.lengthOf(2);
  });
});
describe('game emit start', () => {
  let game;
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
      game = new Game([
        {
          name: 'Tom',
          playerClass: deck.playerClass,
          deck: playerDeck,
        }, {
          name: 'Bob',
          playerClass: deck.playerClass,
          deck: playerDeck,
        }]);
      done();
    });
  });
  it('draws intial cards', () => {
    game.emit('start');
    expect(game.players[0].hand).to.have.lengthOf(3);
    expect(game.players[1].hand).to.have.lengthOf(4);
  });
  it('can only be called once', () => {
    game.emit('start');
    expect(game.players[0].hand).to.have.lengthOf(3);
    game.emit('start');
    expect(game.players[0].hand).to.have.lengthOf(3);
  });
});
describe('game emit new turn', () => {
  let game;
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
      game = new Game([
        {
          name: 'Tom',
          playerClass: deck.playerClass,
          deck: playerDeck,
        }, {
          name: 'Bob',
          playerClass: deck.playerClass,
          deck: playerDeck,
        }]);
      done();
    });
  });
  it('draws the player a card', () => {
    game.emit('new turn');
    expect(game.players[0].hand).to.have.lengthOf(1);
    game.emit('new turn');
    expect(game.players[1].hand).to.have.lengthOf(1);
  });
  it('gives the player mana', () => {
    game.emit('new turn');
    expect(game.players[0].mana).to.equal(1);
    game.emit('new turn');
    expect(game.players[1].mana).to.equal(1);
  });
  it('sets players minions hasAction to true', () => {
    game.emit('new turn');
    expect(game.players[0].board[0].hasAction).to.equal(true);
    expect(game.players[0].board[1].hasAction).to.equal(true);
  });
});
