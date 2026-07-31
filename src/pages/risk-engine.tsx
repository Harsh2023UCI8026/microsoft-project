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
  StatBlock,
} from "@/components/site-primitives";
import {
  TrendingUp,
  TrendingDown,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Target,
  ArrowRight,
  Sparkles,
  Activity,
  Zap,
  Heart,
  Car,
  Home as HomeIcon,
  Clock,
  CheckCircle2,
} from "lucide-react";

export function RiskEnginePage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <TrendingUp className="h-3.5 w-3.5" />
              AI Risk Analysis Engine
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              AI Risk Analysis Engine
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Precision intelligence for modern risk assessment. Detailed breakdown of
              applicant profile <span className="font-semibold text-slate-700">#INS-4402-B</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StepStepper
              steps={[{ label: "Profile" }, { label: "Analyze" }, { label: "Review" }, { label: "Decide" }]}
              current={2}
              variant="horizontal-compact"
            />
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">A</span>
              <span className="text-xs font-semibold text-slate-700">Arjun Mehta</span>
            </div>
          </div>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatBlock
            label="Overall Risk Score"
            value="22"
            unit="/ 100"
            icon={<Target className="h-4 w-4" />}
            variant="green"
            trend="down"
            trendValue="↓ 8 pts vs last year"
          />
          <StatBlock
            label="Risk Vectors Tracked"
            value="12"
            icon={<Activity className="h-4 w-4" />}
            trend="up"
            trendValue="↑ 2 new vectors added"
          />
          <StatBlock
            label="Future Projection (5yr)"
            value="Medium"
            icon={<TrendingUp className="h-4 w-4" />}
            variant="amber"
            trendValue="→ Stable outlook"
          />
          <StatBlock
            label="AI Confidence"
            value="98.4"
            unit="%"
            icon={<Brain className="h-4 w-4" />}
            variant="blue"
            trend="up"
            trendValue="↑ 2.1% with new data"
          />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            {/* Overall Risk Score - big card */}
            <SoftCard>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Overall Insurance Risk Score</h2>
                  <p className="text-xs text-slate-500">Aggregated from 12 risk vectors across 4 categories</p>
                </div>
                <Pill variant="green">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink-dot" />
                  Low risk
                </Pill>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center">
                  <ProgressRing
                    value={22}
                    size={180}
                    strokeWidth={14}
                    color="#10b981"
                    label={
                      <div className="text-center">
                        <div className="text-4xl font-bold tabular-nums text-slate-900">22</div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">/ 100</div>
                      </div>
                    }
                  />
                  <div className="mt-3 text-xs text-slate-500 text-center">
                    Top 8% lowest risk in your demographic
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Health & lifestyle", score: 18, tone: "green" },
                    { label: "Financial stability", score: 15, tone: "green" },
                    { label: "Occupational risk", score: 28, tone: "amber" },
                    { label: "Geographic exposure", score: 32, tone: "amber" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="text-slate-600">{r.label}</span>
                        <span className="font-semibold tabular-nums text-slate-900">{r.score}/100</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            r.tone === "green" ? "bg-emerald-500" : r.tone === "amber" ? "bg-amber-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>

            {/* Risk Vector Analysis */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Risk Vector Analysis</h2>
                  <p className="text-xs text-slate-500">12 vectors tracked across 4 dimensions</p>
                </div>
                <Pill variant="blue">Live</Pill>
              </div>
              {/* Radar-like visualization using bars */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {RISK_VECTORS.map((v) => (
                  <div key={v.label}>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${v.tone === "green" ? "bg-emerald-500" : v.tone === "amber" ? "bg-amber-500" : "bg-rose-500"}`} />
                        {v.label}
                      </span>
                      <span className="font-semibold tabular-nums text-slate-900">{v.score}/100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          v.tone === "green" ? "bg-emerald-500" : v.tone === "amber" ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${v.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Future Risk Projection */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Future Risk Projection</h2>
                  <p className="text-xs text-slate-500">5-year AI forecast based on demographic and lifestyle trends</p>
                </div>
                <Pill variant="amber">Medium outlook</Pill>
              </div>
              {/* Chart */}
              <div className="relative h-48">
                <svg viewBox="0 0 400 180" className="w-full h-full">
                  <defs>
                    <linearGradient id="riskArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0, 45, 90, 135, 180].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e2e8f0" strokeWidth="1" />
                  ))}
                  {/* Historical line */}
                  <path
                    d="M0 160 L40 145 L80 135 L120 130 L160 120"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Future projection */}
                  <path
                    d="M160 120 L200 110 L240 105 L280 95 L320 80 L360 75 L400 70"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M160 120 L200 110 L240 105 L280 95 L320 80 L360 75 L400 70 L400 180 L160 180 Z"
                    fill="url(#riskArea)"
                  />
                  {/* Today marker */}
                  <line x1="160" y1="0" x2="160" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="160" cy="120" r="4" fill="#2563eb" />
                  <text x="165" y="115" className="text-[10px]" fill="#64748b">Today</text>
                  {/* Future markers */}
                  <circle cx="240" cy="105" r="3" fill="#2563eb" opacity="0.6" />
                  <circle cx="320" cy="80" r="3" fill="#2563eb" opacity="0.6" />
                  <circle cx="400" cy="70" r="4" fill="#f59e0b" />
                </svg>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-emerald-50 p-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">1 year</div>
                  <div className="text-sm font-bold text-emerald-700">25</div>
                </div>
                <div className="rounded-lg bg-amber-50 p-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">3 years</div>
                  <div className="text-sm font-bold text-amber-700">38</div>
                </div>
                <div className="rounded-lg bg-rose-50 p-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-700">5 years</div>
                  <div className="text-sm font-bold text-rose-700">52</div>
                </div>
              </div>
            </SoftCard>

            {/* AI Insights & Analysis */}
            <SoftCard>
              <h2 className="text-base font-semibold text-slate-900 mb-3">AI Insights & Analysis</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {AI_INSIGHTS.map((a) => (
                  <div key={a.title} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${a.toneBg} ${a.toneText}`}>
                        {a.icon}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {a.category}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{a.description}</p>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-300" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  Top AI Recommendations
                </span>
              </div>
              <div className="space-y-3">
                {TOP_RECS.map((r, i) => (
                  <div key={i} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-semibold text-white">{r.title}</div>
                        <div className="text-[10px] text-slate-400">{r.impact}</div>
                      </div>
                      <Pill variant={r.tone as any}>{r.delta}</Pill>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{r.description}</p>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Underwriting Confidence</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    98.4% confidence based on 4M+ similar profiles in our training data.
                  </p>
                </div>
              </div>
            </SoftCard>

            <Button
              onClick={() => navigate("recommendations")}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
            >
              Generate Report
              <ArrowRight className="h-4 w-4" />
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

const RISK_VECTORS = [
  { label: "Age factor", score: 18, tone: "green" },
  { label: "BMI & vitals", score: 22, tone: "green" },
  { label: "Smoking status", score: 5, tone: "green" },
  { label: "Exercise frequency", score: 25, tone: "green" },
  { label: "Stress index", score: 35, tone: "amber" },
  { label: "Sleep quality", score: 28, tone: "amber" },
  { label: "Occupational risk", score: 32, tone: "amber" },
  { label: "Commute exposure", score: 42, tone: "amber" },
  { label: "Family history", score: 18, tone: "green" },
  { label: "Financial stability", score: 12, tone: "green" },
  { label: "Geographic exposure", score: 38, tone: "amber" },
  { label: "Lifestyle index", score: 28, tone: "amber" },
];

const AI_INSIGHTS = [
  {
    icon: <Heart className="h-4 w-4" />,
    category: "Health",
    title: "Cardiovascular risk low",
    description: "Resting heart rate, BP, and family history indicate below-average 10-year CVD risk.",
    toneBg: "bg-emerald-50",
    toneText: "text-emerald-700",
  },
  {
    icon: <Activity className="h-4 w-4" />,
    category: "Lifestyle",
    title: "Exercise pattern optimal",
    description: "4-6 workouts/week with mixed cardio + strength reduces all-cause mortality by 31%.",
    toneBg: "bg-emerald-50",
    toneText: "text-emerald-700",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    category: "Occupation",
    title: "Sedentary work pattern",
    description: "8+ hours/day seated increases metabolic syndrome risk. Add standing breaks.",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
  },
  {
    icon: <Car className="h-4 w-4" />,
    category: "Geography",
    title: "High-traffic commute",
    description: "Bengaluru traffic exposure adds 12% to respiratory risk over 5 years.",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
  },
];

const TOP_RECS = [
  {
    title: "Add critical illness rider",
    impact: "Covers 18 critical illnesses",
    delta: "+₹2,400/yr",
    tone: "blue",
    description: "Your family history of heart disease makes a CI rider cost-effective.",
  },
  {
    title: "Increase term cover to ₹2Cr",
    impact: "Adequate for family of 4",
    delta: "+₹4,800/yr",
    tone: "blue",
    description: "Current term cover (₹1Cr) is 50% of recommended for your income bracket.",
  },
  {
    title: "Switch to no-co-pay plan",
    impact: "Saves ₹1L on major claim",
    delta: "+₹1,800/yr",
    tone: "amber",
    description: "20% co-pay will cost more than the premium difference on a single major claim.",
  },
  {
    title: "Annual health checkup",
    impact: "Detects risks 3-5y early",
    delta: "Free",
    tone: "green",
    description: "Annual full-body checkup reduces late-stage diagnosis probability by 47%.",
  },
];
