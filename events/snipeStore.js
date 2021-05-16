const enmap = require('enmap'), data = new enmap({ name: "snipe", dataDir:"./data"}), discord = require('discord.js')
module.exports = {
  name:"messageDelete",
  execute(client, message) {
    if (message.author.bot) return
    data.set(message.channel.id, message)
  }
}