# Vitest ESM Bug Reproduction Repository

---

## Problem Description

When running the test suite in this repository, you may encounter the following error:

```
[vpw:inf] Starting isolated runtimes for vitest.config.mts...
 ❯ test/index.spec.ts (0)


 FAIL  test/index.spec.ts [ test/index.spec.ts ]
TypeError: Cannot use require() to import an ES Module.
 ❯ Users/arishi/playground/vitest-pool-esm-bug/node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js?mf_vitest_no_cjs_esm_shim:4:23


 Test Files  1 failed (1)
      Tests  no tests
   Start at  15:35:02
   Duration  803ms (transform 24ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 136ms)

[vpw:dbg] Shutting down runtimes...
 ELIFECYCLE  Test failed. See above for more details.
```

## Steps to Reproduce

1. Clone this repository:
2. Install dependencies by running `pnpm install`.
3. Run the test suite by executing `pnpm test`.
4. Observe the error output mentioned above.

#### Conditional Code Block

In the `src/authenticated-user-service.ts` file, there is a block of code that can be commented out to bypass the error. Locate the following code snippet:

```typescript
Copy code
// Comment out the clerk block and see all tests passing
const data = await verifyToken(sessionToken, {
	secretKey: 'MY_SECRET_KEY',
	authorizedParties: ['http://localhost:5173', 'https://example.com'],
});
if (data.sub !== externalUserId) {
	return null;
}
// clerk block end
```

By commenting out the Clerk authentication block, all tests will pass, demonstrating the root cause of the issue tied to the ESM import.
