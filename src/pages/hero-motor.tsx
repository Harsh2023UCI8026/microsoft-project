"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Pill, SoftCard } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Car,
  Gauge,
  Wrench,
  Fuel,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";

export function HeroMotorPage() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* HERO — minimalist with 3D car illustration */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] to-white">
        <div className="absolute inset-0 bg-grid-slate opacity-30" aria-hidden />
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 ring-1 ring-slate-200">
                <Sparkles className="h-3.5 w-3.5" />
                Motor Insurance
              </span>
              <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.02]">
                Motor
                <br />
                Insurance
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-md">
                Premium coverage for your vehicle. AI-tuned IDV, depreciation
                protection, and zero-bonus guard — all in one smart policy.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => navigate("onboarding-vehicle")}
                  size="lg"
                  className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-12 px-6"
                >
                  Build My Motor Plan
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => navigate("simulator")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                >
                  Simulate a Claim
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Zero-depreciation option
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Instant cashless claims
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  No-claim bonus protection
                </div>
              </div>
            </div>

            {/* 3D car illustration */}
            <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
              <MotorIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2.4M+", label: "Vehicles protected" },
              { value: "98.4%", label: "Claim approval rate" },
              { value: "₹0", label: "Hidden depreciation loss" },
              { value: "45 min", label: "Avg cashless repair time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold tabular-nums text-blue-300">
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Pill variant="blue" className="mx-auto">Coverage</Pill>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Every angle of your vehicle, covered.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            AI analyzes your vehicle's age, usage, and risk profile to recommend the
            exact coverage you need — and skip what you don't.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COVERAGE.map((c) => (
            <SoftCard key={c.title} interactive>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                {c.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{c.description}</p>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Recommended for
              </div>
              <div className="mt-1 text-xs text-slate-600">{c.recommended}</div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* AI tuning explainer */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Pill variant="blue">AI Premium Tuning</Pill>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Pay for what you actually drive.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Traditional motor insurance uses broad brackets — same premium for a
                city commuter doing 5,000 km/year and a sales rep doing 40,000 km/year.
                InsurIntel AI builds a personalized underwriting profile from your
                driving habits, vehicle age, and local claim patterns.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Usage pattern", value: "Low-mileage city driver", pct: 78 },
                  { label: "Vehicle age risk", value: "Optimal (2-5 years)", pct: 92 },
                  { label: "Local claim density", value: "Below city average", pct: 64 },
                  { label: "Driver profile", value: "Experienced + clean record", pct: 95 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="font-medium text-slate-600">{row.label}</span>
                      <span className="font-semibold text-slate-900">{row.value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate("onboarding-vehicle")}
                className="mt-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-5"
              >
                Get My AI Premium
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <SoftCard className="p-7 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Premium Comparison
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    Maruti Swift VXi · 2022
                  </div>
                </div>
                <Pill variant="green">
                  <TrendingUp className="h-3 w-3" /> -32% premium
                </Pill>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Traditional insurer quote", value: "₹14,800 / year", tone: "slate" },
                  { label: "Broker's best quote", value: "₹12,200 / year", tone: "slate" },
                  { label: "InsurIntel AI-tuned", value: "₹9,960 / year", tone: "blue" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between rounded-xl p-3 ${
                      row.tone === "blue" ? "bg-blue-50 ring-1 ring-blue-100" : "bg-slate-50"
                    }`}
                  >
                    <span className={`text-sm ${row.tone === "blue" ? "font-semibold text-blue-900" : "text-slate-600"}`}>
                      {row.label}
                    </span>
                    <span className={`text-base font-bold tabular-nums ${row.tone === "blue" ? "text-blue-700" : "text-slate-900"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 p-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-emerald-700">
                  Same coverage. ₹4,840 saved annually. Better IDV.
                </span>
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 bg-dots-slate opacity-10" aria-hidden />
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-blue-500/30 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Insure smarter. Drive safer.
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Build your AI-tuned motor policy in 2 minutes — and never pay for coverage
              you don't need again.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("onboarding-vehicle")}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-blue-500 transition-colors"
              >
                Start Free Analysis
              </button>
              <button
                onClick={() => navigate("policies")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
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

function MotorIllustration() {
  return (
    <div className="relative h-[420px] sm:h-[480px]">
      {/* Big rounded platform */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Floor ellipse */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-80 rounded-full bg-blue-900/10 blur-2xl" />

          {/* Stylized 3D car */}
          <svg viewBox="0 0 360 220" className="w-[360px] h-[220px] drop-shadow-2xl">
            <defs>
              <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="60%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="carBody2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="windowGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Car shadow */}
            <ellipse cx="180" cy="180" rx="150" ry="14" fill="#0f172a" opacity="0.15" />

            {/* Car body lower */}
            <path d="M50 145 Q55 100 100 95 L140 70 Q160 60 200 60 L240 60 Q260 60 280 80 L310 100 Q330 110 335 130 L335 150 Q335 165 320 170 L60 170 Q40 168 50 145 Z" fill="url(#carBody)" />

            {/* Body highlight */}
            <path d="M55 145 Q60 110 100 100 L140 80 Q160 70 200 70 L240 70 Q255 70 270 80 L300 100 Q320 110 325 130 L325 140 Q325 148 315 150 L60 150 Q50 148 55 145 Z" fill="url(#carBody2)" opacity="0.5" />

            {/* Windows */}
            <path d="M125 105 L150 78 Q165 70 200 70 L240 70 Q255 70 270 85 L290 105 Z" fill="url(#windowGlass)" />
            <path d="M195 75 L240 75 Q255 75 270 85 L270 105 L195 105 Z" fill="#ffffff" opacity="0.4" />

            {/* Wheels */}
            <circle cx="110" cy="170" r="22" fill="#1e293b" />
            <circle cx="110" cy="170" r="14" fill="#0f172a" />
            <circle cx="110" cy="170" r="6" fill="#94a3b8" />
            <circle cx="265" cy="170" r="22" fill="#1e293b" />
            <circle cx="265" cy="170" r="14" fill="#0f172a" />
            <circle cx="265" cy="170" r="6" fill="#94a3b8" />

            {/* Headlight */}
            <ellipse cx="318" cy="120" rx="10" ry="6" fill="#fef3c7" />
            <ellipse cx="318" cy="120" rx="6" ry="3" fill="#fbbf24" />

            {/* Door handle */}
            <rect x="195" y="120" width="22" height="3" rx="1.5" fill="#1e3a8a" opacity="0.5" />
          </svg>

          {/* Floating chip 1 - premium */}
          <div className="absolute top-4 -right-4 sm:-right-12 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-slate-200 animate-float-slow">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Gauge className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">IDV Tuned</div>
                <div className="text-sm font-bold text-slate-900">₹6.8L</div>
              </div>
            </div>
          </div>

          {/* Floating chip 2 - claim */}
          <div className="absolute -bottom-2 -left-4 sm:-left-12 rounded-2xl bg-white p-3 shadow-soft-lg ring-1 ring-slate-200 animate-float-slow" style={{ animationDelay: "1.2s" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Claim Payout</div>
                <div className="text-sm font-bold text-slate-900">₹4.2L paid</div>
              </div>
            </div>
          </div>

          {/* Floating chip 3 - savings */}
          <div className="absolute -top-2 -left-8 sm:-left-16 rounded-2xl bg-blue-600 p-3 text-white shadow-glow-brand animate-float-slow" style={{ animationDelay: "0.6s" }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider">You Save</div>
            <div className="text-base font-bold tabular-nums">₹4,840/yr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const COVERAGE = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Zero depreciation",
    description: "Get full claim value with no depreciation deduction on parts replacement.",
    recommended: "Vehicles 0-5 years old",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Engine protect",
    description: "Covers consequential damage to engine, gearbox, and differential from waterlogging or lubricant loss.",
    recommended: "Monsoon-prone cities",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "No-claim bonus guard",
    description: "Preserve your accumulated NCB even after a claim with this optional rider.",
    recommended: "Drivers with 20%+ NCB",
  },
  {
    icon: <Fuel className="h-5 w-5" />,
    title: "Roadside assistance",
    description: "24/7 nationwide towing, fuel delivery, flat-tire service, and battery jump-start.",
    recommended: "Highway commuters",
  },
];

export default HeroMotorPage;
