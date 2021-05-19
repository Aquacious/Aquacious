const enmap = require('enmap'), discord = require('discord.js')
module.exports = {
  name: 'message',
  execute(client, message) {
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!message.guild || message.author.bot) return;
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
      let eb = new discord.MessageEmbed()
      .setTitle('Hey! I\'m Aqua!')
      .setDescription(`My prefix in this guild is currently **${prefix}**`)
      .setTimestamp()
      .setColor('BLUE')
      .setThumbnail(`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      message.channel.send(eb)
      return;
    }
  }
}