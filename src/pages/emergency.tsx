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
  Phone,
  Ambulance,
  Heart,
  Activity,
  AlertTriangle,
  Hospital,
  FileText,
  Clock,
  CheckCircle2,
  Upload,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  User,
  MapPin,
  Navigation,
  Settings,
  Bell,
} from "lucide-react";

const EMERGENCIES = [
  { icon: <Heart className="h-5 w-5" />, label: "Cardiac", tone: "rose" },
  { icon: <Activity className="h-5 w-5" />, label: "Accident", tone: "amber" },
  { icon: <Ambulance className="h-5 w-5" />, label: "Hospitalization", tone: "blue" },
  { icon: <AlertTriangle className="h-5 w-5" />, label: "Critical illness", tone: "purple" },
];

export function EmergencyPage() {
  const { navigate } = useRouter();
  const [selected, setSelected] = React.useState<string | null>("Hospitalization");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top emergency bar */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-100">
                AssureAI Emergency
              </div>
              <div className="text-sm font-bold">Real-time claim tracking & support</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <Button className="bg-white text-rose-700 hover:bg-rose-50 font-bold h-10">
              <PhoneCall className="h-4 w-4" />
              Emergency Call
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Emergency type selection */}
        <SoftCard className="mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-3">What is your emergency?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EMERGENCIES.map((e) => {
              const active = selected === e.label;
              const toneBg =
                e.tone === "rose" ? "bg-rose-50 ring-rose-200 text-rose-700"
                : e.tone === "amber" ? "bg-amber-50 ring-amber-200 text-amber-700"
                : e.tone === "purple" ? "bg-violet-50 ring-violet-200 text-violet-700"
                : "bg-blue-50 ring-blue-200 text-blue-700";
              return (
                <button
                  key={e.label}
                  onClick={() => setSelected(e.label)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    active ? `border-current ring-2 ${toneBg}` : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active ? "bg-white/70" : toneBg.split(" ")[0]
                  }`}>
                    {e.icon}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-900">{e.label}</div>
                  <div className="text-[11px] text-slate-500">Tap to select</div>
                </button>
              );
            })}
          </div>
        </SoftCard>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            {/* Active claim tracking */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Active Claim Tracking</h2>
                  <p className="text-xs text-slate-500">Claim #CLM-2024-7842 · Apollo Hospital, Bengaluru</p>
                </div>
                <Pill variant="green">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink-dot" />
                  Cashless · In progress
                </Pill>
              </div>

              {/* Status timeline */}
              <div className="grid sm:grid-cols-5 gap-2">
                {[
                  { step: "Filed", time: "2:14 PM", status: "done" },
                  { step: "Documents", time: "2:28 PM", status: "done" },
                  { step: "Pre-auth", time: "3:45 PM", status: "done" },
                  { step: "Treatment", time: "Active", status: "active" },
                  { step: "Settlement", time: "Pending", status: "pending" },
                ].map((s, i) => (
                  <div key={s.step} className="relative">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full mx-auto ${
                      s.status === "done" ? "bg-emerald-500 text-white"
                      : s.status === "active" ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-slate-100 text-slate-400"
                    }`}>
                      {s.status === "done" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-xs font-semibold ${s.status === "pending" ? "text-slate-400" : "text-slate-900"}`}>
                        {s.step}
                      </div>
                      <div className="text-[10px] text-slate-500">{s.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live status */}
              <div className="mt-4 rounded-xl bg-blue-50/60 ring-1 ring-blue-100 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
                    <Activity className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">Pre-authorization approved · ₹4,80,000</div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Cashless treatment in progress. Estimated discharge in 2 days.
                      Insurer approved 96% of pre-auth request.
                    </p>
                  </div>
                </div>
              </div>
            </SoftCard>

            {/* Required documents */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Required Documents</h2>
                  <p className="text-xs text-slate-500">4 of 6 documents submitted</p>
                </div>
                <Button size="sm" variant="outline">
                  <Upload className="h-3.5 w-3.5" /> Upload
                </Button>
              </div>
              <div className="space-y-2">
                {DOCS.map((d) => (
                  <div key={d.label} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      d.submitted ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {d.submitted ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{d.label}</div>
                      <div className="text-[11px] text-slate-500">{d.detail}</div>
                    </div>
                    {d.submitted ? (
                      <Pill variant="green">Submitted</Pill>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Upload
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Claim process timeline */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-900">Claim Process Timeline</h2>
                <Pill variant="blue">5-step process</Pill>
              </div>
              <div className="space-y-3">
                {PROCESS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        p.done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                      }`}>
                        {p.done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                      </div>
                      {i < PROCESS.length - 1 && <div className="w-0.5 h-8 bg-slate-100 mt-1" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                      <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
                      <div className="mt-1 text-[10px] text-slate-400">{p.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Hospital info */}
            <SoftCard>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Cashless Hospital</h3>
                <Pill variant="green">In-network</Pill>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Hospital className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900">Apollo Hospitals</div>
                  <div className="text-xs text-slate-500">Bannerghatta Road, Bengaluru</div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="h-3 w-3" />
                    4.2 km away
                    <span className="mx-1">·</span>
                    <Clock className="h-3 w-3" />
                    12 min drive
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Navigation className="h-3 w-3" /> Directions
                </Button>
                <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-3 w-3" /> Call
                </Button>
              </div>
            </SoftCard>

            {/* AI approval probability */}
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Approval Probability
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tabular-nums">96%</span>
                <span className="text-xs text-blue-200">cashless approved</span>
              </div>
              <p className="mt-2 text-xs text-blue-100 leading-relaxed">
                Based on 4,200+ similar emergency claims in your network.
                Pre-auth has been auto-approved.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { label: "Cashless approved", value: "₹4,80,000", pct: 96 },
                  { label: "Out-of-pocket (max)", value: "₹20,000", pct: 4 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-blue-200">{r.label}</span>
                      <span className="font-semibold text-white tabular-nums">{r.value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                      <div className="h-full rounded-full bg-white" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Insurance helpline */}
            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Insurance Helpline</h3>
              <p className="text-xs text-slate-500 mb-3">24/7 dedicated emergency support</p>
              <div className="space-y-2">
                {[
                  { label: "Insurer hotline", value: "1800-200-4400" },
                  { label: "Cashless desk", value: "+91-80-4612-0042" },
                  { label: "InsurIntel AI support", value: "+91-80-4612-0099" },
                ].map((h) => (
                  <div key={h.label} className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
                    <span className="text-xs text-slate-600">{h.label}</span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">{h.value}</span>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Emergency contacts */}
            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Emergency Contacts</h3>
              <div className="space-y-2">
                {CONTACTS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-sky-200 text-blue-700 text-xs font-bold">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.relation}</div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 h-8">
                <User className="h-3.5 w-3.5" /> Add contact
              </Button>
            </SoftCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;

const DOCS = [
  { label: "Aadhaar card", detail: "ID proof · 1 MB · uploaded", submitted: true },
  { label: "Health card", detail: "Policy #INS-4402 · uploaded", submitted: true },
  { label: "Doctor's prescription", detail: "ER admission note · uploaded", submitted: true },
  { label: "Hospital estimate", detail: "₹5,20,000 pre-auth · uploaded", submitted: true },
  { label: "Discharge summary", detail: "Pending discharge", submitted: false },
  { label: "Final hospital bill", detail: "Pending discharge", submitted: false },
];

const PROCESS = [
  { title: "Notify insurer", description: "Claim filed via InsurIntel AI · auto-routed to insurer", time: "2:14 PM today", done: true },
  { title: "Pre-authorization submitted", description: "Hospital sent pre-auth for ₹5,20,000", time: "2:28 PM today", done: true },
  { title: "Pre-auth approved", description: "Insurer approved ₹4,80,000 (96% of request)", time: "3:45 PM today", done: true },
  { title: "Treatment in progress", description: "Cashless treatment active. Discharge in 2 days.", time: "Active now", done: false },
  { title: "Final settlement", description: "Balance (if any) settled within 7 days of discharge", time: "After discharge", done: false },
];

const CONTACTS = [
  { name: "Anita Mehta", relation: "Spouse" },
  { name: "Rajesh Mehta", relation: "Father" },
  { name: "Dr. Suresh Patel", relation: "Family doctor" },
];
