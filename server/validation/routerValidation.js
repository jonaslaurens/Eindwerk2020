const Validator = require('validator');
const isEmpty = require('./is-empty');
const SUPER_SECRET_CODE = require('../src/Constants/secretCode');

const isValidLogin = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.casinoServer = !isEmpty(data.casinoServer) ? data.casinoServer : '';
  data.secretCode = !isEmpty(data.secretCode) ? data.secretCode : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (Validator.isEmpty(data.casinoServer)) {
    errors.casinoServer = 'Server name is required';
  }

  if (Validator.isEmpty(data.secretCode)) {
    errors.secretCode = 'Secret Code is required';
  } else if (data.secretCode !== SUPER_SECRET_CODE) {
    errors.secretCode = 'Wrong secret code';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  isValidLogin,
};
