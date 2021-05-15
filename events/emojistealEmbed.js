
module.exports = {
  name:"messageReactionAdd",
  execute() {
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
