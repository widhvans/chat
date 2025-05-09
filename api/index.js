const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const catResponses = {
  greeting: "Meow meow! Kya baat hai, cutie? 😺",
  help: "Purr! Koi help chahiye? Meri whiskers ready hain! 🐾",
  error: "Oops, meri tail ulajh gayi! Phir se try karo! 😿",
  bye: "Meow! Phir milte hain! 😽"
};

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { message } = req.body;
      if (!message || !message.text) return res.status(200).send('No message');

      const chatId = message.chat.id;
      const text = message.text.toLowerCase();

      if (text.startsWith('/start')) {
        await bot.telegram.sendMessage(chatId, catResponses.greeting);
      } else if (text.startsWith('/help')) {
        await bot.telegram.sendMessage(chatId, catResponses.help);
      } else if (text.includes('bye')) {
        await bot.telegram.sendMessage(chatId, catResponses.bye);
      } else {
        await bot.telegram.sendMessage(chatId, `Purr! Tumne kaha "${text}", aur main kehti hoon... Meow! 😻`);
      }

      return res.status(200).send('OK');
    }
    return res.status(200).send('Webhook setup');
  } catch (err) {
    console.error(err);
    return res.status(500).send(catResponses.error);
  }
};
