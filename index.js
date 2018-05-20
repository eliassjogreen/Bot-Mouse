const BotMouse = require('./src/botMouse.js');
const config = require('./config/config.json');

const bot = new BotMouse(config);
bot.start();
