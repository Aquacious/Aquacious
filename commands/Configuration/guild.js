const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'guildprefs',
  category:'Configuration',
  description:'Settings for this guild',
  aliases:['guildsettings'],
  execute(client, message, args) {
    const data = new enmap({name:"botdata", dataDir:'./data'})
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
    if (!args[0]) {
      const embed = new discord.MessageEmbed()
      .setTitle('Guild Preferences')
      .setURL('https://discord.gg/TRc3vENjCW')
      .setDescription('Settings for this guild!')
      .setColor('BLUE')
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .addField('Prefix', prefix)
      .addField('NSFW', nsfwSetting)
      .addField('Sniping', snipeSetting)
      //.addField('YouthKick', `${youthkickAge}`)
      //.addField('Members')
      .setFooter(`Do ${prefix}${command} <help | modify> <setting> [config]`)
      message.channel.send(embed)
    } else if (args[1]) {

      const setting = args[1].toLowerCase()
      const executing = args[0].toLowerCase()
      
      if (executing == 'modify') {
        if (!message.member.hasPermission('ADMINISTRATOR', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('Only server administrators can change guild settings')).then(x => {x.delete({timeout:5000})})
        if (setting == 'prefix') {
          if (!args[2]) return message.channel.send(deniedEmbed(`No prefix was provided. \nThe current prefix for this guild is ${prefix}`)).then(x => {x.delete({timeout:4000})})
          data.set(`guild.${message.guild.id}.prefix`, args[2])
          const embed = new discord.MessageEmbed()
          .setTitle('Success!')
          .setColor('GREEN')
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`This guild's prefix is now ${data.get(`guild.${message.guild.id}.prefix`)}`)
          message.channel.send(embed)
        }

        if (setting == 'sniping') {
          if (args[2].toLowerCase() == 'disabled') {
            data.set(`guild.${message.guild.id}.snipeSetting`,'Disabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`Sniping is now disabled. ${prefix}snipe and ${prefix}esnipe is no longer usable.`)
            message.channel.send(embed)
          }

          if (args[2].toLowerCase() == 'enabled') {
            data.set(`guild.${message.guild.id}.snipeSetting`,'Enabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`Sniping is now enabled. ${prefix}snipe and ${prefix}esnipe are available now.`)
            message.channel.send(embed)
          }
        }

        if (setting == 'youthkick') {
          if (args[2].toLowerCase() == 'disabled') {
            data.set(`guild.${message.guild.id}.youthkickAge`,'Disabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`Youth Kick will no longer kick new user accounts.`)
            message.channel.send(embed)
          } else if (parseInt(args[2]) >= 1 && parseInt(args[2]) <= 14) {
            data.set(`guild.${message.guild.id}.youthkickAge`,parseInt(args[2]))
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`Youth Kick will now kick any user accounts that are younger than ${data.get(`guild.${message.guild.id}.youthkickAge`)} days!`)
            message.channel.send(embed)
          } else return message.channel.send(deniedEmbed('Invalid day count. Set this to Disabled or a number within 1 to 14.'))
        }

        if (setting == 'nsfw') {
          if (args[2].toLowerCase() == 'disabled') {
            data.set(`guild.${message.guild.id}.nsfwSetting`,'Disabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`All NSFW commands are disabled in this server!`)
            message.channel.send(embed)
          }

          if (args[2].toLowerCase() == 'enabled') {
            data.set(`guild.${message.guild.id}.nsfwSetting`,'Enabled')
            const embed = new discord.MessageEmbed()
            .setTitle('Success!')
            .setColor('GREEN')
            .setDescription(`All NSFW commands are enabled in this server!`)
            message.channel.send(embed)
          }
        }
      } else if (executing == 'help') {
        if (setting == 'prefix') {
          const embed = new discord.MessageEmbed()
          .setTitle('Prefix')
          .setColor('GREEN')
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Changes this guild's prefix. It is currently set to ${prefix}`)
          message.channel.send(embed)
        }

        if (setting == 'sniping') {
          const embed = new discord.MessageEmbed()
          .setTitle('Sniping')
          .setColor('GREEN')
          .setDescription(`Disable this to keep some degree of privacy.`)
          message.channel.send(embed)
        }

        if (setting == 'nsfw') {
          const embed = new discord.MessageEmbed()
          .setTitle('NSFW')
          .setColor('GREEN')
          .setDescription(`This lets you disable any kind of NSFW commands server-wide.`)
          message.channel.send(embed)
        }
      }
    }
  }
}