const API_KEY = process.env.OPENAI_API_KEY;
const getKey = async (req, res) => {
  if (!API_KEY) {
    res.status(500).json({
      error: {
        message: 'Unable to fetch API_KEY from process.env.OPENAI_API_KEY',
      },
    });
    return;
  }

  try {
    res.status(200).json({ API_KEY });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
};
module.exports = getKey;
