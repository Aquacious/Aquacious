const discord = require('discord.js'), kongou = require('kongou'), enmap = require('enmap')
module.exports = {
  name:"nhentai",
  description:"Read entire nhentai posts",
  aliases:['nh'],
  usage:'nhentai <query || ID>',
  async execute(client, message, args) {
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
		const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //whether nsfw is allowed
      var nsfwSetting = 'Enabled'
    } else {
      var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
    }
    message.delete()
    if (nsfwSetting == 'Disabled') return message.channel.send(deniedEmbed(`NSFW is disabled entirely in this guild`)).then(d => {d.delete({timeout:5000})})
    if (message.channel.topic) {
      if (!message.channel.topic.includes('NSFW')) {
        if (!message.channel.nsfw) {
          let nembed = new discord.MessageEmbed()
          .addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
          .setColor('GREEN')
          .setTimestamp()
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
          return;
        }
      }
    } else if (!message.channel.nsfw) {
      let nembed = new discord.MessageEmbed()
      .addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
      .setColor('GREEN')
      .setTimestamp()
      .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
      message.channel.send(nembed)
      return;
    }

    // code below
    if (isNaN(args.join(' '))) {
      var query =  await kongou.query(args.join(' '))
      let searchEmbed = new discord.MessageEmbed()
      .setTitle("nHentai Search Results")
      .setDescription('Find a post and press 🧿')
      .setColor("RED")

      .setFooter(`${query.length} results found.`,`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      message.channel.send(searchEmbed).then(async x => {
        client.msgOwners.set(x.id, [`nhentai ${message.author.id} ${search.id}`, 1])
        await x.react('◀️')
        await x.react('▶️')
        await x.react('⏹')
      })
      /*
      let count = 1
      query.forEach(x=> {
        if (count >= 10) return
        searchEmbed.addField(`${count}`, x.title.english)
        count=count+1
      })
      searchEmbed
      .setFooter(`${query.length} results found.`,`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      searchEmbed = await message.channel.send(searchEmbed)
      try {
        response = await message.channel.awaitMessages(msg => 0 < parseInt(msg.content) && parseInt(msg.content) < count+1 && msg.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
      } catch(e) {
        searchEmbed.delete()
        return message.channel.send("Selection timed out.").then(x => x.delete({timeout:5000}))
      }
      searchEmbed.delete()
      response.first().delete()
      if (parseInt(response.first().content) == 0) return
      var search = await kongou.get(parseInt(query[parseInt(response.first().content)-1].id))
      */
    } else {
      var search = await kongou.get(parseInt(args[0]))
    }
    if (!search) return message.channel.send(deniedEmbed('No search results found')).then(x=>x.delete({timeout:4000}))
    let tags = new Array()
    for (tag of search.tags) {
      tags.push(tag.name)
    }
    const embed = new discord.MessageEmbed()
    .setTitle(search.title.english)
    .setColor("RED")
    .setDescription(`${search.id}\ntags: \`${tags.join(', ')}\``)
    .setImage(search.images.pages[0])
    .setFooter(`Page 1/${search.num_pages}`)
    message.channel.send(embed).then(async x => {
      client.msgOwners.set(x.id, [`nhentai ${message.author.id} ${search.id}`, 1, search])
      await x.react('◀️')
      await x.react('▶️')
      await x.react('⏹')
    })
  }
}