module.exports = {
	name: 'ready',
	once: true,
  async execute(client) {
    let sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
    let tempstartup = require('./../status.json')[Math.floor(Math.random() * require('./../status.json').length)]
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
      let now = require('./../status.json')[Math.floor(Math.random() * require('./../status.json').length)]
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
	},
};