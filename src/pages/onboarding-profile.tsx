"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, StepStepper } from "@/components/site-primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Wallet,
  MapPin,
  Lock,
  CheckCircle2,
  Sparkles,
  Activity,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const STEPS = [
  { label: "Coverage", sub: "What are we protecting?" },
  { label: "Risk Profile", sub: "Tell us about you" },
  { label: "Profile", sub: "Medical & financial" },
];

export function OnboardingProfilePage() {
  const { navigate } = useRouter();
  const [budget, setBudget] = React.useState(25000);
  const [city, setCity] = React.useState("");
  const [conditions, setConditions] = React.useState<string[]>([]);
  const [familyHistory, setFamilyHistory] = React.useState("");

  const toggleCondition = (c: string) => {
    setConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const conditionsList = [
    { id: "diabetes", label: "Diabetes", risk: "high" },
    { id: "hypertension", label: "Hypertension", risk: "high" },
    { id: "heart", label: "Heart condition", risk: "high" },
    { id: "asthma", label: "Asthma", risk: "medium" },
    { id: "thyroid", label: "Thyroid", risk: "low" },
    { id: "none", label: "None of the above", risk: "none" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header bar — special variant for last step */}
        <SoftCard className="mb-6 flex items-center justify-between" padding="md">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">Profile: Complete</div>
              <div className="text-xs text-slate-500">Just a few more details — then you're done.</div>
            </div>
          </div>
          <button className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Save Progress
          </button>
        </SoftCard>

        <div className="mb-10">
          <StepStepper steps={STEPS} current={2} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Step 3 of 3 · Final
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Medical & Financial Profile
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            One last step. Share your health history and budget so our AI can match you
            with the most suitable policies from our network.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Form */}
          <div className="space-y-6">
            {/* Health information */}
            <SoftCard padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-4 w-4 text-rose-600" />
                <h2 className="text-sm font-semibold text-slate-900">Health Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">
                    Pre-existing conditions
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {conditionsList.map((c) => {
                      const active = conditions.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleCondition(c.id)}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                            active
                              ? c.risk === "high"
                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                : c.risk === "medium"
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : c.risk === "low"
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {c.label}
                          {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="fh" className="text-xs font-medium text-slate-600">
                    Family medical history
                  </Label>
                  <Textarea
                    id="fh"
                    value={familyHistory}
                    onChange={(e) => setFamilyHistory(e.target.value)}
                    placeholder="e.g. Father had heart disease; mother has type-2 diabetes..."
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-xs font-medium text-slate-600">
                      Height (cm)
                    </Label>
                    <Input id="height" type="number" placeholder="175" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-xs font-medium text-slate-600">
                      Weight (kg)
                    </Label>
                    <Input id="weight" type="number" placeholder="72" className="mt-1" />
                  </div>
                </div>
              </div>
            </SoftCard>

            {/* Budget & location */}
            <SoftCard padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-slate-900">Budget & Location</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs font-medium text-slate-600">
                      Annual premium budget
                    </Label>
                    <span className="text-sm font-bold tabular-nums text-blue-700">
                      ₹{budget.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full"
                    style={{ ["--val" as string]: `${((budget - 5000) / 95000) * 100}%` }}
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    <span>₹5,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="city" className="text-xs font-medium text-slate-600">
                    City
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger id="city" className="mt-1">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi NCR</SelectItem>
                      <SelectItem value="bangalore">Bengaluru</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pincode" className="text-xs font-medium text-slate-600">
                      Pincode
                    </Label>
                    <Input id="pincode" placeholder="560001" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="income" className="text-xs font-medium text-slate-600">
                      Annual income (optional)
                    </Label>
                    <Input id="income" placeholder="₹12,00,000" className="mt-1" />
                  </div>
                </div>
              </div>
            </SoftCard>
          </div>

          {/* Sidebar — live analysis */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                    Live Analysis
                  </span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-blink-dot" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Policies matched
                </div>
                <div className="mt-1 text-3xl font-bold tabular-nums">42</div>
                <p className="mt-1 text-xs text-blue-100">
                  {conditions.length > 0
                    ? `${conditions.length} pre-existing conditions considered`
                    : "Considering your clean health history"}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Premium range
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold">₹18,400</span>
                  <span className="text-xs text-blue-200">– ₹32,800 / yr</span>
                </div>
              </div>
            </SoftCard>

            {/* Coverage heatmap */}
            <SoftCard>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Coverage Heatmap
                </div>
                <Pill variant="blue">Live</Pill>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => {
                  const intensity = (Math.sin(i * 0.7) + 1) / 2;
                  const opacity = 0.2 + intensity * 0.7;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={{
                        background:
                          intensity > 0.7
                            ? `rgba(37, 99, 235, ${opacity})`
                            : intensity > 0.4
                            ? `rgba(96, 165, 250, ${opacity})`
                            : "rgba(226, 232, 240, 0.5)",
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>Lower risk</span>
                <span>Higher risk</span>
              </div>
            </SoftCard>

            {/* Security badge */}
            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Secure Underwriting</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Your health data is HIPAA-compliant and never shared with insurers
                    without your explicit consent.
                  </p>
                </div>
              </div>
            </SoftCard>
          </aside>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("onboarding-risk")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <Button
            onClick={() => navigate("recommendations")}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6"
          >
            Get My Recommendations
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
