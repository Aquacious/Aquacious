const discord = require('discord.js'), ytpl = require('ytpl'), fetch = require('node-fetch')
module.exports = {
  name:'test',
  hidden:true,
  description:'Test command',
  async execute(client, message, args) {
    /*let playlist = await ytpl('UU_aEa8K-EOJ3D6gOs7HcyNg', {limit:Infinity}).catch(err => {console.error(err);});
    for (item of playlist.items) {
    console.log(`${item.index}. ${item.title}`)
    }
    
    function urlParse (url) {
      // thanks to Intelli :)
      let query = url.split('?')[1]
      let params = query.split('&')
      let array = new Array()
      for (each of params) {
        let split = each.split('=')
        array[split[0]]=split[1]
      }
      return array
    }
    let stuff = urlParse(args[0])
    let array = new Array()
    for (property in stuff) {
      array[array.length] = `${property}: ${stuff[property]}`
    }
    let embed = new discord.MessageEmbed()
    .setTitle('URL Parse')
    .setDescription(array.join('\n'))
    console.log(stuff)
    message.channel.send(embed)
    */
    async function parcilityGetRepo(args){
      if (!args) return null
      let fetched = await fetch(`https://api.parcility.co/?url=${args}/`).then(res => res.json())
      if (fetched.code !== 200) return null
      else return fetched.data
    }

    const repo = await parcilityGetRepo(args[0])
    if (repo == null) return
    let embed = new discord.MessageEmbed()
    .setTitle('**'+repo.Label+'**')
    .setDescription(repo.Description)
    .addField('**Packages**', repo.package_count, true)
    .addField('**Sections**', repo.section_count, true)
    .setURL(repo.repo)
    .addField('**URL**', repo.repo)
    .addField('**Add Repo**', `[Click Here](https://cydia.saurik.com/api/share#?source=${repo.repo})`, true)
    .addField('**More Info**', `[View on Parcility](https://parcility.co/${repo.repo})`, true)
    .setTimestamp()
    if (repo.Icon) embed.setThumbnail(repo.Icon)
    message.channel.send(embed)
  }
}