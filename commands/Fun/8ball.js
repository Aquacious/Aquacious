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
    let eightballmessages = new Array();
    eightballmessages[0] = "No";
    eightballmessages[1] = "Not today";
    eightballmessages[2] = "It is decidedly so";
    eightballmessages[3] = "Without a doubt";
    eightballmessages[4] = "Yes definitely";
    eightballmessages[5] = "You may rely on it";
    eightballmessages[6] = "As I see it yes";
    eightballmessages[7] = "Most likely";
    eightballmessages[8] = "Outlook good";
    eightballmessages[10] = "Signs point to yes";
    eightballmessages[11] = "Reply hazy try again";
    eightballmessages[12] = "Ask again later";
    eightballmessages[13] = "Better not tell you now";
    eightballmessages[14] = "Cannot predict now";
    eightballmessages[15] = "Concentrate and ask again";
    eightballmessages[16] = "Don't count on it";
    eightballmessages[17] = "My reply is no";
    eightballmessages[18] = "My sources say no";
    eightballmessages[19] = "Outlook not so good";
    eightballmessages[20] = "Very doubtful";
    if (!args[0]) return message.channel.send(deniedEmbed('Where question at tho')).then(x => {x.delete({timeout:4000})})
    return message.reply(eightballmessages[Math.floor(Math.random() * eightballmessages.length)]);
  }
}