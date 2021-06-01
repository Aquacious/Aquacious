const discord = require('discord.js'), fs = require('fs'), enmap = require('enmap'), data = new enmap({ name: "botdata", dataDir:"./data"});
module.exports = {
  name:"messageReactionAdd",
  execute(client, reaction, user) {
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (reaction.message.content.includes("Help Menu ") && reaction.message.author == client.user && user != client.user) {
      reaction.users.remove(user.id)
      if (!reaction.message.content.slice('Help Menu '.length, `Help Menu ${user.id} `.length).includes(user.id)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
      const helpEmbed = new discord.MessageEmbed()
      .setTitle('Help Menu')
      .setDescription(`Showing directory *\`./commands/\`*\n\n***${fs.readdirSync('./commands/').join('\n')}***`)
      .setThumbnail(`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      .setColor('BLUE')
      .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
  
      if (!data.get(`guild.${reaction.message.guild.id}.prefix`)) { //prefix
        var prefix = '!'
      } else {
        var prefix = data.get(`guild.${reaction.message.guild.id}.prefix`)
      }
      let rawDirectory = fs.readdirSync('./commands')
      let directory = new Array()
      rawDirectory.forEach(n => directory[directory.length] = n)
      directory.unshift('Home')
      let currentPage = reaction.message.content.slice(`Help Menu ${user.id} `.length)
      if (reaction.emoji.name == '◀️') var nextPage = directory[directory.indexOf(currentPage)-1]
      if (reaction.emoji.name == '▶️') var nextPage = directory[directory.indexOf(currentPage)+1]
      if (reaction.emoji.name == '🏠') var nextPage = directory[0]

      if (nextPage !== 'Home' && nextPage !== undefined) {
        let workingDirectory = fs.readdirSync(`./commands/${nextPage}/`)
        var cmdsText = new Array()
        if (!workingDirectory[0]) cmdsText[0] = `A tumbleweed tumbles...\n\nThis category seems to be empty.\nCheck back later maybe?\n`
        else workingDirectory.forEach(fileName => {
          command = require(`./../commands/${nextPage}/${fileName}`)
          if (command.hidden) return
          cmdsText[cmdsText.length] = `**${prefix}${command.name}**\n${command.description}`
        })
        var nextPageEmbed = new discord.MessageEmbed()
        .setTitle('Help Menu')
        .setDescription(`Showing directory *\`./commands/${nextPage}\`*\n\n${cmdsText.join('\n')}`)
        .setThumbnail(`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
        .setColor('BLUE')
        .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)    
      } else {
        var nextPageEmbed = helpEmbed
        nextPage = 'Home'
      }

      let embed = nextPageEmbed
      reaction.message.edit('Help Menu '+user.id+` ${nextPage}`)
      reaction.message.edit(embed)

    }
  }
}