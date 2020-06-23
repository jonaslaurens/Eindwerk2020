module.exports = findMax = (array, options) => {
  let max = 0;

  for (let i = 0; i < array.length; i++) {
    if (!options) {
      array[i] > max ? (max = array[i]) : max;
    } else {
      array[i] > 0 ? (max = i + 1) : max;
    }
  }
  return max;
};
