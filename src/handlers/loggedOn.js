module.exports = function(bot) {
    bot.logger.info(`Logged into Steam as ${bot.user.steamID}`);
    // Set persona to the specified persona state and the bot name to default
    bot.user.setPersona(bot.config.persona, bot.config.name.default);
    bot.logger.info(`Set persona state to: ${bot.config.persona} and persona name to: ${bot.config.name.default}`);

    // Set games played to default
    bot.user.gamesPlayed(bot.config.game.default);
    bot.logger.info(`Set game to: ${bot.config.game.default}`);

    // Loop thru the name animation and change every bot.config.name.interval seconds
    let nameIndex = 0;
    setInterval(() => {
        bot.user.setPersona(bot.config.persona, bot.config.name.animation[nameIndex]);
        bot.logger.debug(`Changed persona name to: ${bot.config.name.animation[nameIndex]}`);
        nameIndex++;
        if (nameIndex === bot.config.name.animation.length) nameIndex = 0;
    }, bot.config.name.interval * 1e3);

    // Loop thru the game animation and change every bot.config.game.interval seconds
    let gameIndex = 0;
    setInterval(() => {
        bot.user.gamesPlayed(bot.config.game.animation[gameIndex]);
        bot.logger.debug(`Changed game to: ${bot.config.game.animation[gameIndex]}`);
        gameIndex++;
        if (gameIndex === bot.config.game.animation.length) gameIndex = 0;
    }, bot.config.game.interval * 1e3);
}
