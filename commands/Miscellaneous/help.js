const discord = require('discord.js'), fs = require('fs')
module.exports = {
	name: 'help',
	description: 'Advanced Dynamic Help Command (ADHC)',
	execute(client, message, args) {
    if (!args[0]) {
      const helpEmbed = new discord.MessageEmbed()
      .setTitle('Help Menu')
      .setDescription(`Showing directory *\`./commands/\`*\n\n***${fs.readdirSync('./commands/').join('\n')}***`)
      .setThumbnail(`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      .setColor('BLUE')
      .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
  
      message.delete({timeout:3000})
      message.channel.send(`Help Menu ${message.author.id} Home`).then(async x => {
        message.react('👍')
        x.edit(helpEmbed)
        await x.react("◀️")
        await x.react("▶️")
        await x.react("🏠")
        await x.react("⏹")
      })
    }/*else {
      const searchTerms = args.join(' ')
      let searchResults = new Array()
      let categoryDirectories = new Array()
      fs.readdirSync('./commands').forEach(c => categoryDirectories[categoryDirectories.length] = c)
      categoryDirectories.forEach(categoryName => {
        cmdFileNames = fs.readdirSync(`./commands/${categoryName}`)
        cmdFileNames.forEach(cmdName => {
          let cmd = require(`./../${categoryName}/${cmdName}`)
          if (cmd.name.includes(searchTerms)) return searchResults[searchResults.length] = cmd 
          if (cmd.description) if (cmd.description.includes(searchTerms)) return searchResults[searchResults.length] = cmd
        })
      })
      let names = new Array()
      searchResults.forEach(x=>names[names.length]=x.name)
      
      let selectMsg = await message.channel.send(
        new discord.MessageEmbed()
        .setTitle()
      )
      try {
        response = await message.channel.awaitMessages(msg => 0 < parseInt(msg.content) && parseInt(msg.content) < names.slice(0,10).length+1 && msg.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
      } catch(e) {
        return message.channel.send("Video selection timed out.")
      }
    }
    */
	},
};