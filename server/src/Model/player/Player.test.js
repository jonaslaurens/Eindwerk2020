const Player = require('./Player');
const generateID = require('../../Vendor/generateID');

describe('Tests for Player Model', () => {
  test('Player should be instantiated', () => {
    const playerX = new Player('ace', generateID());
    expect(playerX).toBeInstanceOf(Player);
  });

  test('Player.getName() return name', () => {
    const playerX = new Player('ace', generateID());
    expect(playerX.name).toEqual('ace');
  });

  test('Player.setName("awesome Jack") return "awesome Jack"', () => {
    const playerX = new Player('ace', generateID());
    playerX.setName('awesome Jack');
    expect(playerX.setName('awesome Jack')).toEqual('awesome Jack');
  });

  test('Player.getPlayerID() returns uuid', () => {
    const generatedId = generateID();
    const playerX = new Player('ace', generatedId);
    expect(playerX.id).toEqual(generatedId);
  });
});
