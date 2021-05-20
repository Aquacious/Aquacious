const discord = require('discord.js')
module.exports = {
	name: 'pause',
  category:'Music',
	description: 'Pause the current song',
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
		if (!message.member.voice.channel) return message.channel.send(deniedEmbed('You have to be in a voice channel to pause the music!')).then(x => x.delete({timeout:5000}))
		if (!serverQueue) return message.channel.send(deniedEmbed('There is no song that I could pause!')).then(x => x.delete({timeout:5000}))
		if (serverQueue.connection.dispatcher.paused) return message.channel.send(deniedEmbed('Song already paused!')).then(x => x.delete({timeout:5000}))
		serverQueue.connection.dispatcher.pause()
    const embed = new discord.MessageEmbed()
        .setTitle('Paused')
        .setColor('BLUE')
        .setDescription(`Queue is now paused`)
        .setTimestamp()
    message.channel.send(embed)
	},
};