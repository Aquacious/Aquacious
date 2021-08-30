const discord = require('discord.js'), sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
module.exports = {
  name:'kick',
  description:'Kick a user from the server',
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
    let offender = message.guild.members.cache.find(user => user.id == args[0].match(/^<@!?(\d+)>$/)[1])
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Kick Members permission.')).then(x => {x.delete({timeout:5000})})
    if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
    if (!offender) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
    if (message.author.id !== message.guild.ownerID) if (!(message.member.roles.highest.rawPosition >= offender.roles.highest.rawPosition)) return message.channel.send(deniedEmbed('You aren\'t allowed to kick this user')).then(x => {x.delete({timeout:5000})})
    if (offender == message.member) return message.channel.send(deniedEmbed('You can\'t do that to yourself!')).then(x => {x.delete({timeout:5000})})
    if (!offender.kickable) return message.channel.send(deniedEmbed(`I'm unable to kick ${offender.username}.`)).then(x => {x.delete({timeout:5000})})
    let kickreason = 'No reason specified.'
    if (args[1]) {
      kickreason = args.join(' ').slice(args[0].length)
    }

    const kickembed = new discord.MessageEmbed()
    .setTitle('Member kicked')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .addField(offender.user.username+'#'+offender.user.discriminator, 'was kicked')
    .addField('Moderator', message.author.username+'#'+message.author.discriminator)
    .addField('Reason', kickreason)
    .setColor('RED')
    .setThumbnail(offender.user.displayAvatarURL({ dynamic: true }))
    try {offender.send(kickembed)} catch(err) {message.channel.send('The user could not receive any details in DMs.')}
    message.channel.send(kickembed).then(x => {x.delete({timeout:15000})})
    await sleep(500)
    offender.kick(kickreason)
  }
}