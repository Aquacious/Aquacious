const discord = require('discord.js'), sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
module.exports = {
  name:'kick',
  category:'Moderation',
  description:'Kick a user from the server',
  async execute(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Kick Members permission.')).then(x => {x.delete({timeout:5000})})
    if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
    if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
    if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
    if (!message.guild.member(message.mentions.users.first()).kickable) return message.channel.send(deniedEmbed(`I'm unable to kick ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
    let kickreason = 'No reason specified.'
    if (args[1]) {
      kickreason = args.join(' ').slice(args[0].length)
    }
    const kickembed = new discord.MessageEmbed()
    .setTitle('Member kicked')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was kicked')
    .addField('Moderator', message.author.username+'#'+message.author.discriminator)
    .addField('Reason', kickreason)
    .setColor('RED')
    .setThumbnail(message.mentions.users.first().avatarURL())
    message.mentions.users.first().send(kickembed).catch(err => {message.channel.send('The user could not receive any details in DMs.')})
    message.channel.send(kickembed).then(x => {x.delete({timeout:15000})})
    await sleep(500)
    message.guild.member(message.mentions.users.first()).kick(kickreason)
  }
}