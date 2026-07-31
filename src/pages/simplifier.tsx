"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import {
  SoftCard,
  Pill,
  ProgressBar,
} from "@/components/site-primitives";
import {
  Sparkles,
  FileText,
  Wand2,
  ArrowRight,
  Upload,
  Brain,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Zap,
  RefreshCw,
} from "lucide-react";

interface SimplifiedClause {
  original: string;
  simplified: string;
  impact: "low" | "medium" | "high";
  category: string;
}

const SAMPLE_CLAUSES: SimplifiedClause[] = [
  {
    original: "The Sum Insured as defined in Clause 1.1 shall be subject to a room-rent sub-limit not exceeding 1% of the Sum Insured per day and ICU sub-limit not exceeding 2% of the Sum Insured per day, with the total hospitalization claim being proportionately reduced in the event the insured opts for a room with a higher tariff than the entitled category.",
    simplified: "Your hospital room is capped at ₹10,000/day (1% of your ₹10L sum insured). If you pick a more expensive room, the insurer reduces your ENTIRE claim proportionally — not just the room charge. So a ₹5L surgery becomes a ₹3.9L payout.",
    impact: "high",
    category: "Coverage cap",
  },
  {
    original: "Notwithstanding anything contained herein to the contrary, the Company shall not be liable to make any payment under this Policy in respect of any claim arising during the first two years from the date of commencement of the Policy in respect of any treatment for a condition, disease, or ailment for which the Insured Person had signs or symptoms prior to the inception of the Policy.",
    simplified: "For the first 2 years, the insurer won't pay for ANY treatment tied to a condition you had before buying the policy — even if you didn't know you had it. After 2 years, you're covered.",
    impact: "high",
    category: "Waiting period",
  },
  {
    original: "The Insured shall bear 20% of each admissible claim amount as Co-payment, with the Company's liability being restricted to 80% of the admissible claim, provided that Co-payment shall apply to all claims arising after the Insured Person attains the age of 45 years.",
    simplified: "Once you turn 45, you pay 20% of every claim out of pocket. A ₹5L claim becomes ₹4L payout — ₹1L short. Negotiate this clause out before signing.",
    impact: "high",
    category: "Co-pay",
  },
  {
    original: "The restoration benefit shall be applicable only in respect of hospitalization claims and shall restore the Sum Insured by 100% once the same is exhausted due to claims made by the Insured Person(s) during the Policy Period, with the restored Sum Insured being available only for unrelated illnesses.",
    simplified: "If you use up your full ₹10L on a heart surgery, the insurer adds ₹10L back — but only for a DIFFERENT illness. A follow-up heart claim in the same year would not be covered.",
    impact: "medium",
    category: "Restoration",
  },
  {
    original: "The No Claim Bonus shall accrue to the Insured Person as an increase in the Sum Insured at the rate of 10% of the Base Sum Insured for each claim-free Policy Year, subject to a maximum accumulation of 50% of the Base Sum Insured, with such bonus not being available for reduction in premium.",
    simplified: "Every claim-free year, your sum insured grows by 10% (max 50% after 5 years). So your ₹10L can grow to ₹15L — but you can't convert it to a premium discount.",
    impact: "medium",
    category: "Bonus",
  },
];

export function SimplifierPage() {
  const { navigate } = useRouter();
  const [uploaded, setUploaded] = React.useState(true);
  const [simplifying, setSimplifying] = React.useState(false);
  const [simplified, setSimplified] = React.useState(false);
  const [activeClause, setActiveClause] = React.useState(0);

  const startSimplification = () => {
    setSimplifying(true);
    setSimplified(false);
    setTimeout(() => {
      setSimplifying(false);
      setSimplified(true);
    }, 2200);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            AI Policy Simplifier
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Turn 80 pages of legalese into 5 minutes of plain English.
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Upload any insurance policy PDF and our AI reads every clause, identifies the
            ones that matter, and explains them in language a 12-year-old can understand.
          </p>
        </div>

        {/* Upload + transform panel */}
        <SoftCard className="mb-6">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Left — upload */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-5">
              {!uploaded ? (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">Drop your policy PDF</h3>
                  <p className="text-xs text-slate-500 mt-1">Max 50MB · Encrypted · Never stored</p>
                  <Button onClick={() => setUploaded(true)} className="mt-4" size="sm">
                    <Upload className="h-3.5 w-3.5" /> Choose File
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <FileText className="h-6 w-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900">health-shield-pro-plus.pdf</div>
                    <div className="text-xs text-slate-500">2.4 MB · 47 pages · 12,847 words</div>
                  </div>
                  <Pill variant="green">
                    <CheckCircle2 className="h-3 w-3" /> Uploaded
                  </Pill>
                </div>
              )}
            </div>

            {/* Right — action */}
            <div className="flex flex-col justify-center gap-3">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${simplifying ? "bg-blue-100 text-blue-700" : simplified ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}>
                  {simplifying ? <RefreshCw className="h-5 w-5 animate-spin" /> : simplified ? <CheckCircle2 className="h-5 w-5" /> : <Brain className="h-5 w-5" />}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    {simplifying ? "Reading every clause..." : simplified ? "47 clauses simplified" : "Ready to simplify"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {simplifying ? "Extracting legal terms · scoring impact · writing plain English" : simplified ? "5 high-impact clauses identified" : "Click below to start AI simplification"}
                  </div>
                </div>
              </div>
              <Button
                onClick={startSimplification}
                disabled={simplifying}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 disabled:opacity-50"
              >
                {simplifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Simplifying...
                  </>
                ) : simplified ? (
                  <>
                    <RefreshCw className="h-4 w-4" /> Re-simplify
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" /> Simplify My Policy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress */}
          {simplifying && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-slate-600">Processing 47 clauses...</span>
                <span className="font-semibold text-blue-700">3 of 5 steps</span>
              </div>
              <ProgressBar value={60} size="md" />
              <div className="mt-3 grid grid-cols-5 gap-1.5 text-[10px]">
                {["Upload", "OCR", "Extract clauses", "Score impact", "Plain English"].map((step, i) => (
                  <div key={step} className={`text-center ${i < 3 ? "text-emerald-600" : "text-slate-400"}`}>
                    <div className={`mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${i < 3 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100"
                      }`}>
                      {i < 3 ? "✓" : i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SoftCard>

        {/* Simplified output */}
        {simplified && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 animate-fade-in-up">
            {/* Sidebar — clause list */}
            <aside>
              <SoftCard padding="sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-slate-900">Simplified clauses</h3>
                  <Pill variant="blue">5</Pill>
                </div>
                <div className="space-y-1">
                  {SAMPLE_CLAUSES.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveClause(i)}
                      className={`flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors ${activeClause === i ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${c.impact === "high" ? "bg-rose-100 text-rose-700"
                          : c.impact === "medium" ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold truncate">{c.category}</div>
                        <div className="text-[10px] text-slate-500 capitalize">{c.impact} impact</div>
                      </div>
                    </button>
                  ))}
                </div>
              </SoftCard>

              <SoftCard padding="sm" className="mt-3 bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-100">
                    Reading time saved
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">42 min</div>
                <p className="text-[11px] text-blue-100 mt-1">
                  vs reading the full 47-page document.
                </p>
              </SoftCard>
            </aside>

            {/* Main — selected clause */}
            <SoftCard padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill variant={
                      SAMPLE_CLAUSES[activeClause].impact === "high" ? "red"
                        : SAMPLE_CLAUSES[activeClause].impact === "medium" ? "amber"
                          : "green"
                    }>
                      {SAMPLE_CLAUSES[activeClause].impact === "high" ? "High impact"
                        : SAMPLE_CLAUSES[activeClause].impact === "medium" ? "Medium impact"
                          : "Low impact"}
                    </Pill>
                    <span className="text-xs text-slate-500">{SAMPLE_CLAUSES[activeClause].category}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-slate-900">
                    Clause {activeClause + 1} of {SAMPLE_CLAUSES.length}
                  </h2>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("inspector")}>
                  <BookOpen className="h-3.5 w-3.5" /> Full analysis
                </Button>
              </div>

              {/* Original */}
              <div className="rounded-xl bg-slate-100 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Original legal text
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  "{SAMPLE_CLAUSES[activeClause].original}"
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="h-px w-12 bg-blue-200" />
                  <Zap className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Simplified</span>
                  <div className="h-px w-12 bg-blue-200" />
                </div>
              </div>

              {/* Simplified */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 p-4 ring-1 ring-blue-100 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                    In plain English
                  </span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {SAMPLE_CLAUSES[activeClause].simplified}
                </p>
              </div>

              {/* Action */}
              <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100 flex items-start gap-3">
                <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                    What you should do
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    Negotiate this clause out before signing, or switch to a plan that doesn't
                    include it. Cost impact: ~₹3.2L on a 10-day hospitalization.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button onClick={() => navigate("recommendations")} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                      See safer plans
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button onClick={() => navigate("assistant")} size="sm" variant="outline" className="h-8">
                      Ask AI about this
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeClause === 0}
                  onClick={() => setActiveClause(activeClause - 1)}
                >
                  ← Previous
                </Button>
                <span className="text-xs text-slate-500">{activeClause + 1} / {SAMPLE_CLAUSES.length}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeClause === SAMPLE_CLAUSES.length - 1}
                  onClick={() => setActiveClause(activeClause + 1)}
                >
                  Next →
                </Button>
              </div>
            </SoftCard>
          </div>
        )}

        {/* Pre-upload state */}
        {!simplified && !simplifying && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Brain className="h-5 w-5" />, title: "Neural OCR", description: "Reads 47-page PDFs in 12 seconds with 99.2% accuracy" },
              { icon: <Zap className="h-5 w-5" />, title: "Impact scoring", description: "Ranks clauses by financial impact on your wallet" },
              { icon: <BookOpen className="h-5 w-5" />, title: "Plain English", description: "Replaces legalese with sentences you actually understand" },
            ].map((f) => (
              <SoftCard key={f.title} padding="md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    {f.icon}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </SoftCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimplifierPage;
