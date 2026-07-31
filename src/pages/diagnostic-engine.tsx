"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import {
  SoftCard,
  Pill,
  StepStepper,
  ProgressRing,
  ProgressBar,
} from "@/components/site-primitives";
import {
  Sparkles,
  Brain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Activity,
  ShieldCheck,
  FileSearch,
  TrendingUp,
  Eye,
  Lock,
  Lightbulb,
} from "lucide-react";

export function DiagnosticEnginePage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              AI Diagnostic Engine
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Understand your claim risks before buying.
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Our neural underwriting engine analyzes thousands of historical claim denials
              to predict the transparency and reliability of your specific policy coverage
              in real-time.
            </p>
          </div>
          <StepStepper
            steps={[{ label: "Analyze" }, { label: "Diagnose" }, { label: "Fix" }]}
            current={1}
            variant="horizontal-compact"
          />
        </div>

        {/* Top — rejection risk dashboard */}
        <SoftCard className="mb-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <div className="grid lg:grid-cols-[1fr_1fr_280px] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Claim Rejection Risk
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold tabular-nums text-amber-300">18%</span>
                <span className="text-sm text-slate-300">of typical claims rejected</span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-md">
                Your current policy has a higher-than-average rejection risk due to 3 hidden
                clauses. AI projects 1 in 5 claims may face partial or full rejection.
              </p>
            </div>

            {/* Rejection breakdown */}
            <div className="space-y-2.5">
              {[
                { label: "Approved in full", pct: 78, tone: "bg-emerald-400" },
                { label: "Partially paid", pct: 14, tone: "bg-amber-400" },
                { label: "Rejected", pct: 8, tone: "bg-rose-400" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-300">{r.label}</span>
                    <span className="font-semibold tabular-nums text-white">{r.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${r.tone}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <ProgressRing
                value={82}
                size={120}
                color="#10b981"
                label={<span className="text-2xl font-bold text-white">82</span>}
                sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Safety Score</span>}
              />
            </div>
          </div>
        </SoftCard>

        {/* Two-column */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* Deep Diagnostic Analysis */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Deep Diagnostic Analysis</h2>
                  <p className="text-xs text-slate-500">Top rejection scenarios predicted by AI</p>
                </div>
                <Pill variant="blue">8 scenarios analyzed</Pill>
              </div>
              <div className="space-y-3">
                {DIAGNOSTIC.map((d) => (
                  <div key={d.scenario} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${d.toneBg} ${d.toneText}`}>
                          {d.icon}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-slate-900">{d.scenario}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{d.cause}</p>
                        </div>
                      </div>
                      <Pill variant={d.severity as any}>{d.severityLabel}</Pill>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-500">Rejection probability</span>
                          <span className="font-semibold text-slate-900 tabular-nums">{d.probability}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              d.probability < 20 ? "bg-emerald-500"
                              : d.probability < 50 ? "bg-amber-500"
                              : "bg-rose-500"
                            }`}
                            style={{ width: `${d.probability}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg loss</div>
                        <div className="text-sm font-bold text-rose-600 tabular-nums">{d.loss}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Safety checklist */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Safety Checklist</h2>
                  <p className="text-xs text-slate-500">12-point pre-purchase safety verification</p>
                </div>
                <Pill variant="amber">9 / 12 passed</Pill>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {SAFETY_CHECKS.map((c) => (
                  <div
                    key={c.label}
                    className={`flex items-center gap-2 rounded-lg p-3 ${
                      c.status === "pass" ? "bg-emerald-50" : c.status === "fail" ? "bg-rose-50" : "bg-amber-50"
                    }`}
                  >
                    {c.status === "pass" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : c.status === "fail" ? (
                      <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900">{c.label}</div>
                      <div className="text-[10px] text-slate-500">{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* AI recommendations */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">AI Fix Recommendations</h2>
                  <p className="text-xs text-slate-500">4 specific actions to reduce your rejection risk</p>
                </div>
                <Pill variant="blue">4 actions</Pill>
              </div>
              <div className="space-y-3">
                {FIXES.map((f, i) => (
                  <div key={i} className="rounded-xl bg-blue-50/60 p-3 flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900">{f.title}</div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{f.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Pill variant="green">Risk ↓ {f.reduction}</Pill>
                        <span className="text-[10px] text-slate-500">Cost: {f.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Diagnostic Summary
                </span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Your policy has <strong className="text-white">3 hidden risk factors</strong> that
                increase rejection probability. Fixing all 3 reduces rejection risk from 18% to 4%.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200">Current rejection risk</span>
                  <span className="font-bold text-rose-300">18%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200">After fixes</span>
                  <span className="font-bold text-emerald-300">4%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200">Risk reduction</span>
                  <span className="font-bold text-emerald-300">↓ 78%</span>
                </div>
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Transparency verified</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    InsurIntel AI scanned 1,847 similar policies. 92% transparency achieved.
                  </p>
                </div>
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Not a legal guarantee</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    AI predictions are probabilistic. Always consult a licensed broker
                    before purchase.
                  </p>
                </div>
              </div>
            </SoftCard>

            <Button
              onClick={() => navigate("recommendations")}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
            >
              View Safer Plans
              <ArrowRight className="h-4 w-4" />
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

const DIAGNOSTIC = [
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    scenario: "Major surgery claim (knee replacement)",
    cause: "Sub-limit on orthopedic procedures caps payout at ₹1.5L (vs ₹3L market rate)",
    severity: "red",
    severityLabel: "High risk",
    probability: 42,
    loss: "₹1.5L",
    toneBg: "bg-rose-50",
    toneText: "text-rose-700",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    scenario: "Hospitalization with private room",
    cause: "Room-rent cap means difference comes out of pocket; affects total claim",
    severity: "red",
    severityLabel: "High risk",
    probability: 38,
    loss: "₹1.2L",
    toneBg: "bg-rose-50",
    toneText: "text-rose-700",
  },
  {
    icon: <Activity className="h-4 w-4" />,
    scenario: "Maternity-related claims (next 2 years)",
    cause: "2-year waiting period blocks maternity coverage if claimed early",
    severity: "amber",
    severityLabel: "Medium risk",
    probability: 65,
    loss: "₹80K",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    scenario: "Post-age-45 chronic illness claim",
    cause: "20% co-pay activates on renewal after 45; reduces every claim payout",
    severity: "amber",
    severityLabel: "Medium risk",
    probability: 28,
    loss: "₹1L",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    scenario: "Routine hospitalization (5 days)",
    cause: "Standard coverage applies; cashless network adequate",
    severity: "green",
    severityLabel: "Low risk",
    probability: 6,
    loss: "₹0",
    toneBg: "bg-emerald-50",
    toneText: "text-emerald-700",
  },
];

const SAFETY_CHECKS = [
  { label: "Sum insured adequate", detail: "₹10L covers metro hospitalization", status: "pass" },
  { label: "Cashless network nearby", detail: "12,400+ hospitals, 240 within 25km", status: "pass" },
  { label: "No room-rent cap", detail: "Cap detected in Clause 4.7", status: "fail" },
  { label: "No co-pay clause", detail: "20% co-pay after age 45", status: "fail" },
  { label: "Pre-existing covered", detail: "After 3-year waiting", status: "pass" },
  { label: "Maternity included", detail: "2-year waiting applies", status: "warn" },
  { label: "Critical illness rider", detail: "Not in base plan", status: "warn" },
  { label: "Restoration benefit", detail: "100% restoration once", status: "pass" },
  { label: "NCB protection", detail: "Yes, up to 50%", status: "pass" },
  { label: "No-claim bonus", detail: "Up to 10% annual", status: "pass" },
  { label: "Wellness rewards", detail: "Free annual checkup", status: "pass" },
  { label: "Premium lock-in", detail: "Premium review annually", status: "warn" },
];

const FIXES = [
  {
    title: "Switch to no-room-rent-cap plan",
    description: "Eliminate ₹1.2L out-of-pocket on a 5-day hospitalization. Adds Health Shield Pro Plus.",
    reduction: "32%",
    cost: "+₹2,400/yr",
  },
  {
    title: "Negotiate co-pay removal",
    description: "Insurer will waive 20% co-pay with 5-year lock-in. Pays back on first claim after 45.",
    reduction: "28%",
    cost: "+₹1,800/yr",
  },
  {
    title: "Add critical illness rider",
    description: "Covers 18 critical illnesses for ₹10L. Reduces rejection risk on major illness claims.",
    reduction: "18%",
    cost: "+₹2,400/yr",
  },
  {
    title: "Add maternity rider",
    description: "Reduces maternity waiting from 24 to 9 months. Pays back if pregnancy planned.",
    reduction: "10%",
    cost: "+₹1,200/yr",
  },
];
