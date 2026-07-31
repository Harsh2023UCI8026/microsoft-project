"use client";

import { useRouter, type Route } from "@/lib/router";
import { ShieldCheck, Twitter, Linkedin, Github, Youtube, Instagram } from "lucide-react";

interface FooterCol {
  title: string;
  links: { label: string; route?: Route; href?: string }[];
}

const COLS: FooterCol[] = [
  {
    title: "Product",
    links: [
      { label: "AI Policy Inspector", route: "inspector" },
      { label: "Claim Simulator", route: "simulator" },
      { label: "AI Assistant", route: "assistant" },
      { label: "Policy Browser", route: "policies" },
      { label: "Recommendations", route: "recommendations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Risk Engine", route: "risk-engine" },
      { label: "Diagnostic Engine", route: "diagnostic" },
      { label: "Policy Life Cycle", route: "lifecycle" },
      { label: "Emergency Dashboard", route: "emergency" },
      { label: "Family Vault", route: "family-vault" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Health Insurance", route: "hero-health" },
      { label: "Motor Insurance", route: "hero-motor" },
      { label: "Family Protection", route: "hero-family" },
      { label: "Documentation", route: "resources" },
      { label: "Pricing", route: "pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", route: "solutions" },
      { label: "Careers", route: "resources" },
      { label: "Blog", route: "resources" },
      { label: "Contact", route: "resources" },
      { label: "Login", route: "login" },
    ],
  },
];

export function SiteFooter() {
  const { navigate } = useRouter();
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-[17px] font-bold tracking-tight text-white">
                InsurIntel<span className="text-blue-400"> AI</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              Precision underwriting for the modern era. Compare policies,
              inspect hidden clauses, simulate claims, and decide with
              confidence — all in one AI platform.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Twitter, Linkedin, Github, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => l.route && navigate(l.route)}
                      className="text-sm text-slate-400 hover:text-white transition-colors text-left"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2024 InsurIntel AI. Precision Underwriting for the Modern Era.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <button className="hover:text-slate-300 transition-colors">Privacy</button>
            <button className="hover:text-slate-300 transition-colors">Terms</button>
            <button className="hover:text-slate-300 transition-colors">Security</button>
            <button className="hover:text-slate-300 transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
