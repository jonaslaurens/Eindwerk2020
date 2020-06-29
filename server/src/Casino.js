const Table = require('./Model/table/Table');

class Casino {
  constructor(name) {
    this.name = name;
    this.tables = [];
  }

  registerNewPlayer(player) {
    // check if we got a table with free spots
    let freeTable = this.getEmptyTable();

    // if there is no table with free spots create a new one
    if (!freeTable) {
      freeTable = new Table(4);
      this.tables.push(freeTable);
    }

    freeTable.addPlayer(player);

    return freeTable;
  }

  // returns a table based on it's id if it exists
  // else it will return an error
  getTable(id) {
    // find table based on id
    let table = this.tables.find((table) => table.id === id);

    // if we found the table based on id return it else return an error
    if (table) {
      return table;
    } else {
      return new Error('That table does not exist');
    }
  }

  getEmptyTable() {
    return this.tables.find((table) => table.hasAvailableSpots());
  }
}

module.exports = Casino;
