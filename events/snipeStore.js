const discord = require('discord.js')
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    if (message.author.bot || !message.guild) return
    client.deletedMessages.set(message.channel.id, message)
  }
}