const logger = require('./logger.js');
const winston = require('winston');

const SteamUser = require('steam-user');

class BotMouse {
	constructor(config) {
        this.config = config;

		// Create the logger and set the logging options
		this.logger = logger(this.config.logging.logFileName || this.config.username);
		// Make sure that there is a logging config exists
		if (!this.config.logging || typeof(this.config.logging) !== 'object') {
			this.logger.error('The configured logging config is not set correctly');
			return this.exit(1, this);
		} else {
			// Set the log levels for file/console
			this.logger.transports.console.level = config.logging.consoleLogLevel || 'info';
			this.logger.transports.file.level = config.logging.fileLogLevel || 'info';
			// Turn off logging to console/file if specified
			if (!this.config.logging.logToConsole || false) this.logger.remove(winston.transports.Console);
			if (!this.config.logging.logToFile || false) this.logger.remove(winston.transports.File);
		}

		// Check that config contains all essential parts and valid (username, password and that the config file is an object)
		if (typeof(this.config) !== 'object') {
			this.logger.error('Invalid config');
			return this.exit(1, this);
		}
		if (!this.config.username && typeof(this.config.username) !== 'string') {
			this.logger.error('The configured username is not set correctly');
			return this.exit(1, this);
		}
		if (!this.config.password && typeof(this.config.password) !== 'string') {
			this.logger.error('The configured password is not set correctly');
			return this.exit(1, this);
		}

		this.logger.info('Configuration loaded successfully');
		this.logger.debug(`Config:\n${JSON.stringify(this.config, null, 4)}`);

		// Create the SteamUser
		this.user = new SteamUser();
		this.user.setOptions({ 'promptSteamGuardCode': false, 'dataDirectory': './data/' });

		// Associate all of the different handlers with the events
		this.user.on('loggedOn', () => { require('./handlers/loggedOn.js')(this); });
		this.user.on('disconnected', () => { require('./handlers/disconnected.js')(this); });
		this.user.on('steamGuard', (domain, callback) => { require('./handlers/steamGuard.js')(domain, callback, this); });
		this.user.on('friendMessage', (senderID, message) => { require('./handlers/friendMessage.js')(senderID, message, this); });
		this.user.on('error', (error) => {
			this.logger.error(error);
		});

		// Bind any exit event with the function exit
		process.on('SIGINT', ()  => { this.exit(null, this) });
		process.on('SIGTERM', () => { this.exit(null, this) });
		process.on('SIGUSR1', () => { this.exit(null, this) });
		process.on('SIGUSR2', () => { this.exit(null, this) });
	}

	start() {
		this.user.logOn({
			"accountName": this.config.username,
			"password": this.config.password
		});
	}

	exit(code, bot) {
		if (bot.user) {
			bot.logger.info('Preparing Steam account for exit...');
			// Set persona to the specified persona state and the bot name to default
			bot.user.setPersona(bot.config.persona, bot.config.name.default);
			// Stop playing any games
			bot.user.gamesPlayed([]);
		}

		bot.logger.warn('Exiting...');
		if (code) process.exit(code);
		else process.exit();
	}
}

module.exports = BotMouse;
