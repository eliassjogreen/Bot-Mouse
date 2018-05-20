const fs = require('fs');
const path = require('path');

let configTemplate = `\
{
	"username": "",
	"password": "",
	"admins": [],
	"names": [],
	"nameChangeInterval": 30,
	"games": [],
	"gameChangeInterval": 30,
	"plugins": [],
	"logging": {
		"logToConsole": true,
		"logToFile": false,
		"logFileName": "",
		"consoleLogLevel": "debug",
		"fileLogLevel": "debug"
	}
}`;

console.log('~~ Bot-Mouse Configuration Script ~~');

// Ensure data logs directory and data directory exists
console.log('Checking existance of ./logs/ directory, creating one otherwise');
if (!fs.existsSync('logs')) fs.mkdirSync('logs');
console.log('Checking existance of ./data/ directory, creating one otherwise');
if (!fs.existsSync('data')) fs.mkdirSync('data');

let configPath = path.join('data', 'config.json');
let config = {};

console.log('Checking existance of ./data/config.json file, if it exists load it otherwise create it');
if (fs.existsSync(configPath)) config = JSON.parse(fs.readFileSync(configPath));

console.log('If config is empty create the default config template');
if (Object.keys(config).length === 0 && config.constructor === Object) fs.writeFileSync(configPath, configTemplate, 'utf8')

console.log('Done! Exiting...');
process.exit();
