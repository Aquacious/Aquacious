const discord = require('discord.js')
module.exports = {
  name:'test',
  hidden:true,
  description:'Test command',
  execute(client, message, args) {
    member = message.guild.members.cache.get(message.author.id)
  }
}