const discord = require('discord.js'), ytpl = require('ytpl')
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

  }
}