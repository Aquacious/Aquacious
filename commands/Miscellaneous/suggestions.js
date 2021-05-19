const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'suggest',
  category:"Miscellaneous",
  cooldown:30,
  description:'Suggest features for Aqua',
  execute(client, message, args) {
    if (!args[0]) return message.channel.send(deniedEmbed('Sadly our devs cannot read minds, please add text :)')).then(x => {x.delete({timeout:5000})})
    const data = new enmap({name:'botdata', dataDir:'./data'})
    const serverembed = new discord.MessageEmbed()
    .setTitle('New Suggestion')
    .setAuthor(`Suggested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(args.join(' '))
    .setColor('BLUE')
    client.channels.cache.get('834895513496715344').send(serverembed).then(msg => {
      msg.react('👍')
      msg.react('👎')
      if (!data.get(`guild.${message.guild.id}.prefix`)) { //prefix
        var prefix = '!'
      } else {
        var prefix = data.get(`guild.${message.guild.id}.prefix`)
      }
      const guildembed = new discord.MessageEmbed()
      .setTitle('New Suggestion')
      .setAuthor(`Suggested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(args.join(' '))
      .setColor('BLUE')
      .setURL(msg.url)
      .setFooter(`Click the title to be sent to your suggestion in the support server! If you aren't in it, do ${prefix}invite`)
      message.channel.send(guildembed)
    })
  }
}