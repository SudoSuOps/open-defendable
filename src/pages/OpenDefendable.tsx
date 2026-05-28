import { useState, type FormEvent, type ReactNode } from "react";

const PARENT_URL = "https://defendableos.com";
const CLOUD_URL = "https://defendablecloud.com";
const ROUTER_URL = "https://defendablerouter.com";
const MARKET_INTEL_URL = "https://defendableos.com/opendefense";
const GITHUB_URL = "https://github.com/SudoSuOps";
const EMAIL = "build@swarmandbee.ai";
const X_URL = "https://x.com/swarmandbee";
const LINKEDIN_URL = "https://www.linkedin.com/in/donovan-mackey-89a6063b6/";

const receiptExample = `{
  "receipt_id": "drcpt_01JEXAMPLE",
  "receipt_type": "agent_action",
  "subject": {
    "agent_id": "mortgage_review_agent",
    "agent_version": "1.4.2",
    "operator": "example-lender"
  },
  "policy": {
    "policy_pack": "freddie_mac_ai_governance_v0",
    "rules_evaluated": ["explainability_required", "human_review_high_value"]
  },
  "inputs": {
    "dataset_refs": ["loan_file_redacted_8931"],
    "tool_calls": ["read_loan_file", "check_policy", "draft_notice"]
  },
  "outcome": {
    "decision": "escalate",
    "reason": "loan amount requires human review"
  },
  "created_at": "2026-05-28T18:21:00Z",
  "checksum_sha256": "..."
}`;

export default function OpenDefendable() {
  return (
    <div className="min-h-screen bg-neutral-950 text-stone-200 antialiased selection:bg-amber-500/30 selection:text-amber-100">
      <BackgroundGrid />
      <Header />
      <main>
        <Hero />
        <Why />
        <Ecosystem />
        <Tracks />
        <SpecsPreview />
        <ResearchBridge />
        <Roadmap />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.045]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(212,170,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,170,40,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/70 bg-neutral-950/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-4 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-3">
          <BrandMark />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-stone-400 sm:inline">Open standards</span>
        </a>
        <nav className="ml-3 hidden items-center gap-6 text-sm text-stone-400 lg:flex">
          <a href="#why" className="transition-colors hover:text-stone-100">Why</a>
          <a href="#ecosystem" className="transition-colors hover:text-stone-100">Ecosystem</a>
          <a href="#tracks" className="transition-colors hover:text-stone-100">Standards</a>
          <a href="#specs" className="transition-colors hover:text-stone-100">Specs</a>
          <a href="#contribute" className="transition-colors hover:text-stone-100">Contribute</a>
        </nav>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold tracking-tight text-amber-300 transition-colors hover:border-amber-400 hover:bg-amber-500/20"
        >
          GitHub
          <GithubIcon />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-900/80">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(230,171,42,0.12),transparent_62%)]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-6 lg:pb-24 lg:pt-24">
        <div className="mb-8 flex items-center gap-4">
          <img src="/defendable-wordmark.png" alt="Defendable" className="h-12 w-auto sm:h-14" />
          <div className="hidden h-10 w-px bg-stone-800 sm:block" />
          <div className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 sm:block">OpenDefendable</div>
        </div>
        <Eyebrow>OPENDEFENDABLE · DEFENDABLE ECOSYSTEM</Eyebrow>
        <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.06] tracking-tight text-stone-50 md:text-6xl">
          Open standards for <span className="font-serif font-normal italic text-amber-300">defendable</span> AI work.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-stone-300">
          OpenDefendable is the public standards and community layer for the Defendable stack: receipts, policy packs,
          dataset provenance, worker contracts, router boundaries, and proof-of-execution patterns that teams can inspect,
          implement, and improve in public.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#tracks" className="inline-flex items-center gap-2 rounded bg-amber-400 px-6 py-3.5 text-sm font-semibold tracking-tight text-neutral-950 transition-colors hover:bg-amber-300">
            Explore standards
            <Arrow />
          </a>
          <a href="/specs/defendable-receipt-v0.1.json" className="inline-flex items-center gap-2 rounded border border-stone-700 px-6 py-3.5 text-sm font-semibold tracking-tight text-stone-200 transition-colors hover:border-stone-500 hover:text-stone-50">
            View receipt JSON
            <ArrowExt />
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Signal label="Public good" value="Open specs" />
          <Signal label="Control plane" value="Router contracts" />
          <Signal label="Compute layer" value="Worker leases" />
          <Signal label="Audit layer" value="Receipts" />
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <Section id="why" eyebrow="WHY IT EXISTS" title="Agents need evidence, not another pitch deck.">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <P>
            DefendableCloud is becoming a member-only compute and dataset platform. DefendableRouter gates members,
            meters GPU work, routes jobs, and writes receipts. DefendableWorker agents run on owned rigs and call home
            without exposing private hosts.
          </P>
          <P>
            OpenDefendable is where the reusable pieces become public: schemas, examples, policy packs, test cases, and
            implementation notes. The commercial stack can move fast while the community gets concrete artifacts to build against.
          </P>
        </div>
        <div className="grid gap-3">
          <DoctrineRow title="Members get the datasets." body="Access rules and dataset provenance should be explicit, portable, and auditable." />
          <DoctrineRow title="Compute gets metered." body="GPU jobs need clear quotes, leases, lifecycle events, and final cost records." />
          <DoctrineRow title="Every job gets a receipt." body="Receipts are the common artifact between operators, developers, auditors, and customers." />
        </div>
      </div>
    </Section>
  );
}

function Ecosystem() {
  const surfaces = [
    ["DefendableOS", "Commercial product and operating doctrine", PARENT_URL],
    ["DefendableCloud", "Member datasets, private compute, hourly GPU jobs", CLOUD_URL],
    ["DefendableRouter", "Member gate, meter, job router, receipt ledger", ROUTER_URL],
    ["DefendableWorker", "Owned-rig agent that leases jobs and reports artifacts", `${GITHUB_URL}/defendable-router`],
    ["OpenDefendable", "Public standards, schemas, examples, RFCs", "https://opendefendable.com"],
  ];

  return (
    <Section id="ecosystem" eyebrow="ECOSYSTEM MAP" title="OpenDefendable is the spec layer.">
      <div className="grid gap-3">
        {surfaces.map(([name, body, href], index) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="grid gap-4 border border-stone-800 bg-neutral-950/60 px-5 py-4 transition-colors hover:border-stone-600 md:grid-cols-[10rem_1fr_2rem] md:items-center">
            <div className="font-mono text-xs font-bold text-amber-300">0{index + 1} · {name}</div>
            <div className="text-sm leading-relaxed text-stone-300">{body}</div>
            <div className="text-stone-500 md:text-right"><ArrowExt /></div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Tracks() {
  const tracks = [
    ["Receipt Spec", "draft v0.1", "Canonical JSON receipts for agent actions, dataset access, compute quotes, worker leases, artifacts, and final job outcomes."],
    ["Worker Contract", "draft v0.2", "Registration, bearer-token auth, heartbeat, job lease, status event, artifact, complete, and fail callbacks for owned rigs."],
    ["Dataset Provenance", "planned", "Dataset registry metadata, license fields, checksums, quality tiers, member access records, and source lineage."],
    ["Policy Packs", "planned", "Portable rule packs for regulated workflows: what must be checked, logged, escalated, denied, or reviewed by a human."],
    ["Model Routing Notes", "planned", "Guidance for routing jobs by cost, privacy, capability, latency, risk class, and audit requirement."],
    ["Audit Export", "planned", "Receipts packaged for external review: checksums, manifests, evidence bundles, and future ledger/object-store anchoring."],
  ];

  return (
    <Section id="tracks" eyebrow="STANDARDS TRACKS" title="Useful primitives, not theater.">
      <div className="grid gap-3 md:grid-cols-2">
        {tracks.map(([name, status, body]) => (
          <article key={name} className="border border-stone-800 bg-neutral-950/60 px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-stone-100">{name}</h3>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-300">{status}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function SpecsPreview() {
  return (
    <Section id="specs" eyebrow="SPEC PREVIEW" title="The receipt is the shared artifact.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <P>
            A Defendable receipt is not just a log line. It is a structured proof record: who acted, which policy applied,
            what inputs and tools were used, what happened, when it happened, and which digest proves the record was not silently rewritten.
          </P>
          <div className="grid gap-3">
            <SpecLink href="/specs/defendable-receipt-v0.1.json" title="defendable-receipt-v0.1.json" body="Starter schema for action, dataset, quote, job, worker, and artifact receipts." />
            <SpecLink href="/specs/defendable-worker-v0.2.json" title="defendable-worker-v0.2.json" body="Starter contract for register, heartbeat, lease, status, logs, artifacts, complete, and fail." />
          </div>
        </div>
        <pre className="overflow-x-auto border border-stone-800 bg-black/45 p-5 text-xs leading-relaxed text-stone-300"><code>{receiptExample}</code></pre>
      </div>
    </Section>
  );
}

function ResearchBridge() {
  return (
    <Section id="research" eyebrow="MARKET INTELLIGENCE" title="Research informs the standards. Standards stay reusable.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <P>
          The internal market work points to the same pressure from several directions: agents are entering production,
          governance is lagging, and buyers need proof that agent work was authorized, measured, and reviewable. OpenDefendable
          turns that thesis into reusable artifacts.
        </P>
        <div className="border-l border-amber-500/40 pl-5">
          <div className="text-sm font-semibold text-stone-100">Public release policy</div>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            Publish curated findings, primary-source links, and clean charts. Keep raw research notes, customer wedge plans,
            pricing strategy, and unverified competitive claims out of the public standards repo.
          </p>
          <a href={MARKET_INTEL_URL} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">
            Read public market intelligence
            <ArrowExt />
          </a>
        </div>
      </div>
    </Section>
  );
}

function Roadmap() {
  const items = [
    ["Now", "Publish starter receipt and worker contract examples; align site with DefendableRouter and DefendableCloud."],
    ["v0.2", "Open RFC folder for receipt schema, worker callbacks, dataset provenance, and policy pack format."],
    ["v0.3", "Ship example adapters for common agent frameworks and a local receipt verifier."],
    ["v1.0", "Launch public registry for policy packs, receipt profiles, conformance tests, and community reviews."],
  ];

  return (
    <Section id="roadmap" eyebrow="ROADMAP" title="Build in the open where it helps.">
      <div className="grid gap-3">
        {items.map(([stage, body]) => (
          <div key={stage} className="grid gap-4 border border-stone-800 bg-neutral-950/60 px-5 py-4 md:grid-cols-[7rem_1fr]">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-amber-300">{stage}</div>
            <div className="text-sm leading-relaxed text-stone-300">{body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GetInvolved() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("OpenDefendable contributor interest");
    const body = encodeURIComponent(`I'd like to contribute to OpenDefendable.\n\nEmail: ${email}\n\nArea of interest:\n[ ] receipt spec\n[ ] worker contract\n[ ] dataset provenance\n[ ] policy packs\n[ ] conformance tests\n[ ] research review\n[ ] other:`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contribute" className="border-b border-stone-900/80 bg-stone-950/40 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <Eyebrow>CONTRIBUTE</Eyebrow>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-stone-100 md:text-4xl">Help make agent work inspectable.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-300 lg:text-lg">
              The useful contributions are concrete: break a schema, submit a receipt profile, review a worker callback,
              write a conformance case, or turn a real failure mode into a policy pack.
            </p>
            <div className="mt-8 grid gap-3">
              <Way title="Review starter specs" body="Read the receipt and worker JSON files, then open issues or PRs with specific schema changes." href={`${GITHUB_URL}/open-defendable`} cta="OpenDefendable repo" />
              <Way title="Bring a failure case" body="A failed agent workflow is more useful than a generic benchmark. We want cases with context, expected behavior, and observable evidence." href={`mailto:${EMAIL}?subject=OpenDefendable%20failure%20case`} cta={EMAIL} />
              <Way title="Map a policy" body="Translate one real compliance or operating rule into a machine-checkable policy-pack candidate." href={`mailto:${EMAIL}?subject=OpenDefendable%20policy%20pack`} cta="Start a policy pack" />
            </div>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/[0.06] px-6 py-7">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/90">Founding contributor list</div>
            <div className="mb-2 text-base font-medium text-stone-100">Get notified when the RFCs open.</div>
            <p className="mb-5 text-sm leading-relaxed text-stone-400">No CRM trick. This opens your mail client with a structured contribution note. You decide what to send.</p>
            <form onSubmit={onSubmit} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded border border-stone-800 bg-neutral-900/80 px-4 py-3 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40" />
              <button type="submit" className="w-full rounded bg-amber-400 px-5 py-3 text-sm font-semibold tracking-tight text-neutral-950 transition-colors hover:bg-amber-300">
                {sent ? "Email queued in your client" : "Draft contribution email"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <div className="font-semibold tracking-tight text-stone-100">OpenDefendable</div>
              <div className="text-xs text-stone-500">Public standards for defendable AI work.</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-stone-500 transition-colors hover:text-amber-300"><GithubIcon /></a>
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-stone-500 transition-colors hover:text-amber-300"><XIcon /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-stone-500 transition-colors hover:text-amber-300"><LinkedInIcon /></a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-stone-500 transition-colors hover:text-amber-300"><MailIcon /></a>
          </div>
        </div>
        <div className="mt-8 grid gap-3 border-t border-stone-900 pt-6 text-xs text-stone-500 md:grid-cols-2">
          <div>© 2026 Swarm and Bee LLC · DBA Swarm &amp; Bee AI · D-U-N-S 138652395</div>
          <div className="font-mono md:text-right">
            <a href="/llms.txt" className="transition-colors hover:text-amber-300">llms.txt</a>{" · "}
            <a href={MARKET_INTEL_URL} className="transition-colors hover:text-amber-300">market intelligence</a>{" · "}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-300">github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-b border-stone-900/80 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-stone-100 md:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return <div className="border border-stone-800 bg-neutral-950/60 px-4 py-4"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">{label}</div><div className="mt-1.5 text-base font-semibold text-stone-100">{value}</div></div>;
}

function DoctrineRow({ title, body }: { title: string; body: string }) {
  return <div className="border-l border-amber-500/40 bg-amber-500/[0.035] px-5 py-4"><div className="text-base font-semibold text-stone-100">{title}</div><p className="mt-1.5 text-sm leading-relaxed text-stone-400">{body}</p></div>;
}

function SpecLink({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="block border border-stone-800 bg-neutral-950/60 px-5 py-4 transition-colors hover:border-stone-600"><div className="flex items-center justify-between gap-4"><div className="font-mono text-sm text-amber-300">{title}</div><ArrowExt /></div><p className="mt-2 text-sm leading-relaxed text-stone-400">{body}</p></a>;
}

function Way({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return <div className="border border-stone-800 bg-neutral-950/60 px-5 py-4"><div className="text-base font-semibold text-stone-100">{title}</div><p className="mt-1.5 text-sm leading-relaxed text-stone-400">{body}</p><a href={href} target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-amber-300/90 hover:text-amber-300">{cta}<ArrowExt /></a></div>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-stone-300 lg:text-lg">{children}</p>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-400/80"><span className="inline-block h-px w-6 bg-amber-400/60" />{children}</div>;
}

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/defendablelogo.png" alt="" className="h-9 w-9 border border-amber-400/30 bg-neutral-950 object-contain" />
      <img src="/defendable-wordmark.png" alt="Defendable" className="h-8 w-auto" />
    </span>
  );
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2 7h10M8 3l4 4-4 4" /></svg>;
}

function ArrowExt() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M4 8l4-4M5 4h3v3" /></svg>;
}

function GithubIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
}

function XIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2H21.5l-7.07 8.07L23 22h-6.59l-5.18-6.34L5.27 22H2l7.55-8.62L1.5 2h6.74l4.69 5.84L18.244 2zm-1.16 18h1.87L7.02 4H5.06l12.02 16z" /></svg>;
}

function LinkedInIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>;
}

function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="M3 6l9 7 9-7" /></svg>;
}
