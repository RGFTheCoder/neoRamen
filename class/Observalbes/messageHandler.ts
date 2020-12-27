import { Observable } from '../Observable.js';
import { Dict, SDict } from '../../TS/TS.js';
import { objKeys, zipObj } from '../../util/objects.js';
import { Client, Message } from 'discord.js';

type KeyData = { msg: Message; match: RegExpMatchArray };

export class MessageHandler<ControlNames extends string> extends Observable<
	SDict<ControlNames, KeyData>
> {
	client: Client;

	constructor(client: Client, keys: SDict<ControlNames, RegExp>) {
		super();
		this.client = client;

		client.on('message', (msg) => {
			for (const id in keys) {
				if (keys[id].test(msg.content)) {
					this.emitEvent(id, { msg, match: msg.content.match(keys[id]) });
				}
			}
		});
	}
}
