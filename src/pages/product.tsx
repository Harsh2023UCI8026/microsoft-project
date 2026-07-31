"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, CtaBand } from "@/components/site-primitives";
import {
  ArrowRight,
  FileSearch,
  Activity,
  Brain,
  Target,
  TrendingUp,
  Gauge,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

export function ProductPage() {
  const { navigate } = useRouter();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
        <div className="absolute inset-0 bg-dots-slate opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            The Product
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto">
            One platform. Six AI tools. Every underwriting decision.
          </h1>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            InsurIntel AI unifies policy inspection, claim simulation, risk scoring, and AI
            recommendations into one intelligence layer — so every decision compounds in accuracy.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => navigate("onboarding")} size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-glow-brand h-12 px-6">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={() => navigate("hero-dashboard")} size="lg" variant="outline" className="rounded-xl h-12">
              See Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
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
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{m.metric}</span>
                <span className="text-xs font-semibold text-blue-700 inline-flex items-center gap-1">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Pill variant="blue" className="bg-blue-500/20 mx-auto">Why InsurIntel AI</Pill>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Built for the way insurance actually works.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              We've trained our neural models on 4M+ policies and 1.8M historical claims —
              so every prediction, every recommendation, and every red flag is grounded in real data.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  {w.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <CtaBand
          title="Start free. Upgrade when you're ready."
          subtitle="14-day full-access trial. No credit card required."
          primary={{ label: "Get Started Free", onClick: () => navigate("onboarding") }}
          secondary={{ label: "Talk to Sales", onClick: () => navigate("resources") }}
        />
      </section>
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
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI Policy Simplifier",
    description: "Turn 80-page legal documents into plain English summaries with impact scoring.",
    tag: "New",
    pillVariant: "purple",
    metric: "5-min reading time",
    route: "simplifier",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Claim Simulator",
    description: "Model claim scenarios, see approval probabilities, and visualize out-of-pocket costs before you buy.",
    tag: "Predictive",
    pillVariant: "green",
    metric: "94% prediction accuracy",
    route: "simulator",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI Underwriting Assistant",
    description: "Chat with a specialized AI underwriter to ask anything about your policy or coverage decisions.",
    tag: "Conversational",
    pillVariant: "amber",
    metric: "Instant answers",
    route: "assistant",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "AI Recommendations",
    description: "Curated insurance strategies ranked by fit for your risk profile, budget, and life stage.",
    tag: "Personalized",
    pillVariant: "blue",
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
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Insurance Readiness",
    description: "Real-time readiness for emergency hospitalization with hospital network availability.",
    tag: "Live",
    pillVariant: "green",
    metric: "94% readiness score",
    route: "readiness",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI Diagnostic Engine",
    description: "Detect claim rejection risks before buying with neural underwriting analysis.",
    tag: "Preventive",
    pillVariant: "purple",
    metric: "8 scenarios analyzed",
    route: "diagnostic",
  },
];

const WHY = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "12-second analysis",
    description: "Neural OCR + clause extraction reads any policy PDF in seconds, not hours.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "98.4% accuracy",
    description: "Underwriting predictions validated against 1.8M historical claim outcomes.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Hidden clause detection",
    description: "Average 47 hidden clauses surfaced per policy — sub-limits, co-pays, traps.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "32% avg savings",
    description: "Members save an average of 32% on premiums by switching to AI-tuned plans.",
  },
];

export default ProductPage;
