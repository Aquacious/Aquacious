
module.exports = {
  name:"messageReactionAdd",
  execute(eventOut, client) {
    function deniedEmbed(error) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    console.log(eventOut)
    if (eventOut.message.content.includes('emojisteal ') && eventOut.message.author.bot) {
      eventOut.users.reaction.remove(eventOut.reaction.user.id)
      if (eventOut.reaction.user.id != eventOut.message.content.slice('emojisteal '.length)) return eventOut.user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
      if (!reaction.emoji.url) return reaction.message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji so it should already be in your server')).then(x => {x.delete({timeout:4000})})
      if (eventOut.message.guild.emojis.cache.find(emoji => emoji.name == eventOut.emoji.name)) return eventOut.message.channel.send(deniedEmbed(`An emoji with the name :${reaction.emoji.name}: already exists`)).then(x => {x.delete({timeout:4000})})
      eventOut.message.guild.emojis.create(eventOut.emoji.url, eventOut.emoji.name).catch(err =>{reaction.message.channel.send(err)})
      eventOut.message.channel.send(`Created <:${eventOut.emoji.name}:${eventOut.emoji.id}>`).then(x => {x.delete({timeout:10000})})
    }
  }
}
