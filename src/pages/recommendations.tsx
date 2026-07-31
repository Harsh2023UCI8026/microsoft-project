"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import {
  SoftCard,
  Pill,
  StepStepper,
  ProgressRing,
} from "@/components/site-primitives";
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Brain,
  Target,
  Heart,
  ChevronRight,
  IndianRupee,
  Eye,
} from "lucide-react";

export function RecommendationsPage() {
  const { navigate } = useRouter();
  const [tab, setTab] = React.useState<"cards" | "table" | "compare">("cards");

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              AI Recommendations
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Your Top Recommendations
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Based on your age, risk profile, and financial history, our AI has curated
              the 7 most suitable insurance strategies for your portfolio.
            </p>
          </div>
          <StepStepper
            steps={[{ label: "Profile" }, { label: "Analyze" }, { label: "Decide" }]}
            current={2}
            variant="horizontal-compact"
          />
        </div>

        {/* Featured recommendation */}
        <SoftCard padding="lg" className="mb-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill variant="green">
                  <Star className="h-3 w-3 fill-current" /> Best match
                </Pill>
                <span className="text-[11px] text-slate-500">98% match score</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Health Shield Pro Plus</h2>
              <p className="mt-1 text-sm text-slate-600">
                Premium family floater with no room-rent cap, no co-pay, and built-in
                restoration benefit. Top-rated for transparency by InsurIntel AI.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Sum insured", value: "₹10,00,000" },
                  { label: "Premium / yr", value: "₹18,400" },
                  { label: "Transparency", value: "92%" },
                  { label: "Cashless", value: "12,400+" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                    <div className="text-sm font-bold text-slate-900">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2">
                <Button
                  onClick={() => navigate("inspector")}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                >
                  Inspect Policy
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => navigate("simulator")}
                  variant="outline"
                  className="rounded-xl h-11"
                >
                  Simulate Claims
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <ProgressRing
                value={98}
                size={140}
                color="#2563eb"
                label={<span className="text-3xl font-bold text-slate-900">98%</span>}
                sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Match Score</span>}
              />
              <div className="mt-4 flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-1 text-xs text-slate-500">4.9 · 1,247 reviews</span>
              </div>
            </div>
          </div>
        </SoftCard>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {[
              { v: "cards", label: "Cards" },
              { v: "table", label: "Comparison Table" },
              { v: "compare", label: "Side-by-Side" },
            ].map((t) => (
              <button
                key={t.v}
                onClick={() => setTab(t.v as any)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  tab === t.v ? "bg-white text-blue-700 shadow-soft" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <Pill variant="blue">7 strategies curated</Pill>
        </div>

        {/* Tab content */}
        {tab === "cards" && (
          <div className="grid md:grid-cols-2 gap-4">
            {SECONDARY.map((p, i) => (
              <SoftCard key={p.name} interactive>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Pill variant={p.pillVariant as any}>{p.tag}</Pill>
                      <span className="text-[11px] text-slate-400">{i + 2} of 7</span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{p.name}</h3>
                    <div className="text-xs text-slate-500">{p.insurer}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Match</div>
                    <div className="text-lg font-bold text-blue-700">{p.match}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Premium</div>
                    <div className="text-sm font-bold text-slate-900">₹{p.premium.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sum insured</div>
                    <div className="text-sm font-bold text-slate-900">₹{p.sumInsured}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Transparency</div>
                    <div className="text-sm font-bold text-slate-900">{p.transparency}%</div>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  {p.pros.slice(0, 2).map((pro) => (
                    <div key={pro} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3.5 w-3.5" /> Inspect
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Get Quote
                  </Button>
                </div>
              </SoftCard>
            ))}
          </div>
        )}

        {tab === "table" && (
          <SoftCard padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Match</th>
                    <th className="px-4 py-3">Premium</th>
                    <th className="px-4 py-3">Sum Insured</th>
                    <th className="px-4 py-3">Transparency</th>
                    <th className="px-4 py-3">Cashless</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ALL_PLANS.map((p) => (
                    <tr key={p.name} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.insurer}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                p.match >= 90 ? "bg-emerald-500" : p.match >= 75 ? "bg-blue-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${p.match}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold tabular-nums">{p.match}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">
                        ₹{p.premium.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700 tabular-nums">{p.sumInsured}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 tabular-nums">{p.transparency}%</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{p.cashless}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Inspect <ChevronRight className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SoftCard>
        )}

        {tab === "compare" && (
          <SoftCard padding="none" className="overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-slate-100">
              {COMPARE_PLANS.map((p) => (
                <div key={p.name} className="p-4">
                  <div className={`rounded-xl p-3 mb-3 ${p.featured ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-1 ring-blue-200" : "bg-slate-50"}`}>
                    {p.featured && (
                      <Pill variant="blue" className="mb-2">
                        <Star className="h-3 w-3 fill-current" /> Best match
                      </Pill>
                    )}
                    <div className="text-sm font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.insurer}</div>
                    <div className="mt-3 text-2xl font-bold text-blue-700">
                      ₹{p.premium.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400">per year</div>
                  </div>
                  <div className="space-y-2 text-xs">
                    {p.features.map((f) => (
                      <div key={f.label} className="flex items-start justify-between">
                        <span className="text-slate-500">{f.label}</span>
                        <span className={`font-semibold ${f.value === "Yes" ? "text-emerald-600" : f.value === "No" ? "text-rose-600" : "text-slate-900"}`}>
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant={p.featured ? "default" : "outline"}
                    className={`mt-4 w-full ${p.featured ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  >
                    {p.featured ? "Get Quote" : "Inspect"}
                  </Button>
                </div>
              ))}
            </div>
          </SoftCard>
        )}

        {/* AI insight strip */}
        <SoftCard className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
              <Brain className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                AI Insight
              </div>
              <h3 className="mt-1 text-base font-semibold text-white">
                Health Shield Pro Plus maximizes value across 4 of 5 priority metrics.
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">
                For your specific risk profile (32y male, low-risk lifestyle, family of 4,
                ₹25K/yr budget), this plan delivers the strongest combination of transparency
                (92%), claim approval probability (94%), and premium efficiency (₹1.84/₹1000 coverage).
              </p>
            </div>
            <Button
              onClick={() => navigate("risk-engine")}
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shrink-0"
              size="sm"
            >
              View Risk Analysis
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </SoftCard>
      </div>
    </div>
  );
}

const SECONDARY = [
  {
    name: "FamilyCare Premier",
    insurer: "Star Health",
    match: 88,
    premium: 16200,
    sumInsured: "10,00,000",
    transparency: 88,
    tag: "Best value",
    pillVariant: "green",
    pros: ["Lower premium", "Family floater", "No co-pay"],
  },
  {
    name: "MediSecure Elite",
    insurer: "HDFC Ergo",
    match: 84,
    premium: 21800,
    sumInsured: "15,00,000",
    transparency: 95,
    tag: "Most transparent",
    pillVariant: "blue",
    pros: ["No room-rent cap", "Includes maternity rider", "Cashless at 8,000+"],
  },
  {
    name: "SecureLife Family",
    insurer: "ICICI Lombard",
    match: 82,
    premium: 19400,
    sumInsured: "12,00,000",
    transparency: 86,
    tag: "Balanced",
    pillVariant: "amber",
    pros: ["Mid-tier premium", "Restoration benefit", "Wellness rewards"],
  },
  {
    name: "Prime Health Plus",
    insurer: "Bajaj Allianz",
    match: 78,
    premium: 17600,
    sumInsured: "10,00,000",
    transparency: 81,
    tag: "Budget pick",
    pillVariant: "slate",
    pros: ["Lowest premium", "Free health checkup", "Optional riders"],
  },
];

const ALL_PLANS = [
  { name: "Health Shield Pro Plus", insurer: "SecureLife Health", match: 98, premium: 18400, sumInsured: "₹10,00,000", transparency: 92, cashless: "12,400+" },
  { name: "FamilyCare Premier", insurer: "Star Health", match: 88, premium: 16200, sumInsured: "₹10,00,000", transparency: 88, cashless: "11,200+" },
  { name: "MediSecure Elite", insurer: "HDFC Ergo", match: 84, premium: 21800, sumInsured: "₹15,00,000", transparency: 95, cashless: "8,400+" },
  { name: "SecureLife Family", insurer: "ICICI Lombard", match: 82, premium: 19400, sumInsured: "₹12,00,000", transparency: 86, cashless: "9,800+" },
  { name: "Prime Health Plus", insurer: "Bajaj Allianz", match: 78, premium: 17600, sumInsured: "₹10,00,000", transparency: 81, cashless: "10,200+" },
  { name: "Wellness Shield", insurer: "Max Bupa", match: 74, premium: 15800, sumInsured: "₹8,00,000", transparency: 78, cashless: "7,600+" },
  { name: "HealthGuard Basic", insurer: "Tata AIG", match: 68, premium: 12400, sumInsured: "₹5,00,000", transparency: 72, cashless: "5,400+" },
];

const COMPARE_PLANS = [
  {
    name: "Health Shield Pro Plus",
    insurer: "SecureLife Health",
    premium: 18400,
    featured: true,
    features: [
      { label: "Sum insured", value: "₹10L" },
      { label: "Room-rent cap", value: "No" },
      { label: "Co-pay", value: "No" },
      { label: "Maternity", value: "Optional" },
      { label: "Cashless", value: "12,400+" },
      { label: "Transparency", value: "92%" },
    ],
  },
  {
    name: "FamilyCare Premier",
    insurer: "Star Health",
    premium: 16200,
    featured: false,
    features: [
      { label: "Sum insured", value: "₹10L" },
      { label: "Room-rent cap", value: "1%" },
      { label: "Co-pay", value: "No" },
      { label: "Maternity", value: "Yes" },
      { label: "Cashless", value: "11,200+" },
      { label: "Transparency", value: "88%" },
    ],
  },
  {
    name: "MediSecure Elite",
    insurer: "HDFC Ergo",
    premium: 21800,
    featured: false,
    features: [
      { label: "Sum insured", value: "₹15L" },
      { label: "Room-rent cap", value: "No" },
      { label: "Co-pay", value: "No" },
      { label: "Maternity", value: "Yes" },
      { label: "Cashless", value: "8,400+" },
      { label: "Transparency", value: "95%" },
    ],
  },
  {
    name: "Prime Health Plus",
    insurer: "Bajaj Allianz",
    premium: 17600,
    featured: false,
    features: [
      { label: "Sum insured", value: "₹10L" },
      { label: "Room-rent cap", value: "1%" },
      { label: "Co-pay", value: "10%" },
      { label: "Maternity", value: "No" },
      { label: "Cashless", value: "10,200+" },
      { label: "Transparency", value: "81%" },
    ],
  },
];
