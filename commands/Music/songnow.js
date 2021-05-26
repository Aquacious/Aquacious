const discord = require('discord.js')
module.exports = {
	name: 'nowplaying',
	description: 'Get the song that is playing.',
  category:'Music',
  aliases:['np'],
	execute(client, message) {
		const serverQueue = client.queue.get(message.guild.id);
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
		if (!serverQueue) return message.channel.send(deniedEmbed('There is nothing playing.')).then(x => x.delete({timeout:5000}))
    const dispatcher = serverQueue.connection.player.dispatcher
    let secondsIntoSong = dispatcher.streamTime/1000
    let progressArray = new Array()
    progressArray[1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[progressArray.length+1] = '▬'
    progressArray[Math.round((secondsIntoSong/serverQueue.songs[0].lengthSeconds)*15)] = '🔘'
    let progressbar = progressArray.join('')
    let currentMins = 0
    if ((secondsIntoSong/60).toFixed(0)) currentMins = (secondsIntoSong/60).toFixed(0)
    let currentSecs = (secondsIntoSong - (currentMins*60)).toFixed(0)
    if (currentSecs < 10) currentSecs = `0${currentSecs}`
    let totalMins = 0
    if ((serverQueue.songs[0].lengthSeconds/60).toFixed(0)) totalMins = (serverQueue.songs[0].lengthSeconds/60).toFixed(0)
    let totalSecs = (serverQueue.songs[0].lengthSeconds - (totalMins*60)).toFixed(0)
    if (totalSecs < 10) totalSecs = `0${totalSecs}`
    console.log(`${currentMins}:${currentSecs}/${totalMins}:${totalSecs}`)
    const playingembed = new discord.MessageEmbed()
    .setTitle(`Currently Playing`)
    .setColor('BLUE')
    .setDescription(`${serverQueue.songs[0].title}`)
    .addField(`\`${progressbar}\``, `${currentMins}:${currentSecs}/${totalMins}:${totalSecs}`)
    .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
    .setTimestamp()
		return message.channel.send(playingembed);
	},
};