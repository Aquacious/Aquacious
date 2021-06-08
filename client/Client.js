const { Client, Collection } = require('discord.js');
module.exports = class extends Client {
	constructor() {
		super({
			disableMentions: 'everyone',
			messageSweepInterval: 60,
			shards: 'auto'
		});
		this.commands = new Collection();
		this.queue = new Map();
	}
};