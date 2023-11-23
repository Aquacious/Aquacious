const discord = require('discord.js');
module.exports = {
  name:"avatar",
  description:"Get avatar of a user",
  aliases:["av", "pfp"],
  execute(client, message, args) {
    message.delete()
			let avembed = ''
			if(message.mentions.users.first() == client.user) {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of Aqua!`)
				.setColor('BLUE')
				.setImage("https://github.com/llsc12/Aquacious/raw/main/aicon.gif")
				.setURL("https://github.com/llsc12/Aquacious/raw/main/aicon.gif")
			} else {
				let user = (!args[0]) ? message.author : message.mentions.users.first();
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${user.username}`)
				.setColor('BLUE')
				.setImage(user.displayAvatarURL({ dynamic: true })+"?size=1024")
				.setURL(user.displayAvatarURL({ dynamic: true })+"?size=1024")
			}
			message.channel.send(avembed)
  }
}