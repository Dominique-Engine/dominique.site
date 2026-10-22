# Cloudflare deployment

The production application runs as the `dominique-site` Worker with Workers Static Assets. Hygraph remains the content backend; Algolia remains the browser search provider. The old `dominique-web` Cloudflare Pages project belongs to the separate engine library and is unrelated.

## Local setup and verification

Use Node.js 22.16.0 or a newer Node.js 22 release:

```sh
npm ci
npm run tooling:install
npm run build
npm run typegen
npm run typecheck
```

Wrangler 4 is pinned in `tooling/` because Remix 2.15 has an optional Wrangler 3 peer dependency. The app does not use that optional development proxy. Keeping deployment tooling separate preserves the existing Remix and Vite lockfile versions without overriding their peer requirements.

Create an ignored `.dev.vars` file using the production variable names, then run `npm run preview` to test the Worker locally. Do not commit environment files. The required names are:

- `API_URL`: Hygraph GraphQL endpoint.
- `DEV_MODE_KEY`: authorization key for the existing devmode route.
- `ALGOLIA_APP_ID`: browser search application ID.
- `ALGOLIA_SEARCH_API_KEY`: browser search-only key.

`ALGOLIA_API_KEY` belongs to the offline indexing script and is not required by this Worker.

For the existing Vite development workflow, keep the same names in an ignored `.env` file and run `npm run dev`. The Vite config loads that file in Node, and the SSR entry imports the React web-stream renderer so Vite development and the Worker use the same implementation.

## Production and continuous deployment

The Wrangler config names the account and Worker explicitly. Confirm `npm run wrangler -- whoami` shows account `3b3aaff96cd9b76205198a4030053313` before deploying.

For a first deployment, upload runtime secrets and code atomically using a protected local JSON or dotenv file:

```sh
npm run build
npm run wrangler -- deploy --secrets-file /absolute/path/to/protected-secrets.json
```

Subsequent deployments preserve existing secrets:

```sh
npm run deploy
```

Workers Builds configuration:

- Repository root directory: `/`.
- Production branch: `master` after the migration pull request is merged.
- Node version: `22.16.0` (set `NODE_VERSION`).
- Build command: `npm run tooling:install && npm run build && npm run typecheck`.
- Deploy command: `npm run wrangler -- deploy`.
- No CMS or Algolia secrets are needed as build variables. Configure the four names above as Worker runtime secrets.

Asset paths remain under `/assets/` and the public directory. The Worker runs first to preserve the canonical `dengine.site` to `www.dengine.site` 308 redirect for every path, then serves assets or invokes Remix. HTTP requests on both production hostnames redirect to HTTPS; encoded paths and queries are preserved. All responses preserve the previous `Strict-Transport-Security: max-age=63072000` policy. Encoded documentation slugs, Remix data requests, unknown-route 404 responses, and CMS-backed pages retain their behavior. Logs and sampled traces are enabled.

## Cutover and rollback

The existing hostnames use Workers Routes: `dengine.site/*` and `www.dengine.site/*` in the `dengine.site` zone. These routes are declared in `wrangler.jsonc`. Cloudflare DNS must proxy both hostnames to an originless placeholder (`A 192.0.2.0`); the Worker handles every request and never contacts that address. Keep those DNS records proxied. This configuration uses routes without `custom_domain: true`, so deployments do not attempt to replace existing DNS records automatically.

Validate the workers.dev candidate before changing the existing hostname DNS records. Keep the Vercel deployment active until both hostnames, TLS, redirects, all documentation/blog/download routes, client navigation, and assets pass checks. Pause Vercel only after those checks. Preserve the previous DNS targets and Vercel deployment for rollback; restoring the previous DNS targets with proxying disabled bypasses the Worker routes.

The migration assessment records baseline behavior. Existing Vercel behavior includes React hydration warnings and an Algolia application whose hostnames no longer resolve; these are separate from the hosting migration.
