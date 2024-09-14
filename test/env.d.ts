import { default as WorkerDefault, PingService, AuthenticatedUserService } from '../src/index';

declare module 'cloudflare:test' {
	// Controls the type of `import("cloudflare:test").env`
	interface ProvidedEnv extends Env {
		PING_SERVICE: Service<PingService>;
		AUTHENTICATED_USER_SERVICE: Service<AuthenticatedUserService>;
	}

	// Ensure RPC properties and methods can be accessed with `SELF`
	// NOTE THIS DOES NOT WORK??
	export const SELF: Service<WorkerDefault>;
}
