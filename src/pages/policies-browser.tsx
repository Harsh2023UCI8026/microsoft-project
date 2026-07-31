"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SoftCard,
  Pill,
  StepStepper,
  ProgressBar,
} from "@/components/site-primitives";
import { api, type Policy } from "@/lib/api";
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Eye,
  Heart,
  Car,
  Home as HomeIcon,
  ShieldAlert,
  ChevronDown,
  Loader2,
} from "lucide-react";

// Fallback policy data — used while the API loads or if the API is unavailable
const FALLBACK_POLICIES: Policy[] = [
  {
    id: "1", name: "Health Shield Pro Plus", insurer: "SecureLife Health", type: "health",
    sumInsured: 1000000, premiumAnnual: 18400, transparency: 92, claimApproval: 94,
    cashlessCount: 12400, rating: 4.9, reviewCount: 1247, matchScore: 98, redFlagCount: 3,
    tags: ["best-match", "health", "family-floater"], benefits: ["No room-rent cap", "No co-pay", "Restoration benefit", "Free annual checkup"],
  },
  {
    id: "2", name: "FamilyCare Premier", insurer: "Star Health", type: "health",
    sumInsured: 1000000, premiumAnnual: 16200, transparency: 88, claimApproval: 91,
    cashlessCount: 11200, rating: 4.6, reviewCount: 942, matchScore: 88, redFlagCount: 2,
    tags: ["best-value", "health"], benefits: ["Lower premium", "Maternity included", "No co-pay", "Wellness rewards"],
  },
  {
    id: "3", name: "MediSecure Elite", insurer: "HDFC Ergo", type: "health",
    sumInsured: 1500000, premiumAnnual: 21800, transparency: 95, claimApproval: 96,
    cashlessCount: 8400, rating: 4.8, reviewCount: 738, matchScore: 84, redFlagCount: 1,
    tags: ["most-transparent", "health"], benefits: ["No room-rent cap", "Maternity rider", "Critical illness", "Global cover"],
  },
  {
    id: "4", name: "SecureLife Family", insurer: "ICICI Lombard", type: "health",
    sumInsured: 1200000, premiumAnnual: 19400, transparency: 86, claimApproval: 89,
    cashlessCount: 9800, rating: 4.5, reviewCount: 612, matchScore: 82, redFlagCount: 2,
    tags: ["balanced", "health"], benefits: ["Restoration benefit", "Mid-tier premium", "Wellness rewards", "Optional riders"],
  },
  {
    id: "5", name: "Prime Health Plus", insurer: "Bajaj Allianz", type: "health",
    sumInsured: 1000000, premiumAnnual: 17600, transparency: 81, claimApproval: 87,
    cashlessCount: 10200, rating: 4.3, reviewCount: 524, matchScore: 78, redFlagCount: 3,
    tags: ["budget", "health"], benefits: ["Lowest premium", "Free health checkup", "Optional riders", "NCB up to 50%"],
  },
  {
    id: "6", name: "Wellness Shield", insurer: "Max Bupa", type: "health",
    sumInsured: 800000, premiumAnnual: 15800, transparency: 78, claimApproval: 85,
    cashlessCount: 7600, rating: 4.2, reviewCount: 418, matchScore: 74, redFlagCount: 4,
    tags: ["economy", "health"], benefits: ["Free checkup", "Maternity rider", "Wellness rewards", "NCB"],
  },
];

export function PoliciesBrowserPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("all");
  const [sort, setSort] = React.useState("match");
  const [maxPremium, setMaxPremium] = React.useState(25000);
  const [policies, setPolicies] = React.useState<Policy[]>(FALLBACK_POLICIES);
  const [loading, setLoading] = React.useState(false);

  // Fetch policies from the backend on mount + when filters change
  const fetchPolicies = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getPolicies({
        type,
        q: search || undefined,
        maxPremium,
        sort,
      });
      if (result.success && result.policies.length > 0) {
        setPolicies(result.policies);
      } else {
        // Fallback client-side filter on the fallback data
        setPolicies(
          FALLBACK_POLICIES.filter((p) => {
            if (type !== "all" && p.type !== type) return false;
            if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.insurer.toLowerCase().includes(search.toLowerCase())) return false;
            if (p.premiumAnnual > maxPremium) return false;
            return true;
          }),
        );
      }
    } catch (err) {
      // Use fallback data with client-side filtering
      setPolicies(
        FALLBACK_POLICIES.filter((p) => {
          if (type !== "all" && p.type !== type) return false;
          if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.insurer.toLowerCase().includes(search.toLowerCase())) return false;
          if (p.premiumAnnual > maxPremium) return false;
          return true;
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [type, search, maxPremium, sort]);

  React.useEffect(() => {
    const t = setTimeout(fetchPolicies, 250); // debounce
    return () => clearTimeout(t);
  }, [fetchPolicies]);

  const filtered = policies;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              Policy Browser
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Browse Insurance Policies
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Discover precision-underwritten coverage powered by our neural analysis engine.
              Transparency and claim intelligence at your fingertips.
            </p>
          </div>
          <StepStepper
            steps={[{ label: "Browse" }, { label: "Inspect" }, { label: "Decide" }]}
            current={0}
            variant="horizontal-compact"
          />
        </div>

        {/* Search & filter */}
        <SoftCard className="mb-6">
          <div className="grid lg:grid-cols-[1fr_220px_220px] gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by policy name or insurer..."
                className="pl-10"
              />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Policy type
              </div>
              <div className="flex gap-1.5">
                {[
                  { v: "all", label: "All" },
                  { v: "health", label: "Health" },
                  { v: "motor", label: "Motor" },
                ].map((t) => (
                  <button
                    key={t.v}
                    onClick={() => setType(t.v)}
                    className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${type === t.v ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Max premium
                </span>
                <span className="text-xs font-bold tabular-nums text-blue-700">
                  ₹{maxPremium.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={30000}
                step={500}
                value={maxPremium}
                onChange={(e) => setMaxPremium(Number(e.target.value))}
                className="w-full"
                style={{ ["--val" as string]: `${((maxPremium - 10000) / 20000) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 text-blue-600 animate-spin" />
              ) : (
                <Filter className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span className="text-xs text-slate-500">
                Showing <strong className="text-slate-900">{filtered.length}</strong> of {policies.length} policies
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700"
              >
                <option value="match">AI Match</option>
                <option value="premium-low">Premium: Low to High</option>
                <option value="premium-high">Premium: High to Low</option>
                <option value="transparency">Transparency</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </SoftCard>

        {/* Policy cards grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((p) => {
            const featured = p.matchScore >= 95;
            const tag = featured ? "Best match" : p.tags.includes("best-value") ? "Best value" : p.tags.includes("most-transparent") ? "Most transparent" : p.tags[0] || "Plan";
            const pillVariant = featured ? "green" : p.tags.includes("best-value") ? "blue" : p.tags.includes("most-transparent") ? "purple" : "slate";
            return (
              <SoftCard key={p.id} interactive className={featured ? "ring-2 ring-blue-300" : ""}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill variant={pillVariant as any}>{tag}</Pill>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-semibold text-slate-700">{p.rating}</span>
                        <span className="text-[10px] text-slate-400">({p.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.insurer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Premium</div>
                    <div className="text-xl font-bold tabular-nums text-slate-900">
                      ₹{p.premiumAnnual.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-500">per year</div>
                  </div>
                </div>

                {/* AI score strip */}
                <div className="grid grid-cols-4 gap-2 mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sum insured</div>
                    <div className="text-sm font-bold text-slate-900">₹{(p.sumInsured / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Transparency</div>
                    <div className={`text-sm font-bold ${p.transparency >= 90 ? "text-emerald-600" : p.transparency >= 80 ? "text-blue-600" : "text-amber-600"}`}>
                      {p.transparency}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Approval</div>
                    <div className={`text-sm font-bold ${p.claimApproval >= 90 ? "text-emerald-600" : "text-blue-600"}`}>
                      {p.claimApproval}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Cashless</div>
                    <div className="text-sm font-bold text-slate-900">{p.cashlessCount.toLocaleString("en-IN")}+</div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.benefits.slice(0, 4).map((b) => (
                    <span key={b} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {b}
                    </span>
                  ))}
                </div>

                {/* AI insight strip */}
                {featured && (
                  <div className="mb-3 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 p-2.5 ring-1 ring-blue-100 flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-slate-700 leading-relaxed">
                      <strong className="text-blue-700">AI Insight:</strong> Best fit for your risk profile.
                      {p.matchScore}% match score based on age, lifestyle, and family history.
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate("inspector")}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> Inspect
                  </Button>
                  <Button
                    onClick={() => navigate("simulator")}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    Simulate
                  </Button>
                  <Button
                    onClick={() => navigate("recommendations")}
                    size="sm"
                    className={`flex-1 ${featured ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  >
                    Get Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </SoftCard>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <SoftCard className="text-center py-16">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900">No policies match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try widening your budget or clearing the search.</p>
            <Button
              onClick={() => {
                setSearch("");
                setMaxPremium(30000);
                setType("all");
              }}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Reset filters
            </Button>
          </SoftCard>
        )}
      </div>
    </div>
  );
}

export default PoliciesBrowserPage;
