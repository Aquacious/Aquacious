const discord = require('discord.js')
module.exports = {
  name: 'stop',
  description: 'Stop songs and clear server queue',
  aliases: ['dc', 'disconnect', 'leave', 'stfu'],
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
    if (!message.member.voice.channel) return message.channel.send(deniedEmbed('You have to be in a voice channel to stop music!')).then(x => x.delete({ timeout: 5000 }))
    if (!serverQueue) return message.channel.send(deniedEmbed('No steam is available to end in this guild')).then(x => x.delete({ timeout: 5000 }))
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end()
    const embed = new discord.MessageEmbed()
    .setTitle('Stopped')
    .setDescription('The queue has been terminated for this guild')
    .setTimestamp()
    .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
    .setColor('BLUE')
    message.channel.send(embed)
  },
};