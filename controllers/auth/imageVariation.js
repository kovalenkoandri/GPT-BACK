const fetch = require('node-fetch');
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
    const imgResult = await fetch(req.body.link);
    const blob = await imgResult.blob();
      buffer = Buffer.from(await blob.arrayBuffer());
      buffer.name = 'variation.png';
  } catch (error) {
    console.log(error);
  }
  try {
    const result = await openai.createImageVariation(
      buffer,
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
