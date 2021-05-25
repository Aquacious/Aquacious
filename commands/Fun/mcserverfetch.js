const discord = require('discord.js'), Discord = require('discord.js'), mcsrv = require('mcsrv')
module.exports = {
  name:'mcfetch',
  category:'Fun',
  description:'Get details of a minecraft server',
  cooldown:30,
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
    if (!args[0]) return message.channel.send(deniedEmbed('No IP address was provided')).then(x => x.delete({timeout:5000}))
    const mcmsg = await message.channel.send("Grabbing data")
    mcmsg.edit('Loading... If this doesn\'t disappear, the fetch failed.') // :'(
    let dldata = NaN;
    try {
      dldata = await mcsrv(args[0])
    } catch {
      return message.channel.send(deniedEmbed('Failed to retrieve data, try again later. \nIf this persists, contact us in the support server.')).then(x => {x.delete({timeout:8000})})
    }
    let lineone = '_ _'
    let linetwo = '_ _'
    let hostname = 'None found'
    if (dldata.motd){
      if (dldata.motd.clean[0]) {
        lineone = dldata.motd.clean[0]
      }
      if (dldata.motd.clean[1]) {
        linetwo = dldata.motd.clean[1]
      }
    }
    if (dldata.hostname) {
      hostname = dldata.hostname
    }
    let players = 'Nobody Online'
    let count = dldata.players.online
    if (dldata.players.list) {
      count = dldata.players.list.length
      dldata.players.list.forEach(item => {
        if (players == 'Nobody Online') {players = `${item}`} else {players = players+`\n${item} `}
      })
    }
    let mcembed = new Discord.MessageEmbed()
    .setColor('#00FFF4')
    .setDescription(`${hostname} Server Status`)
    .addField('Hostname',hostname, true)
    .addField('Version',dldata.version, true)
    .addField('Direct IP',dldata.ip, true)
    .addField('Player Count',count+'/'+dldata.players.max+` currently online`, true)
    .addField('Players Online', players, true)
    .addField('MOTD', `${lineone}\n${linetwo}`, true)
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
    mcmsg.edit('This command uses api.mcsrvstat.us')
    mcmsg.edit(mcembed)
  }
}