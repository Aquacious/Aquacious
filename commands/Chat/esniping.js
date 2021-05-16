const Discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'esnipe',
  category:'Chat',
  cooldown:2,
  execute(client, message) {
    message.delete()
    const data = new enmap({ name: "botdata", dataDir:"./data"});
    if (!data.get(`guild.${message.guild.id}.snipeSetting`)) { //whether privacy is better kekw
      var snipeSetting = 'Enabled'
    } else {
      var snipeSetting = data.get(`guild.${message.guild.id}.snipeSetting`)
    }
    if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}guildsettings`)).then(z => {z.delete({timeout:6000})})
    const smsg = client.editedMessages.get(message.channel.id);
    if (!smsg) return message.reply('Could not find any edited messages in this channel.');
    if (data.get(`user.${smsg.author.id}.snipeSetting`) == 'Disabled') return message.channel.send(deniedEmbed(`${smsg.author.username} has opted out of sniping.`)).then(x => {x.delete({timeout:5000})})
    if (smsg.content) {
      const snipeembed = new Discord.MessageEmbed()
      .setAuthor(smsg.author.tag, smsg.author.displayAvatarURL({ dynamic: true }))
      .setDescription(smsg.content)
      .setColor('BLUE')
      message.channel.send(snipeembed)
    }
  }
}