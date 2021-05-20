const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableMentions: 'everyone',
			messageSweepInterval: 60,
		});

		this.commands = new Collection();

		this.queue = new Map();

		this.config = config;
	}
};