module.exports = function(senderID, message, bot) {
    if (message.startsWith('eval') && bot.config.admins.includes(senderID.toString())) {
        const result = eval(message.slice(4)).toString();
        bot.user.chatMessage(senderID, result);
    } else if(message.startsWith('eval') && !bot.config.admins.includes(senderID)) {
        bot.user.chatMessage(senderID, 'You are not a admin of this bot and can therefor not use the eval command');
    }
}
