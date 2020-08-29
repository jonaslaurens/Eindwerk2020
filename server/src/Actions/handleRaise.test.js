const handleRaise = require('./handleRaise');

class Round {
  constructor() {
    this.bigBlind = 50;
    this.currentBet = 0;
    this.playerBets = [];
    this.pot = 50;
    this.currentBigBlind = 0;
  }

  hasBets() {
    return this.playerBets.length > 0;
  }

  addToPot(amount) {
    this.pot += amount;
  }

  isBigBlind(playerId) {
    return playerId === this.currentBigBlind;
  }

  getHighestBet() {
    return this.playerBets.reduce((a, b) => {
      return Math.max(a, b);
    });
  }
}

class Player {
  constructor(creds) {
    this.credits = creds;
    this.id = 0;
  }
}

describe('Test handleRaise on player that has not bet yet', () => {
  test('First decider raises', () => {
    const round = new Round();
    const player = new Player(1000);
    const index = 0;

    handleRaise(round, player, index, 100);

    const resRound = {
      bigBlind: 50,
      currentBet: 100,
      playerBets: [100],
      pot: 150,
      currentBigBlind: 0,
    };

    expect(resRound).toEqual(round);
  });

  test('Second decider raises the BB', () => {
    const round = new Round();
    round.playerBets = [50];
    round.currentBigBlind = 2;
    round.pot = 100;
    const player = new Player(1000);
    const index = 1;

    handleRaise(round, player, index, 100);

    const resRound = {
      bigBlind: 50,
      currentBet: 100,
      playerBets: [50, 100],
      pot: 200,
      currentBigBlind: 2,
    };

    expect(resRound).toEqual(round);
  });

  test('Player goes allin on raise', () => {
    const round = new Round();
    round.playerBets = [50];
    round.currentBigBlind = 2;
    round.pot = 100;
    const player = new Player(50);
    player.id = 1;
    const index = 1;

    handleRaise(round, player, index, 100);

    const resRound = {
      bigBlind: 50,
      currentBet: 100,
      playerBets: [50, 50],
      pot: 150,
      currentBigBlind: 2,
    };

    const resPlayer = {
      credits: 0,
      id: 1,
      allIn: true,
    };

    const result = { ...resRound, ...resPlayer };
    const testResult = { ...round, ...player };

    expect(result).toEqual(testResult);
  });
});
