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
import { api, type Recommendation } from "@/lib/api";
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
  Loader2,
} from "lucide-react";

// Fallback data — used while API loads
const FALLBACK_RECS: Recommendation[] = [
  {
    id: "1", rank: 1, matchScore: 98, reason: "Best overall fit for your risk profile and budget.",
    policy: {
      id: "1", name: "Health Shield Pro Plus", insurer: "SecureLife Health", type: "health",
      sumInsured: 1000000, premiumAnnual: 18400, transparency: 92, claimApproval: 94,
      cashlessCount: 12400, rating: 4.9, reviewCount: 1247, matchScore: 98, redFlagCount: 3,
      tags: ["best-match"], benefits: ["No room-rent cap", "No co-pay", "Restoration benefit", "Free annual checkup"],
    },
  },
  {
    id: "2", rank: 2, matchScore: 88, reason: "Best value option with maternity coverage.",
    policy: {
      id: "2", name: "FamilyCare Premier", insurer: "Star Health", type: "health",
      sumInsured: 1000000, premiumAnnual: 16200, transparency: 88, claimApproval: 91,
      cashlessCount: 11200, rating: 4.6, reviewCount: 942, matchScore: 88, redFlagCount: 2,
      tags: ["best-value"], benefits: ["Lower premium", "Maternity included", "No co-pay", "Wellness rewards"],
    },
  },
  {
    id: "3", rank: 3, matchScore: 84, reason: "Highest transparency in our network.",
    policy: {
      id: "3", name: "MediSecure Elite", insurer: "HDFC Ergo", type: "health",
      sumInsured: 1500000, premiumAnnual: 21800, transparency: 95, claimApproval: 96,
      cashlessCount: 8400, rating: 4.8, reviewCount: 738, matchScore: 84, redFlagCount: 1,
      tags: ["most-transparent"], benefits: ["No room-rent cap", "Maternity rider", "Critical illness", "Global cover"],
    },
  },
  {
    id: "4", rank: 4, matchScore: 82, reason: "Balanced option with mid-tier premium.",
    policy: {
      id: "4", name: "SecureLife Family", insurer: "ICICI Lombard", type: "health",
      sumInsured: 1200000, premiumAnnual: 19400, transparency: 86, claimApproval: 89,
      cashlessCount: 9800, rating: 4.5, reviewCount: 612, matchScore: 82, redFlagCount: 2,
      tags: ["balanced"], benefits: ["Restoration benefit", "Mid-tier premium", "Wellness rewards", "Optional riders"],
    },
  },
];

export function RecommendationsPage() {
  const { navigate } = useRouter();
  const [tab, setTab] = React.useState<"cards" | "table" | "compare">("cards");
  const [recs, setRecs] = React.useState<Recommendation[]>(FALLBACK_RECS);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    api.getRecommendations()
      .then((result) => {
        if (mounted && result.success && result.recommendations.length > 0) {
          setRecs(result.recommendations);
        }
      })
      .catch(() => { /* keep fallback */ })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const featured = recs[0];
  const secondary = recs.slice(1, 5);
  const allPlans = recs;
  const comparePlans = recs.slice(0, 4);

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
                <span className="text-[11px] text-slate-500">{featured.matchScore}% match score</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{featured.policy.name}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {featured.reason} Premium family floater with no room-rent cap, no co-pay,
                and built-in restoration benefit. Top-rated for transparency by InsurIntel AI.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Sum insured", value: `₹${(featured.policy.sumInsured / 100000).toFixed(1)}L` },
                  { label: "Premium / yr", value: `₹${featured.policy.premiumAnnual.toLocaleString("en-IN")}` },
                  { label: "Transparency", value: `${featured.policy.transparency}%` },
                  { label: "Cashless", value: `${featured.policy.cashlessCount.toLocaleString("en-IN")}+` },
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
                value={featured.matchScore}
                size={140}
                color="#2563eb"
                label={<span className="text-3xl font-bold text-slate-900">{featured.matchScore}%</span>}
                sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Match Score</span>}
              />
              <div className="mt-4 flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-1 text-xs text-slate-500">{featured.policy.rating} · {featured.policy.reviewCount.toLocaleString("en-IN")} reviews</span>
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
            {secondary.map((r, i) => {
              const p = r.policy;
              const pillVariant = r.matchScore >= 90 ? "green" : r.matchScore >= 80 ? "blue" : "slate";
              return (
                <SoftCard key={r.id} interactive>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Pill variant={pillVariant as any}>Rank #{r.rank}</Pill>
                        <span className="text-[11px] text-slate-400">{i + 2} of {recs.length}</span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">{p.name}</h3>
                      <div className="text-xs text-slate-500">{p.insurer}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Match</div>
                      <div className="text-lg font-bold text-blue-700">{r.matchScore}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Premium</div>
                      <div className="text-sm font-bold text-slate-900">₹{p.premiumAnnual.toLocaleString("en-IN")}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sum insured</div>
                      <div className="text-sm font-bold text-slate-900">₹{(p.sumInsured / 100000).toFixed(1)}L</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Transparency</div>
                      <div className="text-sm font-bold text-slate-900">{p.transparency}%</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {p.benefits.slice(0, 2).map((pro) => (
                      <div key={pro} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                        {pro}
                      </div>
                    ))}
                  </div>
                  {r.reason && (
                    <div className="mb-3 rounded-lg bg-blue-50/60 p-2 text-[11px] text-slate-700 leading-relaxed">
                      <strong className="text-blue-700">AI:</strong> {r.reason}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate("inspector")}>
                      <Eye className="h-3.5 w-3.5" /> Inspect
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => navigate("simulator")}>
                      Simulate
                    </Button>
                  </div>
                </SoftCard>
              );
            })}
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
                  {allPlans.map((r) => {
                    const p = r.policy;
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-500">{p.insurer}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  r.matchScore >= 90 ? "bg-emerald-500" : r.matchScore >= 75 ? "bg-blue-500" : "bg-amber-500"
                                }`}
                                style={{ width: `${r.matchScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold tabular-nums">{r.matchScore}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">
                          ₹{p.premiumAnnual.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700 tabular-nums">₹{(p.sumInsured / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-sm text-slate-700 tabular-nums">{p.transparency}%</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{p.cashlessCount.toLocaleString("en-IN")}+</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate("inspector")}>
                            Inspect <ChevronRight className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SoftCard>
        )}

        {tab === "compare" && (
          <SoftCard padding="none" className="overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-slate-100">
              {comparePlans.map((r, i) => {
                const p = r.policy;
                const featured = i === 0;
                return (
                  <div key={r.id} className="p-4">
                    <div className={`rounded-xl p-3 mb-3 ${featured ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-1 ring-blue-200" : "bg-slate-50"}`}>
                      {featured && (
                        <Pill variant="blue" className="mb-2">
                          <Star className="h-3 w-3 fill-current" /> Best match
                        </Pill>
                      )}
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.insurer}</div>
                      <div className="mt-3 text-2xl font-bold text-blue-700">
                        ₹{p.premiumAnnual.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-400">per year</div>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { label: "Sum insured", value: `₹${(p.sumInsured / 100000).toFixed(1)}L` },
                        { label: "Transparency", value: `${p.transparency}%` },
                        { label: "Claim approval", value: `${p.claimApproval}%` },
                        { label: "Cashless", value: `${p.cashlessCount.toLocaleString("en-IN")}+` },
                        { label: "Red flags", value: `${p.redFlagCount}` },
                        { label: "Rating", value: `${p.rating}★` },
                      ].map((f) => (
                        <div key={f.label} className="flex items-start justify-between">
                          <span className="text-slate-500">{f.label}</span>
                          <span className="font-semibold text-slate-900">{f.value}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant={featured ? "default" : "outline"}
                      className={`mt-4 w-full ${featured ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                      onClick={() => navigate(featured ? "simulator" : "inspector")}
                    >
                      {featured ? "Get Quote" : "Inspect"}
                    </Button>
                  </div>
                );
              })}
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
