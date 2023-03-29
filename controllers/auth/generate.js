const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // basePath: process.env.OPENAI_BASE_PATH,
});
const openai = new OpenAIApi(configuration);

// const generatePrompt = animal => {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// };

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

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid animal',
      },
    });
    return;
  }
  try {
    // const completion = await openai.createCompletion({ // model: 'text-davinci-003',
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // stable
      // model: 'text-babbage-001',
      // model: 'text-ada-001',
      // model: 'text-davinci-003',
      // models below do not exist on openai.listModels().data.data obejct yet 'https://api.openai.com/v1/models'
      // model: 'gpt-4', // stable
      // model: 'gpt-4-0314', // deprecated June 14th, 2023
      // model: 'gpt-4-32k-0314', // deprecated June 14th, 2023

      // prompt: generatePrompt(animal),
      // prompt: animal, // model: 'text-davinci-003',
      temperature: 0.6,
      max_tokens: 25,
      messages: [{ role: 'user', content: animal }],
    });
    console.log(completion.data.choices[0].message.content);
    // res.status(200).json({ result: completion.data.choices[0].text.trim() }); // model: 'text-davinci-003',
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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
