module.exports = {
  name:'voiceStateUpdate',
  execute(client, oldVoice) {
    let guildid = oldVoice.member.guild.id
    const serverQueue = client.queue.get(guildid);
    if (oldVoice.channel && oldVoice.member.user.id == client.user.id && serverQueue) {
      client.queue.delete(guildid)
    }
  }
}