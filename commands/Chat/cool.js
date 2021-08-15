const discord = require('discord.js')
module.exports = {
  name: "cool",
  description: "Cool someone",
  execute(client, message, args) {
    function deniedEmbed(error) {
      const discord = require('discord.js')
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (!args[0]) return message.channel.send("No user specified")
    if (args.join(' ').includes('@everyone') || args.join(' ').includes('@here')) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
    let SpeechUnsafe = 0
    message.guild.roles.cache.forEach(x => {
      if (args.join(' ').includes(x.id)) SpeechUnsafe = 1
    })
    if (SpeechUnsafe == 1) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
    let rNum = Math.floor((Math.random() * 160) - 137);
    return message.channel.send(
      "Cooled " + args[0] + " to " + "°C" + 
      rNum < -120 ? ", they're now in cryogenic stasis" :
        rNum < -30 ? ", they're quite cold now" :
          rNum < 0 ? ", they're a bit cold now" :
            "" + ".")
}