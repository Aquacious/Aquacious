const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'beta',
  category:"Miscellaneous",
  hidden:true,
  execute(client, message) {
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (message.author.id != '381538809180848128') return
    if (!message.content.includes(client.user.id)) return
    message.delete()
    data.set(`guild.${message.guild.id}.prefix`, '&')
    message.channel.send(`prefix ${data.get(`guild.${message.guild.id}.prefix`)}`).then(x => {x.delete({timeout:3000})})
  }
}