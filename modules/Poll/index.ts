import { Client } from 'discord.js';
import { MessageHandler } from '../../class/Observalbes/messageHandler.js';

export function mod(client: Client) {
	const messageHandler = new MessageHandler(client, {
		poll: /^Poll: ([^]+)$/,
	});

	messageHandler.on('poll', async ({ msg, match }) => {
		const lines = msg.content.split('\n');
		if (lines.length == 1) {
			msg.react('🔺');
			msg.react('🔻');
		} else {
			const choices = lines.slice(1);
			const choiceEmoji = choices.map((x) =>
				x[0] == '<' ? x.match(/^<:[a-zA-Z]+:([0-9]+)>/)[1] : x.split(' ')[0]
			);
			try {
				choiceEmoji.forEach((x) => msg.react(x));
			} catch (e) {}
		}
	});
}
