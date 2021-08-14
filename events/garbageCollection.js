const discord = require('discord.js')
module.exports = {
  name:'ready',
  once: true,
  execute(client) {
    setInterval(() => {
      //this literally resets the collections every 2 days 
      client.editedMessages = new discord.Collection();
      client.deletedMessages = new discord.Collection();
      client.msgOwners = new discord.Collection();
      console.log('Cleared junk data')
    }, 259200000);
  }
}