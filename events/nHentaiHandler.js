const discord = require('discord.js'), kongou = require('kongou'), enmap = require('enmap')
module.exports = {
  name:"messageReactionAdd",
  async execute(client, reaction, user) {
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (client.msgOwners.get(reaction.message.id)[0].includes("hentai") && reaction.message.author == client.user && user != client.user) {
      reaction.users.remove(user.id)
      if (!client.msgOwners.get(reaction.message.id)[0].slice('hentai '.length, `hentai ${user.id} `.length).includes(user.id)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
      if (reaction.emoji.name == '⏹') return reaction.message.delete()
      var search = await kongou.get(parseInt(client.msgOwners.get(reaction.message.id)[0].slice(`hentai ${user.id} `.length)))
      let pagenum = parseInt(client.msgOwners.get(reaction.message.id)[1])
      var nextpage;
      if (reaction.emoji.name == '◀️' && pagenum == 1) nextpage = search.num_pages
      else if (reaction.emoji.name == '◀️') nextpage = pagenum-1
      if (reaction.emoji.name == '▶️' && pagenum == search.num_pages) nextpage = 1
      else if (reaction.emoji.name == '▶️') nextpage = pagenum+1
      let tags = new Array()
      for (tag of search.tags) {
        tags.push(tag.name)
      }
      const embed = new discord.MessageEmbed()
      .setTitle(search.title.native)
      .setColor("RED")
      .setDescription(`${search.id}\ntags: \`${tags.join(', ')}\``)
      .setImage(search.images.pages[nextpage-1])
      .setFooter(`Page ${nextpage}/${search.num_pages}`)
      client.msgOwners.set(reaction.message.id, [`nhentai ${user.id} ${search.id}`, nextpage])
      reaction.message.edit(embed)
    }
  }
}