const discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'Dynamic Help command',
  category:'Miscellaneous',
	execute(client, message, args) {
    const helpEmbed = new discord.MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Take a look through all categories!')
    .setColor('BLUE')
    .addField('1️⃣', 'Miscellaneous', true)
    .addField('2️⃣', 'Moderation', true)
    .addField('3️⃣', 'Configuration', true)
    .addField('4️⃣', 'NSFW', true)
    .addField('5️⃣', 'Fun', true)
    .addField('6️⃣', 'Chat', true)
    .addField('7️⃣', 'Music', true)
    .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)

    message.delete({timeout:3000})
    message.channel.send(`Help Menu ${message.author.id}`).then(async x => {
      message.react('👍')
      x.edit(helpEmbed)
      await x.react("🏠")
      await x.react("⏹")
      await x.react("")
    })
	},
};