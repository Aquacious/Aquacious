module.exports = {
  name:'message',
  execute(client, message) {
    const enmap = require('enmap'), data = new enmap({name:'botdata', dataDir:'./data'})
    if (!data.get('msgCounterTotal')) data.set('msgCounterTotal',0)
    try {data.set('msgCounterTotal', parseInt(data.get('msgCounterTotal'))+1)} catch (e) {console.log('Can no longer store messages!')}
  }
}
