const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply(
    `👋 Hello ${ctx.from.first_name}! Welcome to this Vercel-hosted bot.\n\n` +
    'Try these commands:\n' +
    '/help - Show help\n' +
    '/buttons - Show interactive buttons\n' +
    '/echo [text] - Repeat your text'
  );
});

// Help command
bot.help((ctx) => {
  ctx.replyWithMarkdown(
    '*Available commands:*\n\n' +
    '*/start* - Start the bot\n' +
    '*/help* - Show this help\n' +
    '*/buttons* - Show interactive buttons\n' +
    '*/echo [text]* - Repeat your text\n' +
    '*/info* - Show your user info'
  );
});

// Info command
bot.command('info', (ctx) => {
  const user = ctx.from;
  ctx.replyWithMarkdown(
    `*User Info:*\n\n` +
    `*ID:* ${user.id}\n` +
    `*Name:* ${user.first_name} ${user.last_name || ''}\n` +
    `*Username:* @${user.username || 'none'}\n` +
    `*Language:* ${user.language_code || 'unknown'}`
  );
});

// Echo command
bot.command('echo', (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  if (!input) {
    ctx.reply('Please provide some text after /echo');
    return;
  }
  ctx.reply(`You said: "${input}"`);
});

// Buttons command
bot.command('buttons', (ctx) => {
  ctx.reply(
    'Choose an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Option 1', 'opt1'), Markup.button.callback('Option 2', 'opt2')],
      [Markup.button.url('Visit Vercel', 'https://vercel.com')]
    ])
  );
});

// Button handlers
bot.action('opt1', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('You chose Option 1!');
});

bot.action('opt2', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('You chose Option 2!');
});

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('An error occurred, please try again later.');
});

// Export for Vercel
module.exports = bot;
