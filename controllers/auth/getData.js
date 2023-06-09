const getData = async (req, res) => {

  const DATA = process.env.DATA;

  if (!DATA) {
    res.status(500).json({
      error: {
        message: 'Unable to fetch DATA from process.env.DATA',
      },
    });
    return;
  }

  const requestData = req.body.prompt || '';
  const sliced = DATA.slice(0, 11);
  if (requestData !== sliced) {
    res.status(400).json({
      error: {
        message: 'Unable to compare requestData with process.env.DATA',
      },
    });
    return;
  }

  try {
    res.status(200).json({ DATA });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
};
module.exports = getData;
