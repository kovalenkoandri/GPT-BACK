const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // basePath: process.env.OPENAI_IMAGE_GENERATE_PATH, // if uncomment get message: 'Invalid URL (POST /v1/images/generations/images/generations)'
});
const openai = new OpenAIApi(configuration);

const imageb64 = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const requestData = req.body.prompt || '';
  if (requestData.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid requestData',
      },
    });
    return;
  }

  try {
    const response = await openai.createImage({
      prompt: requestData,
      n: 1,
      size: '256x256',
      response_format: 'b64_json',
    });
    const imageUrl = response.data.data[0].b64_json;
    console.log(imageUrl);
    res.status(200).json({ imageUrl });
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
module.exports = imageb64;
