module.exports = {
  name:'say',
  category:'Fun',
  cooldown:0.1,
  description:'Make me say stupid things i guess',
  execute(client, message, args) {
    if (!args[0]) return
    message.delete()
    if (args.join(' ').includes('@everyone') || args.join(' ').includes('@here')) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
    let SpeechUnsafe = 0
    message.guild.roles.cache.forEach(x => {
      if (args.join(' ').includes(x.id)) SpeechUnsafe = 1
    })
    if (SpeechUnsafe == 1) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
    message.channel.send(args.join(' '))
  }
}