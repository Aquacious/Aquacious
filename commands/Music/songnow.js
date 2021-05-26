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
    progressArray[Math.round((secondsIntoSong/serverQueue.songs[0].lengthSeconds)*60)] = '🔘'
    let progressbar = progressArray.join('')
    function timeFormatted(secs) {
      let mins = 0
      if (secs/60 >= 1) mins = (secs/60).toFixed(0)
      let seconds = (secs%60).toFixed(0)
      if (seconds == 60) {
        mins = mins+1
        seconds=0
      }
      if (seconds.toString().length == 1) var secondsFinal = `0${seconds}`
      else var secondsFinal = seconds
      let finalStr = `${mins}:${secondsFinal}`
      return finalStr
    }
    const playingembed = new discord.MessageEmbed()
    .setTitle(`Currently Playing`)
    .setColor('BLUE')
    .setURL(`${serverQueue.songs[0].rawSongData.videoDetails.video_url}`)
    .setThumbnail(serverQueue.songs[0].rawSongData.videoDetails.thumbnails[3].url)
    .setDescription(`${serverQueue.songs[0].title}`)
    .addField(`\`${progressbar}\``, `${timeFormatted(secondsIntoSong)} / ${timeFormatted(serverQueue.songs[0].lengthSeconds)}`)
    .setAuthor('Added by '+serverQueue.songs[0].addedByUser.username, `${serverQueue.songs[0].addedByUser.avatarURL({dynamic:true})}?size=1024`)
    .setTimestamp()
		return message.channel.send(playingembed);
	},
};