const GITHUB_REPO = "https://github.com/SudoSuOps/open-defendable";
const AUDIT_REPO = "https://github.com/SudoSuOps/defendableos-tribunal-audit";
const DOCS_FIELD_RELEASE = "https://defendabledocs.com/field-release/overview/";
const CLOUD_DEMO = "https://defendablecloud.com/agent-operations-demo";

const wins = [
  "Four runtime module repos are public.",
  "Codex module audit and re-audit are published.",
  "Runtime modules are VERIFIED_AS_REPAIRED_WITH_LIMITATIONS.",
  "DefendableDocs field-release pages are VERIFIED_AS_DOCUMENTED_WITH_LIMITATIONS.",
  "Public audit repo is available.",
  "Public repos are available now.",
];

const losses = [
  "Cloud server-side action API repair is required.",
  "Broader DefendableDocs claim alignment repair is required.",
  "DefendableRouter public utility is not verified.",
  "Router-to-Cloud integration is not proven.",
  "Production is not cleared.",
  "External SaaS enforcement is not cleared.",
  "Certification, insurance, and blockchain anchoring are not claimed.",
];

const protocols = [
  {
    title: "Agent Roster Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/agent-roster-protocol.md`,
    purpose: "Separate recommendation, owner approval, continuity assignment, and enforcement state.",
    status: "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS",
  },
  {
    title: "Continuity Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/continuity-protocol.md`,
    purpose: "Preserve starter / backup / coverage chain without collapsing business-state roles.",
    status: "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS",
  },
  {
    title: "Permission Broker Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/permission-broker-protocol.md`,
    purpose: "Allow, deny, or queue actions while preserving honest local-only enforcement claims.",
    status: "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS",
  },
  {
    title: "Receipt Integrity Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/receipt-integrity-protocol.md`,
    purpose: "Explain what hashes prove and what they do not prove.",
    status: "VERIFIED_AS_DOCUMENTED_WITH_LIMITATIONS",
  },
  {
    title: "Claim Hygiene Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/claim-hygiene-protocol.md`,
    purpose: "Prevent public surfaces from outrunning code, audits, or deployments.",
    status: "READY_WITH_LIMITATIONS",
  },
  {
    title: "Audit / Repair / Re-audit Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/audit-repair-reaudit-protocol.md`,
    purpose: "Define submission, referee tape, repair, and owner promotion control.",
    status: "READY_WITH_LIMITATIONS",
  },
  {
    title: "Public Field Release Protocol",
    path: `${GITHUB_REPO}/blob/main/protocols/public-field-release-protocol.md`,
    purpose: "State the minimum tape needed before a public field surface can be promoted.",
    status: "READY_WITH_LIMITATIONS",
  },
];

const utilities = [
  ["swarm-doctor", "https://github.com/SudoSuOps/swarm-doctor", "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS", "Math and conditioning support input for the runtime chain.", "CLI proof verified; broader production claims not cleared."],
  ["conditioning-coach", "https://github.com/SudoSuOps/conditioning-coach", "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS", "Conditioning status and protocol math for the runtime chain.", "CLI proof verified; broader production claims not cleared."],
  ["owner-roster-registry", "https://github.com/SudoSuOps/owner-roster-registry", "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS", "Owner-status separation, continuity doctrine, and snapshot export.", "Published API proof was repaired via live HTTP path; in-process test path remains environment-fragile."],
  ["permission-broker", "https://github.com/SudoSuOps/permission-broker", "VERIFIED_AS_REPAIRED_WITH_LIMITATIONS", "Local permission envelope and honest allow/deny/queue behavior.", "CLI/local proof verified separately; external SaaS enforcement not cleared."],
  ["defendable-cloud", "https://github.com/SudoSuOps/defendable-cloud", "REPAIR_REQUIRED", "Public field utility surface and synthetic demo shell.", "Browser demo exists; server-side action POST API was not accepted as fielded."],
  ["defendable-docs", "https://github.com/SudoSuOps/defendable-docs", "READY_WITH_LIMITATIONS", "Field-release owner record and product manual surface.", "Field-release pages aligned; broader claim cleanup still required."],
  ["defendable-router", "https://github.com/SudoSuOps/defendable-router", "POSITIONING_SURFACE_ONLY", "Router / receipt utility track.", "Public deployed utility and Cloud integration not yet verified."],
  ["defendable", "https://github.com/SudoSuOps/defendable", "READY_WITH_LIMITATIONS", "Commercial/front-door site source.", "Public message must stay aligned with accepted audits and limitations."],
  ["open-defendable", "https://github.com/SudoSuOps/open-defendable", "READY_WITH_LIMITATIONS", "Open-source truth surface source.", "Scoreboard, protocols, and contribution lane must stay visible and current."],
  ["defendableos-tribunal-audit", "https://github.com/SudoSuOps/defendableos-tribunal-audit", "READY_WITH_LIMITATIONS", "Public audit tape and repair history.", "Hashes provide content-integrity linkage only."],
];

const auditLinks = [
  ["Tribunal audit repository", AUDIT_REPO],
  ["Module audit / re-audit", `${AUDIT_REPO}/tree/main/reaudit/2026-05-26_tribunal_repair_v0.1`],
  ["Deployed-utility audit", `${AUDIT_REPO}/tree/main/deployed_audit/2026-05-26_field_utilization_router_docs_v0.1`],
  ["Main-site audit", `${AUDIT_REPO}/tree/main/main_site_audit/2026-05-26_defendableos_opendefendable_public_message_v0.1`],
];

export default function OpenDefendable() {
  return (
    <div className="min-h-screen bg-neutral-950 text-stone-200 antialiased selection:bg-amber-500/30 selection:text-amber-100">
      <BackgroundGrid />
      <Header />
      <main>
        <Hero />
        <Scoreboard />
        <ProtocolSection />
        <AuditIndex />
        <UtilityTable />
        <ContributionLane />
      </main>
      <Footer />
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(212,170,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,170,40,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Header() {
  const links: [string, string][] = [
    ["Scoreboard", "#scoreboard"],
    ["Protocols", "#protocols"],
    ["Audit index", "#audits"],
    ["Utilities", "#utilities"],
    ["Contribute", "#contribute"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/60 bg-neutral-950/88 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <a href="/" className="flex items-center gap-3 group">
          <Emblem />
          <span className="font-semibold tracking-tight text-stone-100 text-lg">
            <span className="text-amber-400">Open</span>Defendable
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 ml-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-stone-400 hover:text-stone-100 transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <a
          href={AUDIT_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2 text-sm font-semibold tracking-tight text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-colors"
        >
          Tribunal tape
          <ArrowExt />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-900/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_36%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-amber-300/80 font-semibold">
              OpenDefendable
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-50 leading-[1.04]">
              Open protocols, audit receipts, and utility code
              <span className="block mt-2 font-serif italic font-normal text-amber-300">
                for accountable AI systems.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone-300">
              Not a dream board. A public scoreboard. OpenDefendable exists to show what shipped,
              what failed, what is repaired, what is still held, and where contributors can improve the protocol surface without overclaiming the product.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryLink href="#scoreboard">View scoreboard</PrimaryLink>
              <SecondaryLink href={AUDIT_REPO}>Open Tribunal repo</SecondaryLink>
              <SecondaryLink href={DOCS_FIELD_RELEASE}>Read field-release docs</SecondaryLink>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-stone-800 bg-neutral-950/85 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold">
                  Current truth
                </div>
                <div className="mt-1 text-sm text-stone-200">Open-source status tape</div>
              </div>
              <Badge value="READY_WITH_LIMITATIONS" />
            </div>
            <div className="px-6 py-5 space-y-4">
              <SnapshotRow label="Runtime chain" value="VERIFIED_AS_REPAIRED_WITH_LIMITATIONS" />
              <SnapshotRow label="Cloud demo" value="REPAIR_REQUIRED" />
              <SnapshotRow label="Docs field-release pages" value="VERIFIED_AS_DOCUMENTED_WITH_LIMITATIONS" />
              <SnapshotRow label="Router integration" value="FIELD INTEGRATION PENDING" />
              <SnapshotRow label="Production" value="NOT CLEARED FOR PRODUCTION" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Scoreboard() {
  return (
    <section id="scoreboard" className="border-b border-stone-900/80">
      <div className="max-w-7xl mx-auto px-6 py-18 lg:py-22">
        <SectionHead
          eyebrow="Current scoreboard"
          title="Wins stay public. Losses stay public."
          body="A trustworthy open surface records both progress and holds. This section reflects the accepted audit state, not aspirational marketing state."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Wins</div>
            <ul className="mt-4 space-y-3">
              {wins.map((item) => (
                <ScoreRow key={item} item={item} tone="emerald" />
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Losses / repair required</div>
            <ul className="mt-4 space-y-3">
              {losses.map((item) => (
                <ScoreRow key={item} item={item} tone="amber" />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProtocolSection() {
  return (
    <section id="protocols" className="border-b border-stone-900/80 bg-stone-950/40">
      <div className="max-w-7xl mx-auto px-6 py-18 lg:py-22">
        <SectionHead
          eyebrow="Protocols"
          title="Concise operating rules, not mythology."
          body="Each protocol states purpose, inputs, outputs, pass/fail rules, status labels, limitations, and where to find the related repo or audit tape."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {protocols.map((protocol) => (
            <a key={protocol.title} href={protocol.path} className="rounded-[1.35rem] border border-stone-800 bg-neutral-950/85 px-6 py-6 hover:border-amber-500/35 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold tracking-tight text-stone-100">{protocol.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">{protocol.purpose}</p>
                </div>
                <Badge value={protocol.status} subtle />
              </div>
              <div className="mt-5 text-sm font-semibold text-amber-300">Open protocol →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuditIndex() {
  return (
    <section id="audits" className="border-b border-stone-900/80">
      <div className="max-w-7xl mx-auto px-6 py-18 lg:py-22">
        <SectionHead
          eyebrow="Audit index"
          title="Every public claim should resolve back to tape."
          body="Audit hashes provide content-integrity linkage only. They do not prove authorship, owner approval, certification, insurance, blockchain anchoring, or production clearance."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {auditLinks.map(([label, href]) => (
            <a key={href} href={href} className="rounded-2xl border border-stone-800 bg-neutral-950 px-5 py-5 hover:border-amber-500/35 transition-colors">
              <div className="text-base font-semibold text-stone-100">{label}</div>
              <div className="mt-2 break-all text-sm text-stone-500">{href}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function UtilityTable() {
  return (
    <section id="utilities" className="border-b border-stone-900/80 bg-stone-950/40">
      <div className="max-w-7xl mx-auto px-6 py-18 lg:py-22">
        <SectionHead
          eyebrow="Open utilities"
          title="Public repos, current status, and limitations."
          body="This list is the working surface map. Every repo gets a job description and a limitation statement."
        />
        <div className="mt-10 space-y-4">
          {utilities.map(([name, href, status, what, limitation]) => (
            <div key={name} className="grid gap-4 rounded-[1.25rem] border border-stone-800 bg-neutral-950 px-5 py-5 lg:grid-cols-[0.9fr_0.9fr_1.1fr_1.2fr]">
              <div>
                <a href={href} className="text-lg font-semibold tracking-tight text-stone-100 hover:text-amber-300 transition-colors">
                  {name}
                </a>
                <div className="mt-2 break-all text-xs text-stone-500">{href}</div>
              </div>
              <div><Badge value={status} subtle /></div>
              <div className="text-sm leading-relaxed text-stone-300">{what}</div>
              <div className="text-sm leading-relaxed text-stone-500">{limitation}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributionLane() {
  return (
    <section id="contribute" className="py-18 lg:py-22">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[2rem] border border-amber-500/25 bg-[linear-gradient(135deg,rgba(245,158,11,0.10),rgba(23,23,23,0.96)_35%,rgba(10,10,10,1))] px-7 py-8 md:px-10 md:py-10">
          <SectionHead
            eyebrow="Contribution lane"
            title="Contribute by tightening truth, protocol, and verification."
            body="Use the repo docs to verify claims, improve protocol clarity, run audits, report misaligned surfaces, and avoid unsupported promotion. OpenDefendable is for disciplined public improvement, not speculative expansion."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryLink href={GITHUB_REPO}>Open source repo</PrimaryLink>
            <SecondaryLink href={`${GITHUB_REPO}/blob/main/CONTRIBUTING.md`}>Read CONTRIBUTING</SecondaryLink>
            <SecondaryLink href={`${GITHUB_REPO}/blob/main/ROADMAP.md`}>Read ROADMAP</SecondaryLink>
            <SecondaryLink href={`${GITHUB_REPO}/blob/main/LIMITATIONS.md`}>Read LIMITATIONS</SecondaryLink>
            <SecondaryLink href={`${GITHUB_REPO}/blob/main/SCOREBOARD.md`}>Read SCOREBOARD</SecondaryLink>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-stone-400">
            Public surfaces must not claim production readiness, certification, insurance coverage, external SaaS enforcement,
            immutable proof, or blockchain anchoring unless a later independent audit explicitly clears those claims.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-[10px] uppercase tracking-[0.24em] text-amber-300/80 font-semibold">{eyebrow}</div>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-stone-400">{body}</p>
    </div>
  );
}

function ScoreRow({ item, tone }: { item: string; tone: "emerald" | "amber" }) {
  const color =
    tone === "emerald"
      ? "border-emerald-500/25 bg-emerald-500/[0.05] text-emerald-300"
      : "border-amber-500/25 bg-amber-500/[0.05] text-amber-300";
  return <li className={`rounded-2xl border px-4 py-4 text-sm leading-relaxed ${color}`}>{item}</li>;
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone-900 pb-4 last:border-b-0 last:pb-0">
      <div className="text-sm text-stone-300">{label}</div>
      <Badge value={value} subtle />
    </div>
  );
}

function Badge({ value, subtle }: { value: string; subtle?: boolean }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold ${subtle ? "border-stone-700 text-stone-300" : "border-amber-500/40 bg-amber-500/10 text-amber-300"}`}>
      {value}
    </span>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition-colors">
      {children}
    </a>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">
      {children}
    </a>
  );
}

function Emblem() {
  return (
    <span className="inline-flex w-9 h-9 rounded border border-amber-400/40 items-center justify-center text-amber-300 bg-amber-500/[0.04]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 2h6l3 3v9H4z" />
        <path d="M6 7h6M6 9h6M6 11h4" strokeWidth="1" opacity="0.65" />
      </svg>
    </span>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Emblem />
              <span className="font-semibold tracking-tight text-stone-100 text-lg">
                <span className="text-amber-400">Open</span>Defendable
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Open protocols, audit receipts, utilities, repair queue, and contribution paths for accountable AI systems.
            </p>
          </div>
          <FooterColumn
            heading="Truth surfaces"
            links={[
              ["Tribunal audit repo", AUDIT_REPO],
              ["DefendableOS", "https://defendableos.com"],
              ["DefendableCloud", CLOUD_DEMO],
              ["DefendableDocs", DOCS_FIELD_RELEASE],
            ]}
          />
          <FooterColumn
            heading="Contribute"
            links={[
              ["GitHub repo", GITHUB_REPO],
              ["CONTRIBUTING.md", `${GITHUB_REPO}/blob/main/CONTRIBUTING.md`],
              ["ROADMAP.md", `${GITHUB_REPO}/blob/main/ROADMAP.md`],
              ["LIMITATIONS.md", `${GITHUB_REPO}/blob/main/LIMITATIONS.md`],
            ]}
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold mb-4">{heading}</div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-stone-300 hover:text-amber-300 transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowExt() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 10L10 4" />
      <path d="M5 4h5v5" />
    </svg>
  );
}
