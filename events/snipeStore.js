const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }

    //if the message contains a command-invoking phrase, return
    let args = message.content.slice(prefix.length).split(" ")
    let commandName = args.shift().toLowerCase()
    let command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) return;
    let array = client.deletedMessages.get(message.channel.id)
    if (!array) array = new Array()
    array.unshift(message)
    client.deletedMessages.set(message.channel.id, array)
  }
}