const discord = require('discord.js')
module.exports = {
  name:"volume",
  category:'Music',
  description:'Change stream volume',
  aliases:['vol'], 
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
  function volEmbed(vol, now) {
    const progressArray = new Array()
    progressArray[0] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'
    progressArray[progressArray.length] = '▬'

    if (vol) progressArray[parseInt((vol/10).toFixed(0)-1)] = '🔘'
    if (vol < 10) progressArray.unshift('🔘')
    if (!now) var txt = ''
    else var txt = 'now '
    const volEmbed = new discord.MessageEmbed()
    .setTitle(`The volume is ${txt}${vol}%`)
    .setDescription(progressArray.join(''))
    .setColor('BLUE')
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    return volEmbed
  }
  if (!message.member.voice.channel) return message.channel.send(deniedEmbed("You are not in a voice channel!")).then(x => {x.delete({timeout:4000})})

  const serverQueue = client.queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send(deniedEmbed("There is nothing playing right now!"))
  if (!args[0]) return message.channel.send(volEmbed(serverQueue.volume))

  const volume = parseInt(args[0])
  if (!volume || volume > 100) return message.channel.send("Invalid volume level, pick a number between 1 and 100!")

  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 250);
  return message.channel.send(volEmbed(serverQueue.volume, 'a'))
  }
}