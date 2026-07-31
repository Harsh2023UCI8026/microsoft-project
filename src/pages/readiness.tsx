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
  ShieldCheck,
  Heart,
  FileText,
  Hospital,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Brain,
  Activity,
  TrendingUp,
  BedDouble,
  Stethoscope,
  Wallet,
  Bell,
} from "lucide-react";

export function ReadinessPage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <ShieldCheck className="h-3.5 w-3.5" />
            Insurance Readiness
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Ready for Hospitalization
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Monitor your insurance readiness, document status, and hospital network
            availability for emergency hospitalization — all in real time.
          </p>
        </div>

        {/* Top — readiness score hero */}
        <SoftCard padding="lg" className="mb-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="grid lg:grid-cols-[1fr_240px] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill variant="green">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink-dot" />
                  READY FOR HOSPITALIZATION
                </Pill>
                <span className="text-[11px] text-slate-500">Checked 4 min ago</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                You're ready for an emergency hospitalization.
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
                Your policy is active, documents verified, cashless network available
                within 4.2km, and AI approval probability is high. No action needed.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => navigate("emergency")} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10">
                  <Hospital className="h-4 w-4" /> Find Hospital
                </Button>
                <Button variant="outline" className="rounded-xl h-10">
                  <FileText className="h-4 w-4" /> View Documents
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <ProgressRing
                value={94}
                size={180}
                strokeWidth={14}
                color="#2563eb"
                label={
                  <div className="text-center">
                    <div className="text-4xl font-bold tabular-nums text-slate-900">94</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Readiness</div>
                  </div>
                }
              />
              <div className="mt-3 text-xs text-slate-500">+12% vs last week</div>
            </div>
          </div>
        </SoftCard>

        {/* Readiness checks */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {READINESS_CHECKS.map((c) => (
            <SoftCard key={c.label} padding="sm">
              <div className="flex items-center justify-between mb-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.status === "pass" ? "bg-emerald-50 text-emerald-600"
                  : c.status === "warn" ? "bg-amber-50 text-amber-600"
                    : "bg-rose-50 text-rose-600"
                  }`}>
                  {c.icon}
                </span>
                {c.status === "pass" ? (
                  <Pill variant="green">Ready</Pill>
                ) : c.status === "warn" ? (
                  <Pill variant="amber">Action</Pill>
                ) : (
                  <Pill variant="red">Blocker</Pill>
                )}
              </div>
              <div className="text-sm font-semibold text-slate-900">{c.label}</div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{c.detail}</p>
              {c.action && (
                <Button size="sm" variant="outline" className="mt-2 w-full h-7 text-xs">
                  {c.action}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </SoftCard>
          ))}
        </div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            {/* Document status */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Document Status</h2>
                  <p className="text-xs text-slate-500">7 of 8 documents verified and ready</p>
                </div>
                <Pill variant="green">94% ready</Pill>
              </div>
              <div className="space-y-2">
                {DOCS_STATUS.map((d) => (
                  <div key={d.label} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${d.status === "verified" ? "bg-emerald-50 text-emerald-600"
                      : d.status === "expiring" ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                      }`}>
                      {d.status === "verified" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{d.label}</div>
                      <div className="text-[11px] text-slate-500">{d.detail}</div>
                    </div>
                    {d.status === "verified" ? (
                      <Pill variant="green">Verified</Pill>
                    ) : d.status === "expiring" ? (
                      <Pill variant="amber">{d.badge}</Pill>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Upload
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Hospital network availability */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Hospital Network Availability</h2>
                  <p className="text-xs text-slate-500">Cashless hospitals within 25km of your location</p>
                </div>
                <Pill variant="blue">240 hospitals</Pill>
              </div>
              <div className="space-y-2">
                {HOSPITALS.map((h) => (
                  <div key={h.name} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Hospital className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{h.name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{h.distance} km</span>
                        <span>·</span>
                        <span>{h.beds} beds</span>
                        <span>·</span>
                        <span>{h.specialties} specialties</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {h.emergency ? (
                        <Pill variant="green">24/7 ER</Pill>
                      ) : (
                        <Pill variant="slate">Day only</Pill>
                      )}
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <BedDouble className="h-3 w-3" /> Check beds
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3 h-9">
                View all 240 hospitals
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </SoftCard>

            {/* Financial readiness */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Financial Readiness</h2>
                  <p className="text-xs text-slate-500">Your financial safety net for emergencies</p>
                </div>
                <Pill variant="blue">₹4.8L available</Pill>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Sum insured</div>
                  <div className="text-lg font-bold tabular-nums text-emerald-700">₹10L</div>
                  <div className="text-[10px] text-emerald-600">Family floater</div>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">Emergency fund</div>
                  <div className="text-lg font-bold tabular-nums text-blue-700">₹2.4L</div>
                  <div className="text-[10px] text-blue-600">Out-of-pocket buffer</div>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Co-pay exposure</div>
                  <div className="text-lg font-bold tabular-nums text-amber-700">20%</div>
                  <div className="text-[10px] text-amber-600">After age 45</div>
                </div>
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Readiness Insights
                </span>
              </div>
              <div className="space-y-3">
                {INSIGHTS.map((i) => (
                  <div key={i.title} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                    <div className="flex items-start gap-2">
                      <span className={`shrink-0 mt-0.5 ${i.tone === "green" ? "text-emerald-300" : i.tone === "amber" ? "text-amber-300" : "text-blue-200"}`}>
                        {i.icon}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white">{i.title}</div>
                        <p className="text-[11px] text-blue-100 leading-relaxed mt-0.5">{i.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <Bell className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Smart Alerts</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Get notified when cashless hospitals near you go on diversion, when
                    documents are about to expire, or when your policy is up for renewal.
                  </p>
                </div>
              </div>
            </SoftCard>

            <Button
              onClick={() => navigate("emergency")}
              className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold h-11"
            >
              <Hospital className="h-4 w-4" />
              Emergency Hospitalization
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

const READINESS_CHECKS = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    label: "Policy active",
    detail: "Health Shield Pro Plus · ₹10L · valid until Mar 2025",
    status: "pass",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Documents verified",
    detail: "7 of 8 documents verified · 1 expiring",
    status: "warn",
    action: "Renew Aadhaar",
  },
  {
    icon: <Hospital className="h-5 w-5" />,
    label: "Cashless network",
    detail: "240 hospitals within 25km · 12 within 5km",
    status: "pass",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    label: "Emergency fund",
    detail: "₹2.4L out-of-pocket buffer available",
    status: "pass",
  },
];

const DOCS_STATUS = [
  { label: "Health policy PDF", detail: "Health Shield Pro Plus · 47 pages", status: "verified" },
  { label: "Aadhaar card", detail: "ID proof · expires in 28 days", status: "expiring", badge: "Expires soon" },
  { label: "PAN card", detail: "Tax ID · verified", status: "verified" },
  { label: "Family photos", detail: "4 members · all verified", status: "verified" },
  { label: "Medical history", detail: "Updated Mar 2024 · for all 4 members", status: "verified" },
  { label: "Previous claims", detail: "2 claims on record · settled", status: "verified" },
  { label: "Bank details", detail: "HDFC Bank · verified", status: "verified" },
  { label: "Nominee form", detail: "Pending submission", status: "missing" },
];

const HOSPITALS = [
  { name: "Apollo Hospitals", distance: 4.2, beds: 280, specialties: 32, emergency: true },
  { name: "Manipal Hospital", distance: 6.8, beds: 240, specialties: 28, emergency: true },
  { name: "Fortis Hospital", distance: 8.4, beds: 320, specialties: 35, emergency: true },
  { name: "Narayana Health", distance: 11.2, beds: 410, specialties: 42, emergency: true },
  { name: "Columbia Asia", distance: 14.5, beds: 180, specialties: 22, emergency: false },
];

const INSIGHTS = [
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    tone: "green",
    title: "Cashless approved at 96%",
    description: "AI predicts 96% approval probability at your nearest hospital.",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    tone: "amber",
    title: "Aadhaar expiring in 28 days",
    description: "Renew Aadhaar to keep document verification status active.",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    tone: "blue",
    title: "Off-peak admission window",
    description: "Hospital wait times are lowest between 7-9 AM at your nearest ER.",
  },
];

export default ReadinessPage;
