"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Pill, SoftCard } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Activity,
  Stethoscope,
  Hospital,
  CheckCircle2,
  Brain,
  TrendingUp,
} from "lucide-react";

export function HeroHealthPage() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Soft gradient backdrop matching source page-01 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c4d6f7] via-[#dbe7fb] to-[#f0f6fc]" aria-hidden />
        <div className="absolute inset-0 bg-dots-slate opacity-30" aria-hidden />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-blue-300/50 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                Health Insurance
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1e3a8a] leading-[1.05]">
                Coverage that
                <br />
                cares for every
                <br />
                <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                  heartbeat.
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
                Compare cashless hospital networks, decode sub-limits and co-pays,
                and get AI-tailored health plans that actually pay when you need them.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => navigate("onboarding")}
                  size="lg"
                  className="rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-glow-brand h-12 px-6"
                >
                  Find My Health Plan
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => navigate("policies")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:text-blue-900 transition-colors"
                >
                  Browse Health Plans
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { label: "Cashless hospitals", value: "12,400+" },
                  { label: "Avg claim paid", value: "94%" },
                  { label: "Time to analyze", value: "12 sec" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold tabular-nums text-blue-800">{s.value}</div>
                    <div className="text-[11px] text-slate-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D glassmorphism illustration */}
            <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
              <HealthGlassIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <SoftCard key={f.title} interactive>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                {f.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Two-column explainer */}
      <section className="bg-gradient-to-br from-blue-50 to-white border-y border-blue-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Pill variant="blue">Why AI underwriting</Pill>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Stop reading 80-page policy wordings.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                A typical health insurance document is 80+ pages of legalese. Sub-limits
                buried in clause 4.7. Co-pay percentages in Annex B. Room-rent caps in
                fine print on page 63.
              </p>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                InsurIntel AI reads every line in 12 seconds — surfacing the clauses that
                will cost you money at claim time, before you sign.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Hidden sub-limits on specific surgeries",
                  "Room-rent caps that cap your total claim",
                  "Disease-specific waiting periods",
                  "Co-pay clauses that activate after 45",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate("inspector")}
                className="mt-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-5"
              >
                Try AI Policy Inspector
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              {INSIGHT_CARDS.map((c, i) => (
                <SoftCard key={c.title} className="flex items-start gap-4" interactive>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.toneBg} ${c.toneText}`}>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{c.title}</h3>
                      <Pill variant={c.pillVariant as any}>{c.pill}</Pill>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{c.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c.toneBar}`} style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 tabular-nums">{c.progress}%</span>
                    </div>
                  </div>
                </SoftCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-8 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
          <div className="relative max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Your health is too important to guess.
            </h3>
            <p className="mt-3 text-blue-100 leading-relaxed">
              Get a free AI underwriting analysis of your current health policy or
              compare new plans in under 3 minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("onboarding")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-soft hover:bg-blue-50 transition-colors"
              >
                Start Free Analysis
              </button>
              <button
                onClick={() => navigate("policies")}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Browse Plans
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HealthGlassIllustration() {
  return (
    <div className="relative h-[420px] sm:h-[480px]">
      {/* Glassmorphism panel — large rounded card with transparent layered look */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[340px] h-[380px]">
          {/* Big rounded blob */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl ring-1 ring-white/60 shadow-soft-lg" />
          {/* Heart pulse icon center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 shadow-lg">
              <Heart className="h-12 w-12 text-white" fill="white" strokeWidth={0} />
              <span className="absolute inset-0 rounded-3xl ring-4 ring-white/40 animate-pulse-soft" />
            </div>
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700/70">
                Heartbeat Coverage
              </div>
              <div className="text-2xl font-bold text-blue-900">98% Protected</div>
            </div>
          </div>

          {/* Floating chip 1 - top right */}
          <div className="absolute -top-6 -right-6 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-white/80 animate-float-slow">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Stethoscope className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Cashless</div>
                <div className="text-sm font-bold text-slate-900">12,400+ hospitals</div>
              </div>
            </div>
          </div>

          {/* Floating chip 2 - bottom left */}
          <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-white/80 animate-float-slow" style={{ animationDelay: "1.5s" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Hospital className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Claim Paid</div>
                <div className="text-sm font-bold text-slate-900">94% approval</div>
              </div>
            </div>
          </div>

          {/* Floating chip 3 - right middle */}
          <div className="absolute top-1/3 -right-12 rounded-2xl bg-blue-600 p-3 text-white shadow-glow-brand animate-float-slow" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <div className="text-[10px] font-semibold uppercase tracking-wider">Live</div>
            </div>
            <div className="mt-1 text-base font-bold tabular-nums">98.4%</div>
          </div>

          {/* Decorative ECG line */}
          <svg className="absolute bottom-4 left-4 right-4" viewBox="0 0 280 24" preserveAspectRatio="none">
            <path
              d="M0 12 L60 12 L70 4 L80 20 L90 8 L100 12 L160 12 L170 4 L180 20 L190 8 L200 12 L280 12"
              fill="none"
              stroke="#1e3a8a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI underwriting",
    description: "Neural models trained on 4M+ policies find the right plan for your exact health profile.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Hidden clause detection",
    description: "Surface sub-limits, room-rent caps, and disease-specific waiting periods before you sign.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Claim simulator",
    description: "See your approval probability and out-of-pocket cost for the claims you're most likely to file.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Renewal intelligence",
    description: "Get a renewal alert 60 days before your premium spikes or coverage drops.",
  },
];

const INSIGHT_CARDS = [
  {
    icon: <Hospital className="h-5 w-5" />,
    title: "Room-rent cap detected",
    description: "Clause 4.7 limits your room to 1% of sum insured. This caps your total claim to ~₹5,000/day.",
    pill: "Action needed",
    pillVariant: "amber",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
    toneBar: "bg-amber-500",
    progress: 32,
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Maternity coverage",
    description: "2-year waiting period applies. AI suggests adding a rider or switching plans if planning pregnancy.",
    pill: "Verified",
    pillVariant: "green",
    toneBg: "bg-emerald-50",
    toneText: "text-emerald-700",
    toneBar: "bg-emerald-500",
    progress: 88,
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Co-pay after age 45",
    description: "20% co-pay activates on renewal after age 45. Negotiate this clause before signing.",
    pill: "Hidden clause",
    pillVariant: "red",
    toneBg: "bg-rose-50",
    toneText: "text-rose-700",
    toneBar: "bg-rose-500",
    progress: 56,
  },
];
