import Discord from 'discord.js';
import { stat } from 'fs/promises';
import { conf } from './config.js';

const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(conf.token);

async function main() {
	for (const mod of conf.enabledModules) {
		if (mod.endsWith('/')) {
			const modInit = (await import(`./modules/${mod}/index.js`)).mod;
			modInit(client);
		} else {
			const modInit = (await import(`./modules/${mod}.js`)).mod;
			modInit(client);
		}
	}
}

main();
