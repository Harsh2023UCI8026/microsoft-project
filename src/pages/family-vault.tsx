"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import {
  SoftCard,
  Pill,
  ProgressRing,
  ProgressBar,
} from "@/components/site-primitives";
import {
  Heart,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Brain,
  Users,
  Baby,
  User,
  CheckCircle2,
  TrendingUp,
  Activity,
} from "lucide-react";

const FAMILY = [
  {
    name: "Rajesh (Self)",
    role: "Primary insured",
    age: 38,
    score: 92,
    gap: false,
    icon: <User className="h-5 w-5" />,
    color: "from-blue-100 to-blue-200 text-blue-700",
    insights: ["No coverage gaps", "All riders active"],
  },
  {
    name: "Anita (Spouse)",
    role: "Co-insured",
    age: 35,
    score: 88,
    gap: false,
    icon: <User className="h-5 w-5" />,
    color: "from-pink-100 to-rose-200 text-rose-700",
    insights: ["Maternity rider active", "Wellness rewards unlocked"],
  },
  {
    name: "Aarav (Son, 14)",
    role: "Dependent",
    age: 14,
    score: 72,
    gap: true,
    icon: <Baby className="h-5 w-5" />,
    color: "from-amber-100 to-yellow-200 text-amber-700",
    insights: ["Missing critical illness rider", "Pediatric dental not covered"],
  },
  {
    name: "Meera (Daughter, 9)",
    role: "Dependent",
    age: 9,
    score: 95,
    gap: false,
    icon: <Baby className="h-5 w-5" />,
    color: "from-emerald-100 to-teal-200 text-emerald-700",
    insights: ["Fully protected", "Annual checkup scheduled"],
  },
];

export function FamilyVaultPage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top brand bar — Aegis Intelligence style */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-soft">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Aegis Intelligence
              </div>
              <div className="text-sm font-bold">Family Vault Dashboard</div>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            {["Claims", "Hospitals", "Documents", "Policies"].map((n) => (
              <button key={n} className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                {n}
              </button>
            ))}
            <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
              <Activity className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
              <Sparkles className="h-4 w-4" />
            </button>
            <span className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold">
              AM
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Protection score hero */}
        <SoftCard padding="lg" className="mb-6 bg-gradient-to-br from-slate-50 to-blue-50 border-blue-100">
          <div className="grid lg:grid-cols-[1fr_240px] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill variant="green">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink-dot" />
                  Live family protection
                </Pill>
                <span className="text-[11px] text-slate-500">Updated 2 min ago</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Overall Family Protection
              </h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
                Your family is <strong className="text-emerald-700">88% protected</strong> against
                medical and life risks. <strong className="text-amber-700">2 coverage gaps</strong>{" "}
                identified in the "Child" and "Self" categories.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => navigate("recommendations")} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10">
                  Fix Coverage Gaps
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-xl h-10">
                  <TrendingUp className="h-4 w-4" /> View Report
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <ProgressRing
                value={88}
                size={180}
                strokeWidth={14}
                color="#10b981"
                label={
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums text-slate-900">88%</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Protected</div>
                  </div>
                }
              />
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                +4% vs last month
              </div>
            </div>
          </div>
        </SoftCard>

        {/* Family profiles grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Family Profiles</h2>
              <p className="text-xs text-slate-500">4 members · 2 coverage gaps detected</p>
            </div>
            <Pill variant="amber">2 gaps to fix</Pill>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {FAMILY.map((m) => (
              <SoftCard key={m.name} interactive>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color}`}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">{m.name}</h3>
                        <p className="text-[11px] text-slate-500">{m.role} · Age {m.age}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-lg font-bold tabular-nums ${
                          m.gap ? "text-amber-600" : "text-emerald-600"
                        }`}>
                          {m.score}%
                        </div>
                        <div className={`text-[10px] ${m.gap ? "text-amber-600" : "text-emerald-600"}`}>
                          {m.gap ? "Gap" : "Protected"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.gap ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      {m.insights.map((i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          {m.gap ? (
                            <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                          )}
                          {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SoftCard>
            ))}
          </div>
        </div>

        {/* AI Coverage Intelligence */}
        <SoftCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">AI Coverage Intelligence</h2>
              <p className="text-xs text-slate-500">Real-time analysis of your family's coverage</p>
            </div>
            <Pill variant="blue">
              <Brain className="h-3 w-3" /> Live
            </Pill>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl bg-emerald-50 ring-1 ring-emerald-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Total sum insured</span>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold tabular-nums text-emerald-700">₹1.2 Cr</div>
              <div className="text-[10px] text-emerald-600">Family floater + individual</div>
            </div>
            <div className="rounded-xl bg-amber-50 ring-1 ring-amber-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Coverage gaps</span>
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold tabular-nums text-amber-700">2</div>
              <div className="text-[10px] text-amber-600">Aarav · critical illness</div>
            </div>
            <div className="rounded-xl bg-blue-50 ring-1 ring-blue-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">Annual premium</span>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold tabular-nums text-blue-700">₹84,000</div>
              <div className="text-[10px] text-blue-600">3 policies bundled</div>
            </div>
          </div>

          {/* AI recommendations strip */}
          <div className="rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Brain className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-100">AI Recommendation</div>
                <div className="text-sm font-semibold">Add critical illness rider for Aarav — ₹2,400/yr closes biggest gap.</div>
              </div>
            </div>
            <Button
              onClick={() => navigate("recommendations")}
              size="sm"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
            >
              View →
            </Button>
          </div>
        </SoftCard>

        {/* Quick actions */}
        <SoftCard>
          <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "File a claim", icon: <Activity className="h-5 w-5" />, route: "emergency" as const },
              { label: "Add member", icon: <Users className="h-5 w-5" />, route: "onboarding" as const },
              { label: "Upload document", icon: <ShieldCheck className="h-5 w-5" />, route: "inspector" as const },
              { label: "View timeline", icon: <TrendingUp className="h-5 w-5" />, route: "lifecycle" as const },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.route)}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-soft transition-all"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {a.icon}
                </span>
                <span className="text-xs font-semibold text-slate-900 text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </SoftCard>
      </div>
    </div>
  );
}

export default FamilyVaultPage;
