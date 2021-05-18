module.exports = {
  name:'message',
  execute(client, message) {
    const enmap = require('enmap'), data = new enmap({name:'botdata', dataDir:'./data'})
    var lastperson = data.get('LastPerson')
    if (message.channel.id != '839293490138972160') return
    let content = message.content.toLowerCase()
    if (content.startsWith('gm') || content.startsWith('gn')) {
      if (message.author.id == lastperson) return message.delete()
      lastperson = message.author.id
    } else message.delete()
    data.set('LastPerson', lastperson)
  }
}