"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, StepStepper } from "@/components/site-primitives";
import {
  Heart,
  Car,
  ShieldCheck,
  Home as HomeIcon,
  Plane,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Brain,
} from "lucide-react";

const STEPS = [
  { label: "Coverage", sub: "What are we protecting?" },
  { label: "Risk Profile", sub: "Tell us about you" },
  { label: "Profile", sub: "Medical & financial" },
];

const VERTICALS = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health Insurance",
    description: "Cashless hospital coverage, family floater, critical illness riders.",
    route: "hero-health" as const,
    color: "from-rose-50 to-pink-100",
    accent: "rose",
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Motor Insurance",
    description: "Comprehensive, third-party, zero-dep with AI-tuned IDV.",
    route: "hero-motor" as const,
    color: "from-blue-50 to-sky-100",
    accent: "blue",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Life Insurance",
    description: "Term, whole life, ULIP — analyzed for hidden surrender charges.",
    route: "hero-family" as const,
    color: "from-emerald-50 to-teal-100",
    accent: "emerald",
  },
  {
    icon: <HomeIcon className="h-6 w-6" />,
    title: "Home Insurance",
    description: "Structure, contents, earthquake & flood riders.",
    route: "hero-family" as const,
    color: "from-amber-50 to-yellow-100",
    accent: "amber",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Travel Insurance",
    description: "Trip cancellation, medical emergencies, baggage loss.",
    route: "hero-motor" as const,
    color: "from-violet-50 to-purple-100",
    accent: "violet",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Business Insurance",
    description: "Liability, property, D&O underwriting tailored to your industry.",
    route: "policies" as const,
    color: "from-slate-100 to-slate-200",
    accent: "slate",
  },
];

export function OnboardingStep1Page() {
  const { navigate } = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Stepper */}
        <div className="mb-10">
          <StepStepper steps={STEPS} current={0} />
        </div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Step 1 of 3
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            What are we protecting today?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Pick the insurance vertical you want to explore. Our AI will tailor its
            analysis, recommendations, and claim simulations to your specific needs.
          </p>
        </div>

        {/* Verticals grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALS.map((v) => {
            const active = selected === v.title;
            return (
              <button
                key={v.title}
                onClick={() => setSelected(v.title)}
                className={`relative text-left rounded-2xl border-2 bg-white p-5 transition-all ${
                  active
                    ? "border-blue-600 shadow-soft-md -translate-y-0.5"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-soft"
                }`}
              >
                {active && (
                  <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-slate-700`}>
                  {v.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{v.description}</p>
              </button>
            );
          })}
        </div>

        {/* Selected summary + AI insight preview */}
        {selected && (
          <div className="mt-6 animate-fade-in-up">
            <SoftCard className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                    AI Insight Preview
                  </div>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    Based on what you've shared so far, our AI is preparing to scan over
                    4,200 {selected.toLowerCase()} plans and 1.8M historical claims to find
                    your top matches. Continue to step 2 to share your risk profile.
                  </p>
                </div>
              </div>
            </SoftCard>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Back to home
          </button>
          <Button
            onClick={() => navigate("onboarding-risk")}
            disabled={!selected}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Risk Profile
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Trust band */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Bank-grade encryption
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Takes less than 3 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingStep1Page;
