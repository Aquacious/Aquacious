const discord = require('discord.js'), enmap = require('enmap')
/*
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    let snipe = new Array()
    if (message.author.bot || !message.guild) return
    if (!client.deletedMessages.get(message.channel.id)) {
      client.deletedMessages.set(message.channel.id, snipe)
      snipe = client.deletedMessages.get(message.channel.id)
      snipe[0] = message
      client.deletedMessages.set(message.channel.id, snipe)
    } else {
      let snipe = client.deletedMessages.get(message.channel.id)
      snipe[snipe.length] = message
      client.deletedMessages.set(message.channel.id, snipe)
    }
    client.deletedMessages.set(message.channel.id, message)
  }
}
*/
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    let args = message.content.slice(prefix.length).split(" ")
    let commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) return;
    let array = client.deletedMessages.get(message.channel.id)
    if (!array) array = new Array()
    array.unshift(message)
    client.deletedMessages.set(message.channel.id, array)
  }
}