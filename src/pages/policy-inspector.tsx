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
  FileSearch,
  Upload,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Clock,
  TrendingUp,
  Eye,
  Lightbulb,
} from "lucide-react";

const STEPS = [
  { label: "Upload", sub: "Drop your PDF" },
  { label: "Analyze", sub: "Neural extraction" },
  { label: "Review", sub: "Red flags & fixes" },
];

export function PolicyInspectorPage() {
  const { navigate } = useRouter();
  const [uploaded, setUploaded] = React.useState(true);
  const [analyzing, setAnalyzing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerUpload = () => fileInputRef.current?.click();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page header + stepper */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <FileSearch className="h-3.5 w-3.5" />
              AI Policy Inspector
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              AI Policy Inspector
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Upload any insurance policy PDF for a deep-dive neural analysis of clauses,
              risks, and hidden terms. Empower your underwriting with precision.
            </p>
          </div>
          <StepStepper
            steps={[{ label: "Upload" }, { label: "Analyze" }, { label: "Review" }]}
            current={2}
            variant="horizontal-compact"
          />
        </div>

        {/* Upload zone */}
        <SoftCard className="mb-6">
          <div
            className="relative rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-8 text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setUploaded(true);
                  setAnalyzing(true);
                  setTimeout(() => setAnalyzing(false), 1500);
                }
              }}
            />
            {!uploaded ? (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Drop your policy PDF here
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  PDF, DOC, or image. Max 50 MB. Files are encrypted and never stored.
                </p>
                <Button
                  onClick={triggerUpload}
                  className="mt-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-4"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </>
            ) : analyzing ? (
              <div className="flex flex-col items-center py-6">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <Brain className="absolute h-7 w-7 text-blue-700" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Neural analysis in progress…
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Extracting 47 clauses · scanning for hidden terms · scoring transparency
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      health-shield-pro-plus.pdf
                    </div>
                    <div className="text-xs text-slate-500">
                      2.4 MB · 47 pages · Analyzed in 12.4 seconds
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill variant="green">
                    <CheckCircle2 className="h-3 w-3" /> Analyzed
                  </Pill>
                  <Button
                    variant="outline"
                    onClick={triggerUpload}
                    className="h-9"
                  >
                    Re-analyze
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SoftCard>

        {/* Quick metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <SoftCard padding="sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Transparency Score
              </div>
              <Pill variant="green">+8</Pill>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums text-slate-900">92%</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <ProgressBar value={92} size="sm" className="mt-2" barClassName="bg-emerald-500" />
          </SoftCard>
          <SoftCard padding="sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Risk Score
              </div>
              <Pill variant="blue">Low</Pill>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums text-slate-900">22</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <ProgressBar value={22} size="sm" className="mt-2" barClassName="bg-blue-500" />
          </SoftCard>
          <SoftCard padding="sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Hidden Clauses
              </div>
              <Pill variant="amber">3 found</Pill>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums text-slate-900">3</span>
              <span className="text-xs text-slate-400">flagged</span>
            </div>
            <ProgressBar value={30} size="sm" className="mt-2" barClassName="bg-amber-500" />
          </SoftCard>
          <SoftCard padding="sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Claim Approval
              </div>
              <Pill variant="green">High</Pill>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums text-slate-900">94%</span>
              <span className="text-xs text-slate-400">probable</span>
            </div>
            <ProgressBar value={94} size="sm" className="mt-2" barClassName="bg-emerald-500" />
          </SoftCard>
        </div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* Key insights */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Key Insights</h2>
                  <p className="text-xs text-slate-500">AI-extracted summary of your policy</p>
                </div>
                <Pill variant="blue">12s analysis</Pill>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {KEY_INSIGHTS.map((k) => (
                  <div key={k.title} className={`rounded-xl p-4 ring-1 ${k.toneBg}`}>
                    <div className="flex items-center justify-between">
                      <div className={`text-[10px] font-semibold uppercase tracking-wider ${k.toneText}`}>
                        {k.label}
                      </div>
                      {k.icon}
                    </div>
                    <div className={`mt-1 text-base font-bold ${k.toneText}`}>{k.value}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{k.detail}</div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Red flags & fixes */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Neural Red Flags & Fixes
                  </h2>
                  <p className="text-xs text-slate-500">3 issues detected across 47 clauses analyzed</p>
                </div>
                <Pill variant="red">3 issues</Pill>
              </div>
              <div className="space-y-3">
                {RED_FLAGS.map((r, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${r.toneBg} ${r.toneText}`}>
                        {r.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{r.title}</h3>
                          <Pill variant={r.severity as any}>{r.severityLabel}</Pill>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{r.description}</p>
                        <div className="mt-3 rounded-lg bg-blue-50/60 p-3 flex items-start gap-2">
                          <Lightbulb className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                              AI Fix Suggestion
                            </div>
                            <p className="text-xs text-slate-700 mt-0.5">{r.fix}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Clause timeline */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-900">Clause Extraction Timeline</h2>
                <Pill variant="blue">47 clauses</Pill>
              </div>
              <div className="space-y-2">
                {CLAUSE_TIMELINE.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                    <div className={`h-1.5 w-1.5 rounded-full ${c.tone}`} />
                    <span className="text-[11px] font-mono text-slate-400 w-16">{c.ref}</span>
                    <span className="text-xs text-slate-700 flex-1">{c.title}</span>
                    <Pill variant={c.pillVariant as any} className="text-[10px]">{c.tag}</Pill>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="text-center">
              <div className="flex flex-col items-center">
                <ProgressRing
                  value={92}
                  size={120}
                  color="#10b981"
                  label={<span className="text-2xl font-bold text-slate-900">92%</span>}
                  sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Transparency</span>}
                />
                <p className="mt-3 text-xs text-slate-500 leading-relaxed px-4">
                  This policy scores in the top 12% of all health plans analyzed by our
                  AI for transparency.
                </p>
              </div>
            </SoftCard>

            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Document fingerprint</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Insurer", value: "SecureLife Health" },
                  { label: "Plan", value: "Health Shield Pro Plus" },
                  { label: "Sum insured", value: "₹10,00,000" },
                  { label: "Premium", value: "₹18,400 / yr" },
                  { label: "Pages", value: "47" },
                  { label: "Word count", value: "12,847" },
                  { label: "Analyzed", value: "12.4 seconds" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-slate-500">{r.label}</span>
                    <span className="font-semibold text-slate-900">{r.value}</span>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Recommendation
                </span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Switch to <strong className="text-white">Health Shield Premium</strong> for ₹2,400 more
                to eliminate the room-rent cap and 20% co-pay after 45.
              </p>
              <Button
                onClick={() => navigate("recommendations")}
                className="mt-4 w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                size="sm"
              >
                View Alternatives
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </SoftCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

const KEY_INSIGHTS = [
  {
    label: "Sum Insured",
    value: "₹10,00,000",
    detail: "Family floater. Adequate for metro cities.",
    toneBg: "bg-emerald-50 ring-emerald-100",
    toneText: "text-emerald-700",
    icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
  },
  {
    label: "Cashless Network",
    value: "12,400+ hospitals",
    detail: "Includes all major chains in your city.",
    toneBg: "bg-blue-50 ring-blue-100",
    toneText: "text-blue-700",
    icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Waiting Period",
    value: "2 yrs (specific)",
    detail: "Maternity, knee replacement, cataract.",
    toneBg: "bg-amber-50 ring-amber-100",
    toneText: "text-amber-700",
    icon: <Clock className="h-4 w-4 text-amber-600" />,
  },
  {
    label: "Co-pay Clause",
    value: "20% after age 45",
    detail: "Triggers automatically on renewal.",
    toneBg: "bg-rose-50 ring-rose-100",
    toneText: "text-rose-700",
    icon: <AlertTriangle className="h-4 w-4 text-rose-600" />,
  },
];

const RED_FLAGS = [
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    title: "Room-rent cap detected (Clause 4.7)",
    description: "Room charges capped at 1% of sum insured per day (~₹10,000). This indirectly caps your total claim — most hospitals charge ₹15,000-25,000/day.",
    severity: "red",
    severityLabel: "High severity",
    toneBg: "bg-rose-50",
    toneText: "text-rose-700",
    fix: "Negotiate this clause out before signing, or switch to a plan with no room-rent cap. Cost impact: ~₹3.2L on a 10-day hospitalization.",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Maternity waiting period (Clause 8.3)",
    description: "2-year waiting period applies. If you're planning a family in the next 24 months, this clause will block maternity claims.",
    severity: "amber",
    severityLabel: "Medium",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
    fix: "Add a maternity rider (₹2,400/yr) or pick a plan with 9-month waiting period if pregnancy is planned.",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    title: "Co-pay activates after age 45",
    description: "20% co-pay on all claims after age 45. A ₹5L claim becomes a ₹4L payout — ₹1L out of pocket.",
    severity: "amber",
    severityLabel: "Medium",
    toneBg: "bg-amber-50",
    toneText: "text-amber-700",
    fix: "Switch to a no-co-pay variant before turning 45. Premium difference is ~₹1,800/yr — pays back in one claim.",
  },
];

const CLAUSE_TIMELINE = [
  { ref: "1.1", title: "Definitions and interpretations", tone: "bg-slate-300", tag: "Standard", pillVariant: "slate" },
  { ref: "2.4", title: "Eligibility and enrollment criteria", tone: "bg-slate-300", tag: "Standard", pillVariant: "slate" },
  { ref: "3.7", title: "Coverage scope and exclusions", tone: "bg-blue-400", tag: "Verified", pillVariant: "blue" },
  { ref: "4.7", title: "Room-rent cap (sub-limit)", tone: "bg-rose-500", tag: "Red flag", pillVariant: "red" },
  { ref: "5.2", title: "Pre-existing disease waiting period", tone: "bg-amber-400", tag: "Watch", pillVariant: "amber" },
  { ref: "8.3", title: "Maternity coverage & waiting", tone: "bg-amber-400", tag: "Watch", pillVariant: "amber" },
  { ref: "9.1", title: "Co-pay clause activation", tone: "bg-rose-500", tag: "Red flag", pillVariant: "red" },
  { ref: "11.4", title: "No-claim bonus & restoration", tone: "bg-emerald-400", tag: "Benefit", pillVariant: "green" },
  { ref: "12.2", title: "Renewal terms & premium review", tone: "bg-slate-300", tag: "Standard", pillVariant: "slate" },
];
