const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const imageVariation = async (req, res) => {
  let buffer;
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  try {
    const imgResult = await fetch(
      'https://res.cloudinary.com/dpad5ltdp/image/upload/v1682337209/image_variation_original_fjzhea.png'
    );
    const blob = await imgResult.blob();
    buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(`img/1.png`, buffer);
  } catch (error) {
    console.log(error);
  }
  try {
    const result = await openai.createImageVariation(
      //   fs.createReadStream('img/image_variation_original.png'),
      fs.createReadStream('img/1.png'),
      1,
      '256x256'
    );

    const url = result.data.data[0].url;
    console.log(url);
    res.status(200).json({ url });
    // save image URL to disk
    // const imgResult = await fetch(url);
    // const blob = await imgResult.blob();
    // const buffer = Buffer.from(await blob.arrayBuffer());
    // fs.writeFileSync(`img/${Date.now()}.png`, buffer);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
};
module.exports = imageVariation;
