const discord = require('discord.js');
module.exports = {
  name:"avatar",
  description:"Get avatar of a user",
  aliases:["av", "pfp"],
  category:'Fun',
  execute(client, message, args) {
    message.delete()
			let avembed = ''
			if (!args[0]) {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.setColor('BLUE')
				.setImage(message.author.avatarURL({dynamic:true})+"?size=1024")
				.setURL(message.author.avatarURL({dynamic:true})+"?size=1024")
			} else if (message.mentions.users.first() == client.user) {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of Aqua!`)
				.setColor('BLUE')
				.setImage("https://github.com/llsc12/Aquacious/raw/main/aicon.gif")
				.setURL("https://github.com/llsc12/Aquacious/raw/main/aicon.gif")
			} else {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.mentions.users.first().username}`)
				.setColor('BLUE')
				.setImage(message.mentions.users.first().avatarURL({dynamic:true})+"?size=1024")
				.setURL(message.mentions.users.first().avatarURL({dynamic:true})+"?size=1024")
			}
			message.channel.send(avembed)
  }
}