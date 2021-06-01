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
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Kick Members permission.')).then(x => {x.delete({timeout:5000})})
    if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
    if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
    if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
    if (!(message.guild.members.cache.get(message.author.id).roles.highest.rawPosition >= message.guild.members.cache.get(message.mentions.users.first().id).roles.highest.rawPosition)) return message.channel.send(deniedEmbed('You aren\'t allowed to ban this user')).then(x => {x.delete({timeout:5000})})
    if (message.mentions.users.first() == message.guild.members.cache.get(message.author.id)) return message.channel.send(deniedEmbed('You can\'t do that to yourself!')).then(x => {x.delete({timeout:5000})})
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
    try {message.mentions.users.first().send(kickembed)} catch(err) {message.channel.send('The user could not receive any details in DMs.')}
    message.channel.send(kickembed).then(x => {x.delete({timeout:15000})})
    await sleep(500)
    message.guild.member(message.mentions.users.first()).kick(kickreason)
  }
}