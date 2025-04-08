const bot = require('../index');

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body, res);
    } else {
      res.status(200).json({
        status: 'online',
        message: 'Telegram bot is running on Vercel',
        usage: 'Send POST requests to this endpoint for Telegram updates'
      });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
