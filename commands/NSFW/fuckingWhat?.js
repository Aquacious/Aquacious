const discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'fuck',
  aliases:['sex'],
  hidden:true,
  cooldown:10,
  searchable:true,
  description:'why tf did i make this shit',
  usage:'fuck <mention>',
  execute(client, message, args) {
    //kill me
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //whether nsfw is allowed
      var nsfwSetting = 'Enabled'
    } else {
      var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
    }
		if (nsfwSetting == 'Disabled') return message.channel.send(deniedEmbed(`NSFW is disabled entirely in this guild`)).then(d => {d.delete({timeout:5000})})
    if (message.channel.topic) {
      if (!message.channel.topic.includes('NSFW')) {
        if (!message.channel.nsfw) return;
      }
    } else if (!message.channel.nsfw) return;

    if (!message.mentions.users.first()) return message.channel.send('congrats you found this command, make sure to ping someone tho')
    let victim = message.mentions.users.first() 
    let fuckarray = new Array()
    fuckarray[fuckarray.length] = `you slowly undress ${victim.username}, you sit them down and blow them off. then you get on your bed and invite them over for rough anal sex, resulting in cum-stained bedsheets`
    fuckarray[fuckarray.length] = `you take off your thigh high socks and then violently pull down ${victim.username}'s shorts, you sit them down and play with their cock using your feet. then you get on your bed and invite them over. ${victim.username}'s dick goes straight into your pussy snugly.`
    fuckarray[fuckarray.length] = `${victim.username} pulls you in and kisses you for an entire 15 seconds, you give in and go with it. ${victim.username} then drags you onto the couch and you release your big dick energy into their tight pussy`
    message.channel.send(fuckarray[Math.floor(Math.random() * fuckarray.length)])
  }
}