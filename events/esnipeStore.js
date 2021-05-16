const enmap = require('enmap'), data = new enmap({ name: "esnipe", dataDir:"./data"}), discord = require('discord.js')
module.exports = {
  name:"messageUpdate",
  execute(client, message) {
    if (message.author.bot) return
    data.set(message.channel.id, message)
  }
}