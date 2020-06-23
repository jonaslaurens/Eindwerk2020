class Casino {
  constructor(name, table) {
    this.name = name;
    this.table = table;
  }

  getTable() {
    return this.table;
  }
}

module.exports = Casino;
