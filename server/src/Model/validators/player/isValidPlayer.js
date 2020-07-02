module.exports = (player) => {
  const { name } = player;

  // name must be a string
  if (typeof name !== 'string') {
    return false;
  }

  if (name === '') {
    return false;
  }

  return player;
};
