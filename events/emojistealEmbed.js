const discord = require('discord.js')
module.exports = {
  name:"messageReactionAdd",
  execute(client, reaction, user) {
    function deniedEmbed(error) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (reaction.message.content.includes('emojisteal') && reaction.message.author == client.user && user != client.user) {
      reaction.users.remove(user.id)
      if (user.id != reaction.message.content.slice('emojisteal '.length)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
      if (!reaction.emoji.url) return reaction.message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji so it should already be in your server')).then(x => {x.delete({timeout:4000})})
      if (reaction.message.guild.emojis.cache.find(emoji => emoji.name == reaction.emoji.name)) return reaction.message.channel.send(deniedEmbed(`An emoji with the name :${reaction.emoji.name}: already exists`)).then(x => {x.delete({timeout:4000})})
      reaction.message.guild.emojis.create(reaction.emoji.url, reaction.emoji.name).catch(err =>{reaction.message.channel.send(err)})
      reaction.message.channel.send(`Created <:${reaction.emoji.name}:${reaction.emoji.id}>`).then(x => {x.delete({timeout:10000})})
    }
  }
}
