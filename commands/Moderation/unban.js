const discord = require('discord.js')
module.exports = {
  name:'unban',
  aliases:['pardon'],
  description:'Unban a banned user',
  execute(client, message, args) {
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (!message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Ban Members permission.')).then(x => {x.delete({timeout:5000})})
    if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
    if (args[0].match(/\d+/g) && args[0].length == '848658543179202611'.length && !args[0].match(/.+/g)) {} else return message.channel.send(deniedEmbed('Invalid. Try pinging the user or providing in their ID.')).then(x => {x.delete({timeout:5000})})
    let mention = (args[0].match(/<@!?\d+>/g))
    let unbanID;
    if (!mention) unbanID = args[0]
    else unbanID = (mention[0].match(/\d+/g))[0]
    let banreason = 'No reason specified.'
    if (args[1]) {
      banreason = args.join(' ').slice(args[0].length)
    }
    message.guild.members.unban(unbanID, banreason).catch(e => {
      if (`${e}`.startsWith('DiscordAPIError: Unknown Ban')) message.channel.send(deniedEmbed('This user isn\'t known to be banned')).then(x => {x.delete({timeout:6000})})
      else message.channel.send(deniedEmbed('The user was not unbanned and an error occurred\n'+e)).then(x => {x.delete({timeout:6000})})
      return;
    })
    const unbannedUser = client.users.cache.find(user => user.id == unbanID)
    let banembed;
    if (!unbannedUser) {
      banembed = new discord.MessageEmbed()
      .setTitle('Member unbanned')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField(unbanID, 'was unbanned')
      .addField('Moderator', message.author.username+'#'+message.author.discriminator)
      .addField('Reason', banreason)
      .setColor('GREEN')
      .setFooter('Details are missing :/', 'https://raw.githubusercontent.com/llsc12/Aquacious/main/aicon.gif')
      .setThumbnail('https://raw.githubusercontent.com/llsc12/Aquacious/main/aicon.gif')
    } else if (unbannedUser) {
      banembed = new discord.MessageEmbed()
      .setTitle('Member unbanned')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField(unbannedUser.username+'#'+unbannedUser.discriminator, 'was unbanned')
      .addField('Moderator', message.author.username+'#'+message.author.discriminator)
      .addField('Reason', banreason)
      .setColor('GREEN')
      .setThumbnail(unbannedUser.displayAvatarURL({ dynamic: true }))
    }
    message.channel.send(banembed).then(x => {x.delete({timeout:15000})})
    try {unbannedUser.send(banembed)} catch (err) {message.channel.send('The user could not receive any details about this incident in DMs.')}
  }
}