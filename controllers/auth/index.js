const { ctrlWrapper } = require('../../helpers');
// const logout = require('./logout');
const generate = require('./generate');

module.exports = {
  // logout: ctrlWrapper(logout),
  generate: ctrlWrapper(generate),
};
