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
  User,
  ShieldCheck,
  Heart,
  Car,
  Home as HomeIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Settings,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  Award,
  CheckCircle2,
} from "lucide-react";

export function AboutPage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <User className="h-3.5 w-3.5" />
              My Profile
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              About Arjun Mehta
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Your InsurIntel AI profile, risk score, and account settings.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Edit3 className="h-3.5 w-3.5" /> Edit profile
          </Button>
        </div>

        {/* Profile hero */}
        <SoftCard padding="lg" className="mb-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-center">
            {/* Avatar + score */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-3xl font-bold shadow-soft-lg">
                  AM
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-soft">
                  <Award className="h-4 w-4 text-amber-500" />
                </span>
              </div>
              <div className="mt-4 text-center">
                <ProgressRing
                  value={87}
                  size={120}
                  color="#2563eb"
                  label={<span className="text-2xl font-bold text-slate-900">87</span>}
                  sublabel={<span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Score</span>}
                />
              </div>
            </div>

            {/* Profile details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill variant="green">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </Pill>
                <Pill variant="blue">Premium member</Pill>
                <Pill variant="amber">Top 12%</Pill>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Arjun Mehta</h2>
              <p className="text-sm text-slate-500">Family of 4 · Bengaluru, India</p>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <Mail className="h-3.5 w-3.5" />, label: "Email", value: "arjun.mehta@email.com" },
                  { icon: <Phone className="h-3.5 w-3.5" />, label: "Phone", value: "+91 98765 43210" },
                  { icon: <MapPin className="h-3.5 w-3.5" />, label: "Location", value: "Bengaluru, KA 560001" },
                  { icon: <Calendar className="h-3.5 w-3.5" />, label: "Member since", value: "March 2024" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 ring-1 ring-slate-100">
                    <span className="text-slate-400">{d.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{d.label}</div>
                      <div className="text-xs font-semibold text-slate-900 truncate">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => navigate("onboarding-risk")} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="h-3.5 w-3.5" /> Improve my score
                </Button>
                <Button onClick={() => navigate("recommendations")} size="sm" variant="outline">
                  <Sparkles className="h-3.5 w-3.5" /> My recommendations
                </Button>
              </div>
            </div>
          </div>
        </SoftCard>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* Active policies */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Active Policies</h2>
                  <p className="text-xs text-slate-500">3 policies · ₹1.2 Cr total sum insured</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("policies")}>
                  <Sparkles className="h-3.5 w-3.5" /> Add policy
                </Button>
              </div>
              <div className="space-y-2">
                {POLICIES.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.toneBg} ${p.toneText}`}>
                      {p.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.insurer} · {p.sumInsured}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">₹{p.premium.toLocaleString("en-IN")}</div>
                      <div className="text-[10px] text-slate-500">/ yr</div>
                    </div>
                    <Pill variant={p.statusVariant as any}>{p.status}</Pill>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Activity timeline */}
            <SoftCard>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
                  <p className="text-xs text-slate-500">Last 30 days on InsurIntel AI</p>
                </div>
                <Pill variant="blue">14 events</Pill>
              </div>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${a.toneBg} ${a.toneText}`}>
                        {a.icon}
                      </div>
                      {i < ACTIVITY.length - 1 && <div className="w-0.5 h-8 bg-slate-100 mt-1" />}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                      <p className="text-xs text-slate-500 mt-0.5">{a.description}</p>
                      <div className="mt-1 text-[10px] text-slate-400">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Account settings */}
            <SoftCard>
              <h2 className="text-base font-semibold text-slate-900 mb-4">Account Settings</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {SETTINGS_ITEMS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => s.route && navigate(s.route as any)}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-blue-300 hover:shadow-soft transition-all"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                      {s.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{s.label}</div>
                      <div className="text-[11px] text-slate-500">{s.description}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </SoftCard>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Achievements */}
            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Achievements</h3>
              <div className="space-y-2">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.label} className={`flex items-center gap-3 rounded-lg p-2.5 ${a.unlocked ? "bg-blue-50" : "bg-slate-50"}`}>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full ${a.unlocked ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-400"}`}>
                      {a.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${a.unlocked ? "text-slate-900" : "text-slate-500"}`}>{a.label}</div>
                      <div className="text-[10px] text-slate-500">{a.detail}</div>
                    </div>
                    {a.unlocked && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Stats summary */}
            <SoftCard>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick stats</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Policies analyzed</span>
                  <span className="font-semibold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Claims simulated</span>
                  <span className="font-semibold text-slate-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">AI chats</span>
                  <span className="font-semibold text-slate-900">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Red flags found</span>
                  <span className="font-semibold text-rose-600">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Money saved</span>
                  <span className="font-semibold text-emerald-600">₹84,200</span>
                </div>
              </div>
            </SoftCard>

            {/* Logout */}
            <Button
              onClick={() => navigate("login")}
              variant="outline"
              className="w-full rounded-xl h-10 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

const POLICIES = [
  {
    icon: <Heart className="h-5 w-5" />,
    name: "Health Shield Pro Plus",
    insurer: "SecureLife Health",
    sumInsured: "₹10L family floater",
    premium: 18400,
    status: "Active",
    statusVariant: "green",
    toneBg: "bg-rose-50",
    toneText: "text-rose-600",
  },
  {
    icon: <Car className="h-5 w-5" />,
    name: "Motor Comprehensive",
    insurer: "HDFC ERGO",
    sumInsured: "₹6.8L IDV",
    premium: 12400,
    status: "Active",
    statusVariant: "green",
    toneBg: "bg-blue-50",
    toneText: "text-blue-600",
  },
  {
    icon: <HomeIcon className="h-5 w-5" />,
    name: "Home Shield",
    insurer: "ICICI Lombard",
    sumInsured: "₹15L structure + contents",
    premium: 8200,
    status: "Renews soon",
    statusVariant: "amber",
    toneBg: "bg-amber-50",
    toneText: "text-amber-600",
  },
];

const ACTIVITY = [
  {
    icon: <Sparkles className="h-3.5 w-3.5" />,
    title: "AI recommendation accepted",
    description: "Switched to Health Shield Pro Plus — saved ₹4,840/yr",
    time: "2 hours ago",
    toneBg: "bg-blue-100",
    toneText: "text-blue-700",
  },
  {
    icon: <Activity className="h-3.5 w-3.5" />,
    title: "Claim simulated",
    description: "Hospitalization scenario · 94% approval probability",
    time: "1 day ago",
    toneBg: "bg-emerald-100",
    toneText: "text-emerald-700",
  },
  {
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    title: "Policy PDF inspected",
    description: "Health Shield Pro Plus · 47 clauses · 3 red flags",
    time: "3 days ago",
    toneBg: "bg-amber-100",
    toneText: "text-amber-700",
  },
  {
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    title: "Risk score updated",
    description: "Increased from 82 to 87 (top 12%)",
    time: "5 days ago",
    toneBg: "bg-blue-100",
    toneText: "text-blue-700",
  },
  {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    title: "Family member added",
    description: "Meera (9) added to family floater",
    time: "1 week ago",
    toneBg: "bg-emerald-100",
    toneText: "text-emerald-700",
  },
];

const SETTINGS_ITEMS = [
  { icon: <Bell className="h-4 w-4" />, label: "Notifications", description: "Manage email & push alerts", route: "about" },
  { icon: <Lock className="h-4 w-4" />, label: "Security", description: "2FA, password, sessions", route: "login" },
  { icon: <CreditCard className="h-4 w-4" />, label: "Billing", description: "Payment methods & invoices", route: "pricing" },
  { icon: <Settings className="h-4 w-4" />, label: "Preferences", description: "Language, currency, theme", route: "about" },
];

const ACHIEVEMENTS = [
  { icon: <Award className="h-4 w-4" />, label: "Smart Saver", detail: "Saved ₹50K+ via AI recs", unlocked: true },
  { icon: <ShieldCheck className="h-4 w-4" />, label: "Policy Detective", detail: "Found 5+ red flags", unlocked: true },
  { icon: <Sparkles className="h-4 w-4" />, label: "AI Power User", detail: "50+ AI chats", unlocked: true },
  { icon: <TrendingUp className="h-4 w-4" />, label: "Risk Master", detail: "Score 90+", unlocked: false },
];
