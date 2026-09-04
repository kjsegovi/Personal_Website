# Kevin Segovia — Portfolio

A static single-page portfolio built with
[vinext](https://github.com/cloudflare/vinext) (Next.js on Vite) and deployed to
Cloudflare Pages.

## Prerequisites

- Node.js `>=22.13.0`
- [pnpm](https://pnpm.io)

## Quick Start

```bash
pnpm install
pnpm run dev
pnpm run build
```

## Included Shape

- Site content lives under `app/` (`page.tsx`, `layout.tsx`, `globals.css`)
- `worker/index.ts` is the Cloudflare worker entry point (vinext + image optimization)
- `vite.config.ts` configures the vinext + Cloudflare plugins for local development
- Images are served from `public/`

## Useful Commands

- `pnpm run dev`: start local development
- `pnpm run build`: build the static output to `dist/`
- `pnpm test`: build and verify the rendered HTML (content + accessibility)
- `pnpm run lint`: run ESLint

## Deploy

Build with `pnpm run build` and point Cloudflare Pages at the `dist/` output.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Cloudflare Pages](https://pages.cloudflare.com)
