const discord = require('discord.js')
module.exports = {
  name:"messageUpdate",
  execute(client, message) {
    if (message.author.bot || !message.guild) return
    client.editedMessages.set(message.channel.id, message)
  }
}