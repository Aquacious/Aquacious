const discord = require('discord.js')
module.exports = {
  name:'test',
  category:'Miscellaneous',
  description:'Test command',
  execute(client, message, args) {
    member = message.guild.members.cache.get(message.author.id)
  }
}