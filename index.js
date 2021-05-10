const discord = require("discord.js"), enmap = require('enmap'), fs = require("fs"), Discord = require("discord.js"), si = require('systeminformation'), nodeOS = require('os'), fetch = require('node-fetch'), mcsrv = require('mcsrv'), statusfile = require('./status.json'), numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"], tokens = require('./token.json'), botfacts = require('./botfacts.json'), neighbourLocations = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}], sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms)), editedMessages = new Discord.Collection(), deletedMessages = new Discord.Collection(), https = require('https'), booru = require('booru'), moment = require('moment'), AutoPoster = require('topgg-autoposter')
const client = new Discord.Client({ 
  messageSweepInterval: 60, 
  disableMentions: 'everyone'
}) // Create a client
const data = new enmap({ name: "botdata"});
var suggestions = 'a'
const cross = 'https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461'

if (tokens.topgg) {
	const ap = AutoPoster(tokens.topgg, client)
	ap.on('posted', () => {
		console.log('Posted stats to Top.gg!')
	})
} else console.log('No top.gg token found, skipping...')
/*
client.on('ready', async () => {
	let statsofbot = {
		guilds: client.guilds.cache.size,
		users: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
	}
	if (!tokens.dbl) return
	await fetch(`https://discordbotlist.com/api/v1/bots/${client.user.id}/stats`, {
		method: "POST", 
		headers: {Authorization: tokens.dbl},
		body: JSON.stringify(statsofbot)
	}).then(x => {
		console.log(x)
	})
})
*/
client.on('ready', async () => {
	suggestions = client.channels.cache.get("834895513496715344")
	let tempstartup = statusfile[Math.floor(Math.random() * statusfile.length)]
	if (tempstartup.url) {
		client.user.setPresence({
			status: tempstartup.status,
			activity: {
				name: tempstartup.name,
				type: tempstartup.type,
				url: tempstartup.url
			}
		})
	} else {
		client.user.setPresence({
			status: tempstartup.status,
			activity: {
				name: tempstartup.name,
				type: tempstartup.type
			}
		})
	}
	await sleep(500)
  console.log(`ws connection established (${client.ws.ping}ms). Connected as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
	setInterval(() => {
		let now = statusfile[Math.floor(Math.random() * statusfile.length)]
		if (!now.status) now.status = 'dnd';
		if (now.url) {
			client.user.setPresence({
				status: now.status,
				activity: {
					name: now.name,
					type: now.type,
					url: now.url
				}
			})
		} else {
			client.user.setPresence({
				status: now.status,
				activity: {
					name: now.name,
					type: now.type
				}
			})
		}
	}, 15000)
});
const helpEmbed = new discord.MessageEmbed()
	.setTitle('Help Menu')
	.setDescription('Take a look through all categories!')
	.setColor('BLUE')
	.addField('1️⃣', 'Miscellaneous', true)
	.addField('2️⃣', 'Moderation', true)
	.addField('3️⃣', 'Configuration', true)
	.addField('4️⃣', 'NSFW', true)
	.addField('5️⃣', 'Fun', true)
	.addField('6️⃣', 'Chat', true)

client.on("message", async message => { //commands
  //get prefix
  if (!message.guild || message.author.bot) return
	// Retrieve guild settings and shit
  if (!data.get(`guild.${message.guild.id}.prefix`)) { //prefix
    var prefix = '!'
  } else {
    var prefix = data.get(`guild.${message.guild.id}.prefix`)
  }
  if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //whether nsfw is allowed
    var nsfwSetting = 'Enabled'
  } else {
    var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
  }
  if (!data.get(`guild.${message.guild.id}.snipeSetting`)) { //whether privacy is better kekw
    var snipeSetting = 'Enabled'
  } else {
    var snipeSetting = data.get(`guild.${message.guild.id}.snipeSetting`)
  }
	if (!data.get(`user.${message.author.id}.snipeSetting`)) { //whether privacy is better kekw
    var usersnipeSetting = 'Enabled'
  } else {
    var usersnipeSetting = data.get(`user.${message.author.id}.snipeSetting`)
  }
  if (!data.get(`guild.${message.guild.id}.youthkickAge`)) { //prefix
    var youthkickAge = 'Disabled'
  } else {
    var youthkickAge = data.get(`guild.${message.guild.id}.youthkickAge`)
  }

  // Le command handler :)
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).split(" ")
  let command = args.shift().toLowerCase()

	switch(command){

		case('beta'):
			if (message.author.id != '381538809180848128') return
			if (!message.content.includes(client.user.id)) return
			message.delete()
			data.set(`guild.${message.guild.id}.prefix`, '&')
			message.channel.send('&').then(x => {x.delete({timeout:3000})})
			break;

		case('stats'):
			const embed = new discord.MessageEmbed()
			.setTitle("Bot Statistics")
			.setDescription("Thanks for adding me! llsc12 is happi kek")
			.addField('Servers I\'m In', client.guilds.cache.size, true)
			.addField('Members I\'m Serving', client.guilds.cache.reduce((a, g) => a + g.memberCount, 0), true)
			.addField('Members in this guild', message.guild.memberCount, true)
			.setColor("GREEN")
			let x = await message.channel.send('Bot Stats')
			x.edit(embed)
			x.react('🔄')
			break;

		case('help'):
			message.delete({timeout:9000})
			message.channel.send(`Help Menu ${message.author.id}`).then(async x => {
				message.react('👍')
				x.edit(helpEmbed)
				await x.react("1️⃣")
				await x.react("2️⃣")
				await x.react("3️⃣")
				await x.react("4️⃣")
				await x.react("5️⃣")
				await x.react("6️⃣")
				await x.react("🏠")
				await x.react("⏹")
			})
			break;

		case('hentai'):
		case('h'):
			if (nsfwSetting == 'Disabled') return message.channel.send(deniedEmbed(`NSFW is disabled entirely in this guild`)).then(d => {d.delete({timeout:5000})})
				if (message.channel.topic) {
					if (!message.channel.topic.includes('NSFW')) {
						if (!message.channel.nsfw) {
							let nembed = new discord.MessageEmbed()
							.addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
							.setColor('GREEN')
							.setTimestamp()
							.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
							message.channel.send(nembed)
							return;
						}
					}
				} else if (!message.channel.nsfw) {
					let nembed = new discord.MessageEmbed()
					.addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
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
					.addField('Here are valid arguments', String(valid.join(' ')))
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
						.setDescription('Unable to see image? Press the link above!')
						.setImage(json.url)
						.setColor('BLUE')
						.setTimestamp()
						.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
						message.channel.send(nembed)
					});
		break;
	
		case('settings'):
		case('preferences'):
			const oldhembed = new discord.MessageEmbed()
			.setTitle("This command is now defunct")
			.setDescription(`Hey there, the settings and preferences commands no longer work!\nPlease use the new commands. \n\n**${prefix}guildsettings**\n**${prefix}guildprefs**\n**${prefix}usersettings**\n**${prefix}userprefs**`)
			.setColor("RED")
			message.channel.send(oldhembed).then(x => {x.delete({timeout:8000})})
			break;

		case('guildsettings'):
		case('guildprefs'):
			if (!args[0]) {
				const embed = new discord.MessageEmbed()
				.setTitle('Guild Preferences')
				.setURL('https://discord.gg/TRc3vENjCW')
				.setDescription('Settings for this guild!')
				.setColor('BLUE')
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
				.addField('Prefix', prefix)
				.addField('NSFW', nsfwSetting)
				.addField('Sniping', snipeSetting)
        .addField('YouthKick', `${youthkickAge}`)
				.setFooter(`Do ${prefix}${command} <help | modify> <setting> [config]`)
				message.channel.send(embed)
			} else if (args[1]) {

				const setting = args[1].toLowerCase()
				const executing = args[0].toLowerCase()
				
				if (executing == 'modify') {
					if (!message.member.hasPermission('ADMINISTRATOR', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('Only server administrators can change guild settings')).then(x => {x.delete({timeout:5000})})
					if (setting == 'prefix') {
						if (!args[2]) return message.channel.send(deniedEmbed(`No prefix was provided. \nThe current prefix for this guild is ${prefix}`)).then(x => {x.delete({timeout:4000})})
						data.set(`guild.${message.guild.id}.prefix`, args[2])
						const embed = new discord.MessageEmbed()
						.setTitle('Success!')
						.setColor('GREEN')
						.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
						.setDescription(`This guild's prefix is now ${data.get(`guild.${message.guild.id}.prefix`)}`)
						message.channel.send(embed)
					}

					if (setting == 'sniping') {
						if (args[2].toLowerCase() == 'disabled') {
							data.set(`guild.${message.guild.id}.snipeSetting`,'Disabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`Sniping is now disabled. ${prefix}snipe and ${prefix}esnipe is no longer usable.`)
							message.channel.send(embed)
						}

						if (args[2].toLowerCase() == 'enabled') {
							data.set(`guild.${message.guild.id}.snipeSetting`,'Enabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`Sniping is now enabled. ${prefix}snipe and ${prefix}esnipe are available now.`)
							message.channel.send(embed)
						}
					}

          if (setting == 'youthkick') {
						if (args[2].toLowerCase() == 'disabled') {
							data.set(`guild.${message.guild.id}.youthkickAge`,'Disabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`Youth Kick will no longer kick new user accounts.`)
							message.channel.send(embed)
						} else if (parseInt(args[2]) >= 1 && parseInt(args[2]) <= 14) {
							data.set(`guild.${message.guild.id}.youthkickAge`,parseInt(args[2]))
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`Youth Kick will now kick any user accounts that are younger than ${data.get(`guild.${message.guild.id}.youthkickAge`)} days!`)
							message.channel.send(embed)
						} else return message.channel.send(deniedEmbed('Invalid day count. Set this to Disabled or a number within 1 to 14.'))
					}

					if (setting == 'nsfw') {
						if (args[2].toLowerCase() == 'disabled') {
							data.set(`guild.${message.guild.id}.nsfwSetting`,'Disabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`All NSFW commands are disabled in this server!`)
							message.channel.send(embed)
						}

						if (args[2].toLowerCase() == 'enabled') {
							data.set(`guild.${message.guild.id}.nsfwSetting`,'Enabled')
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
						.setDescription(`Changes this guild's prefix. It is currently set to ${prefix}`)
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
		break;

		case('usersettings'):
		case('userprefs'):
			if (!args[0]) {
				const embed = new discord.MessageEmbed()
				.setTitle('User Preferences')
				.setURL('https://discord.gg/TRc3vENjCW')
				.setDescription(`Settings for ${message.author.tag}`)
				.setColor('BLUE')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.addField('Sniping', usersnipeSetting)
				.setFooter(`Do ${prefix}${command} <help | modify> <setting> [config]`)
				message.channel.send(embed)
			} else if (args[1]) {
		
				const setting = args[1].toLowerCase()
				const executing = args[0].toLowerCase()
				
				if (executing == 'modify') {
		
					if (setting == 'sniping') {
						if (args[2].toLowerCase() == 'disabled') {
							data.set(`user.${message.author.id}.snipeSetting`,'Disabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`You have opted out of sniping`)
							message.channel.send(embed).then(x => {x.delete({timeout:6000})})
						}
						if (args[2].toLowerCase() == 'enabled') {
							data.set(`user.${message.author.id}.snipeSetting`,'Enabled')
							const embed = new discord.MessageEmbed()
							.setTitle('Success!')
							.setColor('GREEN')
							.setDescription(`You have allowed other users to snipe you`)
							message.channel.send(embed).then(x => {x.delete({timeout:6000})})
						}
					}
				} else if (executing == 'help') {
					if (setting == 'sniping') {
						const embed = new discord.MessageEmbed()
						.setTitle('Prefix')
						.setColor('GREEN')
						.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
						.setDescription(`Choose whether you allow other people to snipe your messages.`)
						message.channel.send(embed)
					}
				}
			}
			break;

		case('guildslist'):
			if (message.author.id != '381538809180848128') return
			message.delete()
			let list = new Array()
			client.guilds.cache.forEach(guild => {
				list[list.length + 1 ] = (`${guild.name} - ${guild.owner} (${guild.memberCount})`)
				if (list.length == 10) {
					message.author.send(list.join("\n"))
					list = new Array()
				}
			})
			if (list.length !== 0) message.author.send(list.join("\n"))
			break;

		case('about'):
		case('credits'):
			const creditembed = new discord.MessageEmbed()
			.setTitle('Credits')
			.setURL('https://discord.gg/TRc3vENjCW')
			.setColor('#1abc9c')
			.setDescription('Thanks to all the lovely people below, this bot was born!')
			.addField('**Lead Developer**', 'llsc12', true)
			.addField('**Developer**', 'Monotrix', true)
			.addField('**Developer**', 'Matt', true)
			.addField('**Illustrator**', 'Squid', true)
			.addField('**Readme Developer**', 'Superbro', true)
			.addField('**Ava** ❤️', 'Ava ❤️', true)
      .addField('A quick note', 'This bot is very much in beta and has many bugs. We ask you to use the suggest command to report bugs if you find any. Thanks!')
			.setFooter('And thanks to all ideologists, they help add features! Join the server to contribute!')
			message.channel.send(creditembed)
			break;

		case('kick'):
			if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Kick Members permission.')).then(x => {x.delete({timeout:5000})})
			if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
			if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
			if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
			if (!message.guild.member(message.mentions.users.first()).kickable) return message.channel.send(deniedEmbed(`I'm unable to kick ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
			let kickreason = 'No reason specified.'
			if (args[1]) {
				kickreason = args.join(' ').slice(args[0].length)
			}
			const kickembed = new discord.MessageEmbed()
			.setTitle('Member kicked')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was kicked')
			.addField('Moderator', message.author.username+'#'+message.author.discriminator)
			.addField('Reason', kickreason)
			.setColor('RED')
			.setThumbnail(message.mentions.users.first().avatarURL())
			message.mentions.users.first().send(kickembed).catch(err => {message.channel.send('The user could not receive any details in DMs.')})
			message.channel.send(kickembed).then(x => {x.delete({timeout:15000})})
			await sleep(500)
			message.guild.member(message.mentions.users.first()).kick(kickreason)
			break;

		case('ban'):
			if (!message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You do not have Ban Members permission.')).then(x => {x.delete({timeout:5000})})
			if (!args[0]) return message.channel.send(deniedEmbed('No user was specified.')).then(x => {x.delete({timeout:5000})})
			if (!message.mentions.users.first()) return message.channel.send(deniedEmbed('Cannot find that user.')).then(x => {x.delete({timeout:5000})})
			if (!message.guild.member(message.mentions.users.first())) return message.channel.send(deniedEmbed('Couldn\'t get member from user.')).then(x => {x.delete({timeout:5000})})
			if (!message.guild.member(message.mentions.users.first()).bannable) return message.channel.send(deniedEmbed(`I'm unable to ban ${message.mentions.users.first().username}.`)).then(x => {x.delete({timeout:5000})})
			let banreason = 'No reason specified.'
			if (args[1]) {
				banreason = args.join(' ').slice(args[0].length)
			}
			const banembed = new discord.MessageEmbed()
			.setTitle('Member banned')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.addField(message.mentions.users.first().username+'#'+message.mentions.users.first().discriminator, 'was banned')
			.addField('Moderator', message.author.username+'#'+message.author.discriminator)
			.addField('Reason', banreason)
			.setColor('RED')
			.setThumbnail(message.mentions.users.first().avatarURL())
			message.mentions.users.first().send(banembed).catch(err => {message.channel.send('The user could not receive any details about this incident in DMs.')}).then(x => {x.delete({timeout:15000})})
			message.channel.send(banembed).then(x => {x.delete({timeout:15000})})
			await sleep(500)
			message.guild.member(message.mentions.users.first()).ban({ days: 7, reason: banreason})
			break

		case('botfact'):
			const botfactembed = new discord.MessageEmbed()
			.setTitle('Random Bot Fact')
			.setDescription(botfacts[Math.floor(Math.random() * botfacts.length)])
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			message.channel.send(botfactembed)
			break;

		case('invite'):
		case('link'):
		case('github'):
		case('links'):
			const bembed = new discord.MessageEmbed()
			.setTitle('Bot invite')
			.setDescription('Click above to invite Aquacious')
			.setColor('BLUE')
			.setURL('https://discord.ly/aquacious')
			.setFooter('Please upvote Aqua too if you don\'t mind!', client.user.avatarURL())
			const sembed = new discord.MessageEmbed()
			.setTitle('Server invite')
			.setDescription('Click above to join Aquacious Support')
			.setColor('#1abc9c')
			.setURL('https://discord.gg/TRc3vENjCW')
			.setFooter('Support for anything, bot help or code, available here!')
			const gembed = new discord.MessageEmbed()
			.setTitle('GitHub Repository')
			.setDescription('Click above to go to GitHub')
			.setColor('#7289da')
			.setURL('https://github.com/llsc12/Aquacious')
			.setFooter('Go star the repo too!', 'https://avatars.githubusercontent.com/u/42747613?v=4')
			message.channel.send(bembed)
			message.channel.send(sembed)
			message.channel.send(gembed)
			break;

		case('suggest'):
			if (!args[0]) return message.channel.send(deniedEmbed('Sadly our devs cannot read minds, please add text :)')).then(x => {x.delete({timeout:5000})})
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
			break;

		case('snipe'):
			if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}guildsettings`)).then(z => {z.delete({timeout:6000})})
			const smsg = deletedMessages.get(message.channel.id);
      if (!smsg) return message.reply('Could not find any deleted messages in this channel.');
      if (data.get(`user.${smsg.author.id}.snipeSetting`) == 'Disabled') return message.channel.send(deniedEmbed(`${smsg.author.username} has opted out of sniping.`)).then(x => {x.delete({timeout:5000})})
			if (smsg.content) {
				const snipeembed = new Discord.MessageEmbed()
				.setAuthor(smsg.author.tag, smsg.author.displayAvatarURL({ dynamic: true }))
				.setDescription(smsg.content)
				.setColor('BLUE')
				message.channel.send(snipeembed)
			}
			break

		case('esnipe'):
			if (snipeSetting == 'Disabled') return message.channel.send(deniedEmbed(`This command is disabled. Check ${prefix}guildsettings`)).then(z => {z.delete({timeout:6000})})
			const esmsg = editedMessages.get(message.channel.id);
      if (!esmsg) return message.reply('Could not find any edited messages in this channel.');
      if (data.get(`user.${esmsg.author.id}.snipeSetting`) == 'Disabled') return message.channel.send(deniedEmbed(`${esmsg.author.username} has opted out of sniping.`)).then(x => {x.delete({timeout:5000})})
			if (esmsg.content) {
				const esnipeembed = new Discord.MessageEmbed()
				.setAuthor(esmsg.author.tag, esmsg.author.displayAvatarURL({ dynamic: true }))
				.setDescription(esmsg.content)
				.setColor('BLUE')
				message.channel.send(esnipeembed)
			}
			break;

		case('say'):
			if (!args[0]) return
			message.delete()
			if (args.join(' ').includes('@everyone') || args.join(' ').includes('@here')) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
			let SpeechUnsafe = 0
			message.guild.roles.cache.forEach(x => {
				if (args.join(' ').includes(x.id)) SpeechUnsafe = 1
			})
			if (SpeechUnsafe == 1) return message.channel.send(deniedEmbed('thats illegal bro')).then(x => x.delete({timeout:4000}))
			message.channel.send(args.join(' '))
			break;

		case('clear'):
		case('cl'):
			if (message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) {
				if (args[0] >= 301) return message.channel.send(deniedEmbed('You may only delete up to 300 messages at once.')).then(x => {x.delete({timeout:5000})})
				if (args[0] <= 0) return message.channel.send(deniedEmbed('You may only delete a minimum of 1 message.')).then(x => {x.delete({timeout:5000})})
        if (!args[0]) return message.channel.send(deniedEmbed('Invalid quantity. Choose a value between 1 and 300')).then(x => {x.delete({timeout:5000})})
				let leftoverclear = ((parseInt(args[0])+1) % 100)
				let repeatclear = ((parseInt(args[0])+1)/100).toFixed(0)
				if (repeatclear != 0) repeat(function () { message.channel.bulkDelete(100) }, repeatclear);
				message.channel.bulkDelete(leftoverclear)
				message.channel.send(`Cleared ${parseInt(args[0])} messages!`).then(msg => {msg.delete({timeout:4000})})
			} else return message.channel.send(deniedEmbed('You do not have access to this command')).then(deleted => deleted.delete({timeout:3000}))
			break;

		case('ping'):
			message.delete()
			const pingmsg = await message.channel.send("Pinging...");
			await pingmsg.edit(`Calculating...`);
			pingmsg.delete();
			let ping = pingmsg.createdTimestamp - message.createdTimestamp
			if (ping <= 150) {
				var color = '#33ff33';
			} else if (ping > 150 && ping < 250) {
				var color = '#ff7700';
			} else {
				var color = '#ff0000'
			}
			const pingembed = new Discord.MessageEmbed()
			.setTitle('Current Bot Ping')
			.addField('Websocket Heartbeat', `${client.ws.ping}ms`, true)
			.addField('Roundtrip Latency',`${ping}ms`, true)
			.setColor(color)
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
			message.channel.send(pingembed).then(m => {m.delete({timeout:30000})})
			break;

		case('ms'):
		case('minesweeper'):
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
				message.channel.send(`Invalid command syntax, refer to &minesweeper help`).then(x => {x.delete({timeout:5000})})
			}
			break;

		case('8ball'):
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
			break;

		case('jumbo'):
			if (!args[0]) return message.channel.send(deniedEmbed("Couldn't find an emoji to paste!")).then(x => {x.delete({timeout:5000})})
			const msg = args[0].match(/<a?:.+:\d+>/gm)
			let url = ''
			if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
			url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
			}
			else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
			url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
			}
			if (url) {
				const embed = new discord.MessageEmbed()
				.setColor('BLUE')
				.setImage(url)
				.setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
				message.delete()
				message.channel.send(embed)
			}
			if (!url) {
				message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji.')).then(x => {x.delete({timeout:5000})})
			}
			break;

    case('afk'):
		let afkreason = args.join(" ")
		if (!args[0]) {
			afkreason = 'AFK'
		}
		message.delete()
		data.set(`user.${message.author.id}.afk.timestamp`, (Date.now()/1000).toFixed(0))
		data.set(`user.${message.author.id}.afk.reason`, `${afkreason}`)
		const afkembed = new discord.MessageEmbed()
		.setTitle('AFK Set')
		.setDescription(`${afkreason}`)
		.setAuthor(message.author.username, `${message.author.avatarURL()}?size=1024`)
		.setColor("ORANGE")
		.setFooter('Anyone who pings you will receive this message.', `${client.user.avatarURL()}?size=1024`)
		message.channel.send(afkembed).then(x => {x.delete({timeout:5000})})
		break;

		case('mcfetch'):
			const mcmsg = await message.channel.send("Grabbing data")
			if (!args[0]) return msg.edit('Wait- No ip address?!')
			mcmsg.edit('Loading... If this doesn\'t disappear, the bot failed.') // :'(
			let dldata = NaN;
			dldata = await mcsrv(args[0])
			let lineone = '_ _'
			let linetwo = '_ _'
			let hostname = 'None found'

			if (dldata.motd){
				if (dldata.motd.clean[0]) {
					lineone = dldata.motd.clean[0]
				}
				if (dldata.motd.clean[1]) {
					linetwo = dldata.motd.clean[1]
				}
			}
			if (dldata.hostname) {
				hostname = dldata.hostname
			}

			let players = 'Nobody Online'
			if (dldata.players.list) {
				dldata.players.list.forEach(item => {
					players = `\n${item} `
				})
			}

			let mcembed = new Discord.MessageEmbed()
			.setColor('#00FFF4')
			.setDescription(`${hostname} Server Status`)
			.addField('Hostname',hostname, true)
			.addField('Version',dldata.version, true)
			.addField('Direct IP',dldata.ip, true)
			.addField('Player Count',dldata.players.online+'/'+dldata.players.max+` currently online`, true)
			.addField('Players Online', players, true)
			.addField('MOTD', `${lineone}\n${linetwo}`, true)
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
			mcmsg.edit('_ _')
			mcmsg.edit(mcembed)
			break;

		case('system'):
		case('sysstat'):
		case('sysinfo'):
		case('sysstats'):
			let sysmsg = await message.channel.send('Getting information...')
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
							.setURL('https://discord.gg/TRc3vENjCW')
							.setTimestamp()
							.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.addField('Process Information', `**Uptime** \n${uptime} \n**Serving** \n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n**Running** \n${process.release.name} ${process.version}`)
							.addField(`System Information`,`**Device Hostname** \n${os.hostname} \n**CPU** \n${cpu.cores} Core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch} \n**General CPU Load** \n${load.avgLoad}% \nCurrently ${temp.main}°c \n**Device Uptime** \n${convToDays(nodeOS.uptime())} \n**Memory** \nTotal Memory: ${(mem.total/1000000000).toFixed(2)}GB \nUsed Memory: ${(mem.used/1000000000).toFixed(2)}GB \nFree Memory: ${(mem.free/1000000000).toFixed(2)}GB \n**Operating System** \n${os.distro} ${os.release} ${os.arch}`)
							sysmsg.delete()
							message.channel.send(embed)
							})
						})
					})
				})
			})
			break;

		case('emojisteal'):
			if (!message.member.hasPermission('MANAGE_EMOJIS', { checkAdmin: true, checkOwner: true })) return message.channel.send(deniedEmbed('You need the Manage Emoji\'s permission!'))
			if (!args[0]) {
				let msgsteal = await message.channel.send(`emojisteal ${message.author.id}`)
				let embed = new discord.MessageEmbed()
				.setTitle('Emoji Steal')
				.setColor('ORANGE')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('Add reactions to this message to add them to your server')
				.setFooter(`Don't have nitro? Use ${prefix}emojisteal <url> <emojiname> \nAdd single emojis fast? Use ${prefix}emojisteal <emoji>`)
				msgsteal.edit(embed)
			} else {
				if (args[0].includes("https://")) {
					if (!args[1]) return message.channel.send(deniedEmbed('You need to specify a name when adding emojis via url'))
					if (message.guild.emojis.cache.find(emoji => emoji.name == args[1])) return message.channel.send(deniedEmbed(`An emoji with the name :${args[1]}: already exists`)).then(x => {x.delete({timeout:4000})})
					message.guild.emojis.create(args[0], args[1]).catch(err =>{message.channel.send(deniedEmbed('There was an unknown issue.')).then(x => {x.delete({timeout:5000})})})
					message.channel.send(`Created :${args[1]}:`).catch(err => {return})
				}
				if (!args[1] && args[0]) {
					const msg = args[0].match(/<a?:.+:\d+>/gm)
					let url = ''
					if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
						url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
					} else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
						url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
					}
          if (!emoji) return message.channel.send(deniedEmbed('There was no emoji found.')).then(x => {x.delete({timeout:5000})})
					if (!emoji[0]) return message.channel.send(deniedEmbed('There was an unknown issue.')).then(x => {x.delete({timeout:5000})})
					let emojiname = emoji[0].slice(2, (emoji[0].search(emoji[1]))-1)
					if (message.guild.emojis.cache.find(emoji => emoji.name == emojiname)) return message.channel.send(deniedEmbed(`An emoji with the name :${emojiname}: already exists`)).then(x => {x.delete({timeout:4000})})
					message.guild.emojis.create(url, emojiname).catch(err => {message.channel.send(deniedEmbed(`An error has occurred. \n${err}`))})
          message.channel.send(`Created :${emojiname}:`)
				} 
			}
			break;

		case('av'):
		case('avatar'):
			message.delete()
			let avembed = ''
			if (!args[0]) {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.setColor('BLUE')
				.setImage(message.author.avatarURL()+"?size=1024")
				.setURL(message.author.avatarURL()+"?size=1024")
			} else {
				avembed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.mentions.users.first().username}`)
				.setColor('BLUE')
				.setImage(message.mentions.users.first().avatarURL({dynamic:true})+"?size=1024")
				.setURL(message.mentions.users.first().avatarURL({dynamic:true})+"?size=1024")
			}
			message.channel.send(avembed)
			break;

		case('r34'):
		case('e621'):
		case('db'):
		case('pa'):
		case('gb'):
			if (nsfwSetting == 'Disabled') return message.channel.send(deniedEmbed(`NSFW is disabled entirely in this guild`)).then(d => {d.delete({timeout:5000})})
				if (message.channel.topic) {
					if (!message.channel.topic.includes('NSFW')) {
						if (!message.channel.nsfw) {
							let nembed = new discord.MessageEmbed()
							.addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
							.setColor('GREEN')
							.setTimestamp()
							.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
							message.channel.send(nembed)
							return;
						}
					}
				} else if (!message.channel.nsfw) {
					let nembed = new discord.MessageEmbed()
					.addField('Not a marked channel','If this was supposed to work, mark channel as NSFW or include NSFW in channel topic')
					.setColor('GREEN')
					.setTimestamp()
					.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
					message.channel.send(nembed)
					return;
				}
				if (!args[0]) return message.channel.send(deniedEmbed('No tags specified'))
				var nothingnesstime = 0
				args.forEach(item => {if (item.toLowerCase().includes('loli') || item.toLowerCase().includes('shota')) nothingnesstime = 1;})
				if (nothingnesstime == 1) return
			booru.search(command, args, { limit: 150 })
			.then(posts => {
				let listing = new Array()
				for (let post of posts) {
					if (!listing[0]) {
						listing[0] = post
					} else {
						listing[listing.length] = post
					}
				}
				let post = listing[Math.floor(Math.random() * listing.length )]
				if (!post) return message.channel.send(deniedEmbed('Module Error \nNo post returned.')).then(x => {x.delete({timeout:5000})})
				let color = ''
				if (post.rating == 's') color = 'GREEN'
				if (post.rating == 'q') color = 'YELLOW'
				if (post.rating == 'e') color = 'RED'
				const embed = new discord.MessageEmbed()
					.setTitle(post.id)
					.setDescription('Click title for link!')
					.setURL(post.postView)
					.setImage(post.fileUrl)
					.setColor(color)
					.setTimestamp()
					.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
					message.channel.send(embed)
			})
			.catch(e => message.channel.send(deniedEmbed(`Module Error \n${e}`)).then(x => {x.delete({timeout:7000})}))
			break;

		case('userinfo'):
			var userinfocolor = ''
			var referenceduser = message.author
			if (message.mentions.users.first()) referenceduser = message.mentions.users.first()
			var referencedmember = message.guild.member(message.author)
			if (message.mentions.members.first()) referencedmember = message.mentions.members.first()
			switch(referenceduser.presence.status){
				case('online'):
					userinfocolor = 'GREEN'
					break
				case('idle'):
					userinfocolor = 'YELLOW'
					break
				case('dnd'):
					userinfocolor = 'RED'
					break
			}
			var mutualcounter = 0
			client.guilds.cache.forEach(guild => {
				guild.members.cache.forEach(user => {
					if (user.id == referenceduser.id) mutualcounter = mutualcounter + 1
				})
			})
			var userinforoles = new Array()
			referencedmember.roles.cache.forEach(role => {
				if (role.name == '@everyone') return
				if (!userinforoles[0]) userinforoles[0] = `<@&${role.id}>`
				else userinforoles[userinforoles.length] = `<@&${role.id}>`
			})
			const userinfoembed = new discord.MessageEmbed()
			.setAuthor(referenceduser.tag, referenceduser.avatarURL()+'?size=1024')
			.setDescription('User information')
			.setColor(userinfocolor)
			.addField(`Account Registered Date`, moment(referenceduser.createdAt).format('LLLL'), true)
			.addField(`Account Server Join Date`, moment(referencedmember.joinedAt).format('LLLL'), true)
			.addField(`Online Presence`,referenceduser.presence.status, true)
			.addField(`Roles \[${userinforoles.length}\]`, `${userinforoles.join(" ")}`,true)
			.addField(`Account Identification`, `${referenceduser.tag} \n${referenceduser.id}`, true)
			.addField(`Bot Mutual Servers`, mutualcounter, true)
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
			message.channel.send(userinfoembed)
			break;

}});

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
// Minesweeper Generator by JochCool on GitHub. Thanks!
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
}
function deniedEmbed (error) {
  const deniedEmbed = new discord.MessageEmbed()
  .setTitle('Error')
  .setDescription(error)
  .setThumbnail(cross)
  .setColor('RED')
  .setTimestamp();
  return deniedEmbed
}
function repeat(func, times) {
	func();
	times && --times && repeat(func, times);
}
let valid = new Array();
valid = ['8ball', 'Random_hentai_gif', 'meow', 'erok', 'lizard', 'feetg', 'baka', 'v3', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'smallboobs', 'goose', 'poke', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'wallpaper', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'kiss', 'pussy_jpg', 'woof', 'hug', 'keta', 'cuddle', 'eroyuri', 'slap', 'cum_jpg', 'waifu', 'gecg', 'tits', 'avatar', 'holoero', 'classic', 'kemonomimi', 'feet', 'gasm', 'spank', 'erofeet', 'ero', 'solo', 'cum', 'smug', 'holo', 'nsfw_neko_gif']
client.on('message', (message) => {
	if (!message.guild || message.author.bot) return;
	if (!data.get(`guild.${message.guild.id}.prefix`)) {
		var prefix = '!'
	} else {
		var prefix = data.get(`guild.${message.guild.id}.prefix`)
	}

	if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
		let eb = new discord.MessageEmbed()
		.setTitle('Hey! I\'m Aqua!')
		.setDescription(`My prefix in this guild is currently **${prefix}**`)
		.setTimestamp()
		.setColor('BLUE')
		.setThumbnail(`${client.user.avatarURL()}?size=1024`)
		message.channel.send(eb)
		return;
	}
})
var lastperson = ''
client.on('message', (message) => {
	if (message.channel.id != '839293490138972160') return
	let content = message.content.toLowerCase()
	if (content == 'gm' || content == 'gn') {
		if (message.author.id == lastperson) return message.delete()
		return lastperson = message.author.id
	} else return message.delete()
})
/*
client.on('guildMemberAdd', (member) => {
  if (data.get(`guild.${member.guild.id}.youthkickAge`) != 'Disabled') {
    console.log((( member.user.createdTimestamp - Date.now())/1000)/86400)
  }
})
*/
client.on('messageDelete', message => {
	if (message.author.bot) return;
  deletedMessages.set(message.channel.id, message);
});
client.on("messageUpdate", message => {
	if (message.author.bot) return;
  editedMessages.set(message.channel.id, message);
});
client.on('message', (message) => {
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
})
client.on('message', (message) => {
	//send afk removal msg
	if (data.get(`user.${message.author.id}.afk.reason`)) {
		if (((Date.now()/1000).toFixed(0) - data.get(`user.${message.author.id}.afk.timestamp`)) <= 5) return
		data.set(`user.${message.author.id}.afk.reason`, '')
		data.set(`user.${message.author.id}.afk.timestamp`, '')
		const embed = new discord.MessageEmbed()
		.setTitle(`Welcome back!`)
		.setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
		.setDescription(`Your AFK status was removed.`)
		.setColor("GREEN")
		message.channel.send(embed).then(x => {x.delete({timeout:5000})})
	}
})
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.content.includes('emojisteal') && reaction.message.author == client.user && user != client.user) {
		reaction.users.remove(user.id)
		if (user.id != reaction.message.content.slice('emojisteal '.length)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
		if (!reaction.emoji.url) return reaction.message.channel.send(deniedEmbed('Couldn\'t find emoji url, might be a unicode emoji so it should already be in your server')).then(x => {x.delete({timeout:4000})})
		if (reaction.message.guild.emojis.cache.find(emoji => emoji.name == reaction.emoji.name)) return reaction.message.channel.send(deniedEmbed(`An emoji with the name :${reaction.emoji.name}: already exists`)).then(x => {x.delete({timeout:4000})})
		reaction.message.guild.emojis.create(reaction.emoji.url, reaction.emoji.name).catch(err =>{reaction.message.channel.send(err)})
		reaction.message.channel.send(`Created <:${reaction.emoji.name}:${reaction.emoji.id}>`).then(x => {x.delete({timeout:10000})})
	}

	//help menu handler

	if (reaction.message.content.includes("Help Menu") && reaction.message.author == client.user && user != client.user) {
		reaction.users.remove(user.id)
		if (user.id != reaction.message.content.slice('Help Menu '.length)) return user.send(deniedEmbed('You didn\'t instate this command and hence cannot add reactions'))
		
		if (!data.get(`guild.${reaction.message.guild.id}.prefix`)) { //prefix
			var prefix = '!'
		} else {
			var prefix = data.get(`guild.${reaction.message.guild.id}.prefix`)
		}
		if (!data.get(`guild.${reaction.message.guild.id}.nsfwSetting`)) { //whether nsfw is allowed
			var nsfwSetting = 'Enabled'
		} else {
			var nsfwSetting = data.get(`guild.${reaction.message.guild.id}.nsfwSetting`)
		}
		if (!data.get(`guild.${reaction.message.guild.id}.snipeSetting`)) { //whether privacy is better kekw
			var snipeSetting = 'Enabled'
		} else {
			var snipeSetting = data.get(`guild.${reaction.message.guild.id}.snipeSetting`)
		}

		let helpEmbeds = new Array()
		helpEmbeds[0] = helpEmbed

		helpEmbeds[1] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Miscellaneous')
		.setColor('YELLOW')
		.addField(`${prefix}credits`, `${prefix}about also works, thanks everyone who helped!`)
		.addField(`${prefix}botfact`, `Get a random message about bot development. Can include rage from devs or fun facts!`)
		.addField(`${prefix}links`, `Aliases include ${prefix}link ${prefix}invite ${prefix}github. Posts links to important stuff.`)
		.addField(`${prefix}suggest`, `Use this to post suggestions to Aquacious Support`)
		.addField(`${prefix}ping`, `Get bot ping.`)
		.addField(`${prefix}system`, `Aliases include ${prefix}sysstat ${prefix}sysstats ${prefix}sysinfo. Get server and process info.`)

		helpEmbeds[2] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Moderation')
		.setColor('YELLOW')
		.setFooter('Note that you do require the appropriate permissions for every command.:')
		.addField(`${prefix}clear`, `Alias is ${prefix}cl. Bulk delete messages.`)
		.addField(`${prefix}kick`, `Kick people, reasons supported`)
		.addField(`${prefix}ban`, `Ban people, reasons supported`)

		helpEmbeds[3] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Configuration')
		.setColor('YELLOW')
//	.addField(`${prefix}settings`, `${prefix}preferences too. Has help instructions. Used to configure server settings.`) removed since i got rid of teh old settigs menu
		.addField(`${prefix}usersettings`, `${prefix}userprefs too. Has help instructions. Used to configure personal settings.`)
		.addField(`${prefix}guildsettings`, `${prefix}guildprefs too. Has help instructions. Used to configure server settings.`)

		helpEmbeds[4] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('NSFW')
		.setColor('YELLOW')
		.addField(`${prefix}hentai`, `Also ${prefix}h. Do ${prefix}hentai help. ${nsfwSetting} in this server.`)
		.addField(`${prefix}r34`, `NSFW from rule34.xxx. ${prefix}r34 <tags>. ${nsfwSetting} in this server.`)
		.addField(`${prefix}e621`, `NSFW from e621.net. ${prefix}e621 <tags>. ${nsfwSetting} in this server.`)
		.addField(`${prefix}db`, `NSFW from danbooru.donmai.us. ${prefix}db <tags>. ${nsfwSetting} in this server.`)
		.addField(`${prefix}gb`, `NSFW from gelbooru.com. ${prefix}gb <tags>. ${nsfwSetting} in this server.`)
		.addField(`${prefix}pa`, `NSFW from rule34.paheal.net. ${prefix}pa <tags>. ${nsfwSetting} in this server.`)

		helpEmbeds[5] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Fun')
		.setColor('YELLOW')
		.addField(`${prefix}avatar`, `Alias is ${prefix}av. Get a user's avatar.`)
		.addField(`${prefix}minesweeper`, `Alias is ${prefix}ms. Do ${prefix}ms help`)
		.addField(`${prefix}8ball`, `Ask the 8ball a question!`)
		.addField(`${prefix}mcfetch`, `Get data from a minecraft server IP.`)
		.addField(`${prefix}emojisteal`, `Add emojis to your server with or without nitro!`)

		helpEmbeds[6] = new discord.MessageEmbed()
		.setTitle('Help Menu')
		.setDescription('Chat')
		.setColor('YELLOW')
		.addField(`${prefix}snipe`, `Get the most recently deleted message. ${snipeSetting} in this server.`)
		.addField(`${prefix}esnipe`, `Get the most recently edited message. ${snipeSetting} in this server.`)
		.addField(`${prefix}jumbo`, `Make that emoji big`)
		.addField(`${prefix}afk`, `Let everyone know that you went to get some coffee`)
		.addField(`${prefix}say`, `Make me say stupid stuff i guess`)

		let pagenum = 0
		if (reaction.emoji.name == '⏹') pagenum = -1
		if (reaction.emoji.name == '🏠') pagenum = 0
		if (reaction.emoji.name == '1️⃣') pagenum = 1
		if (reaction.emoji.name == '2️⃣') pagenum = 2
		if (reaction.emoji.name == '3️⃣') pagenum = 3
		if (reaction.emoji.name == '4️⃣') pagenum = 4
		if (reaction.emoji.name == '5️⃣') pagenum = 5
		if (reaction.emoji.name == '6️⃣') pagenum = 6
		if (pagenum == -1) return await reaction.message.delete()
		reaction.message.edit(helpEmbeds[pagenum])
	}
  if (reaction.message.content.includes("Bot Stats") && reaction.message.author == client.user && user != client.user && reaction.emoji.name == '🔄') {
    reaction.users.remove(user.id)
    const embed = new discord.MessageEmbed()
		.setTitle("Bot Statistics")
		.setDescription("Thanks for adding me! llsc12 is happi kek")
		.addField('Servers I\'m In', client.guilds.cache.size, true)
		.addField('Members I\'m Serving', client.guilds.cache.reduce((a, g) => a + g.memberCount, 0), true)
		.addField('Members in this guild', reaction.message.guild.memberCount, true)
		.setColor("GREEN")
		reaction.message.edit(embed)
  }
})

client.login(tokens.token)

//client.on('debug', (e) => {console.log(e)})
client.on('warn', (e) => {console.log(e)})
client.on('error', (e) => {console.log(e)})