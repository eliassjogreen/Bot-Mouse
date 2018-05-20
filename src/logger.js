const path = require('path');
const fs = require('fs');

const winston = require('winston');

function logger(logName) {
	// Create string containing the path to the log directory
	const logDirectory = path.join(process.cwd(), '/logs/');

	// If the log directory doesn't exist then create it
	if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

	// Create a variable containing all the log levels and their respective color
	const logLevels = {
		levels: {
			error: 1,
			warn: 2,
			info: 3,
			debug: 4
		},
		colors: {
			info: 'green',
			warn: 'yellow',
			error: 'red',
			debug: 'grey'
		}
	};

	// Add all of the log level colors to winston
	winston.addColors(logLevels.colors);

	// Return a new winston logger
	return new winston.Logger({
		// Add all of the log levels
		levels: logLevels.levels,

		// Add the two different output types: console and file
		transports: [
			new winston.transports.Console({
				timestamp: () => {
					return new Date().toISOString();
				},
				colorize: true
			}),

			new winston.transports.File({
				filename: path.join(logDirectory, (logName + `_${new Date().toISOString().replace(/[\.:-]/g, '')}.log`))
			})
		]
	});
}

module.exports = logger;
