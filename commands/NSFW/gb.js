const discord = require('discord.js'), booru = require('booru'), enmap = require('enmap')
module.exports = {
  name:"gb",
  description:"Get posts from gelbooru",
  category:'NSFW',
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
		const data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get(`guild.${message.guild.id}.nsfwSetting`)) { //whether nsfw is allowed
      var nsfwSetting = 'Enabled'
    } else {
      var nsfwSetting = data.get(`guild.${message.guild.id}.nsfwSetting`)
    }
    let command = this.name
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
  }
}