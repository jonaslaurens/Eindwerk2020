const handleCall = require('./handleCall');

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

describe('Test handleCall on player that has not bet yet', () => {
  test('First decider calls BB', () => {
    const round = new Round();
    const player = new Player(1000);
    const index = 0;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [50],
      pot: 100,
      currentBigBlind: 0,
    };

    expect(resRound).toEqual(round);
  });

  test('Second decider calls the BB', () => {
    const round = new Round();
    round.playerBets = [50];
    round.currentBigBlind = 2;
    round.pot = 100;
    const player = new Player(1000);
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [50, 50],
      pot: 150,
      currentBigBlind: 2,
    };

    expect(resRound).toEqual(round);
  });

  test('BB checks', () => {
    const round = new Round();
    round.playerBets = [50];
    round.pot = 100;
    round.currentBigBlind = 1;
    const player = new Player(1000);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [50, 50],
      pot: 100,
      currentBigBlind: 1,
    };

    expect(resRound).toEqual(round);
  });

  test('Player goes allin on BB call', () => {
    const round = new Round();
    round.playerBets = [50];
    round.currentBigBlind = 2;
    round.pot = 100;
    const player = new Player(50);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
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

  test('Player goes allin on raise call', () => {
    const round = new Round();
    round.playerBets = [300];
    round.currentBigBlind = 2;
    round.pot = 350;
    const player = new Player(300);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [300, 300],
      pot: 650,
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

/* *************************************************/

describe('Test handleCall on player that has made a bet', () => {
  test('BB calls raise', () => {
    const round = new Round();
    round.playerBets = [100];
    round.pot = 150;
    round.currentBigBlind = 1;
    const player = new Player(1000);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [100, 100],
      pot: 200,
      currentBigBlind: 1,
    };

    expect(resRound).toEqual(round);
  });

  test('BB calls', () => {
    const round = new Round();
    round.playerBets = [300, 200];
    round.pot = 350;
    round.currentBigBlind = 1;
    const player = new Player(1000);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [300, 300],
      pot: 400,
      currentBigBlind: 1,
    };

    expect(resRound).toEqual(round);
  });

  test('Player goes allin on BB call', () => {
    const round = new Round();
    round.playerBets = [50];
    round.currentBigBlind = 2;
    round.pot = 100;
    const player = new Player(50);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
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

  test('Player goes allin on raise call', () => {
    const round = new Round();
    round.playerBets = [300];
    round.currentBigBlind = 2;
    round.pot = 350;
    const player = new Player(300);
    player.id = 1;
    const index = 1;

    handleCall(round, player, index);

    const resRound = {
      bigBlind: 50,
      currentBet: 0,
      playerBets: [300, 300],
      pot: 650,
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
