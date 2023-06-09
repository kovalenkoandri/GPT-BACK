const { ctrlWrapper } = require('../../helpers');
const generate = require('./generate');
const image = require('./image');
const imageb64 = require('./imageb64');
const imageVariation = require('./imageVariation');
const getData = require('./getData');

module.exports = {
  generate: ctrlWrapper(generate),
  image: ctrlWrapper(image),
  imageb64: ctrlWrapper(imageb64),
  imageVariation: ctrlWrapper(imageVariation),
  getData: ctrlWrapper(getData),
};
