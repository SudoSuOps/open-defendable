# open-defendable

The `opendefendable.com` source.

OpenDefendable is the public standards and community surface for the Defendable ecosystem. It exists to publish reusable artifacts for defendable AI work: receipt schemas, worker contracts, dataset provenance notes, policy-pack formats, conformance cases, and implementation guidance.

It is not the commercial product. It is the open layer that makes the product ecosystem inspectable.

- Live site: https://opendefendable.com
- Commercial product: https://defendableos.com
- Member compute and datasets: https://defendablecloud.com
- Router/control-plane direction: https://defendablerouter.com
- Market intelligence: https://defendableos.com/opendefense
- GitHub: https://github.com/SudoSuOps

## Positioning

OpenDefendable aligns the public community surface around the Defendable stack:

- DefendableOS: commercial operating layer and product doctrine
- DefendableCloud: member-only datasets and private GPU compute
- DefendableRouter: member gate, compute meter, job router, receipt ledger
- DefendableWorker: owned-rig worker agent contract
- OpenDefendable: public specs, schemas, policy packs, and RFCs

The doctrine is simple:

- Members get the datasets.
- Compute gets metered.
- Every job gets a receipt.
- Every receipt should be structured, checksumed, inspectable, and portable.

## Public Specs

Starter public specs live in `public/specs/`:

- `defendable-receipt-v0.1.json`
- `defendable-worker-v0.2.json`

These are intentionally early. They give contributors something concrete to inspect before the full registry/RFC process exists.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Static deploy through Cloudflare Pages

## Dev

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Deploy

Cloudflare Pages is connected to GitHub. Pushes to the production branch trigger deploys.

Expected Cloudflare settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Custom domain: `opendefendable.com`

## Content Rules

Keep the site useful and credible:

- Publish clean public specs, examples, and source-linked research summaries.
- Do not publish raw strategy docs, private market-intel notes, customer wedge plans, or unverified competitive claims.
- Prefer concrete artifacts over category hype.
- Treat receipts, router contracts, worker contracts, policy packs, and provenance records as the core value.

## Public Claim Boundary

OpenDefendable should not claim production readiness, certification, insurance coverage, external SaaS enforcement, immutable proof, blockchain anchoring, or formal standards-body governance until those artifacts exist publicly and can be independently inspected.

## License

MIT-attribution. Cite OpenDefendable / DefendableOS when reusing content.

© 2026 Swarm and Bee LLC · DBA Swarm & Bee AI · D-U-N-S 138652395
