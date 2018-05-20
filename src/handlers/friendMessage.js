const fs = require('fs');
const path = require('path');
const pluginsDirectory = './plugins/';

module.exports = function(senderID, message, bot) {
    bot.logger.info(`Recieved chat message "${message}" from ${senderID}`);
    if (message.startsWith(bot.config.commandPrefix)) {
        fs.readdirSync(pluginsDirectory).forEach(file => {
            if (file.endsWith('.js')) {
                bot.logger.debug('Found plugin: ' + file);
                const plugin = require(path.resolve(pluginsDirectory + file));
                plugin(senderID, message.substring(1), bot);
            }
        });
    }
}
