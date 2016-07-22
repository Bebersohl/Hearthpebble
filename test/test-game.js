/* eslint-env mocha*/

const chai = require('chai');
const expect = chai.expect;
const Game = require('../game.js');

describe('game constructor', () => {
  it('creates a new game', () => {
    const game = new Game(
      {
        name: 'Tom',
        playerClass: 'Hunter',
      }, {
        name: 'Bob',
        playerClass: 'Mage',
      });
    expect(game.players).to.have.lengthOf(2);
    expect(game.players[0].board).to.have.lengthOf(2);
    expect(game.players[1].board).to.have.lengthOf(2);
  });
});
describe('game emit start', () => {
  let game;
  beforeEach(() => {
    game = new Game(
      {
        name: 'Tom',
        playerClass: 'Hunter',
      }, {
        name: 'Bob',
        playerClass: 'Mage',
      });
    for (let i = 0; i < 30; i++) {
      game.players[0].deck.push({ card: 'card' });
      game.players[1].deck.push({ card: 'card' });
    }
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
  beforeEach(() => {
    game = new Game(
      {
        name: 'Tom',
        playerClass: 'Hunter',
      }, {
        name: 'Bob',
        playerClass: 'Mage',
      });
    for (let i = 0; i < 30; i++) {
      game.players[0].deck.push({ card: 'card' });
      game.players[1].deck.push({ card: 'card' });
    }
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
