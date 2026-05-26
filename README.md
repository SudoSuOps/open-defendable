# open-defendable

The opendefendable.com source.

OpenDefendable is the **open-source truth surface** in the Defendable brand stack:
protocols, audits, utilities, wins, losses, repair queue, and contribution lanes.

- Live site · https://opendefendable.com
- Commercial/front door · https://defendableos.com
- DefendableDocs field release · https://defendabledocs.com/field-release/overview/
- Tribunal tape · https://github.com/SudoSuOps/defendableos-tribunal-audit
- GitHub org · https://github.com/SudoSuOps

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

## Purpose

This repo should help contributors:

- verify public claims against accepted audit tape
- inspect current wins and losses
- find protocol documents
- find public utility repos
- understand what is off-limits to claim

## Deploy · Cloudflare Pages

1. Cloudflare Pages → Create application → Connect to Git
2. Pick the `SudoSuOps/open-defendable` repo
3. Build command · `npm run build`
4. Build output directory · `dist`
5. Production branch · `main`
6. Add custom domain · `opendefendable.com`
7. Add `RESEND_API_KEY` in Production and Preview for the founder-routed contact form

That's it. CF Pages handles the rest.

## License

MIT-attribution. Cite OpenDefendable / DefendableOS when reusing content.

## Public claim boundary

OpenDefendable must not claim:

- production readiness
- certification
- insurance coverage
- external SaaS enforcement
- immutable proof
- blockchain anchoring
- standards-body governance that does not yet exist in public artifacts

© 2026 Swarm and Bee LLC · DBA Swarm & Bee AI · D-U-N-S 138652395
