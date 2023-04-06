const { ctrlWrapper } = require('../../helpers');
const image = require('./image');
const generate = require('./generate');

module.exports = {
  image: ctrlWrapper(image),
  generate: ctrlWrapper(generate),
};
