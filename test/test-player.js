/* eslint-env mocha*/

const chai = require('chai');
const expect = chai.expect;
const Player = require('../player.js');
const getTestData = require('../test-data.js');

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
  let game;
  beforeEach((done) => {
    getTestData((results) => {
      game = results;
      done();
    });
  });
  it('draws card(s) when deck is not empty and hand has room', () => {
    game.players[0].drawCards(1);
    expect(game.players[0].deck).to.have.lengthOf(29);
    expect(game.players[0].hand).to.have.lengthOf(1);
    game.players[0].drawCards(3);
    expect(game.players[0].deck).to.have.lengthOf(26);
    expect(game.players[0].hand).to.have.lengthOf(4);
  });
  it('draws 0 cards when hand is full and burns them', () => {
    game.players[0].drawCards(15);
    expect(game.players[0].discarded).to.have.lengthOf(5);
    expect(game.players[0].hand).to.have.lengthOf(10);
  });
  it('causes fatigue damage when deck is empty', () => {
    game.players[0].drawCards(31);
    expect(game.players[0].deck).to.have.lengthOf(0);
    expect(game.players[0].board[0].health).to.equal(29);
    game.players[0].drawCards(1);
    expect(game.players[0].board[0].health).to.equal(27);
    game.players[0].drawCards(1);
    expect(game.players[0].board[0].health).to.equal(24);
  });
});
