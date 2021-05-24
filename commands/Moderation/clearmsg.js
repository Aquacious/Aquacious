module.exports = {
  name:'clear',
  aliases:['cl', 'purge'],
  description:'Clear messages from chat',
  cooldown:2,
  category:'Moderation',
  execute(client, message, args) {
    function repeat(func, times) {
      func();
      times && --times && repeat(func, times);
    }
    function deniedEmbed(error) {
      const discord = require('discord.js')
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(error)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
      if (args[0] >= 301) return message.channel.send(deniedEmbed('You may only delete up to 300 messages at once.')).then(x => {x.delete({timeout:5000})})
      if (args[0] <= 0) return message.channel.send(deniedEmbed('You may only delete a minimum of 1 message.')).then(x => {x.delete({timeout:5000})})
      if (!args[0]) return message.channel.send(deniedEmbed('Invalid quantity. Choose a value between 1 and 300')).then(x => {x.delete({timeout:5000})})
      let leftoverclear = ((parseInt(args[0])+1) % 100)
      let repeatclear = ((parseInt(args[0])+1)/100).toFixed(0)
      if (repeatclear != 0) repeat(function () { message.channel.bulkDelete(100) }, repeatclear);
      message.channel.bulkDelete(leftoverclear)
      message.channel.send(`Cleared ${parseInt(args[0])} messages!`).then(msg => {msg.delete({timeout:4000})})
    } else return message.channel.send(deniedEmbed('You do not have the Manage Messages permission.')).then(deleted => deleted.delete({timeout:4000}))
  }
}