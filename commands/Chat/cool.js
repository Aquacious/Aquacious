const discord = require('discord.js')
module.exports = {
  name: "cool",
  description: "Cool someone",
  category: 'Chat',
  execute(client, message, args) {
    if (!args[0]) return message.channel.send("No user specified")
    let randomnumber = Math.floor((Math.random() * 160) - 137);
    if (randomnumber < -120) {
      return message.channel.send("Cooled " + args[0] + " to " + randomnumber + "°C, they're now in cryogenic stasis.")
    } else if (randomnumber < -30) {
      return message.channel.send("Cooled " + args[0] + " to " + randomnumber + "°C, they're quite cold now.")
    } else if (randomnumber < 0) {
      return message.channel.send("Cooled " + args[0] + " to " + randomnumber + "°C, they're a bit cold now.")
    } else
      return message.channel.send("Cooled " + args[0] + " to " + randomnumber + "°C.")
  }
};