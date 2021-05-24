const discord = require('discord.js')
module.exports = {
  name:"messageUpdate",
  execute(client, message) {
    if (message.author.bot || !message.guild) return
    let array = client.editedMessages.get(message.channel.id)
    if (!array) array = new Array()
    array.unshift(message)
    client.editedMessages.set(message.channel.id, array)
  }
}