const discord = require("discord.js"), chalk = require('chalk'), enmap = require('enmap'), fs = require("fs"), Discord = require("discord.js"), si = require('systeminformation'), nodeOS = require('os'), fetch = require('node-fetch'), mcsrv = require('mcsrv'), numberEmoji = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"], tokens = require('./token.json'), neighbourLocations = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}], sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms)), https = require('https'), booru = require('booru'), moment = require('moment'), AutoPoster = require('topgg-autoposter')
const client = new Discord.Client({ 
  messageSweepInterval: 60, 
  disableMentions: 'everyone'
}) // Create a client
const data = new enmap({ name: "botdata", dataDir:"./data"});
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.editedMessages = new Discord.Collection();
client.deletedMessages = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
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
      console.log(chalk.red(`File (${folder}) not in subdirectory, please move it.`))
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
  async function errored(err) {
    console.log(chalk.redBright(err))
    await sleep(3000)
    client.channels.cache.get('835322244128571433').send(deniedEmbed(`The bot failed to load \n${err}`))
    await sleep(200)
    process.exit(0)
  }
  errored(err)
}

client.on('message', (message) => {
  
})

client.on("message", async message => { //commands
  //get prefix
  if (!message.guild || message.author.bot) return
	// Retrieve guild settings and shit
  if (!data.get(`guild.${message.guild.id}.prefix`)) { //prefix
    var prefix = '!'
  } else {
    var prefix = data.get(`guild.${message.guild.id}.prefix`)
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
  if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //prefix
    var nsfwSetting = 'Enabled'
  } else {
    var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
  }

  // Le command handler :)
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).split(" ")
  let command = args.shift().toLowerCase()

	switch(command){

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
				.addField('x', 'The horizontal board size', true)
				.addField('y', 'The vertical board size', true)
				.addField('bombs', 'Quantity of bombs to place on the board', true)
				.addField('StartUncovered?', `Set to true if you want to have all 0's unhidden from the start`, true)
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
		.setFooter('Anyone who pings you will receive this message.', `https://github.com/llsc12/Aquacious/raw/main/aicon.gif`)
		message.channel.send(afkembed).then(x => {x.delete({timeout:5000})})
		break;

		case('mcfetch'):
			const mcmsg = await message.channel.send("Grabbing data")
			if (!args[0]) return msg.edit('Wait- No ip address?!')
			mcmsg.edit('Loading... If this doesn\'t disappear, the bot failed.') // :'(
			let dldata = NaN;
			try {
				dldata = await mcsrv(args[0])
			} catch {
				return message.channel.send(deniedEmbed('Failed to retreive data, try again later. \nIf this persists, contact us in the support server.')).then(x => {x.delete({timeout:8000})})
			}
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
					if (players == 'Nobody Online') {players = `${item}`} else {players = players+`\n${item} `}
				})
			}

			let mcembed = new Discord.MessageEmbed()
			.setColor('#00FFF4')
			.setDescription(`${hostname} Server Status`)
			.addField('Hostname',hostname, true)
			.addField('Version',dldata.version, true)
			.addField('Direct IP',dldata.ip, true)
			.addField('Player Count',dldata.players.list.length+'/'+dldata.players.max+` currently online`, true)
			.addField('Players Online', players, true)
			.addField('MOTD', `${lineone}\n${linetwo}`, true)
			.setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
			mcmsg.edit('This command uses api.mcsrvstat.us')
			mcmsg.edit(mcembed)
			break;

		case('emojisteal'):
			message.delete()
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
					message.guild.emojis.create(args[0], args[1]).catch(err =>{message.channel.send(deniedEmbed(`There was an unknown issue. \n${err}`)).then(x => {x.delete({timeout:5000})})})
					message.channel.send(`Created :${args[1]}:`).then(x => {x.delete({timeout:5000})})
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
					let sliceamount = 2
					if (emoji[0].slice(1,2) == 'a') sliceamount = 3
					let emojiname = emoji[0].slice(sliceamount, (emoji[0].search(emoji[1]))-1)
					if (message.guild.emojis.cache.find(emoji => emoji.name == emojiname)) return message.channel.send(deniedEmbed(`An emoji with the name :${emojiname}: already exists`)).then(x => {x.delete({timeout:4000})})
					message.guild.emojis.create(url, emojiname).catch(err => {message.channel.send(deniedEmbed(`An error has occurred. \n${err}`))})
          message.channel.send(`Created :${emojiname}:`)
				} 
			}
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

//client.on('debug', (e) => {console.log(e)})
client.on('warn', (e) => {console.log(e)})
client.on('error', (e) => {console.log(e)})