const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    if (message.author.bot || !message.guild) return
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    let args = message.content.slice(prefix.length).split(" ")
    let commandName = args.shift().toLowerCase()
    let command = client.commands.get(commandName) 
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) return;
    client.deletedMessages.set(message.channel.id, message)
  }
}