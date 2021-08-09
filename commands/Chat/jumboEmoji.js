const discord = require('discord.js')
module.exports = {
  name:'jumbo',
  description:'Blow up some emojis!',
  cooldown:2,
  execute(client, message, args) {
    if (!args[0]) return message.channel.send(deniedEmbed("Couldn't find an emoji to paste!")).then(x => {x.delete({timeout:5000})})
    const msg = args[0].match(/<a?:.+:\d+>/gm)
    let url = ''
    if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
    url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
    }
    else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
    url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
    }
    if (url) {
      const embed = new discord.MessageEmbed()
      .setColor('BLUE')
      .setImage(url)
      .setAuthor(message.author.username, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
      message.delete()
      message.channel.send(embed)
    }
    if (!url) {
      message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji.')).then(x => {x.delete({timeout:5000})})
    }
  }
}