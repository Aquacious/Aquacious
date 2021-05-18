const discord = require("discord.js"), chalk = require('chalk'), enmap = require('enmap'), fs = require("fs"), Discord = require("discord.js"), tokens = require('./token.json'), sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
const client = new Discord.Client({ messageSweepInterval: 60, disableMentions: 'everyone' })
const data = new enmap({ name: "botdata", dataDir:"./data"});
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands')

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.editedMessages = new Discord.Collection();
client.deletedMessages = new Discord.Collection();

try {
  // Load Events
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args))
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args))
    }
    console.log(chalk.hex('#808080')(`Loaded event `)+chalk.hex('#3c850c')(`${file} - ${require(`./events/${file}`).name} event`))
  }

  // Load Commands
  for (const folder of commandFolders) {
    if (folder.endsWith('.js')) {
      console.log(chalk.red(`File (${folder}) not in subdirectory, please move it. File has been ignored.`))
      return
    }
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
      console.log(chalk.hex('#808080')(`Loaded command `)+chalk.hex('#3c850c')(`${file} - ${require(`./commands/${folder}/${file}`).name}`))
    }
  }

} catch (err) {
  async function error(err) {
    console.log(chalk.redBright(err))
    await sleep(3000)
    client.channels.cache.get('835322244128571433').send(deniedEmbed(`The bot failed to load \n${err}`))
    await sleep(200)
    process.exit(0)
  }
  error(err)
}

function deniedEmbed(err) {
  const deniedEmbed = new discord.MessageEmbed()
  .setTitle('Error')
  .setDescription(err)
  .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
  .setColor('RED')
  .setTimestamp();
  return deniedEmbed
}

/*
client.on('guildMemberAdd', (member) => {
  if (data.get(`guild.${member.guild.id}.youthkickAge`) != 'Disabled') {
    console.log((( member.user.createdTimestamp - Date.now())/1000)/86400)
  }
})
*/

client.login(tokens.token)