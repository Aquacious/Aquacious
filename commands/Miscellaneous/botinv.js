const discord = require('discord.js')
module.exports = {
  name:'invite',
  description:'Get links for Aqua and Source Code',
  aliases:['link', 'links', 'github'],
  cooldown:5,
  execute(client, message) {
    const bembed = new discord.MessageEmbed()
		.setTitle('Bot invite')
		.setDescription('Click above to invite Aquacious')
		.setColor('BLUE')
		.setURL('https://discord.ly/aquacious')
		.setFooter('Please upvote Aqua too if you don\'t mind!', 'https://github.com/llsc12/Aquacious/raw/main/aicon.gif')
		const sembed = new discord.MessageEmbed()
		.setTitle('Server invite')
		.setDescription('Click above to join Aquacious Support')
		.setColor('#1abc9c')
		.setURL('https://discord.gg/TRc3vENjCW')
		.setFooter('Support for anything, bot help or code, available here!')
		const gembed = new discord.MessageEmbed()
		.setTitle('GitHub Repository')
		.setDescription('Click above to go to GitHub')
		.setColor('#7289da')
		.setURL('https://github.com/llsc12/Aquacious')
		.setFooter('Go star the repo too!', 'https://avatars.githubusercontent.com/u/42747613?v=4')
		message.channel.send(bembed)
		message.channel.send(sembed)
		message.channel.send(gembed)
  }
}