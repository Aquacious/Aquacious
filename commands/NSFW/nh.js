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
      return message.channel.send(new discord.MessageEmbed().setTitle('Error').setColor("RED").setDescription('Searching is unsupported right now, please use ID\'s')).then(x=>x.delete({timeout:5000}))
      var search = await kongou.query(`${args.join(" ")}`)
    } else {
      var search = await kongou.get(parseInt(args[0]))
    }
    if (!search) return message.channel.send(new discord.MessageEmbed().setTitle('Error').setColor("RED").setDescription('No results found')).then(x=>x.delete({timeout:4000}))
    let tags = new Array()
    for (tag of search.tags) {
      tags.push(tag.name)
    }
    const embed = new discord.MessageEmbed()
    .setTitle(search.title.native)
    .setColor("RED")
    .setDescription(`${search.id}\ntags: \`${tags.join(', ')}\``)
    .setImage(search.images.pages[0])
    .setFooter(`Page 1/${search.num_pages}`)
    message.channel.send(embed).then(async x => {
      client.msgOwners.set(x.id, [`nhentai ${message.author.id} ${search.id}`, 1])
      await x.react('◀️')
      await x.react('▶️')
      await x.react('⏹')
    })
  }
}