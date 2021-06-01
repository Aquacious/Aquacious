const discord = require('discord.js'), moment = require('moment')
module.exports = {
  name:'userinfo',
  cooldown:1,
  description:'Get details of a user account',
  execute(client, message, args) {
    var userinfocolor = ''
    var referenceduser = message.author
    if (message.mentions.users.first()) referenceduser = message.mentions.users.first()
    var referencedmember = message.guild.member(message.author)
    if (message.mentions.members.first()) referencedmember = message.mentions.members.first()
    switch(referenceduser.presence.status){
      case('online'):
        userinfocolor = 'GREEN'
        break
      case('idle'):
        userinfocolor = 'YELLOW'
        break
      case('dnd'):
        userinfocolor = 'RED'
        break
    }
    var mutualcounter = 0
    client.guilds.cache.forEach(guild => {
      guild.members.cache.forEach(user => {
        if (user.id == referenceduser.id) mutualcounter = mutualcounter + 1
      })
    })
    var userinforoles = new Array()
    referencedmember.roles.cache.forEach(role => {
      if (role.name == '@everyone') return
      if (!userinforoles[0]) userinforoles[0] = `<@&${role.id}>`
      else userinforoles[userinforoles.length] = `<@&${role.id}>`
    })
    if (!userinforoles[0]) userinforoles[0] = `No Roles`
    let count = userinforoles.length
    if (userinforoles.length == 1) {
      if (userinforoles[0] == 'No Roles') count = 0
    }
    const userinfoembed = new discord.MessageEmbed()
    .setAuthor(referenceduser.tag)
    .setDescription('User information')
    .setColor(userinfocolor)
    .setThumbnail(referenceduser.avatarURL()+'?size=1024')
    .addField(`Account Registered Date`, moment(referenceduser.createdAt).format('LLLL'), true)
    .addField(`Account Server Join Date`, moment(referencedmember.joinedAt).format('LLLL'), true)
    .addField(`Online Presence`,referenceduser.presence.status, true)
    .addField(`Roles \[${count}\]`, `${userinforoles.join(" ")}`,true)
    .addField(`Account Identification`, `${referenceduser.tag} \n${referenceduser.id}`, true)
    .addField(`Bot Mutual Servers`, mutualcounter, true)
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(userinfoembed)
  }
}