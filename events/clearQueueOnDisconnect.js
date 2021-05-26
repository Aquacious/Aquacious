const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

module.exports = {
  name:'voiceStateUpdate',
  execute(client, oldVoice) {
    let guildid = oldVoice.member.guild.id
    const serverQueue = client.queue.get(guildid);
    if (oldVoice.channel && oldVoice.member.user.id == client.user.id && serverQueue) {
      client.queue.delete(guildid)
    }
    if (!oldVoice.guild.channels.cache.get(oldVoice.channelID)) return
    members = oldVoice.guild.channels.cache.get(oldVoice.channelID).members.map(users => users.user.id)
    if (members[0] == client.user.id && members.length == 1) {
      const serverQueue = client.queue.get(oldVoice.guild.id);
      try {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
      } catch(e) {}
    }
  }
}