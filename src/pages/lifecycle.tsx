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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Gift,
  RefreshCw,
  Calendar,
  Award,
} from "lucide-react";

export function LifecyclePage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Policy Life Cycle
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Policy Life Cycle
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Your coverage evolves as you do. Track every milestone, waiting period, and
            potential reward with AI-driven insights tailored to your journey.
          </p>
        </div>

        {/* Timeline */}
        <SoftCard className="mb-6">
          <div className="grid lg:grid-cols-4 gap-4">
            {TIMELINE.map((s, i) => (
              <div key={s.title} className="relative">
                {/* Connector */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute top-7 -right-2 h-0.5 w-4 bg-slate-200 hidden lg:block" />
                )}
                {/* Status badge */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 ${
                    s.status === "done" ? "bg-emerald-100 text-emerald-600"
                    : s.status === "active" ? "bg-blue-600 text-white shadow-glow-brand"
                    : s.status === "warning" ? "bg-amber-100 text-amber-600"
                    : "bg-slate-100 text-slate-400"
                  }`}>
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                        s.status === "active" ? "text-blue-700" : s.status === "warning" ? "text-amber-600" : "text-slate-400"
                      }`}>
                        Step {i + 1}
                      </span>
                      {s.status === "active" && (
                        <span className="flex items-center gap-1 text-[10px] text-blue-700">
                          <span className="h-1 w-1 rounded-full bg-blue-600 animate-blink-dot" />
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{s.title}</h3>
                    <p className="text-[11px] text-slate-500">{s.date}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">{s.description}</p>
                {s.action && (
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                    {s.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SoftCard>

        {/* Two-column dashboard */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            {/* Milestones */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Policy Milestones</h2>
                  <p className="text-xs text-slate-500">Detailed timeline of your policy events</p>
                </div>
                <Pill variant="blue">14 events tracked</Pill>
              </div>
              <div className="space-y-3">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`flex flex-col items-center shrink-0 pt-1`}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        m.status === "done" ? "bg-emerald-100 text-emerald-600"
                        : m.status === "active" ? "bg-blue-600 text-white"
                        : m.status === "warning" ? "bg-amber-100 text-amber-600"
                        : "bg-slate-100 text-slate-400"
                      }`}>
                        {m.icon}
                      </div>
                      {i < MILESTONES.length - 1 && (
                        <div className="w-0.5 flex-1 mt-1 h-10 bg-slate-100" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{m.title}</div>
                          <p className="text-xs text-slate-500 mt-0.5">{m.description}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{m.date}</span>
                      </div>
                      {m.tag && (
                        <div className="mt-2">
                          <Pill variant={m.tagVariant as any}>{m.tag}</Pill>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Predictive dashboard preview */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Predictive Underwriting Dashboard</h2>
                  <p className="text-xs text-slate-500">AI forecast of your next 12 months</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("risk-engine")}>
                  Open Full View
                </Button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Premium trend</span>
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="mt-1 text-xl font-bold text-emerald-700">+4.2%</div>
                  <div className="text-[10px] text-emerald-600">Projected next renewal</div>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">Coverage utilization</span>
                    <Activity className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="mt-1 text-xl font-bold text-blue-700">12%</div>
                  <div className="text-[10px] text-blue-600">Of sum insured used</div>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">NCB status</span>
                    <Award className="h-3 w-3 text-amber-600" />
                  </div>
                  <div className="mt-1 text-xl font-bold text-amber-700">20%</div>
                  <div className="text-[10px] text-amber-600">Bonus accumulated</div>
                </div>
              </div>

              {/* Mini chart */}
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-700 mb-3">12-month forecast</div>
                <div className="flex items-end gap-1 h-24">
                  {[20, 22, 24, 28, 32, 30, 28, 32, 35, 38, 42, 45].map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${b * 1.5}%` }} />
                      <span className="text-[8px] text-slate-400">{i + 1}M</span>
                    </div>
                  ))}
                </div>
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="text-center">
              <ProgressRing
                value={62}
                size={120}
                color="#2563eb"
                label={<span className="text-2xl font-bold text-slate-900">62%</span>}
                sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Lifecycle progress</span>}
              />
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Your policy is 62% through its 3-year initial waiting period.
                2 of 5 milestones reached.
              </p>
            </SoftCard>

            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Upcoming events</h3>
              <div className="space-y-2">
                {UPCOMING.map((u) => (
                  <div key={u.title} className="rounded-lg border border-slate-200 p-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900">{u.title}</div>
                        <div className="text-[10px] text-slate-500">{u.days}</div>
                      </div>
                      <Pill variant={u.tone as any}>{u.label}</Pill>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  Reward unlocked
                </span>
              </div>
              <div className="text-sm font-bold text-white">No-claim bonus · 20%</div>
              <p className="text-[11px] text-blue-100 mt-1 leading-relaxed">
                You've earned a 20% NCB on next year's premium. Lock it in by maintaining
                claim-free status for 6 more months.
              </p>
              <Button
                onClick={() => navigate("recommendations")}
                size="sm"
                className="mt-3 w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold"
              >
                Lock Bonus
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </SoftCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default LifecyclePage;

const TIMELINE = [
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Policy Issued",
    date: "March 2024",
    status: "done",
    description: "Health Shield Pro Plus activated. ₹10L family floater.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Initial Waiting",
    date: "Mar-Jun 2024",
    status: "done",
    description: "30-day initial waiting period completed. Full coverage active.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Active Coverage",
    date: "Jun 2024 - Now",
    status: "active",
    description: "All benefits unlocked except PED and maternity. 2 claims filed.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Upcoming Renewal",
    date: "March 2025",
    status: "warning",
    description: "Premium review in 60 days. AI projects +4.2% increase.",
    action: "Lock premium",
  },
];

const MILESTONES = [
  {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    title: "Policy issued",
    description: "Health Shield Pro Plus · ₹10L · Family floater",
    date: "Mar 12, 2024",
    status: "done",
    tag: "Activated",
    tagVariant: "green",
  },
  {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    title: "Initial 30-day waiting completed",
    description: "Full coverage activated for all standard procedures",
    date: "Apr 11, 2024",
    status: "done",
  },
  {
    icon: <Activity className="h-3.5 w-3.5" />,
    title: "First claim filed (cashless)",
    description: "Day-care surgery · ₹42,000 paid in full",
    date: "Aug 3, 2024",
    status: "done",
    tag: "₹42,000 paid",
    tagVariant: "blue",
  },
  {
    icon: <Award className="h-3.5 w-3.5" />,
    title: "NCB milestone reached · 20%",
    description: "Earned 20% no-claim bonus on next renewal premium",
    date: "Mar 12, 2025",
    status: "active",
    tag: "Active",
    tagVariant: "blue",
  },
  {
    icon: <Clock className="h-3.5 w-3.5" />,
    title: "PED waiting period completes",
    description: "Pre-existing disease coverage activates after 12 months",
    date: "Mar 12, 2025",
    status: "active",
    tag: "Pending",
    tagVariant: "amber",
  },
  {
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    title: "Maternity waiting completes",
    description: "Maternity coverage activates after 24 months",
    date: "Mar 12, 2026",
    status: "warning",
    tag: "1 year away",
    tagVariant: "amber",
  },
  {
    icon: <RefreshCw className="h-3.5 w-3.5" />,
    title: "Premium review",
    description: "AI projects +4.2% premium increase. Lock in current rate.",
    date: "Jan 12, 2025",
    status: "warning",
    tag: "Action needed",
    tagVariant: "red",
  },
];

const UPCOMING = [
  { title: "Premium review", days: "in 60 days", tone: "amber", label: "Action" },
  { title: "NCB unlocks", days: "in 90 days", tone: "green", label: "Reward" },
  { title: "PED coverage", days: "in 90 days", tone: "blue", label: "Unlock" },
  { title: "Maternity unlock", days: "in 365 days", tone: "amber", label: "Wait" },
];
