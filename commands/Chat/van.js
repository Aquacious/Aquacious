const Discord = require("discord.js");

module.exports = {
    name: "van",
    description: "van someone ¯\_(ツ)_/¯",
    category: 'Chat',
    execute(client, message, args) {
        if (!args[0]) return message.channel.send("please provide a name!");
        message.channel.send(`${args[0]} is now vanned.`);
    }
};