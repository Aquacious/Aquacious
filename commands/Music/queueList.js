const discord = require('discord.js')
module.exports = {
	name: 'queue',
	description: 'List this server\'s queue',
  aliases:['q'],
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
		if (!serverQueue) return message.channel.send(deniedEmbed('There is no queue in this guild')).then(x => x.delete({timeout:5000}))
		if (serverQueue.connection.dispatcher.paused) var status = '⏸'; else var status = '▶️'
    let songslist = new Array()
    serverQueue.songs.forEach(song => {
      if (song == serverQueue.songs[0]) songslist[songslist.length] = `**${song.title} Now Playing**\n\n`
      else songslist[songslist.length] = `${songslist.length}. ${song.title}, ${song.addedByUser.username}\n`
    })
    const embed = new discord.MessageEmbed()
        .setTitle('Song Queue')
        .setColor('BLUE')
        .setDescription(songslist.join(''))
        .setTimestamp()
        .setAuthor('Aquacious Music', 'https://github.com/llsc12/Aquacious/raw/main/aicon.gif')
    message.channel.send(embed)
	},
};