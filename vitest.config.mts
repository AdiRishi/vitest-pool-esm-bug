import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.vitest.toml' },
			},
		},
		// Attempted to solve the issue with the following, but it didn't work
		deps: {
			inline: ['snakecase-keys', 'snake-case'],
		},
	},
});
