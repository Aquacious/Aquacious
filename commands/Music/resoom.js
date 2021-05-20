const discord = require('discord.js')
module.exports = {
	name: 'resume',
	description: 'Resume a paused server queue',
  category:'Music',
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
		if (!message.member.voice.channel) return message.channel.send(deniedEmbed('You have to be in a voice channel to resume the music!')).then(x => x.delete({timeout:5000}))
		if (!serverQueue) return message.channel.send(deniedEmbed('There is no song that I could resume!')).then(x => x.delete({timeout:5000}))
		if (!serverQueue.connection.dispatcher.paused) return message.channel.send(deniedEmbed('Song already resumed!')).then(x => x.delete({timeout:5000}))
		serverQueue.connection.dispatcher.resume()
    const playingembed = new discord.MessageEmbed()
    .setTitle('Resumed playing!')
    .setColor('RED')
    .setDescription(`${serverQueue.songs[0].title} is now playing!`)
    .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
    .setTimestamp()
    message.channel.send(playingembed)
	},
};