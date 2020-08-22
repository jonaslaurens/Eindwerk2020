const Decision = require('./Decision');

describe('Create Decision', () => {
  test('Decision should be any', () => {
    const testDecision = { actions: ['fold', 'call', 'raise'] };

    expect(new Decision('any')).toEqual(testDecision);
  });

  test('Decision should be any', () => {
    const testDecision = { actions: ['fold', 'call', 'raise'] };

    expect(new Decision('any')).toEqual(testDecision);
  });
});
