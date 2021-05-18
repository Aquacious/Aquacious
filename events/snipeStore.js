const discord = require('discord.js')
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
    if (message.author.bot || !message.guild) return
    client.deletedMessages.set(message.channel.id, message)
  }
}