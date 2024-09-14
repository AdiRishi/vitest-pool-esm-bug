import { WorkerEntrypoint } from 'cloudflare:workers';
import { PingService } from './PingService';
import { AuthenticatedUserService } from './authenticated-user-service';

// RPC Service Exports
export { PingService, AuthenticatedUserService };

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} as LocalExportedHandler<Env>;
