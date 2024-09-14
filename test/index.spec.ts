// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});
});

describe('RPC Tests', () => {
	const externalUserId = 'EXTERNAL_USER_ID';
	const badSession = 'REJECT_ME';
	const goodSession = 'ACCEPT_ME';

	it('should be able to call JSRPC PingService', async () => {
		const res = await env.PING_SERVICE.ping();
		expect(res).toBe('pong');
	});

	it('should reject user sessions appropriately', async () => {
		using userService = await env.AUTHENTICATED_USER_SERVICE.getUserService(externalUserId, badSession);
		expect(userService).toBeNull();
	});

	it('should create a userService with a good cookie', async () => {
		using userService = await env.AUTHENTICATED_USER_SERVICE.getUserService(externalUserId, goodSession);
		expect(userService).not.toBeNull();
		const userId = await userService!.getUserExternalId();
		expect(userId).toBe(externalUserId);
	});
});
