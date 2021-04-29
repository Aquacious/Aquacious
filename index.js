const discord = require("discord.js"), enmap = require('enmap'), fs = require("fs"), Discord = require("discord.js"), si = require('systeminformation'), nodeOS = require('os'), fetch = require('node-fetch'), mcsrv = require('mcsrv'), statusfile = require('./status.json')
const client = new Discord.Client({ 
  messageSweepInterval: 60, 
  disableEveryone: true
}) // Create a client

const { token } = require('./token.json')
const botfacts = require('./botfacts.json');
const data = new enmap({ name: "botdata"});
var suggestions = 'a'
const cross = 'https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461'

client.on('ready', () => {
	suggestions = client.channels.cache.get("834895513496715344")
	if (statusfile[Math.floor(Math.random() * statusfile.length)].url) {
		client.user.setPresence({
			status: 'dnd',
			activity: {
				name: statusfile[Math.floor(Math.random() * statusfile.length)].name,
				type: statusfile[Math.floor(Math.random() * statusfile.length)].type,
				url: statusfile[Math.floor(Math.random() * statusfile.length)].url
			}
		})
	} else {
		client.user.setPresence({
			status: 'dnd',
			activity: {
				name: statusfile[Math.floor(Math.random() * statusfile.length)].name,
				type: statusfile[Math.floor(Math.random() * statusfile.length)].type
			}
		})
	}
	setInterval(() => {
		let now = statusfile[Math.floor(Math.random() * statusfile.length)]
		if (now.url) {
			client.user.setPresence({
				status: 'dnd',
				activity: {
					name: now.name,
					type: now.type,
					url: now.url
				}
			})
		} else {
			client.user.setPresence({
				status: 'dnd',
				activity: {
					name: now.name,
					type: now.type
				}
			})
		}
	}, 15000)
});

client.on("message", async message => { //commands
  //get prefix
  if (!message.guild || message.author.bot) return
  if (!data.get(`${message.guild.id}.prefix`)) {
    var prefix = '!'
  } else {
    var prefix = data.get(`${message.guild.id}.prefix`)
  }
    //get nsfw enabled status
  if (!data.get(`${message.guild.id}.nsfwSetting`)) {
    var nsfwSetting = 'Enabled'
  } else {
    var nsfwSetting = data.get(`${message.guild.id}.nsfw`)
  }
  	//get privacy invasive shit idk
  if (!data.get(`${message.guild.id}.snipeSetting`)) {
    var snipeSetting = 'Enabled'
  } else {
    var snipeSetting = data.get(`${message.guild.id}.snipeSetting`)
  }

  if (!message.content.startsWith(prefix)) return;

  const helpEmbed = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Here is all I have to offer!')
		.setColor('BLUE')
		.addField(`${prefix}hentai`, `Can be shortened to ${prefix}h, do ${prefix}hentai help`)
		.addField(`${prefix}settings`, `${prefix}preferences too. Has help instructions.`)
		.addField(`${prefix}credits`, `${prefix}about also works, thanks everyone who helped!`)
		.addField(`${prefix}botfact`, `Get a random message about bot development. Can include rage from devs or fun facts!`)
		.addField(`${prefix}links`, `Aliases include ${prefix}link ${prefix}invite ${prefix}github. Posts links to important stuff.`)
		.addField(`${prefix}suggest`, `Use this to post suggestions to Aquacious Support`)
		.addField(`${prefix}snipe`, `Get the most recently deleted message. Can be disabled`)
		.addField(`${prefix}esnipe`, `Get the most recently edited message. Can be disabled`)
		.addField(`${prefix}say`, `Make me say stupid stuff i guess`)
		.addField(`${prefix}clear`, `Alias is ${prefix}cl. Bulk delete messages.`)
		.addField(`${prefix}ping`, `Get bot ping.`)
		.addField(`${prefix}minesweeper`, `Alias is ${prefix}ms. Do ${prefix}ms help`)
		.addField(`${prefix}system`, `Aliases include ${prefix}sysstat ${prefix}sysstats ${prefix}sysinfo. Get server and process info.`)
		.addField(`${prefix}8ball`, `Ask the 8ball a question!`)
		.addField(`${prefix}mcfetch`, `Get data from a minecraft server IP.`)
		.addField(`${prefix}emojisteal`, `Add emojis to your server with nitro!`)
		.addField(`${prefix}kick`, `Kick people, reasons supported`)
		.addField(`${prefix}ban`, `Ban people, reasons supported`)

  // Le command handler :)
  let args = message.content.slice(prefix.length).split(" ");
  let command = args.shift().toLowerCase();

    if (command == 'hentai' || command == 'h') {
	  if (nsfwSetting == 'Disabled') return message.channel.send(deniedEmbed(`NSFW is disabled entirely in this guild`)).then(d => {d.delete({timeout:5000})})
      if (message.channel.topic) {
        if (!message.channel.topic.includes('NSFW')) {
          if (!message.channel.nsfw) {
            let nembed = new discord.MessageEmbed()
            .addField('bruh, think about the children','If this was supposed to work, mark channel to NSFW or include NSFW in channel topic')
            .setColor('GREEN')
			.setTimestamp()
            .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
            message.channel.send(nembed)
            return;
          }
        }
      } else if (!message.channel.nsfw) {
        let nembed = new discord.MessageEmbed()
        .addField('bruh, think about the children','If this was supposed to work, mark channel to NSFW or include NSFW in channel topic')
        .setColor('GREEN')
		.setTimestamp()
        .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(nembed)
        return;
      }
      
      if (args[0] == 'help') {
        let nembed = new discord.MessageEmbed()
        .setTitle('Help Menu')
        .setColor('RED')
        .addField('Syntax', `${prefix}hentai [optional:args] \n${prefix}h [optional:args]  {This is an alias}`)
        .addField('Here are valid arguments', String(valid))
		.setTimestamp()
        .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(nembed)
        return;
      }
      
      if (!args[0]) {
        args = ['tits']
      }
      if (args[0]) {
        var n = valid.includes(args[0])
        if (n == false) {
          let nembed = new discord.MessageEmbed()
          .setTitle('Invalid argument')
          .setColor('RED')
          .addField(`Use ${prefix}hentai help`,'_ _')
		  .setTimestamp()
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
          return;
        }
      }
      fetch(`https://nekos.life/api/v2/img/${args[0]}`)
        .then(res => res.json())
        .then(json => {
          let nembed = new discord.MessageEmbed()
          .setTitle(args[0])
          .setURL(json.url)
          .setImage(json.url)
          .setColor('BLUE')
		  .setTimestamp()
          .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(nembed)
        });
    }

	if (command == 'help') {
		message.author.send(helpEmbed).then(x => {message.react('👍')})
	}

    if (command == 'settings' || command == 'preferences') {
		if (!args[0]) {
			const embed = new discord.MessageEmbed()
			.setTitle('Guild Preferences')
			.setURL('https://discord.gg/TRc3vENjCW')
			.setDescription('Settings for this guild!')
			.setColor('BLUE')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.addField('Prefix', prefix)
			.addField('NSFW', nsfwSetting)
			.addField('Sniping', snipeSetting)
			.setFooter(`Do ${prefix}${command} <help | modify> <setting> [config]`)
			message.channel.send(embed)
		} else if (args[1]) {

			const setting = args[1].toLowerCase()
			const executing = args[0].toLowerCase()
			
			if (executing == 'modify') {
				if (!message.member.hasPermission('ADMINISTRATOR', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('Only server administrators can change guild settings')).then(x => {x.delete({timeout:5000})})
				if (setting == 'prefix') {
					if (!args[2]) return message.channel.send(deniedEmbed(`No prefix was provided. \nThe current prefix for this guild is ${prefix}`)).then(x => {x.delete({timeout:4000})})
					data.set(`${message.guild.id}.prefix`, args[2])
					const embed = new discord.MessageEmbed()
					.setTitle('Success!')
					.setColor('GREEN')
					.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`This guild's prefix is now ${data.get(`${message.guild.id}.prefix`)}`)
					message.channel.send(embed)
				}

				if (setting == 'sniping') {
					if (args[2].toLowerCase() == 'disabled') {
						data.set(`${message.guild.id}.snipeSetting`,'Disabled')
						const embed = new discord.MessageEmbed()
						.setTitle('Success!')
						.setColor('GREEN')
						.setDescription(`Sniping is now disabled. ${prefix}snipe and ${prefix}esnipe is no longer usable.`)
						message.channel.send(embed)
					}

					if (args[2].toLowerCase() == 'enabled') {
						data.set(`${message.guild.id}.snipeSetting`,'Enabled')
						const embed = new discord.MessageEmbed()
						.setTitle('Success!')
						.setColor('GREEN')
						.setDescription(`Sniping is now enabled. ${prefix}snipe and ${prefix}esnipe are available now.`)
						message.channel.send(embed)
					}
				}


				if (setting == 'nsfw') {
					if (args[2].toLowerCase() == 'disabled') {
						data.set(`${message.guild.id}.nsfwSetting`,'Disabled')
						const embed = new discord.MessageEmbed()
						.setTitle('Success!')
						.setColor('GREEN')
						.setDescription(`All NSFW commands are disabled in this server!`)
						message.channel.send(embed)
					}

					if (args[2].toLowerCase() == 'enabled') {
						data.set(`${message.guild.id}.nsfwSetting`,'Enabled')
						const embed = new discord.MessageEmbed()
						.setTitle('Success!')
						.setColor('GREEN')
						.setDescription(`All NSFW commands are enabled in this server!`)
						message.channel.send(embed)
					}
				}
			} else if (executing == 'help') {
				if (setting == 'prefix') {
					const embed = new discord.MessageEmbed()
					.setTitle('Prefix')
					.setColor('GREEN')
					.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`Changes this guild's prefix. `)
					message.channel.send(embed)
				}

				if (setting == 'sniping') {
					const embed = new discord.MessageEmbed()
					.setTitle('Sniping')
					.setColor('GREEN')
					.setDescription(`Disable this to keep some degree of privacy.`)
					message.channel.send(embed)
				}

				if (setting == 'nsfw') {
					const embed = new discord.MessageEmbed()
					.setTitle('NSFW')
					.setColor('GREEN')
					.setDescription(`This lets you disable any kind of NSFW commands server-wide.`)
					message.channel.send(embed)
				}
			}
		}
    }

	if (command == 'about' || command == 'credits') {
		const embed = new discord.MessageEmbed()
		.setTitle('Credits')
		.setURL('https://discord.gg/TRc3vENjCW')
		.setColor('#1abc9c')
		.setDescription('Thanks to all the lovely people below, this bot was born!')
		.addField('**Lead Developer**', 'llsc12')
		.addField('**Developer**', 'Monotrix')
		.addField('**Illustrator**', 'Squid')
		.addField('**Readme Developer**', 'Superbro')
		.setFooter('And thanks to all ideologists, they help add features! Join the server to contribute!')

		message.channel.send(embed)
	}
	if (command == 'kick') {
		if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Kick Members permission.')).then(x => {x.delete({timeout:5000})})
		if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
		if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
		if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
		if (!message.guild.member(message.mentions.users.first()).kickable) return message.channel.send(deniedEmbed(`I'm unable to kick ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
		let reason = 'No reason specified.'
		if (args[1]) {
			reason = args.join(' ').slice(args[0].length)
		}
		const embed = new discord.MessageEmbed()
		.setTitle('Member kicked')
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
		.addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was kicked')
		.addField('Moderator', message.author.username+'#'+message.author.discriminator)
		.addField('Reason', reason)
		.setColor('RED')
		.setThumbnail(message.mentions.users.first().avatarURL())
		message.mentions.users.first().send(embed).catch(err => {message.channel.send('The user could not receive any details in DMs.')})
		message.channel.send(embed).then(x => {x.delete({timeout:15000})})
		await sleep(500)
		message.guild.member(message.mentions.users.first()).kick(reason)
	}

	if (command == 'ban') {
		if (!message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Ban Members permission.')).then(x => {x.delete({timeout:5000})})
		if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
		if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
		if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
		if (!message.guild.member(message.mentions.users.first()).bannable) return message.channel.send(deniedEmbed(`I'm unable to ban ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
		let reason = 'No reason specified.'
		if (args[1]) {
			reason = args.join(' ').slice(args[0].length)
		}
		const embed = new discord.MessageEmbed()
		.setTitle('Member banned')
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
		.addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was banned')
		.addField('Moderator', message.author.username+'#'+message.author.discriminator)
		.addField('Reason', reason)
		.setColor('RED')
		.setThumbnail(message.mentions.users.first().avatarURL())
		message.mentions.users.first().send(embed).catch(err => {message.channel.send('The user could not receive any details about this incident in DMs.')}).then(x => {x.delete({timeout:15000})})
		message.channel.send(embed).then(x => {x.delete({timeout:15000})})
		await sleep(500)
		message.guild.member(message.mentions.users.first()).ban({ days: 7, reason: reason})
	}

	if (command == 'botfact') {
		const embed = new discord.MessageEmbed()
		.setTitle('Random Bot Fact')
		.setDescription(botfacts[Math.floor(Math.random() * botfacts.length)])
		.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
		message.channel.send(embed)
	}

	if (command == 'invite' || command == 'link' || command == 'github' || command == 'links') {
		const bembed = new discord.MessageEmbed()
		.setTitle('Bot invite')
		.setDescription('Click above to invite Aquacious')
		.setColor('BLUE')
		.setURL('https://discord.com/api/oauth2/authorize?client_id=834501897666297918&permissions=8&redirect_uri=https%3A%2F%2Fllsc12.ml%2Flanding.html&scope=bot')
		const sembed = new discord.MessageEmbed()
		.setTitle('Server invite')
		.setDescription('Click above to join Aquacious Support')
		.setColor('#1abc9c')
		.setURL('https://discord.gg/TRc3vENjCW')
		const gembed = new discord.MessageEmbed()
		.setTitle('GitHub Repository')
		.setDescription('Click above to go to GitHub')
		.setColor('#7289da')
		.setURL('https://github.com/llsc12/Aquacious')
		message.channel.send(bembed)
		message.channel.send(sembed)
		message.channel.send(gembed)
	}

	if (command == 'suggest') {
		if (!args[0]) return message.channel.send(deniedEmbed('Sadly our devs cannot read minds, please add text :)')).then(x => {x.delete({timeout:5000})})
		console.log(args.join(' '))
		const serverembed = new discord.MessageEmbed()
		.setTitle('New Suggestion')
		.setAuthor(`Suggested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
		.setDescription(args.join(' '))
		.setColor('BLUE')
		suggestions.send(serverembed).then(msg => {
			msg.react('👍')
			msg.react('👎')
			const guildembed = new discord.MessageEmbed()
			.setTitle('New Suggestion')
			.setAuthor(`Suggested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(args.join(' '))
			.setColor('BLUE')
			.setURL(msg.url)
			.setFooter(`Click the title to be sent to your suggestion in the support server! If you aren't in it, do ${prefix}invite`)
			message.channel.send(guildembed)
		})
	}

	if (command == 'snipe') {
		if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}settings`)).then(z => {z.delete({timeout:6000})})
		const msg = deletedMessages.get(message.channel.id);
    	if (!msg) return message.reply('Could not find any deleted messages in this channel.');
		if (msg.content) {
			const embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .setDescription(msg.content)
            .setColor('BLUE');
            message.channel.send(embed)
		}
	}

	if (command == 'esnipe') {
		if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}settings`)).then(z => {z.delete({timeout:6000})})
		const msg = editedMessages.get(message.channel.id);
      	if (!msg) return message.reply('Could not find any edited messages in this channel.');
		if (msg.content) {
			const embed = new Discord.MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
			.setDescription(msg.content)
			.setColor('BLUE');
			message.channel.send(embed)
		}
	}

    if (command == 'say') {
        message.delete()
        message.channel.send(args.join(' '))
    }

    if (command == 'clear' || command == 'cl') {
        if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
            if (parseInt(args[0]) > 1 && parseInt(args[0]) < 100) {
                message.channel.bulkDelete(parseInt(args[0])+1)
                message.channel.send(`Cleared ${parseInt(args[0])} messages!`).then(msg => {msg.delete({timeout:3000})})
            } else return message.channel.send(deniedEmbed('Invalid quantity, has to be within 2 - 99'))
        } else return message.channel.send(deniedEmbed('You do not have access to this command')).then(deleted => deleted.delete({timeout:3000}))
    }

    if (command == 'ping') {
        message.delete()
        const msg = await message.channel.send("Pinging...");
        await msg.edit(`Calculating...`);
        msg.delete();
        let ping = msg.createdTimestamp - message.createdTimestamp
        if (ping <= 150) {
            var color = '#33ff33';
        } else if (ping > 150 && ping < 250) {
            var color = '#ff7700';
        } else {
            var color = '#ff0000'
        }
        const pingembed = new Discord.MessageEmbed()
        .setTitle('Current Bot Ping:')
        .setDescription(`${ping}ms`)
        .setColor(color)
		.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(pingembed).then(m => {m.delete({timeout:30000})})
    }

	if (command == 'jumbo') {
		const jumbo = client.emojis.cache.find(emoji => emoji.name === args[0])
		console.log(jumbo)
		message.channel.send(jumbo)
	}

    if (command == 'minesweeper' || command == 'ms') {
        if (!args[0]) {
			message.channel.send(generateGame())
		} else if (args[0] == 'help') {
			let msembed = new discord.MessageEmbed()
			.setColor("YELLOW")
			.setTitle("Minesweeper Help")
			.addField('Syntax',`${prefix}minesweeper <x> <y> <bombs> [StartUncovered?]`)
			.addField(`Arguments Descriptors`,"Here's what to put for custom boards")
			.addField('x', 'The horizontal board size')
			.addField('y', 'The vertical board size')
			.addField('bombs', 'Quantity of bombs to place on the board')
			.addField('StartUncovered?', `Set to true if you want to have all 0's unhidden from the start`)
			.addField('_ _',"Note: You can totally use &minesweeper on its own and it'll use default settings. You can also use &ms as a shortcut!")
			.setTimestamp()
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
			message.channel.send(msembed)
		} else if (args[0] && args[1] && args[2]) {
			message.channel.send(generateGame(args[0], args[1], args[2], message, args[3]))
		} else {
			message.channel.send(`Invalid command syntax, refer to &minesweeper help`)
		}
    }

	if (command == '8ball') {
		let messages = new Array();
		messages[0] = "No";
		messages[1] = "Not today";
		messages[2] = "It is decidedly so";
		messages[3] = "Without a doubt";
		messages[4] = "Yes definitely";
		messages[5] = "You may rely on it";
		messages[6] = "As I see it yes";
		messages[7] = "Most likely";
		messages[8] = "Outlook good";
		messages[10] = "Signs point to yes";
		messages[11] = "Reply hazy try again";
		messages[12] = "Ask again later";
		messages[13] = "Better not tell you now";
		messages[14] = "Cannot predict now";
		messages[15] = "Concentrate and ask again";
		messages[16] = "Don't count on it";
		messages[17] = "My reply is no";
		messages[18] = "My sources say no";
		messages[19] = "Outlook not so good";
		messages[20] = "Very doubtful";
		if (!args[0]) return message.channel.send(deniedEmbed('Where question at tho')).then(x => {x.delete({timeout:4000})})
        
		return message.reply(messages[Math.floor(Math.random() * messages.length)]);

	}

	if (command == 'mcfetch') {
		let repeat = (parseInt(args[1])+1)
		if (!args[1]) repeat = 4;
		if (repeat >= 11) return msg.edit('You can\'t refresh that many times')
		const msg = await message.channel.send("Grabbing data");
		if (!args[0]) return msg.edit('Wait- No ip address?!');
		msg.edit('i think something broke') // :'(
		let dldata = 'NaN';
		dldata = await mcsrv(args[0]);
		let lineone = '_ _'
		let linetwo = '_ _'
		if (dldata.motd.clean[0]) {
			lineone = dldata.motd.clean[0]
		}
		if (dldata.motd.clean[1]) {
			linetwo = dldata.motd.clean[1]
		}
		let mcembed = new Discord.MessageEmbed()
		.setColor('#00FFF4')
		.setDescription('Server Status')
		.addField('Hostname',dldata.hostname)
		.addField('Version',dldata.version)
		.addField('Online?',dldata.online)
		.addField('Direct IP',dldata.ip)
		.addField('Player Count',dldata.players.online+'/'+dldata.players.max+' currently online')
		.addField('MOTD', `${lineone}\n${linetwo}`)
		.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
		msg.edit('_ _')
		msg.edit(mcembed)
	}
	if (command == 'system' || command == 'sysstat' || command == 'sysstats' || command == 'sysinfo') {
		let msg = await message.channel.send('Getting information...')
		si.cpu()
    	.then(cpu => {
			si.mem()
			.then(mem => {
			si.osInfo()
			.then(os => {
				si.cpuTemperature()
				.then(temp => {
					si.currentLoad()
					.then(load => {
						let totalSeconds = (client.uptime / 1000);
						let uptime = convToDays(totalSeconds);
						let embed = new Discord.MessageEmbed()
							.setColor("RANDOM")
							.setTitle(`System & Process Information for ${client.user.username}`)
							.setURL('https://discord.gg/YHnyVmKQwc')
							.setTimestamp()
							.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.addField('Process Information', `**Uptime** \n${uptime} \n**Serving** \n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n**Running** \n${process.release.name} ${process.version}`)
							.addField(`System Information`,`**Device Hostname** \n${os.hostname} \n**CPU** \n${cpu.cores} Core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch} \n**General CPU Load** \n${load.avgLoad}% \nCurrently ${temp.main}°c \n**Device Uptime** \n${convToDays(nodeOS.uptime())} \n**Memory** \nTotal Memory: ${(mem.total/1000000000).toFixed(2)}GB \nUsed Memory: ${(mem.used/1000000000).toFixed(2)}GB \nFree Memory: ${(mem.free/1000000000).toFixed(2)}GB \n**Operating System** \n${os.distro} ${os.release} ${os.arch}`)
							msg.delete()
							message.channel.send(embed)
						})
					})
			    })
			})
		})
	}

	if (command == 'emojisteal') {
		if (!message.member.hasPermission('MANAGE_EMOJIS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You need the manage emoji\'s permission!'))
		let msgsteal = await message.channel.send(`emojisteal ${message.author.id}`)
		let embed = new discord.MessageEmbed()
		.setTitle('Emoji Steal')
		.setColor('ORANGE')
		.setDescription('Add reactions to this message to add them to your server')
		msgsteal.edit(embed)
	}

	if (command == 'test') {
		const x = message.channel.send('point a')
		await sleep(2*1000)
		const y = message.channel.send('2sec mark')
		message.channel.send('check console')
		message.channel.send((await y).createdTimestamp -(await x).createdTimestamp)
	}
	if (command == 'reload') {
		if (message.author.id != '381538809180848128') return message.channel.send(deniedEmbed('Only developers can do this.')).then(x => {x.delete({timeout:5000})})
		const embed = new discord.MessageEmbed()
		.setTitle('Are you sure you want to reload?')
		.setColor('BLUE')
		.setDescription('It might take a while or fail, you should do it manually instead.')
		let gamering = await message.channel.send('Reload Aqua?')
		gamering.edit(embed)
		gamering.react("♻️")
	}
});

function convToDays(totalSeconds) {
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
client.on('ready', async () => {
  await sleep(500)
  console.log(`ws connection established (${client.ws.ping}ms). Connected as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
});
// Minesweeper Generator by JochCool on GitHub. Thanks!
const neighbourLocations = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}];

function toTwoDigitString(num) {
	var str = num.toString();
	if (str.length == 1) return "0" + str;
	return str;
};
function generateGame(gameWidth, gameHeight, numMines, message, startsNotUncovered, isRaw) {
	
	/** ──────── CHECKS ──────── **/
	
	// Check game size
	if (isNaN(gameWidth)) {
		gameWidth = 6;
	}
	else if (gameWidth <= 0 || gameHeight <= 0) {
		return `Uh, I'm not smart enough to generate a maze sized ${gameWidth} by ${gameHeight}. I can only use positive numbers. Sorry :cry:`;
	}
	if (isNaN(gameHeight)) {
		gameHeight = 6;
	}
	else if (gameWidth > 40 || gameHeight > 20) {
		return "That's way too large! Think of all the mobile users who are going to see this!";
	}
	
	// Check mine count
	if (isNaN(numMines)) {
		numMines = Math.round(gameWidth * gameHeight / 5);
	}
	else {
		if (numMines <= 0) {
			return "You think you can look clever by solving a Minesweeper game without mines? Not gonna happen my friend.";
		}
		else if (numMines > gameWidth * gameHeight) {
			return "I can't fit that many mines in this game!";
		}
	}
	
	/** ──────── CREATE GAME ──────── **/
	
	// 2D array that contains the game, sorted [y][x]. -1 means a mine, positive number is the amount of neighbouring mines
	var game = [];
	
	// Initialize the game array with zeroes
	for (var y = 0; y < gameHeight; y++) {
		game.push([]);
		for (var x = 0; x < gameWidth; x++) {
			game[y].push(0);
		}
	}
	
	// Takes in an object with x and y properties
	function coordIsInGame(coord) {
		return coord.y >= 0 && coord.y < game.length &&
		       coord.x >= 0 && coord.x < game[coord.y].length;
	};
	
	// Fill the game with mines!
	for (var mine = 0; mine < numMines; mine++) {
		var x = Math.floor(Math.random()*gameWidth),
		    y = Math.floor(Math.random()*gameHeight);
		
		// Retry if there was already a mine there
		if (game[y][x] === -1) {
			mine--;
			continue;
		}
		
		game[y][x] = -1;
		
		// Add 1 to neighbouring tiles
		for (var j = 0; j < neighbourLocations.length; j++) {
			let newCoord = {x: x + neighbourLocations[j].x, y: y + neighbourLocations[j].y};
			if (coordIsInGame(newCoord) && game[newCoord.y][newCoord.x] !== -1) {
				game[newCoord.y][newCoord.x]++;
			}
		}
	}
	
	/** ──────── UNCOVERING ──────── **/
	
	// Initialize vars
	let zeroLocations = []; // Array of {x,y} objects, will contain locations of all zeroes in the game
	let uncoveredLocations = []; // 2D array, each value is either nothing (not uncovered) or true (uncovered)
	for (var y = 0; y < game.length; y++) {
		uncoveredLocations.push([]);
	}
	
	if (startsNotUncovered) {
		// Find all the zeroes in this game
		for (var y = 0; y < game.length; y++) {
			for (var x = 0; x < game[y].length; x++) {
				if (game[y][x] === 0) {
					zeroLocations.push({x: x, y: y});
				}
			}
		}

		// Uncover a random region
		if (zeroLocations.length > 0) {
			
			// Select random starting point
			let locationsToUncover = [];
			let firstCoord = zeroLocations[Math.floor(Math.random()*zeroLocations.length)];
			uncoveredLocations[firstCoord.y][firstCoord.x] = true;
			locationsToUncover.push(firstCoord);

			// Uncover neighbouring tiles
			while (locationsToUncover.length > 0) {
				for (var j = 0; j < neighbourLocations.length; j++) {
					
					let newCoord = {x: locationsToUncover[0].x + neighbourLocations[j].x, y: locationsToUncover[0].y + neighbourLocations[j].y};
					if (!coordIsInGame(newCoord) || uncoveredLocations[newCoord.y][newCoord.x] === true) continue;
					uncoveredLocations[newCoord.y][newCoord.x] = true;
					
					// Continue uncovering
					if (game[newCoord.y][newCoord.x] === 0) {
						locationsToUncover.push(newCoord);
					}
				}
				locationsToUncover.shift();
			}
		}
	}
	
	/** ──────── CREATE REPLY ──────── **/
	
	let returnTxt;
	if (numMines === 1) returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with 1 mine:`;
	else                returnTxt = `Here's a board sized ${gameWidth}x${gameHeight} with ${numMines} mines:`;
	
	if (isRaw) { returnTxt += "\n```"; }
	
	for (var y = 0; y < game.length; y++) {
		returnTxt += "\n"
		for (var x = 0; x < game[y].length; x++) {
			if (game[y][x] === -1) {
				returnTxt += "||:bomb:||";
			}
			else if (startsNotUncovered && uncoveredLocations[y][x]) {
				returnTxt += numberEmoji[game[y][x]];
			}
			else {
				returnTxt += `||${numberEmoji[game[y][x]]}||`;
			}
		}
	}
	
	if (isRaw) { returnTxt += "\n```"; }
	
	// Send the message if it's not longer than 2000 chars (Discord's limit)
	if (returnTxt.length <= 2000) {
		return returnTxt;
	}
	
	// Otherwise, split the message
	let splitReturns = [];
	do {
		let splitIndex = returnTxt.substring(0, 1900).lastIndexOf("\n");
		if (splitIndex === -1) {
			return "Sorry, your message appears to be too large to send (because of Discord's character limit). Please try a smaller game.";
		}
		splitReturns.push(returnTxt.substring(0, splitIndex));
		returnTxt = returnTxt.substring(splitIndex+1);
		
		// Also split the triple backticks
		if (isRaw) {
			splitReturns[splitReturns.length-1] += "\n```";
			returnTxt = "```\n" + returnTxt;
		}
	} while (returnTxt.length > 1900)
	
	splitReturns.push(returnTxt);
	
	// Send the messages one by one
	let i = 0;
	function sendNextMessage() {
		if (i < splitReturns.length) message.channel.send(splitReturns[i++]).then(sendNextMessage, log);
	};
	sendNextMessage();
};
function deniedEmbed (error) {
    const deniedEmbed = new discord.MessageEmbed()
    .setTitle('Error')
    .setDescription(error)
    .setThumbnail(cross)
    .setColor('RED')
    .setTimestamp();
    return deniedEmbed
}

const numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
let valid = new Array();
valid = ['8ball', 'Random_hentai_gif', 'meow', 'erok', 'lizard', 'feetg', 'baka', 'v3', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'poke', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'wallpaper', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'hug', 'keta', 'cuddle', 'eroyuri', 'slap', 'cum_jpg', 'waifu', 'gecg', 'tits', 'avatar', 'holoero', 'classic', 'kemonomimi', 'feet', 'gasm', 'spank', 'erofeet', 'ero', 'solo', 'cum', 'smug', 'holo', 'nsfw_neko_gif']
const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
client.on('message', (message) => {
	if (!message.guild || message.author.bot) return;
	if (!data.get(`${message.guild.id}.prefix`)) {
		var prefix = '!'
	} else {
		var prefix = data.get(`${message.guild.id}.prefix`)
	}
	if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
		let eb = new discord.MessageEmbed()
		.setTitle('Hey!')
		.setDescription(`My prefix in this guild is currently **${prefix}**`)
		.setTimestamp()
		.setColor('BLUE')
		.setThumbnail(client.user.avatarURL)
		message.channel.send(eb)
		return;
	}
})

const editedMessages = new Discord.Collection();
const deletedMessages = new Discord.Collection();
client.on('messageDelete', message => {
	if (message.author.bot) return;
	deletedMessages.set(message.channel.id, message);
});
client.on("messageUpdate", message => {
	if (message.author.bot) return;
	editedMessages.set(message.channel.id, message);
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.content.includes('emojisteal') && reaction.message.author == client.user) {
		reaction.users.remove(user.id)
		if (user.id != reaction.message.content.slice('emojisteal '.length)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add emotes'))
		if (user.id == reaction.message.content.slice('emojisteal '.length)) {
			if (!reaction.emoji.url) return reaction.message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji so it should already be in your server')).then(x => {x.delete({timeout:4000})})
			if (reaction.message.guild.emojis.cache.find(emoji => emoji.name == reaction.emoji.name)) return reaction.message.channel.send(deniedEmbed(`An emoji with the name :${reaction.emoji.name}: already exists`)).then(x => {x.delete({timeout:4000})})
			reaction.message.guild.emojis.create(reaction.emoji.url, reaction.emoji.name).catch(err =>{reaction.message.channel.send(err)})
			reaction.message.channel.send(`Created <:${reaction.emoji.name}:${reaction.emoji.id}>`).then(x => {x.delete({timeout:10000})})
		}
	}
	if (user.id == '381538809180848128' && reaction.message.content.includes('Reload Aqua?')) {
		const { exec } = require('child_process');
		exec('start', (err, stdout, stderr) => {
			if (err) {
				reaction.message.channel.send(deniedEmbed(`Failed to reload. \n\n${err}`)).then(x => {x.delete({timeout:10000})})
				reaction.message.delete()
				return;
			}
			reaction.message.channel.send('Reloadng...')
			process.exit()
		})
	} else {
		if (user.id == client.user.id) return
		reaction.users.remove(user.id)
		reaction.message.channel.send(`didnt ask you, <@${user.id}>`).then(x => {x.delete({timeout:500})})
	}
})

client.on('message', (message) => {
	// put some stuff here
})

client.login(token)
