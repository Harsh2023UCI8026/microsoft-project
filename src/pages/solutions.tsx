"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, CtaBand } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Activity,
  Heart,
  Building2,
  Users,
  Briefcase,
} from "lucide-react";

export function SolutionsPage() {
  const { navigate } = useRouter();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
        <div className="absolute inset-0 bg-dots-slate opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Solutions
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto">
            AI underwriting for every insurance decision-maker.
          </h1>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're an individual protecting your family, a broker advising clients,
            or an insurer pricing risk — InsurIntel AI gives you the intelligence layer to
            decide with confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {SOLUTIONS.map((s) => (
            <SoftCard key={s.title} interactive className="flex flex-col gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.toneBg} ${s.toneText}`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              <ul className="space-y-1.5 mt-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate(s.route as any)}
                variant="outline"
                size="sm"
                className="mt-auto"
              >
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </SoftCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <CtaBand
          title="Find the right solution for your role."
          subtitle="Book a free consultation with our team to see how InsurIntel AI fits your workflow."
          primary={{ label: "Get Started", onClick: () => navigate("onboarding") }}
          secondary={{ label: "Browse Policies", onClick: () => navigate("policies") }}
        />
      </section>
    </div>
  );
}

const SOLUTIONS = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "For Individuals & Families",
    description: "Find the right policy, decode the fine print, and protect what matters most with AI-tailored coverage.",
    features: ["Family Vault dashboard", "3-min onboarding wizard", "AI recommendations", "Claim simulator"],
    route: "family-vault",
    toneBg: "bg-rose-50",
    toneText: "text-rose-600",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "For Brokers & Advisors",
    description: "Explain complex policies to clients in seconds. Close more deals with AI-backed transparency.",
    features: ["Bulk policy analysis", "Client-ready reports", "White-label dashboard", "Commission tracking"],
    route: "policies",
    toneBg: "bg-blue-50",
    toneText: "text-blue-600",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "For Insurers & Underwriters",
    description: "Augment underwriting decisions with neural risk scoring trained on 4M+ policies and 1.8M claims.",
    features: ["Risk engine API", "Custom model training", "Regulatory compliance", "Real-time scoring"],
    route: "risk-engine",
    toneBg: "bg-emerald-50",
    toneText: "text-emerald-600",
  },
];
