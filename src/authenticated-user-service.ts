import { RpcTarget, WorkerEntrypoint } from 'cloudflare:workers';

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

		return new UserService(externalUserId, this.env);
	}
}
