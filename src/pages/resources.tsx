"use client";

import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill } from "@/components/site-primitives";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Sparkles,
  TrendingUp,
  Heart,
  Car,
  Home as HomeIcon,
  Calculator,
  Search,
} from "lucide-react";

export function ResourcesPage() {
  const { navigate } = useRouter();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
        <div className="absolute inset-0 bg-dots-slate opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <BookOpen className="h-3.5 w-3.5" />
              Resources
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Learn the science of smart insurance.
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              Guides, calculators, video explainers, and case studies — everything you need
              to make confident underwriting decisions, written by our team of AI researchers
              and licensed brokers.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides, articles, calculators..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <SoftCard key={c.title} interactive className="flex flex-col gap-3 cursor-pointer" onClick={() => navigate(c.route as any)}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.toneBg} ${c.toneText}`}>
                {c.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
              <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">{c.count} articles</span>
                <span className="font-semibold text-blue-700 inline-flex items-center gap-1">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Featured articles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured guides</h2>
            <p className="mt-1 text-sm text-slate-500">Most-read this month</p>
          </div>
          <Button variant="outline" size="sm">View all</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ARTICLES.map((a) => (
            <SoftCard key={a.title} interactive padding="none" className="overflow-hidden flex flex-col">
              <div className={`relative h-40 ${a.toneBg}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 ${a.toneText}`}>
                    {a.icon}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Pill variant="blue">{a.category}</Pill>
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-medium text-white/90 bg-black/30 px-2 py-0.5 rounded-full">
                  {a.readTime} min read
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-base font-semibold text-slate-900 leading-snug">{a.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{a.excerpt}</p>
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{a.author}</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Pill variant="blue" className="mx-auto">Calculators</Pill>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Free AI-powered calculators
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              No signup required. Get instant answers powered by our 4M+ policy knowledge base.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CALCULATORS.map((c) => (
              <SoftCard key={c.title} interactive className="flex flex-col gap-3 cursor-pointer" onClick={() => navigate(c.route as any)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {c.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{c.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
              </SoftCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-8 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
          <div className="relative max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Still have questions?
            </h3>
            <p className="mt-3 text-blue-100 leading-relaxed">
              Chat with our AI assistant 24/7, or talk to a licensed human broker during business hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("assistant")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-soft hover:bg-blue-50 transition-colors"
              >
                Ask AI Assistant
              </button>
              <button
                onClick={() => navigate("onboarding")}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Talk to a Broker
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResourcesPage;

const CATEGORIES = [
  { icon: <Heart className="h-5 w-5" />, title: "Health Insurance", description: "Plans, coverage, claims, and cashless networks", count: 42, route: "hero-health", toneBg: "bg-rose-50", toneText: "text-rose-600" },
  { icon: <Car className="h-5 w-5" />, title: "Motor Insurance", description: "IDV, depreciation, claims, and riders", count: 28, route: "hero-motor", toneBg: "bg-blue-50", toneText: "text-blue-600" },
  { icon: <HomeIcon className="h-5 w-5" />, title: "Life & Family", description: "Term plans, ULIPs, family floaters", count: 35, route: "hero-family", toneBg: "bg-emerald-50", toneText: "text-emerald-600" },
  { icon: <HelpCircle className="h-5 w-5" />, title: "AI Underwriting", description: "How our neural models work", count: 18, route: "risk-engine", toneBg: "bg-violet-50", toneText: "text-violet-600" },
];

const ARTICLES = [
  {
    title: "How to spot a hidden room-rent cap in your health policy",
    excerpt: "Most policyholders never read Clause 4.7. Here's why it can cost you ₹3L on a single hospitalization — and how to negotiate it out.",
    category: "Health",
    icon: <Heart className="h-7 w-7" />,
    toneBg: "bg-rose-100",
    toneText: "text-rose-600",
    author: "Dr. Suresh Patel",
    date: "Jul 2024",
    readTime: 8,
  },
  {
    title: "The 7 questions to ask before signing any motor policy",
    excerpt: "From IDV calculation to NCB protection, here's the broker's checklist for a fair motor insurance quote.",
    category: "Motor",
    icon: <Car className="h-7 w-7" />,
    toneBg: "bg-blue-100",
    toneText: "text-blue-600",
    author: "Rajesh Kumar",
    date: "Jul 2024",
    readTime: 6,
  },
  {
    title: "Term vs ULIP: which one actually wins for your family?",
    excerpt: "We modeled 1.8M policy outcomes to settle the term-vs-ULIP debate once and for all. The answer might surprise you.",
    category: "Life",
    icon: <TrendingUp className="h-7 w-7" />,
    toneBg: "bg-emerald-100",
    toneText: "text-emerald-600",
    author: "Anita Sharma",
    date: "Jun 2024",
    readTime: 12,
  },
];

const CALCULATORS = [
  { icon: <Calculator className="h-5 w-5" />, title: "Premium calculator", description: "Get an AI-tuned premium estimate in 2 minutes", route: "onboarding-vehicle" },
  { icon: <FileText className="h-5 w-5" />, title: "Policy inspector", description: "Upload your policy PDF for instant analysis", route: "inspector" },
  { icon: <Sparkles className="h-5 w-5" />, title: "AI recommendations", description: "See your top 7 matched insurance strategies", route: "recommendations" },
  { icon: <Video className="h-5 w-5" />, title: "Video tutorials", description: "Watch 2-min explainer videos for every feature", route: "hero-dashboard" },
];
