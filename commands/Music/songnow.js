const discord = require('discord.js')
module.exports = {
	name: 'nowplaying',
	description: 'Get the song that is playing.',
  category:'Music',
  aliases:['np'],
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
		if (!serverQueue) return message.channel.send(deniedEmbed('There is nothing playing.')).then(x => x.delete({timeout:6000}))
    const playingembed = new discord.MessageEmbed()
    .setTitle('Now Playing')
    .setColor('BLUE')
    .setDescription(`${serverQueue.songs[0].title}`)
    .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
    .setTimestamp()
		return message.channel.send(playingembed);
	},
};