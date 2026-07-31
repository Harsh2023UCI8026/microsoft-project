"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Pill, SoftCard } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  Activity,
  Brain,
  Gauge,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export function HeroDashboardPage() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* HERO with large dashboard preview */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-grid-slate opacity-30" aria-hidden />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              Product Dashboard Preview
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05]">
              One workspace for
              <br />
              <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                every underwriting decision.
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Upload any policy PDF, simulate any claim, chat with a specialized AI
              underwriter, and get a confidence score on every coverage decision — all
              from one AI workspace.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => navigate("inspector")}
                size="lg"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-glow-brand h-12 px-6"
              >
                Try Live Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                onClick={() => navigate("onboarding")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-12 relative">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Pill variant="blue" className="mx-auto">Workspace modules</Pill>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Six AI tools. One unified intelligence layer.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Every module shares the same risk profile, the same underwriting score, and
            the same AI models — so your decisions compound in accuracy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((m) => (
            <SoftCard key={m.title} interactive className="flex flex-col gap-3 cursor-pointer" onClick={() => navigate(m.route as any)}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {m.icon}
                </div>
                <Pill variant={m.pillVariant as any}>{m.tag}</Pill>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{m.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{m.description}</p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {m.metric}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(m.route as any); }}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Workflow strip */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <Pill variant="blue" className="bg-blue-500/20">How it works</Pill>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              From PDF upload to underwriting decision — in 90 seconds.
            </h2>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Drop any policy PDF into the workspace. InsurIntel AI handles the rest:
              OCR, clause extraction, risk scoring, red flag detection, and AI
              recommendation — in one continuous workflow.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-8 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
          <div className="relative max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              The underwriting workspace of the future, available today.
            </h3>
            <p className="mt-3 text-blue-100 leading-relaxed">
              Start with a free 14-day trial. No credit card required. Full access to
              every AI module, every benchmark, every red flag.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("onboarding")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-soft hover:bg-blue-50 transition-colors"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate("pricing")}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HeroDashboardPage;

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Browser window */}
      <div className="rounded-2xl bg-white shadow-soft-lg ring-1 ring-slate-200 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            app.insurintel.ai / workspace
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink-dot" />
            Live
          </div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-1 border-r border-slate-100 p-3 bg-slate-50/50">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
              Workspace
            </div>
            {[
              { label: "Overview", icon: <Gauge className="h-4 w-4" />, active: true },
              { label: "Policy Inspector", icon: <FileSearch className="h-4 w-4" /> },
              { label: "Claim Simulator", icon: <Activity className="h-4 w-4" /> },
              { label: "AI Assistant", icon: <Brain className="h-4 w-4" /> },
              { label: "Recommendations", icon: <Target className="h-4 w-4" /> },
              { label: "Risk Engine", icon: <TrendingUp className="h-4 w-4" /> },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                  item.active ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Overview</div>
                <div className="text-base font-bold text-slate-900">Welcome back, Rajesh</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                  Family Plan · Active
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Underwriting score", value: "98.4%", tone: "blue" },
                { label: "Coverage gaps", value: "2", tone: "amber" },
                { label: "Policies analyzed", value: "12", tone: "slate" },
                { label: "Avg claim approval", value: "94%", tone: "green" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl p-3 ring-1 ${
                    s.tone === "blue" ? "bg-blue-50 text-blue-700 ring-blue-100"
                    : s.tone === "amber" ? "bg-amber-50 text-amber-700 ring-amber-100"
                    : s.tone === "green" ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-slate-50 text-slate-700 ring-slate-100"
                  }`}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{s.label}</div>
                  <div className="mt-1 text-xl font-bold tabular-nums">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Two-column body */}
            <div className="grid md:grid-cols-3 gap-3">
              {/* Chart card */}
              <div className="md:col-span-2 rounded-xl bg-white p-4 ring-1 ring-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-slate-700">Coverage vs Premium</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Coverage</span>
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300" /> Premium</span>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-32">
                  {[40, 58, 49, 67, 72, 88, 62, 78, 84, 92, 76, 88].map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-end gap-0.5">
                      <div className="w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${b}%` }} />
                      <div className="w-full rounded-b bg-slate-200" style={{ height: `${b * 0.45}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts card */}
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-slate-700">Red flags</div>
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">3 found</span>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "Room-rent cap detected", tone: "amber" },
                    { icon: <Clock className="h-3.5 w-3.5" />, label: "Maternity 2-yr waiting", tone: "blue" },
                    { icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "20% co-pay after 45", tone: "red" },
                  ].map((a, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg p-2 text-xs ${
                      a.tone === "amber" ? "bg-amber-50 text-amber-700"
                      : a.tone === "red" ? "bg-rose-50 text-rose-700"
                      : "bg-blue-50 text-blue-700"
                    }`}>
                      {a.icon}
                      {a.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation strip */}
            <div className="mt-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-100">AI Recommendation</div>
                  <div className="text-sm font-semibold">Switch to Health Shield Pro Plus — save ₹4,840/year with better coverage.</div>
                </div>
              </div>
              <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                View →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MODULES = [
  {
    icon: <FileSearch className="h-5 w-5" />,
    title: "AI Policy Inspector",
    description: "Upload any policy PDF for neural analysis of clauses, risks, and hidden terms in seconds.",
    tag: "Core",
    pillVariant: "blue",
    metric: "Avg 47 clauses analyzed",
    route: "inspector",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Claim Simulator",
    description: "Model claim scenarios, see approval probabilities, and visualize out-of-pocket costs before you buy.",
    tag: "Predictive",
    pillVariant: "purple",
    metric: "94% prediction accuracy",
    route: "simulator",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI Underwriting Assistant",
    description: "Chat with a specialized AI underwriter to ask anything about your policy or coverage decisions.",
    tag: "Conversational",
    pillVariant: "green",
    metric: "Instant answers",
    route: "assistant",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "AI Recommendations",
    description: "Curated insurance strategies ranked by fit for your risk profile, budget, and life stage.",
    tag: "Personalized",
    pillVariant: "amber",
    metric: "7 strategies curated",
    route: "recommendations",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "AI Risk Engine",
    description: "Detailed breakdown of your overall risk score, risk vectors, and future projections.",
    tag: "Diagnostic",
    pillVariant: "red",
    metric: "12 risk vectors tracked",
    route: "risk-engine",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Policy Life Cycle",
    description: "Track every milestone, waiting period, and renewal with AI-driven predictive insights.",
    tag: "Ongoing",
    pillVariant: "blue",
    metric: "Real-time tracking",
    route: "lifecycle",
  },
];

const WORKFLOW = [
  {
    icon: <FileSearch className="h-5 w-5" />,
    title: "Upload PDF",
    description: "Drag your policy document into the workspace. We accept any PDF up to 50 MB.",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI extracts clauses",
    description: "Neural OCR + clause extraction identifies every term, sub-limit, and exclusion in seconds.",
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Red flags surfaced",
    description: "Hidden traps, unfair clauses, and renewal risks are flagged with severity and fix suggestions.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Decision ready",
    description: "Get a transparency score, claim approval probability, and AI recommendation in one report.",
  },
];
