const { ctrlWrapper } = require('../../helpers');
const image = require('./image');
const imageb64 = require('./imageb64');
const generate = require('./generate');

module.exports = {
  image: ctrlWrapper(image),
  imageb64: ctrlWrapper(imageb64),
  generate: ctrlWrapper(generate),
};
