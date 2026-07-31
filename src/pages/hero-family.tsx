"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Pill, SoftCard } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Heart,
  Baby,
  Home as HomeIcon,
  CheckCircle2,
  Lock,
  Clock,
} from "lucide-react";

export function HeroFamilyPage() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* HERO — SecureLife / family protection */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f6fc] via-[#e6eff8] to-[#f0f6fc]">
        <div className="absolute inset-0 bg-dots-slate opacity-25" aria-hidden />
        <div className="absolute top-0 -right-32 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                Family Protection
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1e3a5f] leading-[1.07]">
                Protecting What
                <br />
                Matters Most.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Comprehensive insurance solutions for your family's future, backed by
                industry-leading security and AI-driven coverage intelligence.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => navigate("onboarding")}
                  size="lg"
                  className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-glow-brand h-12 px-6"
                >
                  Start Your Coverage
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => navigate("family-vault")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:text-blue-900 transition-colors"
                >
                  View Family Vault
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Bank-grade encryption
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  4M+ families protected
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-600" />
                  24/7 claim support
                </div>
              </div>
            </div>

            {/* 3D family illustration */}
            <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
              <FamilyIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Pill variant="blue" className="mx-auto">Coverage pillars</Pill>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Three layers of protection for every life stage.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Our AI underwriting engine coordinates health, life, and asset coverage so
            your family is never under-insured when it matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <SoftCard key={p.title} interactive className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 text-blue-700">
                  {p.icon}
                </div>
                <Pill variant={p.pillVariant as any}>{p.tag}</Pill>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{p.description}</p>
              </div>
              <ul className="space-y-2 mt-1">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(p.route as any)}
                className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Explore {p.title.split(" ")[0]}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Family vault preview */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Pill variant="blue">Family Vault</Pill>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                One dashboard for every member's coverage.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                See your family's overall protection score, identify coverage gaps for
                each member, and get AI recommendations to close them — all in real time.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Family protection score", value: "88%", tone: "blue" },
                  { label: "Coverage gaps detected", value: "2", tone: "amber" },
                  { label: "Total sum insured", value: "₹1.2 Cr", tone: "slate" },
                  { label: "Annual premium", value: "₹84,000", tone: "slate" },
                ].map((s) => (
                  <SoftCard key={s.label} padding="sm">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                    <div className={`mt-1 text-2xl font-bold tabular-nums ${
                      s.tone === "blue" ? "text-blue-700" : s.tone === "amber" ? "text-amber-600" : "text-slate-900"
                    }`}>
                      {s.value}
                    </div>
                  </SoftCard>
                ))}
              </div>
              <Button
                onClick={() => navigate("family-vault")}
                className="mt-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-5"
              >
                Open Family Vault
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Member profiles preview */}
            <SoftCard padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Family profiles</h3>
                <Pill variant="green">All active</Pill>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Rajesh (Self)", role: "Primary insured", score: 92, gap: false, icon: "👨" },
                  { name: "Anita (Spouse)", role: "Co-insured", score: 88, gap: false, icon: "👩" },
                  { name: "Aarav (Son, 14)", role: "Dependent", score: 72, gap: true, icon: "👦" },
                  { name: "Meera (Daughter, 9)", role: "Dependent", score: 95, gap: false, icon: "👧" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-sky-200 text-lg">
                      {m.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.role}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold tabular-nums ${
                        m.gap ? "text-amber-600" : "text-emerald-600"
                      }`}>
                        {m.score}%
                      </div>
                      <div className={`text-[10px] ${
                        m.gap ? "text-amber-600" : "text-emerald-600"
                      }`}>
                        {m.gap ? "Coverage gap" : "Protected"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-8 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
          <div className="relative max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Your family deserves more than a sales pitch.
            </h3>
            <p className="mt-3 text-blue-100 leading-relaxed">
              Get an AI underwritten family protection plan in 3 minutes — designed by
              intelligence, not commissioned agents.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("onboarding")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-soft hover:bg-blue-50 transition-colors"
              >
                Start Free Analysis
              </button>
              <button
                onClick={() => navigate("recommendations")}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                See Recommendations
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HeroFamilyPage;

function FamilyIllustration() {
  return (
    <div className="relative h-[420px] sm:h-[480px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[380px] h-[400px]">
          {/* Shield backdrop */}
          <svg viewBox="0 0 380 400" className="absolute inset-0">
            <defs>
              <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="glassPanel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Big shield */}
            <path
              d="M190 30 L330 80 L330 220 Q330 320 190 370 Q50 320 50 220 L50 80 Z"
              fill="url(#shieldGrad)"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            {/* Inner shield */}
            <path
              d="M190 60 L300 100 L300 215 Q300 295 190 335 Q80 295 80 215 L80 100 Z"
              fill="url(#glassPanel)"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            {/* House icon */}
            <g transform="translate(125, 175)">
              <path d="M0 60 v-30 l40 -25 l40 25 v30 z" fill="url(#houseGrad)" />
              <rect x="32" y="40" width="16" height="20" fill="#fff" opacity="0.9" />
              <rect x="8" y="35" width="14" height="12" fill="#fff" opacity="0.7" />
              <rect x="58" y="35" width="14" height="12" fill="#fff" opacity="0.7" />
              <path d="M0 60 h80 v6 h-80 z" fill="#1e3a8a" opacity="0.6" />
            </g>
            {/* Heart in center top */}
            <g transform="translate(170, 110)">
              <path d="M20 0 c-7 -7 -20 -5 -20 5 c0 10 12 16 20 22 c8 -6 20 -12 20 -22 c0 -10 -13 -12 -20 -5 z" fill="#fff" />
            </g>
          </svg>

          {/* Floating chip 1 - protection score */}
          <div className="absolute top-12 -right-4 sm:-right-8 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-slate-200 animate-float-slow">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Family Score</div>
                <div className="text-sm font-bold text-slate-900">88% protected</div>
              </div>
            </div>
          </div>

          {/* Floating chip 2 - members */}
          <div className="absolute bottom-12 -left-4 sm:-left-10 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-slate-200 animate-float-slow" style={{ animationDelay: "1.2s" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Users className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Members</div>
                <div className="text-sm font-bold text-slate-900">4 protected</div>
              </div>
            </div>
          </div>

          {/* Floating chip 3 - live */}
          <div className="absolute top-32 -left-4 sm:-left-12 rounded-2xl bg-blue-600 p-3 text-white shadow-glow-brand animate-float-slow" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-blink-dot" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Live</span>
            </div>
            <div className="mt-1 text-base font-bold">Coverage Active</div>
          </div>

          {/* Floating chip 4 - alerts */}
          <div className="absolute bottom-20 -right-4 sm:-right-10 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100 animate-float-slow" style={{ animationDelay: "1.8s" }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">AI Alert</div>
            <div className="text-sm font-bold text-amber-900">2 gaps to fix</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PILLARS = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Health Coverage",
    description: "Family floater plans with AI-matched sum insured, sub-limits analyzed, and cashless hospital coverage verified.",
    tag: "Core",
    pillVariant: "blue",
    benefits: [
      "Family floater up to ₹1 Cr",
      "Maternity rider included",
      "Pre-existing covered after 1 yr",
    ],
    route: "hero-health",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Life Insurance",
    description: "Term plans with lump sum + monthly income options, AI-tuned sum insured based on your family's future needs.",
    tag: "Critical",
    pillVariant: "red",
    benefits: [
      "Term cover up to ₹2 Cr",
      "Critical illness rider",
      "Accidental death benefit",
    ],
    route: "recommendations",
  },
  {
    icon: <HomeIcon className="h-5 w-5" />,
    title: "Asset Protection",
    description: "Home structure, contents, and vehicle coverage bundled into one intelligent policy with cross-line discounts.",
    tag: "Optional",
    pillVariant: "green",
    benefits: [
      "Home + contents coverage",
      "Earthquake & flood rider",
      "Bundled motor discount",
    ],
    route: "hero-motor",
  },
];
