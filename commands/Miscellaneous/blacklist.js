const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'blacklist',
  description:'Stop the bot from acting in chosen channels',
  execute(client, message, args) {
    message.channel.send('still working on it hangon ')
    /*
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!args[0]) {
      let blacklist = data.get(`guild.${message.guild.id}.blacklist`)
    }
    */
  }
}