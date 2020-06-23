const uuidv4 = require('uuid/v4');

const generateID = () => {
  return uuidv4();
};

module.exports = generateID;
