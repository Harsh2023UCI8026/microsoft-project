"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill } from "@/components/site-primitives";
import { Check, Sparkles, ArrowRight, ShieldCheck, Building2, Rocket } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    description: "For individuals exploring their first policy",
    priceMonthly: 0,
    priceYearly: 0,
    cta: "Start free",
    features: [
      "1 policy PDF inspection / month",
      "3 AI assistant chats / day",
      "Basic claim simulator",
      "Email support",
    ],
    highlighted: false,
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    name: "Family",
    description: "For families managing multiple policies",
    priceMonthly: 499,
    priceYearly: 4990,
    cta: "Start 14-day trial",
    features: [
      "Unlimited policy inspections",
      "Unlimited AI assistant chats",
      "Family Vault for 6 members",
      "Claim simulator with 50+ scenarios",
      "AI Policy Simplifier",
      "Priority email + chat support",
    ],
    highlighted: true,
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    name: "Broker",
    description: "For brokers and advisors managing clients",
    priceMonthly: 1999,
    priceYearly: 19990,
    cta: "Talk to sales",
    features: [
      "Everything in Family, plus:",
      "Bulk policy analysis (100/mo)",
      "Client-ready branded reports",
      "White-label dashboard",
      "API access (1000 calls/mo)",
      "Dedicated account manager",
    ],
    highlighted: false,
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    name: "Enterprise",
    description: "For insurers and large brokerages",
    priceMonthly: -1,
    priceYearly: -1,
    cta: "Contact sales",
    features: [
      "Everything in Broker, plus:",
      "Custom AI model training",
      "Unlimited API calls",
      "On-premise deployment option",
      "Regulatory compliance modules",
      "24/7 phone support + SLA",
    ],
    highlighted: false,
    icon: <Rocket className="h-5 w-5" />,
  },
];

export function PricingPage() {
  const { navigate } = useRouter();
  const [yearly, setYearly] = React.useState(true);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
        <div className="absolute inset-0 bg-dots-slate opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Simple pricing that scales with you.
          </h1>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Start free. Upgrade when you need more. Cancel anytime. Every plan includes
            access to the AI Policy Inspector and AI Underwriting Assistant.
          </p>

          {/* Billing toggle */}
          <div className="mt-7 inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${!yearly ? "bg-white text-blue-700 shadow-soft" : "text-slate-600"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${yearly ? "bg-white text-blue-700 shadow-soft" : "text-slate-600"
                }`}
            >
              Yearly
              <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((p) => (
            <SoftCard
              key={p.name}
              padding="lg"
              className={`flex flex-col gap-4 relative ${p.highlighted ? "ring-2 ring-blue-500 shadow-soft-lg" : ""
                }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                  <Sparkles className="h-3 w-3" /> Most popular
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.highlighted ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                  {p.icon}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
              <div>
                {p.priceMonthly === -1 ? (
                  <div className="text-3xl font-bold text-slate-900">Custom</div>
                ) : p.priceMonthly === 0 ? (
                  <div className="text-3xl font-bold text-slate-900">Free</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{(yearly ? p.priceYearly : p.priceMonthly).toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-500">/ {yearly ? "year" : "month"}</span>
                  </div>
                )}
              </div>
              <Button
                onClick={() => navigate("onboarding")}
                className={`w-full rounded-xl font-semibold h-10 ${p.highlighted ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                  }`}
                variant={p.highlighted ? "default" : "outline"}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </SoftCard>
          ))}
        </div>

        {/* Money-back guarantee */}
        <SoftCard className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">30-day money-back guarantee</h3>
                <p className="text-xs text-slate-600">
                  Try any paid plan risk-free for 30 days. Not happy? Get a full refund — no questions asked.
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("onboarding")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Start free trial
            </Button>
          </div>
        </SoftCard>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map((f) => (
              <SoftCard key={f.q} padding="md">
                <h3 className="text-sm font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{f.a}</p>
              </SoftCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const FAQS = [
  {
    q: "Is there really a free plan?",
    a: "Yes. The Starter plan is free forever — no credit card required. You get 1 policy inspection per month and 3 AI chats per day.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Absolutely. Upgrade, downgrade, or cancel from your account settings. Changes take effect at the next billing cycle.",
  },
  {
    q: "Do you store my policy PDFs?",
    a: "No. PDFs are processed in-memory for analysis and deleted within 24 hours. We never store, share, or sell your documents.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit/debit cards, UPI, net banking, and PayPal. Annual plans can also be paid via invoice.",
  },
  {
    q: "Can I get a custom plan for my brokerage?",
    a: "Yes. Contact our sales team for custom pricing, white-label options, API access, and dedicated account management.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use bank-grade AES-256 encryption in transit and at rest. We're SOC 2 Type II and ISO 27001 certified.",
  },
];

export default PricingPage;
