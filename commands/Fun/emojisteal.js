const discord = require('discord.js'), enmap = require('enmap'), data = new enmap({name:'botdata', dataDir:'./data'})
module.exports = {
  name:'emojisteal',
  aliases:['emojigrab', 'emotesteal', 'emotegrab'],
  description:'Steal emojis with or without nitro!',
  category:'Fun',
  cooldown:2,
  async execute(client, message, args) {
    message.delete()
    if (!data.get(`guild.${message.guild.id}.prefix`)) { //prefix
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    let commandName = message.content.slice(prefix.length).split(" ").shift().toLowerCase()
    if (!message.member.hasPermission('MANAGE_EMOJIS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You need the Manage Emoji\'s permission!'))
    if (!args[0]) {
      let msgsteal = await message.channel.send(`emojisteal ${message.author.id}`)
      let embed = new discord.MessageEmbed()
      .setTitle('Emoji Steal')
      .setColor('ORANGE')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription('Add reactions to this message to add them to your server')
      .setFooter(`Don't have nitro? Use ${prefix}${commandName} <url> <emojiname> \nAdd single emojis fast? Use ${prefix}${commandName} <emoji>`)
      msgsteal.edit(embed).then(x => {x.delete({timeout:120000})})
    } else {
      if (args[0].includes("https://")) {
        if (!args[1]) return message.channel.send(deniedEmbed('You need to specify a name when adding emojis via url')).then(x => {x.delete({timeout:5000})})
        if (message.guild.emojis.cache.find(emoji => emoji.name == args[1])) return message.channel.send(deniedEmbed(`An emoji with the name :${args[1]}: already exists`)).then(x => {x.delete({timeout:4000})})
        message.guild.emojis.create(args[0], args[1]).catch(err =>{message.channel.send(deniedEmbed(`There was an unknown issue. \n${err}`)).then(x => {x.delete({timeout:5000})})})
        message.channel.send(`Created :${args[1]}:`).then(x => {x.delete({timeout:5000})})
      }
      if (!args[1] && args[0]) {
        const msg = args[0].match(/<a?:.+:\d+>/gm)
        let url = ''
        if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
          url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
        } else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
          url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
        }
        if (!emoji) return message.channel.send(deniedEmbed('There was no emoji found.')).then(x => {x.delete({timeout:5000})})
        if (!emoji[0]) return message.channel.send(deniedEmbed('There was an unknown issue.')).then(x => {x.delete({timeout:5000})})
        let sliceamount = 2
        if (emoji[0].slice(1,2) == 'a') sliceamount = 3
        let emojiname = emoji[0].slice(sliceamount, (emoji[0].search(emoji[1]))-1)
        if (message.guild.emojis.cache.find(emoji => emoji.name == emojiname)) return message.channel.send(deniedEmbed(`An emoji with the name :${emojiname}: already exists`)).then(x => {x.delete({timeout:5000})})
        message.guild.emojis.create(url, emojiname).catch(err => {message.channel.send(deniedEmbed(`An error has occurred. \n${err}`))})
        message.channel.send(`Created :${emojiname}:`).then(x => {x.delete({timeout:5000})})
      } 
    }
  }
}