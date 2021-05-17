const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'afk',
  category:'Chat',
  cooldown:7,
  description:'Tell everyone you went to get coffee',
  execute(client, message, args) {
    const data = new enmap({ name: "botdata", dataDir:"./data"});
    let afkreason = args.join(" ")
		if (!args[0]) {
			afkreason = 'AFK'
		}
		message.delete()
		data.set(`user.${message.author.id}.afk.timestamp`, (Date.now()/1000).toFixed(0))
		data.set(`user.${message.author.id}.afk.reason`, `${afkreason}`)
		const afkembed = new discord.MessageEmbed()
		.setTitle('AFK Set')
		.setDescription(`${afkreason}`)
		.setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
		.setColor("ORANGE")
		.setFooter('Anyone who pings you will receive this message.', `https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
		message.channel.send(afkembed).then(x => {x.delete({timeout:5000})})
  }
}