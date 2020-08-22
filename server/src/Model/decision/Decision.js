class Decision {
  constructor(posibleActions) {
    this.actions = this.setActions(posibleActions);
  }

  setActions(actions) {
    switch (actions) {
      case 'any':
        return ['fold', 'call', 'raise'];
      default:
        return ['fold', 'call'];
    }
  }
}

module.exports = Decision;
