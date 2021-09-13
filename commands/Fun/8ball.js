const discord = require('discord.js')
module.exports = {
  name:'8ball',
  description:'Ask this random ball a question and apparently you get answers',
  cooldown:2,
  execute(client, message, args) {
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
    //THIS IS HOW YOU use array
    let eightballmessages = [
      "No", "Not today", "It is decidedly so", "Without a doubt",
      "Yes definitely", "You may rely on it", "As I see it yes",
      "Most likely", "Outlook good", "Signs point to yes",
      "Reply hazy try again", "Ask again later", "Better not tell you now",
      "Cannot predict now", "Concentrate and ask again",
      "Don't count on it", "My reply is no", "My sources say no",
      "Outlook not so good", "Very doubtful"
    ];
    if (!args[0]) return message.channel.send(deniedEmbed('Where question at tho')).then(x => {x.delete({timeout:4000})})
    return message.reply(eightballmessages[Math.floor(Math.random() * eightballmessages.length)]);
  }
}