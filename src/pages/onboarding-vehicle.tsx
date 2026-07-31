"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, StatBlock } from "@/components/site-primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Car,
  Gauge,
  Fuel,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Activity,
  IndianRupee,
  MapPin,
} from "lucide-react";

export function OnboardingVehiclePage() {
  const { navigate } = useRouter();
  const [budget, setBudget] = React.useState(12000);
  const [usage, setUsage] = React.useState("city-commute");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Policy Personalization
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Policy Personalization
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Tailor your motor insurance coverage with our AI-driven assessment. Precision
            underwriting starts with the right data.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            { label: "Vehicle Configuration", active: true, done: false },
            { label: "Usage Pattern", active: false, done: true },
            { label: "Budget & Coverage", active: false, done: false },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`rounded-xl border p-3 text-center ${s.active
                  ? "border-blue-500 bg-blue-50"
                  : s.done
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${s.active ? "bg-blue-600 text-white"
                    : s.done ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}>
                  {s.done ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                </span>
                <span className={`text-xs font-medium ${s.active ? "text-blue-700" : s.done ? "text-emerald-700" : "text-slate-500"
                  }`}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Form */}
          <div className="space-y-6">
            {/* Vehicle Configuration */}
            <SoftCard padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-900">Vehicle Configuration</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600">Make</Label>
                  <Select defaultValue="maruti">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="tata">Tata</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="mahindra">Mahindra</SelectItem>
                      <SelectItem value="kia">Kia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Model</Label>
                  <Input placeholder="e.g. Swift VXi" className="mt-1" defaultValue="Swift VXi" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Year of registration</Label>
                  <Select defaultValue="2022">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                        <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Fuel type</Label>
                  <Select defaultValue="petrol">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Registration number</Label>
                  <Input placeholder="KA01 AB 1234" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Current IDV (vehicle value)</Label>
                  <Input placeholder="₹6,80,000" className="mt-1" defaultValue="₹6,80,000" />
                </div>
              </div>
            </SoftCard>

            {/* Usage Pattern */}
            <SoftCard padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-900">Usage Pattern</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { value: "city-commute", label: "City commute", desc: "5-15 km/day" },
                  { value: "highway", label: "Highway driver", desc: "20-50 km/day" },
                  { value: "occasional", label: "Occasional use", desc: "<5 km/day" },
                ].map((u) => (
                  <button
                    key={u.value}
                    onClick={() => setUsage(u.value)}
                    className={`rounded-xl border p-3 text-left transition-all ${usage === u.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                  >
                    <div className="text-sm font-semibold text-slate-900">{u.label}</div>
                    <div className="text-[11px] text-slate-500">{u.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600">Annual kilometers</Label>
                  <Input placeholder="e.g. 8000" className="mt-1" defaultValue="8000" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600">Primary city</Label>
                  <Select defaultValue="bengaluru">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi NCR</SelectItem>
                      <SelectItem value="bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SoftCard>

            {/* Monthly Budget */}
            <SoftCard padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-slate-900">Monthly Budget</h2>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-medium text-slate-600">
                    Monthly premium target
                  </Label>
                  <span className="text-sm font-bold tabular-nums text-blue-700">
                    ₹{budget.toLocaleString("en-IN")} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full"
                  style={{ ["--val" as string]: `${((budget - 500) / 4500) * 100}%` }}
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Annual
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      ₹{(budget * 12).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                      AI Quote
                    </div>
                    <div className="text-sm font-bold text-blue-700">
                      ₹{Math.round(budget * 12 * 0.68).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      You Save
                    </div>
                    <div className="text-sm font-bold text-emerald-700">
                      ₹{Math.round(budget * 12 * 0.32).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </SoftCard>

            {/* Trust features */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <ShieldCheck className="h-4 w-4" />, label: "Cashless at 4,200+ garages" },
                { icon: <Activity className="h-4 w-4" />, label: "Instant claim approval" },
                { icon: <TrendingUp className="h-4 w-4" />, label: "AI-tuned IDV" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    {t.icon}
                  </span>
                  <span className="text-xs font-medium text-slate-700">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — risk profile */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="h-4 w-4 text-blue-300" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  Risk Profile
                </span>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Vehicle risk score
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tabular-nums">22</span>
                  <span className="text-sm text-slate-400">/ 100 (low risk)</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300" style={{ width: "22%" }} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
                {[
                  { label: "Vehicle age", value: "Optimal" },
                  { label: "City claim density", value: "Below average" },
                  { label: "Usage risk", value: "Low (city commute)" },
                  { label: "Theft risk", value: "Low" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{r.label}</span>
                    <span className="font-semibold text-white">{r.value}</span>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Garage Network</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    4,217 cashless garages within 25km of your location.
                  </p>
                </div>
              </div>
            </SoftCard>
          </aside>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("hero-motor")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <Button
            onClick={() => navigate("recommendations")}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6"
          >
            Get AI Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingVehiclePage;
