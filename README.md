# site

Personal site — Osadebamwen Uwadiae. Live at [ujo4eva.fyi](https://ujo4eva.fyi).

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), served as static assets from a Cloudflare Worker.

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build to `./dist/` |
| `pnpm preview` | Preview production build |
| `pnpm wrangler dev` | Serve `./dist/` through the Worker locally (run `pnpm build` first) |

## Deploys

Cloudflare Workers Builds is connected to this repo. Every push to `master` runs `pnpm build`, then `npx wrangler deploy`, which uploads `dist/` and binds the Worker to `ujo4eva.fyi`. Config lives in [`wrangler.jsonc`](./wrangler.jsonc).
