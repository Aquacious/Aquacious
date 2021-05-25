const Discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'esnipe',
  category:'Chat',
  cooldown:2,
  description:'Get older message from edited messages! Snipe back further by specifying a value',
  execute(client, message, args) {
    message.delete()
    function deniedEmbed(error) {
      const discord = require('discord.js')
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    const data = new enmap({ name: "botdata", dataDir:"./data"});
    if (!data.get(`guild.${message.guild.id}.snipeSetting`)) { //whether privacy is better kekw
      var snipeSetting = 'Enabled'
    } else {
      var snipeSetting = data.get(`guild.${message.guild.id}.snipeSetting`)
    }
    let historyInt;
    if (!args[0]) historyInt = 0
    else historyInt = parseInt(args[0])
    if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}guildsettings`)).then(z => {z.delete({timeout:6000})})
    const smsg = client.editedMessages.get(message.channel.id);
    if (!smsg) return message.channel.send(deniedEmbed('Could not find any edited messages in this channel.')).then(x => {x.delete({timeout:5000})})
    if (!smsg[historyInt]) return message.channel.send(deniedEmbed('No messages exist in this time frame. Try a little closer to the present!')).then(x => {x.delete({timeout:5000})})
    if (data.get(`user.${smsg[historyInt].author.id}.snipeSetting`) == 'Disabled') return message.channel.send(deniedEmbed(`${smsg[historyInt].author.username} has opted out of sniping.`)).then(x => {x.delete({timeout:5000})})
    if (smsg[historyInt].content) {
      const snipeembed = new Discord.MessageEmbed()
      .setAuthor(smsg[historyInt].author.tag, smsg[historyInt].author.displayAvatarURL({ dynamic: true }))
      .setDescription(smsg[historyInt].content)
      .setColor('BLUE')
      message.channel.send(snipeembed)
    }
  }
}