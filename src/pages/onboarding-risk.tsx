"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, StepStepper, StatBlock } from "@/components/site-primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
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
  Brain,
  TrendingUp,
  ShieldCheck,
  Activity,
  User,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { label: "Coverage", sub: "What are we protecting?" },
  { label: "Risk Profile", sub: "Tell us about you" },
  { label: "Profile", sub: "Medical & financial" },
];

export function OnboardingRiskPage() {
  const { navigate } = useRouter();
  const [age, setAge] = React.useState("32");
  const [gender, setGender] = React.useState("male");
  const [occupation, setOccupation] = React.useState("");
  const [smoker, setSmoker] = React.useState("no");
  const [exercise, setExercise] = React.useState("moderate");
  const [sleep, setSleep] = React.useState("7-8");
  const [stress, setStress] = React.useState("moderate");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-10">
          <StepStepper steps={STEPS} current={1} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Step 2 of 3
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Risk Assessment Profile
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Help our AI understand your lifestyle and habits. The more we know, the more
            precise your underwriting score becomes — and the better your recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Form */}
          <SoftCard padding="lg">
            <div className="space-y-6">
              {/* Personal section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-900">Personal information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-xs font-medium text-slate-600">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-slate-600">Gender</Label>
                    <RadioGroup
                      value={gender}
                      onValueChange={setGender}
                      className="mt-2 flex gap-4"
                    >
                      {[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ].map((g) => (
                        <div key={g.value} className="flex items-center gap-2">
                          <RadioGroupItem id={`g-${g.value}`} value={g.value} />
                          <Label htmlFor={`g-${g.value}`} className="text-sm font-normal cursor-pointer">
                            {g.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="occ" className="text-xs font-medium text-slate-600">
                      Occupation
                    </Label>
                    <Select value={occupation} onValueChange={setOccupation}>
                      <SelectTrigger id="occ" className="mt-1">
                        <SelectValue placeholder="Select your occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology / Software</SelectItem>
                        <SelectItem value="finance">Finance / Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail / Services</SelectItem>
                        <SelectItem value="freelance">Freelance / Self-employed</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-900">Lifestyle habits</h2>
                </div>
                <div className="space-y-4">
                  <ChoiceRow
                    label="Do you smoke or use tobacco?"
                    value={smoker}
                    onChange={setSmoker}
                    options={[
                      { value: "no", label: "Never", tone: "green" },
                      { value: "occasional", label: "Occasionally", tone: "amber" },
                      { value: "yes", label: "Regularly", tone: "red" },
                    ]}
                  />
                  <ChoiceRow
                    label="How often do you exercise?"
                    value={exercise}
                    onChange={setExercise}
                    options={[
                      { value: "rarely", label: "Rarely", tone: "red" },
                      { value: "moderate", label: "1-3x/week", tone: "amber" },
                      { value: "active", label: "4-6x/week", tone: "green" },
                    ]}
                  />
                  <ChoiceRow
                    label="Average sleep per night?"
                    value={sleep}
                    onChange={setSleep}
                    options={[
                      { value: "5-", label: "Less than 6h", tone: "red" },
                      { value: "7-8", label: "7-8 hours", tone: "green" },
                      { value: "9+", label: "9+ hours", tone: "amber" },
                    ]}
                  />
                  <ChoiceRow
                    label="How would you rate your stress levels?"
                    value={stress}
                    onChange={setStress}
                    options={[
                      { value: "low", label: "Low", tone: "green" },
                      { value: "moderate", label: "Moderate", tone: "amber" },
                      { value: "high", label: "High", tone: "red" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </SoftCard>

          {/* Sidebar — AI insights */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <SoftCard className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                  Live AI Analysis
                </span>
              </div>
              <div className="mt-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Underwriting Score
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tabular-nums">87</span>
                  <span className="text-sm text-blue-200">/ 100</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400" style={{ width: "87%" }} />
                </div>
                <p className="mt-3 text-xs text-blue-100 leading-relaxed">
                  Low-risk profile detected. Premiums will likely fall in the
                  lowest 25% percentile for your age band.
                </p>
              </div>
            </SoftCard>

            <SoftCard>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Risk Breakdown
              </div>
              <div className="space-y-3">
                {[
                  { label: "Age factor", score: 92, tone: "green" },
                  { label: "Lifestyle", score: 85, tone: "green" },
                  { label: "Occupation risk", score: 78, tone: "amber" },
                  { label: "Stress index", score: 81, tone: "green" },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="text-slate-600">{r.label}</span>
                      <span className="font-semibold text-slate-900 tabular-nums">{r.score}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          r.tone === "green" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Bank-grade encryption</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Your data is encrypted in transit and at rest. We never sell it to
                    insurers.
                  </p>
                </div>
              </div>
            </SoftCard>
          </aside>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("onboarding")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <Button
            onClick={() => navigate("onboarding-profile")}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6"
          >
            Continue to Profile
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChoiceRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; tone: "green" | "amber" | "red" }[];
}) {
  const toneCls = (t: string) =>
    t === "green"
      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
      : t === "amber"
      ? "border-amber-500 bg-amber-50 text-amber-700"
      : "border-rose-500 bg-rose-50 text-rose-700";
  return (
    <div>
      <div className="text-xs font-medium text-slate-600 mb-2">{label}</div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              value === o.value
                ? toneCls(o.tone)
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
