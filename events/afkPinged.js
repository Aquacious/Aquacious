const enmap = require('enmap'), data = new enmap({ name: "botdata", dataDir:"./data"}), discord = require('discord.js')
module.exports = {
  name:"message",
  execute() {
    if (!message.mentions.users.first()) return
	  message.mentions.users.forEach(user => {
      // user.id
      let reason = data.get(`user.${user.id}.afk.reason`)
      let msgstamp = (Date.now()/1000).toFixed(0) - (data.get(`user.${user.id}.afk.timestamp`))
      if (!reason || reason == '') return
      const embed = new discord.MessageEmbed()
      .setTitle(`${user.username} is AFK`)
      .setAuthor(user.username, user.avatarURL({dynamic:true}))
      .setDescription(`${reason} \n*${convToDays(msgstamp)} ago...*`)
      .setColor("RED")
      message.channel.send(embed).then(x => {x.delete({timeout:15000})})
	})
  }
}