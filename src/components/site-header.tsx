"use client";

import * as React from "react";
import { useRouter, routeToHash, type Route } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Bell,
} from "lucide-react";

interface NavItem {
  label: string;
  route?: Route;
  children?: { label: string; description?: string; route: Route }[];
}

const NAV: NavItem[] = [
  {
    label: "Product",
    children: [
      {
        label: "AI Policy Inspector",
        description: "Upload any policy PDF for neural analysis",
        route: "inspector",
      },
      {
        label: "Claim Simulator",
        description: "Predict approval rates & coverage gaps",
        route: "simulator",
      },
      {
        label: "AI Insurance Assistant",
        description: "Chat with a specialized underwriter",
        route: "assistant",
      },
      {
        label: "Policy Browser",
        description: "Compare precision-underwritten plans",
        route: "policies",
      },
      {
        label: "Recommendations",
        description: "AI-curated strategies for your portfolio",
        route: "recommendations",
      },
      {
        label: "Product Overview",
        description: "See the full InsurIntel AI platform",
        route: "product",
      },
    ],
  },
  {
    label: "Solutions",
    children: [
      {
        label: "AI Risk Engine",
        description: "Precision intelligence for risk assessment",
        route: "risk-engine",
      },
      {
        label: "AI Diagnostic Engine",
        description: "Detect claim rejection risks before buying",
        route: "diagnostic",
      },
      {
        label: "Policy Life Cycle",
        description: "Track every milestone with AI insights",
        route: "lifecycle",
      },
      {
        label: "Emergency Dashboard",
        description: "Real-time claim tracking & hospitals",
        route: "emergency",
      },
      {
        label: "Family Vault",
        description: "Family protection scores & gaps",
        route: "family-vault",
      },
      {
        label: "Insurance Readiness",
        description: "Be ready for hospitalization",
        route: "readiness",
      },
    ],
  },
  { label: "Pricing", route: "pricing" },
  {
    label: "Resources",
    children: [
      { label: "Health Insurance Hub", description: "Plans, coverage, claim tips", route: "hero-health" },
      { label: "Motor Insurance Hub", description: "Premium coverage guides", route: "hero-motor" },
      { label: "Family Protection Hub", description: "Plan for what matters most", route: "hero-family" },
      { label: "Dashboard Preview", description: "Take a tour of the platform", route: "hero-dashboard" },
      { label: "Resources Library", description: "Browse all articles & guides", route: "resources" },
    ],
  },
];

export function SiteHeader({ variant = "default" }: { variant?: "default" | "minimal" | "transparent" }) {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = variant !== "transparent" || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        solid
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 group"
          aria-label="InsurIntel AI home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-glow-brand transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">
            InsurIntel<span className="text-blue-600"> AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openDropdown === item.label && "rotate-180",
                    )}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2 w-[420px]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-soft-lg animate-scale-in origin-top">
                      <div className="grid grid-cols-1 gap-1">
                        {item.children.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => {
                              navigate(c.route);
                              setOpenDropdown(null);
                            }}
                            className="flex flex-col gap-0.5 rounded-xl p-3 text-left transition-colors hover:bg-blue-50/60"
                          >
                            <span className="text-sm font-semibold text-slate-900">
                              {c.label}
                            </span>
                            {c.description && (
                              <span className="text-xs text-slate-500">
                                {c.description}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => item.route && navigate(item.route)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  route === item.route
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                )}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => navigate("login")}
            className="hidden sm:inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Login
          </button>
          <Button
            onClick={() => navigate("onboarding")}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-glow-brand px-4 py-2 h-9"
          >
            Get Started
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV.map((item) =>
              item.children ? (
                <details key={item.label} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pl-3 pb-2 space-y-1">
                    {item.children.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => {
                          navigate(c.route);
                          setMobileOpen(false);
                        }}
                        className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left hover:bg-blue-50/60"
                      >
                        <span className="text-sm font-medium text-slate-900">{c.label}</span>
                        {c.description && (
                          <span className="text-xs text-slate-500">{c.description}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </details>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    item.route && navigate(item.route);
                    setMobileOpen(false);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ),
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  navigate("login");
                  setMobileOpen(false);
                }}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("onboarding");
                  setMobileOpen(false);
                }}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
