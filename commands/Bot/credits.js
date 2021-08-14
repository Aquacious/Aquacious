const discord = require('discord.js')
module.exports = {
  name:'credits',
  aliases:['about'],
  cooldown:5,
  description:'A shoutout to everyone who contributed!',
  execute(client, message){
    const creditembed = new discord.MessageEmbed()
			.setTitle('Credits')
			.setURL('https://discord.gg/TRc3vENjCW')
			.setColor('#1abc9c')
			.setDescription('Thanks to all the lovely people below, this bot was born!')
			.addField('**Lead Developer**', 'llsc12', true)
			.addField('**Developer**', 'Matt', true)
			.addField('**Illustrator**', 'Squid', true)
			.addField('**Animator**', 'ScratchHacker', true)
			.addField('**Readme Developer**', 'Superbro', true)
			.addField('**Ava** ❤️', 'Ava ❤️', true)
      .addField('A quick note', 'This bot is very much in beta and has many bugs. We ask you to use the suggest command to report bugs if you find any. Thanks!')
			.setFooter('And thanks to all ideologists, they help add features! Join the server to contribute!')
			message.channel.send(creditembed)
  }
}