const enmap = require('enmap'), discord = require('discord.js')
module.exports = {
  name:"message",
  execute(client, message) {
    function convToDays(totalSeconds) { // Monotrix made this, thanks!
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      let daysText = (days == 1 ? "day" : "days");
      let hoursText = (hours == 1 ? "hour" : "hours");
      let minutesText = (minutes == 1 ? "minute" : "minutes");
      let daysFinal = (days >= 1 ? days + " " + daysText + ", " : "");
      let hoursFinal = (hours >= 1 ? hours + " " + hoursText + ", " : "");
      let minutesFinal = (minutes >= 1 ? minutes + " " + minutesText + " and " : "");
      let finished = `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`;
      return finished;
    }
    if (!message.mentions.users.first()) return
    const data = new enmap({name:'botdata', dataDir:'./data'})
	  message.mentions.users.forEach(user => {
      // user.id
      let reason = data.get(`user.${user.id}.afk.reason`)
      let msgstamp = (Date.now()/1000).toFixed(0) - (data.get(`user.${user.id}.afk.timestamp`))
      if (!reason || reason == '') return
      const embed = new discord.MessageEmbed()
      .setTitle(`${user.username} is AFK`)
      .setAuthor(user.username, user.avatarURL({dynamic:true}))
      .setDescription(`${reason}\n\n*${convToDays(msgstamp)} ago...*`)
      .setColor("RED")
      message.channel.send(embed).then(x => {x.delete({timeout:15000})})
	})
  }
}