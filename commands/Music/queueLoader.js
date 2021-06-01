module.exports = {
  name:'queues',
  description:'Save and load queues online with others',
  cooldown:15,
  aliases:['qs'],
  execute(client, message, args){ 
    function deniedEmbed(error) {
      const discord = require('discord.js')
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    message.delete()
    const random_hex_code = () => {let n = (Math.random() * 0xfffffffff).toString(16);return n.slice(0, 9);};
		const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(deniedEmbed('You need to start a stream before saving or loading.')).then(x => x.delete({timeout:5000}))
    message.channel.send(random_hex_code())
  }
}
