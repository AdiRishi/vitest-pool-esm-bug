import { WorkerEntrypoint } from 'cloudflare:workers';

export class PingService extends WorkerEntrypoint<Env> {
	ping() {
		return 'pong';
	}
}
