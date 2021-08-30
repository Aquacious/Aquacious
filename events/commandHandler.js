const Discord = require('discord.js'), discord = require('discord.js'), enmap = require('enmap')
module.exports = {
  name:'message',
  execute(client, message) {
    if (!message.guild || message.author.bot) return;
    const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.prefix`)) {
      var prefix = '!'
    } else {
      var prefix = data.get(`guild.${message.guild.id}.prefix`)
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(/ +/)
    let commandName = args.shift().toLowerCase()
    //message.content.slice(prefix.length).split(" ").shift().toLowerCase()

    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.permissions) {

      let errors = new Array()

      for (permission of command.permissions) {
        if (permission.name == "IS_OWNER") {
          if (message.author.id == message.guild.ownerID) {
          } else {
            errors.push(permission)
          }
        }
        else {
          if (message.guild.members.cache.find(member => member.id == message.author.id).hasPermission(permission.name)) {
          } else {
            errors.push(permission)
          }
        }
      }

      console.log(errors.length)

      if (errors.length !== 0) {
        // hmm someone doesnt seem to have permissions!!

        let permsembed = new discord.MessageEmbed()
        .setTitle('Insufficient permissions')
        .setDescription('You don\'t have the valid permissions to use this command!')
        .setColor("RED")
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic:true}))

        errors.forEach(perm => {
          if (!perm.error) perm.error = "We aren't sure why you need this permission, but the command asked for it!"
          permsembed.addField(perm.name, perm.error, true)
        });

        message.channel.send(permsembed)

        return
      }
    }

    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0.5) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(`\`${prefix+commandName}\` on cooldown for ${timeLeft.toFixed(1)} more second(s)`).then(x => {x.delete({timeout:3000})})
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      if (!data.get('cmdCounterTotal')) data.set('cmdCounterTotal',0)
      try {data.set('cmdCounterTotal', parseInt(data.get('cmdCounterTotal'))+1)} catch (e) {console.log('Can no longer store commands!')}
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      message.channel.send(deniedEmbed(`Command faced an error \n*${err}*`));
    }
  }
}