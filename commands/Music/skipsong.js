const discord = require('discord.js')
module.exports = {
	name: 'skip',
	description: 'Skip the currently plaing song',
  aliases:['s'],
	execute(client, message) {
		const serverQueue = client.queue.get(message.guild.id);
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    message.delete()
    if (!message.member.voice.channel) return message.channel.send(deniedEmbed('You have to be in a voice channel to stop the music!'))
		if (!serverQueue) return message.channel.send(deniedEmbed('There is no song that I could skip!'))
		const playingembed = new discord.MessageEmbed()
    .setTitle('Skipped')
    .setColor('RED')
    .setDescription(`${serverQueue.songs[0].title} was skipped.`)
    .setAuthor(message.author.username, `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
    .setTimestamp()
    serverQueue.connection.dispatcher.end();
    message.channel.send(playingembed)
	},
};