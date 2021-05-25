const discord = require('discord.js'), sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
module.exports = {
  name:'ban',
  category:'Moderation',
  description:'Ban a user from the server',
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
    if (!message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Ban Members permission.')).then(x => {x.delete({timeout:5000})})
    if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
    if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
    if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
    if (!message.guild.member(message.mentions.users.first()).bannable) return message.channel.send(deniedEmbed(`I'm unable to ban ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
    let banreason = 'No reason specified.'
    if (args[1]) {
      banreason = args.join(' ').slice(args[0].length)
    }
    const banembed = new discord.MessageEmbed()
    .setTitle('Member banned')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was banned')
    .addField('Moderator', message.author.username+'#'+message.author.discriminator)
    .addField('Reason', banreason)
    .setColor('RED')
    .setThumbnail(message.mentions.users.first().avatarURL())
    message.mentions.users.first().send(banembed).catch(err => {message.channel.send('The user could not receive any details about this incident in DMs.')});
    message.channel.send(banembed).then(x => {x.delete({timeout:15000})})
    await sleep(300)
    message.guild.member(message.mentions.users.first()).ban({ days: 7, reason: banreason})
  }
}