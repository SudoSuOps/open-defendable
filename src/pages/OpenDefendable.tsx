// opendefendable.com · the open standards body for AI agent defense
//
// Single-page splash. Same charcoal + honey brand voice as defendableos.com
// but explicitly positioned as the open / contributor / OSS surface.
//
// Cisco grades the agent. DefendableOS sells the defense rail.
// OpenDefendable publishes the open standards everyone else builds against.

import { useState } from "react";

const PARENT_URL = "https://defendableos.com";
const MARKET_INTEL_URL = "https://defendableos.com/opendefense";
const GITHUB_URL = "https://github.com/SudoSuOps";
const EMAIL = "build@swarmandbee.ai";
const X_URL = "https://x.com/swarmandbee";
const LINKEDIN_URL = "https://www.linkedin.com/in/donovan-mackey-89a6063b6/";

export default function OpenDefendable() {
  return (
    <div className="min-h-screen bg-neutral-950 text-stone-200 antialiased selection:bg-amber-500/30 selection:text-amber-100">
      <BackgroundGrid />
      <Header />
      <main>
        <Hero />
        <Mission />
        <Roadmap />
        <PrinciplesSection />
        <GetInvolved />
        <RelatedSurfaces />
      </main>
      <Footer />
    </div>
  );
}

// ─── ambient ───────────────────────────────────────────────────────────────
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

// ─── header ────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/60 bg-neutral-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <a href="/" className="flex items-center gap-3 group">
          <EmblemMark />
          <span className="font-semibold tracking-tight text-stone-100 text-lg">
            <span className="text-amber-400">Open</span>Defendable
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 ml-6 text-sm text-stone-400">
          <a href="#mission" className="hover:text-stone-100 transition-colors">Mission</a>
          <a href="#roadmap" className="hover:text-stone-100 transition-colors">Roadmap</a>
          <a href="#principles" className="hover:text-stone-100 transition-colors">Principles</a>
          <a href="#contribute" className="hover:text-stone-100 transition-colors">Contribute</a>
        </nav>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded border border-amber-500/40 bg-amber-500/10 text-sm text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-colors font-semibold tracking-tight"
        >
          GitHub
          <GithubIcon />
        </a>
      </div>
    </header>
  );
}

function EmblemMark() {
  return (
    <span className="inline-flex w-9 h-9 rounded border border-amber-400/40 items-center justify-center text-amber-300 bg-amber-500/[0.04]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 2h6l3 3v9H4z" />
        <path d="M6 7h6M6 9h6M6 11h4" strokeWidth="1" opacity="0.65" />
      </svg>
    </span>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative border-b border-stone-900/80">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-500/[0.04] via-amber-500/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Eyebrow>OPENDEFENDABLE · OPEN STANDARDS BODY</Eyebrow>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-50 leading-[1.05]">
          The{" "}
          <span className="font-serif italic font-normal text-amber-300">open standards</span>{" "}
          for AI agent defense.
        </h1>
        <p className="mt-8 text-lg text-stone-300 leading-relaxed max-w-2xl">
          The AI agent defense category is being shaped right now. Cisco ·
          F5 · Check Point · CrowdStrike are shipping closed products into
          the Fortune 500. The open ecosystem needs a standards body the
          way software supply-chain security got{" "}
          <a href="https://openssf.org" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline hover:text-amber-200">OpenSSF</a>.{" "}
          <strong className="text-amber-300">OpenDefendable is that body.</strong>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={MARKET_INTEL_URL}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-amber-400 text-neutral-950 text-sm font-semibold tracking-tight hover:bg-amber-300 transition-colors"
          >
            Read the market intelligence
            <Arrow />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-stone-700 text-sm text-stone-200 font-semibold tracking-tight hover:border-stone-500 hover:text-stone-50 transition-colors"
          >
            View on GitHub
            <ArrowExt />
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <Pill>MIT-attribution licensed</Pill>
          <Pill>Contributor-governed roadmap</Pill>
          <Pill>Cross-vendor specifications</Pill>
          <Pill>Public Defendable Deeds anchored to ENS</Pill>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-4 py-3 text-sm text-stone-300 flex items-center gap-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      <span>{children}</span>
    </div>
  );
}

// ─── Mission ───────────────────────────────────────────────────────────────
function Mission() {
  return (
    <section id="mission" className="border-b border-stone-900/80 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <Eyebrow>MISSION</Eyebrow>
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">
          Who grades the{" "}
          <span className="font-serif italic font-normal text-amber-300">graders</span>?
        </h2>
        <div className="mt-6 space-y-5 max-w-3xl">
          <P>
            By the end of 2026 every major networking vendor will ship an
            AI-agent-defense SKU. Cisco DefenseClaw shipped at RSAC. F5
            absorbed CalypsoAI. Check Point absorbed Lakera. Palo Alto
            absorbed Protect AI. CrowdStrike Falcon AIDR is GA.
          </P>
          <P>
            Each one grades AI agents <em className="font-serif">using their own internal
            standards.</em> No public spec. No independent audit. No cross-vendor
            portability. <strong className="text-amber-300">The vendor grades its
            own homework.</strong>
          </P>
          <P>
            OpenDefendable exists to publish the open standards anyone in
            the ecosystem can build against · verify · and contribute to.
            Doctrine packs. Cross-vendor pack format. Public Defendable
            Deed schema. ENS-anchored agent identity. Reproducible
            attestation. <strong className="text-stone-100">The OpenSSF for AI agent operations.</strong>
          </P>
        </div>

        <div className="mt-12 rounded-xl border border-amber-500/30 bg-amber-500/[0.04] px-6 py-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/90 font-semibold mb-2">The brand-stack relationship</div>
          <div className="grid md:grid-cols-3 gap-5 text-sm">
            <div>
              <div className="text-stone-100 font-semibold mb-1">defendableos.com</div>
              <div className="text-stone-400 leading-relaxed">Commercial product · HoneyBox appliance + DefendableCloud · for SMB / mid-market 5cap operators.</div>
            </div>
            <div>
              <div className="text-stone-100 font-semibold mb-1">defendableos.com/opendefense</div>
              <div className="text-stone-400 leading-relaxed">Public market intelligence · category briefing · 4 research streams · 120+ cited sources.</div>
            </div>
            <div>
              <div className="text-amber-300 font-semibold mb-1">opendefendable.com</div>
              <div className="text-stone-400 leading-relaxed">Open standards body · doctrine packs · contributor SDKs · cross-vendor specifications.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap ───────────────────────────────────────────────────────────────
function Roadmap() {
  const items = [
    {
      stage: "v0 · LIVE",
      title: "Market intelligence + brand-stack doctrine",
      body: "Public market briefing at defendableos.com/opendefense · 8-section doctrine page at defendableos.com/doctrine · Defendable Agent Deed JSON schema example at defendableos.com/how-it-works.",
      tone: "live",
    },
    {
      stage: "v1 · Q3 2026",
      title: "Pack registry public launch",
      body: "Open-source doctrine pack registry (refund_agent_v1 · payroll_agent_v1 · coding_ops_v1 · etc.) · MIT-licensed · contributor PR workflow · semantic version pinning.",
      tone: "next",
    },
    {
      stage: "v2 · Q4 2026",
      title: "Defendable Deed schema · open specification",
      body: "Versioned public spec for the Defendable Agent Deed · DDEED-DOV-* naming · ENS anchor pattern · record_hash format · cross-vendor implementation reference.",
      tone: "next",
    },
    {
      stage: "v3 · Q1 2027",
      title: "Defendable Hack bounty program",
      body: "Researcher-funded flywheel · find an agent that PROPOLIS-fails in the wild · submit · auto-Tribunal validates · pack v.next ships · researcher paid. Closed loop.",
      tone: "next",
    },
    {
      stage: "v4 · 2027",
      title: "Standards-body governance",
      body: "5-7 person advisory board (Defendable + 2 research + 1 insurance + 1 academic) · formal RFC process · NIST AI RMF + EU AI Act mappings published.",
      tone: "future",
    },
  ];
  return (
    <section id="roadmap" className="border-b border-stone-900/80 bg-stone-950/40 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <Eyebrow>ROADMAP</Eyebrow>
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">
          What we'll ship.{" "}
          <span className="font-serif italic font-normal text-amber-300">In public.</span>
        </h2>
        <div className="mt-12 space-y-4">
          {items.map((it) => (
            <RoadmapRow key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapRow({ stage, title, body, tone }: { stage: string; title: string; body: string; tone: string }) {
  const styles = tone === "live"
    ? "border-emerald-500/40 bg-emerald-500/[0.05]"
    : tone === "next"
      ? "border-amber-500/30 bg-amber-500/[0.04]"
      : "border-stone-800 bg-neutral-950/60";
  const tagStyle = tone === "live" ? "text-emerald-300" : tone === "next" ? "text-amber-300" : "text-stone-500";
  return (
    <div className={`rounded-xl border ${styles} px-6 py-5`}>
      <div className="grid lg:grid-cols-[10rem_1fr] gap-5 items-start">
        <div className={`text-[10px] uppercase tracking-[0.22em] font-mono font-bold ${tagStyle}`}>{stage}</div>
        <div>
          <div className="text-base font-semibold text-stone-100">{title}</div>
          <p className="mt-1.5 text-sm text-stone-400 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Principles ────────────────────────────────────────────────────────────
function PrinciplesSection() {
  const principles = [
    { n: "01", t: "Open weights forever", b: "Doctrine packs ship under MIT-attribution. No proprietary lock-in. No 'enterprise feature gate.'" },
    { n: "02", t: "Reproducible attestation", b: "Every Defendable Deed verifiable from public artifacts. record_hash recomputable. ENS resolvable." },
    { n: "03", t: "Cross-vendor portability", b: "Pack format and deed schema work with ANY agent · LangChain · CrewAI · custom · MCP. No vendor lock." },
    { n: "04", t: "Contributor-graded", b: "PRs reviewed by the community. RFC process. Versioned. Same way OpenSSF runs scorecards and sigstore." },
    { n: "05", t: "Receipt every claim", b: "If you can't show the math · don't publish the number. Every stat hyperlinked. Every spec versioned." },
    { n: "06", t: "Validator-of-validators", b: "We publish the grading methodology AND grade the graders themselves. Independent rail. No conflict of interest." },
  ];
  return (
    <section id="principles" className="border-b border-stone-900/80 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <Eyebrow>PRINCIPLES</Eyebrow>
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">
          Six commitments.{" "}
          <span className="font-serif italic font-normal text-amber-300">Permanent.</span>
        </h2>
        <ul className="mt-10 grid md:grid-cols-2 gap-3">
          {principles.map((p) => (
            <li key={p.n} className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-amber-300/80 font-mono text-xs font-bold pt-0.5">{p.n}</span>
                <span className="text-base font-semibold text-stone-100">{p.t}</span>
              </div>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed ml-7">{p.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Get involved ─────────────────────────────────────────────────────────
function GetInvolved() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("OpenDefendable contributor interest");
    const body = encodeURIComponent(`I'd like to contribute to OpenDefendable.\n\nEmail: ${email}\n\nArea of interest:\n[ ] doctrine packs\n[ ] deed schema spec\n[ ] bounty program\n[ ] governance\n[ ] other:`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contribute" className="border-b border-stone-900/80 bg-stone-950/40 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <Eyebrow>CONTRIBUTE</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">
              Build the standards.{" "}
              <span className="font-serif italic font-normal text-amber-300">Own the rail.</span>
            </h2>
            <P className="mt-6">
              Three ways to plug in today. None of them require a contract ·
              an NDA · or an enterprise procurement decision.
            </P>

            <div className="mt-8 space-y-3">
              <Way
                title="Submit a doctrine pack"
                body="Have a real-world agent failure pattern you've documented? Open a PR against the pack registry · we co-author the adversarial case · ships in v.next · researcher attribution stays."
                href={`${GITHUB_URL}/defendable`}
                cta="GitHub @SudoSuOps"
              />
              <Way
                title="Review the deed spec"
                body="The Defendable Agent Deed JSON schema is public · cryptographically verifiable · ENS-anchored. Review it · break it · propose improvements via PR or RFC."
                href={`${PARENT_URL}/how-it-works#deed`}
                cta="See deed anatomy"
              />
              <Way
                title="Join the standards-body conversation"
                body="We're forming a 5-7 person advisory board (Defendable + 2 research + 1 insurance + 1 academic). Drop an email if you want a seat at the table."
                href={`mailto:${EMAIL}?subject=Standards%20body%20advisory%20seat`}
                cta={EMAIL}
              />
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-6 py-7">
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/90 font-semibold mb-2">Stay in the loop</div>
            <div className="text-base text-stone-100 font-medium mb-2">Founding-contributor list</div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              No spam · no newsletter · just an email when we publish v1
              of the pack registry · the deed spec · or the bounty program.
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded bg-neutral-900/80 border border-stone-800 text-stone-100 placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 rounded bg-amber-400 text-neutral-950 text-sm font-semibold tracking-tight hover:bg-amber-300 transition-colors"
              >
                {sent ? "Email queued · check your client" : "Notify me"}
              </button>
            </form>
            <p className="mt-4 text-xs text-stone-500 italic leading-relaxed">
              Submitting opens your mail client to{" "}
              <span className="font-mono text-stone-400">{EMAIL}</span>{" "}
              · we never store the address until you send.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Way({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-4">
      <div className="text-base font-semibold text-stone-100">{title}</div>
      <p className="mt-1.5 text-sm text-stone-400 leading-relaxed">{body}</p>
      <a
        href={href}
        target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-300/90 hover:text-amber-300 font-mono"
      >
        ↗ {cta}
      </a>
    </div>
  );
}

// ─── Related surfaces ─────────────────────────────────────────────────────
function RelatedSurfaces() {
  return (
    <section className="border-b border-stone-900/80">
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24">
        <Eyebrow>BRAND STACK · 6 DOMAINS</Eyebrow>
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-stone-100 leading-tight">
          Audience-segmented.{" "}
          <span className="font-serif italic font-normal text-amber-300">Coherent doctrine.</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-3">
          <BrandRow domain="defendableos.com" label="Suit" desc="Institutional product · HoneyBox + DefendableCloud" url="https://defendableos.com" />
          <BrandRow domain="defendtheclaw.com" label="Manifesto" desc="Movement · 'inspect before you trust'" url="https://defendtheclaw.com" />
          <BrandRow domain="defendablehack.com" label="T-shirt" desc="Researcher · bounty · the cracked LLM" url="https://defendablehack.com" />
          <BrandRow domain="opendefendable.com" label="Hoodie · you are here" desc="OSS standards body · pack registry" url="https://opendefendable.com" highlight />
          <BrandRow domain="defendablerouter.com" label="Product" desc="AI gateway software · the cracked router" url="https://defendablerouter.com" />
          <BrandRow domain="defendablecloud.com" label="Product" desc="Hosted compute · 128 RTX 6000 · open weights" url="https://defendablecloud.com" />
        </div>
      </div>
    </section>
  );
}

function BrandRow({ domain, label, desc, url, highlight }: {
  domain: string; label: string; desc: string; url: string; highlight?: boolean;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-xl border px-5 py-4 grid grid-cols-[1.2fr_0.8fr_1.5fr] gap-3 items-center transition-colors ${
        highlight ? "border-amber-500/40 bg-amber-500/[0.06]" : "border-stone-800 bg-neutral-950/60 hover:border-stone-600"
      }`}
    >
      <div className="font-mono text-sm text-amber-300">{domain}</div>
      <div className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${highlight ? "text-amber-300" : "text-stone-500"}`}>{label}</div>
      <div className="text-xs text-stone-400 leading-snug">{desc}</div>
    </a>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-3">
            <EmblemMark />
            <div>
              <div className="font-semibold tracking-tight text-stone-100">
                <span className="text-amber-400">Open</span>Defendable
              </div>
              <div className="text-xs text-stone-500 italic">The open standards body for AI agent defense.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-stone-500 hover:text-amber-300 transition-colors"><GithubIcon /></a>
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-stone-500 hover:text-amber-300 transition-colors"><XIcon /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-stone-500 hover:text-amber-300 transition-colors"><LinkedInIcon /></a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-stone-500 hover:text-amber-300 transition-colors"><MailIcon /></a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-900 grid md:grid-cols-2 gap-3 text-xs text-stone-500">
          <div>© 2026 Swarm and Bee LLC · DBA Swarm &amp; Bee AI · D-U-N-S 138652395</div>
          <div className="md:text-right font-mono">
            <a href={MARKET_INTEL_URL} className="hover:text-amber-300 transition-colors">↗ market intelligence</a>{" · "}
            <a href={`${PARENT_URL}/doctrine`} className="hover:text-amber-300 transition-colors">doctrine</a>{" · "}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── building blocks ───────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-amber-400/80 font-semibold">
      <span className="inline-block w-6 h-px bg-amber-400/60" />
      {children}
    </div>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-base lg:text-lg text-stone-300 leading-relaxed ${className || ""}`}>{children}</p>;
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

function ArrowExt() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 8l4-4M5 4h3v3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.07 8.07L23 22h-6.59l-5.18-6.34L5.27 22H2l7.55-8.62L1.5 2h6.74l4.69 5.84L18.244 2zm-1.16 18h1.87L7.02 4H5.06l12.02 16z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}
