module.exports = validateParams = (params) => {
  // params have to be of type Object, cannot be null or undefined
  if (typeof params !== 'object' || params === null || params === undefined)
    return false;

  const paramsLength = Object.keys(params).length;

  if (paramsLength !== 5) {
    if (paramsLength !== 2) {
      return false;
    }
  }

  // TODO: needs more work.. ik moet elke key na kijken maar geeft niet gewenste resultaat weer..
  let check = true;

  params.forEach((element) => {
    if (!element.hasOwnProperty('value') || !element.hasOwnProperty('suit')) {
      return (check = false);
    }

    if (typeof element.value !== 'number') return (check = false);
    if (typeof element.suit !== 'string') return (check = false);
  });

  if (!check) return false;

  return true;
};
