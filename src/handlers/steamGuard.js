const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = function(domain, callback, bot) {
    bot.logger.info(`Steam Guard code required from email ending in: ${domain}`)
    rl.question('Steam Guard Code: ', (code) => {
        callback(code);
    });
}
