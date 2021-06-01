const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'userprefs',
  description:'Configure your settings',
  aliases:['usersettings'],
  execute(client, message, args) {
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.prefix`)) { //prefix
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    if (!data.get(`guild.${message.guild.id}.snipeSetting`)) { //whether privacy is better kekw
      var snipeSetting = 'Enabled'
    } else {
      var snipeSetting = data.get(`guild.${message.guild.id}.snipeSetting`)
    }
    if (!data.get(`user.${message.author.id}.snipeSetting`)) { //whether privacy is better kekw
      var usersnipeSetting = 'Enabled'
    } else {
      var usersnipeSetting = data.get(`user.${message.author.id}.snipeSetting`)
    }
    if (!data.get(`guild.${message.guild.id}.youthkickAge`)) { //prefix
      var youthkickAge = 'Disabled'
    } else {
      var youthkickAge = data.get(`guild.${message.guild.id}.youthkickAge`)
    }
    if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //prefix
      var nsfwSetting = 'Enabled'
    } else {
      var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
    }
    let command = message.content.slice(prefix.length).split(" ").shift().toLowerCase()
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (!args[0]) {
      const embed = new discord.MessageEmbed()
      .setTitle('User Preferences')
      .setURL('https://discord.gg/TRc3vENjCW')
      .setDescription(`Settings for ${message.author.tag}`)
      .setColor('BLUE')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField('Sniping', usersnipeSetting)
      .setFooter(`Do ${prefix}${command} <help | modify> <setting> [config]`)
      message.channel.send(embed)
    } else if (args[1]) {
  
      const setting = args[1].toLowerCase()
      const executing = args[0].toLowerCase()
      
      if (executing == 'modify') {
  
        if (setting == 'sniping') {
          if (args[2].toLowerCase() == 'disabled') {
            data.set(`user.${message.author.id}.snipeSetting`,'Disabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`You have opted out of sniping`)
            message.channel.send(embed).then(x => {x.delete({timeout:6000})})
          }
          if (args[2].toLowerCase() == 'enabled') {
            data.set(`user.${message.author.id}.snipeSetting`,'Enabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`You have allowed other users to snipe you`)
            message.channel.send(embed).then(x => {x.delete({timeout:6000})})
          }
        }
      } else if (executing == 'help') {
        if (setting == 'sniping') {
          const embed = new discord.MessageEmbed()
          .setTitle('Sniping')
          .setColor('GREEN')
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Choose whether you allow other people to snipe your messages.`)
          message.channel.send(embed)
        }
      }
    }
  }
}