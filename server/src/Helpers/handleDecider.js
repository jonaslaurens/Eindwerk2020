// handles the current decider. Will increment if previous made decision or
// back to 0 if everyone decided.
module.exports = handleDecider = (decider, playerLength) => {
  console.log(decider, playerLength);

  if (decider >= playerLength - 1) {
    return 0;
  }

  return ++decider;
};
