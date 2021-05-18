const discord = require('discord.js'), enmap = require('enmap'), fs = require('fs')
module.exports = {
  name:'reload',
  category:"Miscellaneous",
  hidden:true,
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
    if (!args[0]) {
      const embed = new discord.MessageEmbed()
      .setTitle('Reload Modules')
      .setDescription('Reload Aqua modules')
      .addField('all', 'Reloads all modules',true)
      .addField('<command name>', 'Reload a specified command',true)
      .setColor('BLUE')
      .setFooter('Modules are automatically reloaded every few hours',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      return message.channel.send(embed)
    }
    if (message.author.id !== '381538809180848128') return message.channel.send(deniedEmbed('I\'m afraid only developers can use this command.')).then(x => {x.delete({timeout:5000})})
    if (args[0].toLowerCase() == 'all') {
      let log = new Array()
      log[0] = 'Finding modules'
      let embed;
      embed = new discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('RELOADING ALL COMMANDS')
      .setDescription(log.join("\n"))
      .setTimestamp()
      .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      let msg = await message.channel.send(embed)
      const commandFolders = fs.readdirSync('./commands')
      try {
        for (const folder of commandFolders) {
          if (folder.endsWith('.js')) {
            log[log.length] = `File (${folder}) not in subdirectory, please move it. File has been ignored.`
            return
          }
          const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
          for (const file of commandFiles) {
            const command = require(`./../${folder}/${file}`);
            client.commands.set(command.name, command);
            log[log.length] = `Loaded command **${'./commands/'+folder+'/'+file}**`
          }
        }
        log[log.length] = '\n**Finished reloading!**'
      } catch (err) {
        log[log.length] = '\n**Failed to reload**'
        log[log.length] = err
      }
      embed = new discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('RELOADING ALL COMMANDS')
      .setDescription(log.join("\n"))
      .setTimestamp()
      .setFooter('Aquacious',`https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
      msg.edit(embed)
    }
  }
}