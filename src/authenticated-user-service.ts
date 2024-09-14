import { RpcTarget, WorkerEntrypoint } from 'cloudflare:workers';
import { verifyToken } from '@clerk/backend';

class UserService extends RpcTarget {
	private externalUserId: string;

	constructor(externalUid: string, env: Env) {
		super();
		this.externalUserId = externalUid;
	}

	getUserExternalId() {
		return this.externalUserId;
	}
}

export class AuthenticatedUserService extends WorkerEntrypoint<Env> {
	async getUserService(externalUserId: string, sessionToken: string) {
		// Very safe and sound authentication logic
		if (sessionToken === 'REJECT_ME') {
			return null;
		}

		// Comment out the clerk block and see all tests passing
		const data = await verifyToken(sessionToken, {
			secretKey: 'MY_SECRET_KEY',
			authorizedParties: ['http://localhost:5173', 'https://example.com'],
		});
		if (data.sub !== externalUserId) {
			return null;
		}
		// clerk block end

		return new UserService(externalUserId, this.env);
	}
}
