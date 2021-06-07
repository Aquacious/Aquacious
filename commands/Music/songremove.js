module.exports = {
  name:'queueremove',
  aliases:['qr', 'qremove', 'queuerem'],
  execute(client, message, args) {
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
    if (args[0]) return message.channel.send(deniedEmbed('Please provide a song to '))
    serverQueue.songs
  }
}