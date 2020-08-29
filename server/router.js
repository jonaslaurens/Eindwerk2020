module.exports = (app, casino) => {
  app.get('/', (req, res) => {
    res.send('Hello There');
  });

  // handle get table info
  app.get('/table/:id', (req, res) => {
    const table = casino.getTable(req.params.id);

    if (!table) {
      return res.status(400).json({ message: 'That table does not exist' });
    }

    return res.status(200).json(table);
  });

  // return best hand
  app.get('/table/:id/besthand', (req, res) => {
    const table = casino.getTable(req.params.id);

    if (!table) {
      return res.status(400).json({ message: 'That table does not exist' });
    }

    return res.status(200).json(table.getHighHand());
  });

  app.get('/tables', (req, res) => {
    const data = casino.tables.map((table) => table.toObject());

    return res.status(200).json(data);
  });
};
