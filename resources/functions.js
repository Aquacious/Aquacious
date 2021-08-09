module.exports = {
    deniedEmbed(err) {
    const deniedEmbed = new discord.MessageEmbed()
    .setTitle('Error')
    .setDescription(err)
    .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
    .setColor('RED')
    .setTimestamp();
    return deniedEmbed
  },

}