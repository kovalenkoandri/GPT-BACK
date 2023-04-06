const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // basePath: process.env.OPENAI_BASE_PATH,
});
const openai = new OpenAIApi(configuration);

// console.log(openai); //  basePath: 'https://api.openai.com/v1',
// console.log(configuration);
// const start = async (req, res) => {
// const responseList = await openai.listModels();
// console.log(responseList.data.data);
// const responseModel = await openai.retrieveModel('gpt-4');
// console.log(responseModel);
// }
// start();

const generate = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const requestData = req.body.requestMobile || '';
  if (requestData.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid requestData',
      },
    });
    return;
  }
  try {
    // const completion = await openai.createCompletion({ // model: 'text-davinci-003',
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // stable
      // model: 'text-davinci-003',
      // models below do not exist on openai.listModels().data.data obejct yet 'https://api.openai.com/v1/models'
      // model: 'gpt-4', // stable
      temperature: 0.6,
      max_tokens: 512,
      messages: [{ role: 'user', content: requestData }],
    });
    console.log(completion.data.choices[0].message.content);
    // res.status(200).json({ result: completion.data.choices[0].text.trim() }); // model: 'text-davinci-003',
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content.trim() });
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

module.exports = generate;
