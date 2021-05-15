const enmap = require('enmap'), data = new enmap({ name: "botdata", dataDir:"./data"}), discord = require('discord.js')
function deniedEmbed(error) {
  const deniedEmbed = new discord.MessageEmbed()
  .setTitle('Error')
  .setDescription(error)
  .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
  .setColor('RED')
  .setTimestamp();
  return deniedEmbed
}
module.exports = {
  name: 'message',
  execute(message, client) {
    if (!message.guild || message.author.bot) return;
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      message.channel.send(deniedEmbed(`The command has errored out. \n${err}`));
    }
  }
}