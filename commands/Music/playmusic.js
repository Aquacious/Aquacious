const discord = require('discord.js'), ytdl = require('ytdl-core')
module.exports = {
  name: "play",
  description: "Play a song in your channel!",
  category:'Music',
  aliases:['p'],
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
    try {
      const queue = client.queue;
      const serverQueue = client.queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(deniedEmbed("You need to be in a voice channel to play music!")).then(x => x.delete({timeout:5000}))
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(deniedEmbed("I need the permissions to join and speak in your voice channel!")).then(x => x.delete({timeout:7000}))
      }
      if (!args[0]) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send(deniedEmbed('You have to be in a voice channel to resume music!')).then(x => x.delete({timeout:5000}))
        if (!serverQueue) return message.channel.send(deniedEmbed('There is no queue to resume!')).then(x => x.delete({timeout:5000}))
        if (!serverQueue.connection.dispatcher.paused) return message.channel.send(deniedEmbed('Song already playing!')).then(x => x.delete({timeout:5000}))
        serverQueue.connection.dispatcher.resume()
        const playingembed = new discord.MessageEmbed()
        .setTitle('Resumed playing!')
        .setColor('RED')
        .setDescription(`${serverQueue.songs[0].title} is now playing!`)
        .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
        .setTimestamp()
        message.channel.send(playingembed)
      }
      if (!serverQueue) message.channel.send('Finding video and joining channel...') 
      else message.channel.send('Finding video and adding to queue...') 
      const songInfo = await ytdl.getInfo(args[0]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        addedByUser: message.author,
      };

      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        const embed = new discord.MessageEmbed()
        .setTitle('Added to queue')
        .setColor('RED')
        .setDescription(`${song.title} has been added to the queue!`)
        .setTimestamp()
        .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
        return message.channel.send(embed);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    if (!serverQueue) return message.channel.send('An unknown error occurred, please try again.')
    
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    const playingembed = new discord.MessageEmbed()
    .setTitle('Started playing!')
    .setColor('RED')
    .setDescription(`${song.title} is now playing!`)
    .setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
    .setTimestamp()
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(playingembed);
  }
};