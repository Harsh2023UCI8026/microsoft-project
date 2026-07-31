"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill, CtaBand } from "@/components/site-primitives";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Gauge,
  Brain,
  Heart,
  Car,
  Home as HomeIcon,
  Building2,
  Plane,
  Activity,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
  Target,
} from "lucide-react";

export function HomePage() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="absolute inset-0 bg-dots-slate opacity-60" aria-hidden />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" aria-hidden />
        <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Left: copy */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Insurance
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.07]">
                Make Smarter Insurance Decisions with{" "}
                <span className="text-blue-600">AI</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Compare policies, understand hidden clauses, inspect policy PDFs,
                simulate claims, and confidently choose the right insurance — all
                in one platform.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => navigate("onboarding")}
                  size="lg"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-glow-brand h-12 px-6"
                >
                  Get Personalized Recommendation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => navigate("policies")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                >
                  Browse Policies
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
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
                  98.4% underwriting accuracy
                </div>
              </div>
            </div>

            {/* Right: dashboard mock */}
            <div className="relative animate-fade-in" style={{ animationDelay: "120ms" }}>
              <DashboardMock />
            </div>
          </div>

          {/* Logomark strip */}
          <div className="mt-16 sm:mt-20 border-t border-slate-200/70 pt-8">
            <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Trusted by leading underwriters and brokers
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
              {["Allianz", "AXA", "Liberty", "Zurich", "HDFC Life", "Berkshire", "AIG"].map((b) => (
                <span key={b} className="text-base font-bold text-slate-500 tracking-tight">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verticals grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Precision Intelligence for Every Vertical
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Specialized AI models trained on millions of policies, claims, and
              underwriting decisions for each insurance vertical.
            </p>
          </div>
          <button
            onClick={() => navigate("policies")}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
          >
            View all sectors <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERTICALS.map((v, i) => (
            <VerticalCard key={v.title} {...v} delay={i * 60} onClick={() => navigate(v.route)} />
          ))}
        </div>
      </section>

      {/* AI Precision Advantage — blue feature band */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Experience the AI Precision Advantage
              </h2>
              <div className="mt-8 space-y-6">
                <Feature
                  icon={<FileSearch className="h-5 w-5" />}
                  title="Real-time Risk Analysis"
                  description="Neural models analyze every clause in your policy in seconds, surfacing hidden exclusions, sub-limits, and renewal traps."
                />
                <Feature
                  icon={<Activity className="h-5 w-5" />}
                  title="Claim Simulations"
                  description="Before you buy, simulate the claims you're most likely to file. See approval probabilities and out-of-pocket exposure in real time."
                />
                <Feature
                  icon={<Brain className="h-5 w-5" />}
                  title="Underwriting Intelligence"
                  description="Your risk profile is matched against 4M+ historical policies to find the strategies that fit your specific situation."
                />
              </div>
            </div>

            {/* Benchmark card */}
            <div className="lg:pl-6">
              <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl ring-1 ring-white/15 p-6 shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-blink-dot" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                    Live Benchmarking
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "Manual Review Time", ai: "12 seconds", old: "3 days", trend: "down" },
                    { label: "InsurIntel AI Analysis", ai: "98.4% accuracy", old: "62% (manual)", trend: "up" },
                    { label: "Cost Savings (Avg)", ai: "32% / year", old: "—", trend: "up" },
                    { label: "Hidden Clauses Detected", ai: "47 / policy", old: "8 (manual)", trend: "up" },
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-100">{row.label}</span>
                        {row.trend === "up" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-300">
                            <TrendingUp className="h-3 w-3" /> improved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-300">
                            <Clock className="h-3 w-3" /> reduced
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className="text-xl font-bold tabular-nums text-white">{row.ai}</span>
                        {row.old !== "—" && (
                          <span className="text-xs text-blue-200 line-through">{row.old}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("inspector")}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  Try AI Policy Inspector
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Pill variant="blue" className="mx-auto">How it works</Pill>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            From questions to coverage in four steps
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Our AI takes you from "which policy should I buy?" to a confident
            underwriting decision in minutes — not weeks.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKFLOW.map((s, i) => (
            <SoftCard key={s.title} interactive className="relative">
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold shadow-glow-brand">
                {i + 1}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {s.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{s.description}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "4M+", label: "Policies analyzed" },
              { value: "98.4%", label: "Underwriting accuracy" },
              { value: "32%", label: "Average annual savings" },
              { value: "12s", label: "Median analysis time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold tabular-nums text-blue-700">
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Pill variant="blue" className="mx-auto">Customer stories</Pill>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Built for people who hate reading the fine print
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <SoftCard key={t.name} className="flex flex-col gap-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 1l2.6 5.9 6.4.5-4.9 4.2 1.5 6.3L10 14.8l-5.6 3.1 1.5-6.3L1.4 7.4l6.4-.5L10 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 text-xs font-bold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <CtaBand
          title="Ready to underwrite with precision?"
          subtitle="Start your free assessment and let our AI find the right policy for your exact risk profile — in under 3 minutes."
          primary={{ label: "Get Started Free", onClick: () => navigate("onboarding") }}
          secondary={{ label: "Browse Policies", onClick: () => navigate("policies") }}
        />
      </section>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="relative">
      {/* Browser window */}
      <div className="relative rounded-2xl bg-white shadow-soft-lg ring-1 ring-slate-200 overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-[11px] text-slate-400 font-medium">
            app.insurintel.ai/analyze
          </span>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          <div className="col-span-2 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Policy Analysis
              </div>
              <div className="text-sm font-bold text-slate-900">
                Health Shield Pro Plus
              </div>
            </div>
            <Pill variant="green">
              <CheckCircle2 className="h-3 w-3" /> Analyzed
            </Pill>
          </div>

          {/* Mini stat cards */}
          <MiniStat label="Transparency" value="92%" tone="green" />
          <MiniStat label="Risk Score" value="Low" tone="blue" />
          <MiniStat label="Hidden Clauses" value="3" tone="amber" />
          <MiniStat label="Claim Approval" value="94%" tone="green" />

          {/* Chart */}
          <div className="col-span-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-slate-700">Coverage vs Premium</div>
              <span className="text-[10px] text-slate-400">last 6 months</span>
            </div>
            <MiniBarChart />
          </div>
        </div>
      </div>

      {/* Floating card */}
      <div className="absolute -bottom-6 -left-6 sm:-left-10 rotate-[-3deg] rounded-2xl bg-white p-4 shadow-soft-lg ring-1 ring-slate-200 w-44 hidden sm:block animate-float-slow">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Target className="h-4.5 w-4.5" />
          </span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Underwriting Score
            </div>
            <div className="text-base font-bold text-slate-900">
              98.4% <span className="text-xs font-medium text-slate-500">Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chip */}
      <div className="absolute -top-4 -right-4 rotate-[5deg] rounded-full bg-white px-3 py-1.5 shadow-soft-md ring-1 ring-slate-200 hidden sm:flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink-dot" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Live Neural Analysis
        </span>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: "green" | "blue" | "amber" | "red" }) {
  const tones: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    red: "bg-rose-50 text-rose-700 ring-rose-100",
  };
  return (
    <div className={`rounded-xl p-3 ring-1 ${tones[tone]}`}>
      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-1 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}

function MiniBarChart() {
  const bars = [42, 58, 49, 67, 72, 88];
  return (
    <div className="flex items-end gap-2 h-20">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400"
              style={{ height: `${b}%` }}
            />
          </div>
          <span className="text-[9px] text-slate-400">{i + 1}M</span>
        </div>
      ))}
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 text-blue-200">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-blue-100/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function VerticalCard({
  title,
  description,
  icon,
  illustration,
  delay,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
  delay: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-4 cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-soft p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md hover:border-slate-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-36 rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center overflow-hidden">
        {illustration}
      </div>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Explore
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

const VERTICALS = [
  {
    title: "Health Insurance",
    description: "Compare cashless hospital networks, sub-limits, and hidden co-pays across plans in seconds.",
    icon: <Heart className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="health" />,
    route: "hero-health" as const,
  },
  {
    title: "Motor Insurance",
    description: "Premium coverage for your vehicle with AI-tuned IDV, depreciation, and zero-bonus protection.",
    icon: <Car className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="motor" />,
    route: "hero-motor" as const,
  },
  {
    title: "Life Insurance",
    description: "Term, whole, and ULIP plans analyzed for hidden surrender charges and commission loads.",
    icon: <HomeIcon className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="life" />,
    route: "hero-family" as const,
  },
  {
    title: "Home Insurance",
    description: "Structural and content coverage with earthquake and flood riders intelligently matched.",
    icon: <Building2 className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="home" />,
    route: "hero-family" as const,
  },
  {
    title: "Travel Insurance",
    description: "Trip cancellations, medical emergencies, and baggage delays decoded with claim precedents.",
    icon: <Plane className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="travel" />,
    route: "hero-motor" as const,
  },
  {
    title: "Business Insurance",
    description: "Liability, property, and D&O underwriting tailored to your industry's claim patterns.",
    icon: <ShieldCheck className="h-5 w-5" />,
    illustration: <VerticalIllustration variant="business" />,
    route: "policies" as const,
  },
];

const WORKFLOW = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Tell us about you",
    description: "Our 3-step onboarding captures your risk profile, budget, and coverage goals in under 3 minutes.",
  },
  {
    icon: <FileSearch className="h-5 w-5" />,
    title: "AI analyzes policies",
    description: "Neural models scan every clause, sub-limit, and exclusion across thousands of plans in seconds.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Simulate your claims",
    description: "See approval probabilities and out-of-pocket costs for the claims you're most likely to file.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Decide with confidence",
    description: "Get a personalized underwriting score and AI-curated recommendations to confidently choose.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "InsurIntel AI found three hidden sub-limits in my health policy that my broker never mentioned. I switched and saved 28% on premiums with better coverage.",
    name: "Anita Sharma",
    role: "Mother of two, Bengaluru",
  },
  {
    quote:
      "The claim simulator showed me my motor policy would only pay 60% on a total loss. I negotiated the IDV up before signing — that's real money saved.",
    name: "Rajesh Kumar",
    role: "Founder, Gurgaon",
  },
  {
    quote:
      "As a broker, the AI Policy Inspector lets me explain complex clauses to clients in seconds. My close rate is up 40%.",
    name: "Priya Menon",
    role: "Independent Insurance Broker",
  },
];

function VerticalIllustration({ variant }: { variant: "health" | "motor" | "life" | "home" | "travel" | "business" }) {
  // Stylized 3D-shape illustrations as SVG with gradients
  const grad = (id: string, c1: string, c2: string) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </linearGradient>
    </defs>
  );
  switch (variant) {
    case "health":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("hg", "#bfdbfe", "#3b82f6")}
          <circle cx="100" cy="55" r="38" fill="url(#hg)" opacity="0.45" />
          <path d="M88 55 h8 v-10 h8 v10 h8 v8 h-8 v10 h-8 v-10 h-8 z" fill="#fff" opacity="0.95" />
          <rect x="60" y="80" width="80" height="14" rx="4" fill="#fff" opacity="0.8" />
          <circle cx="60" cy="40" r="5" fill="#fff" opacity="0.7" />
          <circle cx="140" cy="35" r="3" fill="#fff" opacity="0.7" />
        </svg>
      );
    case "motor":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("mg", "#bfdbfe", "#3b82f6")}
          <ellipse cx="100" cy="80" rx="55" ry="10" fill="#1d4ed8" opacity="0.15" />
          <path d="M55 75 q5 -22 25 -25 h40 q20 3 25 25 l5 5 h-100 z" fill="url(#mg)" opacity="0.85" />
          <rect x="75" y="55" width="50" height="18" rx="6" fill="#fff" opacity="0.85" />
          <circle cx="75" cy="80" r="10" fill="#1e293b" />
          <circle cx="125" cy="80" r="10" fill="#1e293b" />
          <circle cx="75" cy="80" r="4" fill="#94a3b8" />
          <circle cx="125" cy="80" r="4" fill="#94a3b8" />
        </svg>
      );
    case "life":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("lg", "#bfdbfe", "#3b82f6")}
          <path d="M100 30 c-12 -12 -32 -8 -32 8 c0 14 18 22 32 32 c14 -10 32 -18 32 -32 c0 -16 -20 -20 -32 -8 z" fill="url(#lg)" opacity="0.9" />
          <circle cx="100" cy="55" r="6" fill="#fff" opacity="0.9" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("hog", "#bfdbfe", "#3b82f6")}
          <path d="M60 75 v-22 l40 -22 40 22 v22 z" fill="url(#hog)" opacity="0.9" />
          <rect x="92" y="60" width="16" height="20" fill="#fff" opacity="0.85" />
          <rect x="68" y="55" width="14" height="10" fill="#fff" opacity="0.7" />
          <rect x="118" y="55" width="14" height="10" fill="#fff" opacity="0.7" />
        </svg>
      );
    case "travel":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("tg", "#bfdbfe", "#3b82f6")}
          <path d="M40 70 l80 -30 l8 4 l-30 22 l-12 30 l-8 -4 l4 -22 l-30 8 l-10 -6 z" fill="url(#tg)" opacity="0.9" />
        </svg>
      );
    case "business":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full p-3">
          {grad("bg2", "#bfdbfe", "#3b82f6")}
          <rect x="55" y="40" width="20" height="50" fill="url(#bg2)" opacity="0.85" />
          <rect x="80" y="30" width="20" height="60" fill="url(#bg2)" opacity="0.85" />
          <rect x="105" y="50" width="20" height="40" fill="url(#bg2)" opacity="0.85" />
          <rect x="130" y="60" width="20" height="30" fill="url(#bg2)" opacity="0.85" />
        </svg>
      );
  }
}
