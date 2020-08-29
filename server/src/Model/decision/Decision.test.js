const Decision = require('./Decision');

describe('Create Decision', () => {
  test('Decision should be any', () => {
    const testDecision = { actions: ['fold', 'call', 'raise'] };

    expect(new Decision('any')).toEqual(testDecision);
  });

  test('Decision should be fold and call, raise limit reached', () => {
    const testDecision = { actions: ['fold', 'call'] };

    expect(new Decision()).toEqual(testDecision);
  });
});
