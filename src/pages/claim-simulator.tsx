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
  Activity,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Heart,
  Car,
  Home as HomeIcon,
  Zap,
} from "lucide-react";

const STEPS = [
  { label: "Select policy", sub: "Pick a scenario" },
  { label: "Configure", sub: "Set parameters" },
  { label: "Simulate", sub: "AI prediction" },
];

export function ClaimSimulatorPage() {
  const { navigate } = useRouter();
  const [policyType, setPolicyType] = React.useState("health");
  const [scenario, setScenario] = React.useState("hospitalization");
  const [billAmount, setBillAmount] = React.useState(500000);

  const approval = 94;
  const coverage = 78;
  const outOfPocket = Math.round(billAmount * (1 - coverage / 100));

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Activity className="h-3.5 w-3.5" />
              Claim Simulator
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Intelligent Underwriting
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Model claim scenarios before you buy. See approval probabilities, coverage
              gaps, and out-of-pocket costs powered by AI underwriting.
            </p>
          </div>
          <StepStepper
            steps={[{ label: "Select" }, { label: "Configure" }, { label: "Simulate" }]}
            current={2}
            variant="horizontal-compact"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Left — main */}
          <div className="space-y-6">
            {/* Policy type + scenario */}
            <SoftCard>
              <h2 className="text-base font-semibold text-slate-900 mb-3">Select scenario</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Policy type
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: "health", icon: <Heart className="h-4 w-4" />, label: "Health" },
                      { v: "motor", icon: <Car className="h-4 w-4" />, label: "Motor" },
                      { v: "home", icon: <HomeIcon className="h-4 w-4" />, label: "Home" },
                    ].map((p) => (
                      <button
                        key={p.v}
                        onClick={() => setPolicyType(p.v)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all ${
                          policyType === p.v
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {p.icon}
                        <span className="text-xs font-medium">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Claim scenario
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { v: "hospitalization", label: "Hospitalization (5 days)" },
                      { v: "surgery", label: "Major surgery (knee replacement)" },
                      { v: "diagnostics", label: "Diagnostics & daycare" },
                    ].map((s) => (
                      <button
                        key={s.v}
                        onClick={() => setScenario(s.v)}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs transition-all ${
                          scenario === s.v
                            ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {s.label}
                        {scenario === s.v && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SoftCard>

            {/* Bill input */}
            <SoftCard>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-slate-900">Claim amount</h2>
                <span className="text-lg font-bold tabular-nums text-slate-900">
                  ₹{billAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={1500000}
                step={10000}
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full"
                style={{ ["--val" as string]: `${((billAmount - 50000) / 1450000) * 100}%` }}
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>₹50K</span>
                <span>₹15L</span>
              </div>
            </SoftCard>

            {/* Results visualization */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Coverage vs Out-of-Pocket Expenses
                  </h2>
                  <p className="text-xs text-slate-500">AI underwriting prediction for this scenario</p>
                </div>
                <Pill variant="blue">12s analysis</Pill>
              </div>

              {/* Big bar visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-slate-600">Total claim: ₹{billAmount.toLocaleString("en-IN")}</span>
                  <span className="font-semibold text-slate-900">You pay ₹{outOfPocket.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex h-12 w-full overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div
                    className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-400 text-white"
                    style={{ width: `${coverage}%` }}
                  >
                    <span className="text-xs font-semibold">Insurer pays {coverage}%</span>
                  </div>
                  <div
                    className="flex items-center justify-center bg-gradient-to-r from-rose-400 to-rose-500 text-white"
                    style={{ width: `${100 - coverage}%` }}
                  >
                    <span className="text-xs font-semibold">You pay {100 - coverage}%</span>
                  </div>
                </div>
              </div>

              {/* Detailed breakdown */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-emerald-50 ring-1 ring-emerald-100 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" /> Insurer pays
                  </div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-emerald-700">
                    ₹{Math.round(billAmount * coverage / 100).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-emerald-600">Base + bonus coverage</div>
                </div>
                <div className="rounded-xl bg-rose-50 ring-1 ring-rose-100 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700">
                    <AlertTriangle className="h-3 w-3" /> Out-of-pocket
                  </div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-rose-700">
                    ₹{outOfPocket.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-rose-600">Co-pay + sub-limits + deductibles</div>
                </div>
                <div className="rounded-xl bg-blue-50 ring-1 ring-blue-100 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                    <Brain className="h-3 w-3" /> Approval probability
                  </div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-blue-700">
                    {approval}%
                  </div>
                  <div className="text-[10px] text-blue-600">Based on 1.8M similar claims</div>
                </div>
              </div>

              {/* Coverage breakdown chart */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-700 mb-3">Coverage breakdown</div>
                <div className="space-y-2">
                  {[
                    { label: "Base sum insured", value: "₹7,80,000", pct: 78, tone: "bg-emerald-500" },
                    { label: "No-claim bonus", value: "₹1,00,000", pct: 10, tone: "bg-blue-500" },
                    { label: "Sub-limit deductions", value: "-₹1,20,000", pct: 12, tone: "bg-rose-400" },
                    { label: "Co-pay (20%)", value: "-₹1,00,000", pct: 10, tone: "bg-rose-500" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <div className="text-xs text-slate-600 w-40">{row.label}</div>
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.pct * 4}%` }} />
                      </div>
                      <div className="text-xs font-semibold text-slate-900 w-24 text-right tabular-nums">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>

            {/* AI Strategy Optimization */}
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Strategy Optimization
                </span>
              </div>
              <h2 className="text-lg font-bold">Switch to Health Shield Pro Plus</h2>
              <p className="mt-1 text-sm text-blue-100 leading-relaxed">
                Our AI projects a 22-percentage-point improvement in coverage for this
                scenario with the recommended plan — at just ₹2,400 more per year.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                    Coverage gain
                  </div>
                  <div className="mt-0.5 text-base font-bold text-emerald-300">+22%</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                    OOP saved
                  </div>
                  <div className="mt-0.5 text-base font-bold text-emerald-300">₹1.1L</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                    Premium
                  </div>
                  <div className="mt-0.5 text-base font-bold text-white">+₹2,400/yr</div>
                </div>
              </div>
              <Button
                onClick={() => navigate("recommendations")}
                className="mt-5 bg-white text-blue-700 hover:bg-blue-50 font-semibold"
              >
                See Recommended Plans
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SoftCard>
          </div>

          {/* Right sidebar — cost breakdown + insights */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="text-center">
              <ProgressRing
                value={approval}
                size={120}
                color="#10b981"
                label={<span className="text-2xl font-bold text-slate-900">{approval}%</span>}
                sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Approval probability</span>}
              />
              <p className="mt-3 text-xs text-slate-500 leading-relaxed px-4">
                High approval likelihood. Claim is consistent with 94% of similar approved
                claims in our 1.8M-claim dataset.
              </p>
            </SoftCard>

            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Cost Breakdown Analysis</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Hospital room (5 days)", value: "₹75,000", icon: <IndianRupee className="h-3 w-3" /> },
                  { label: "Surgery charges", value: "₹2,80,000", icon: <IndianRupee className="h-3 w-3" /> },
                  { label: "Doctor fees", value: "₹85,000", icon: <IndianRupee className="h-3 w-3" /> },
                  { label: "Diagnostics", value: "₹40,000", icon: <IndianRupee className="h-3 w-3" /> },
                  { label: "Medicines", value: "₹20,000", icon: <IndianRupee className="h-3 w-3" /> },
                  { label: "Total bill", value: `₹${billAmount.toLocaleString("en-IN")}`, bold: true },
                  { label: "Insurer pays (78%)", value: `₹${Math.round(billAmount * 0.78).toLocaleString("en-IN")}`, tone: "green" },
                  { label: "You pay (22%)", value: `₹${outOfPocket.toLocaleString("en-IN")}`, tone: "red" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-1.5 ${
                      r.bold ? "border-t border-slate-200 pt-2 mt-1 font-bold" : ""
                    }`}
                  >
                    <span className={`flex items-center gap-1.5 ${
                      r.tone === "green" ? "text-emerald-700" : r.tone === "red" ? "text-rose-700" : "text-slate-500"
                    }`}>
                      {r.icon}
                      {r.label}
                    </span>
                    <span className={`tabular-nums ${
                      r.tone === "green" ? "text-emerald-700 font-semibold" : r.tone === "red" ? "text-rose-700 font-semibold" : r.bold ? "text-slate-900 font-semibold" : "text-slate-700"
                    }`}>
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Watch out</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Room-rent cap will deduct ₹25,000 if you upgrade to a private room.
                    Stay in shared ward to maximize coverage.
                  </p>
                </div>
              </div>
            </SoftCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
