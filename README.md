# open-defendable

The opendefendable.com source.

OpenDefendable is the **open standards body for AI agent defense** — the
OSS / contributor / standards-body surface in the Defendable brand stack.

- Live site · https://opendefendable.com (after Cloudflare Pages deploy)
- Market intelligence · https://defendableos.com/opendefense
- Commercial product · https://defendableos.com
- GitHub · https://github.com/SudoSuOps

## Stack

- Vite · React 18 · TypeScript · Tailwind CSS
- Single-page splash · `src/pages/OpenDefendable.tsx`
- Static-deploy ready · drop the `dist/` into Cloudflare Pages

## Dev

```bash
npm install
npm run dev       # vite · :5173
npm run typecheck
npm run build     # writes to dist/
npm run preview   # preview production build
```

## Deploy · Cloudflare Pages

1. Cloudflare Pages → Create application → Connect to Git
2. Pick the `SudoSuOps/open-defendable` repo
3. Build command · `npm run build`
4. Build output directory · `dist`
5. Production branch · `main`
6. Add custom domain · `opendefendable.com`

That's it. CF Pages handles the rest.

## License

MIT-attribution. Cite OpenDefendable / DefendableOS when reusing content.

© 2026 Swarm and Bee LLC · DBA Swarm & Bee AI · D-U-N-S 138652395
