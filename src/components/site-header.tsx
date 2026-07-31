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
  Sparkles,
  FileSearch,
  Gauge,
  ShieldAlert,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  route?: Route;
  icon?: React.ReactNode;
  children?: { label: string; description?: string; route: Route; icon?: React.ReactNode }[];
}

// NEW NAV per user spec: AI Simplifier, PDF Inspector, Risk Score, Policy Readiness, User About
const NAV: NavItem[] = [
  {
    label: "AI Simplifier",
    route: "simplifier",
    icon: <Sparkles className="h-4 w-4" />,
    children: [
      {
        label: "AI Policy Simplifier",
        description: "Turn 80-page policy PDFs into plain English",
        route: "simplifier",
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        label: "AI Underwriting Assistant",
        description: "Chat with a specialized AI underwriter",
        route: "assistant",
        icon: <User className="h-4 w-4" />,
      },
      {
        label: "Claim Simulator",
        description: "Predict approval rates & coverage gaps",
        route: "simulator",
        icon: <Gauge className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "PDF Inspector",
    route: "inspector",
    icon: <FileSearch className="h-4 w-4" />,
    children: [
      {
        label: "AI Policy Inspector",
        description: "Upload any policy PDF for neural analysis",
        route: "inspector",
        icon: <FileSearch className="h-4 w-4" />,
      },
      {
        label: "AI Diagnostic Engine",
        description: "Detect claim rejection risks before buying",
        route: "diagnostic",
        icon: <ShieldAlert className="h-4 w-4" />,
      },
      {
        label: "Policy Life Cycle",
        description: "Track milestones, waiting periods & renewals",
        route: "lifecycle",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        label: "Policy Browser",
        description: "Compare precision-underwritten plans",
        route: "policies",
        icon: <FileSearch className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Risk Score",
    route: "risk-engine",
    icon: <Gauge className="h-4 w-4" />,
    children: [
      {
        label: "AI Risk Analysis Engine",
        description: "Detailed breakdown of your risk score & vectors",
        route: "risk-engine",
        icon: <Gauge className="h-4 w-4" />,
      },
      {
        label: "AI Recommendations",
        description: "AI-curated strategies for your portfolio",
        route: "recommendations",
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        label: "Family Vault",
        description: "Family protection scores & gaps",
        route: "family-vault",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Policy Readiness",
    route: "readiness",
    icon: <ShieldCheck className="h-4 w-4" />,
    children: [
      {
        label: "Insurance Readiness Dashboard",
        description: "Be ready for hospitalization",
        route: "readiness",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        label: "Emergency Insurance Dashboard",
        description: "Real-time claim tracking & hospital network",
        route: "emergency",
        icon: <ShieldAlert className="h-4 w-4" />,
      },
      {
        label: "Family Vault",
        description: "Family-wide protection monitoring",
        route: "family-vault",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },
];

export function SiteHeader({ variant = "default" }: { variant?: "default" | "minimal" | "transparent" }) {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

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
          className="flex items-center gap-2 group shrink-0"
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
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => item.route && navigate(item.route)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    route === item.route || item.children.some(c => c.route === route)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  )}
                >
                  {item.icon}
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openDropdown === item.label && "rotate-180",
                    )}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2 w-[380px]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-soft-lg animate-scale-in origin-top">
                      <div className="grid grid-cols-1 gap-1">
                        {item.children.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => {
                              navigate(c.route);
                              setOpenDropdown(null);
                            }}
                            className="flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-blue-50/60"
                          >
                            {c.icon && (
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                                {c.icon}
                              </span>
                            )}
                            <div className="min-w-0">
                              <span className="block text-sm font-semibold text-slate-900">
                                {c.label}
                              </span>
                              {c.description && (
                                <span className="block text-xs text-slate-500 mt-0.5">
                                  {c.description}
                                </span>
                              )}
                            </div>
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
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  route === item.route
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
        </nav>

        {/* Right side — User About section */}
        <div className="flex items-center gap-2">
          <button
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* User About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            <button
              onClick={() => navigate("about")}
              className={cn(
                "flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors",
                route === "about" || route === "login"
                  ? "bg-blue-50 ring-1 ring-blue-100"
                  : "hover:bg-slate-50",
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold shadow-soft">
                AM
              </span>
              <span className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold text-slate-900">Arjun Mehta</span>
                <span className="text-[10px] text-slate-500">Family Plan</span>
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform", userMenuOpen && "rotate-180")} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full pt-2 w-72">
                <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-soft-lg animate-scale-in origin-top-right">
                  {/* User card */}
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 p-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold shadow-soft">
                        AM
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900 truncate">Arjun Mehta</div>
                        <div className="text-[11px] text-slate-500 truncate">arjun.mehta@email.com</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Underwriting score</span>
                      <span className="font-bold text-blue-700">87 / 100</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/60 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700" style={{ width: "87%" }} />
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="space-y-0.5">
                    {[
                      { label: "My Profile", route: "about" as Route, icon: <User className="h-4 w-4" /> },
                      { label: "Policy Life Cycle", route: "lifecycle" as Route, icon: <ShieldCheck className="h-4 w-4" /> },
                      { label: "Recommendations", route: "recommendations" as Route, icon: <Sparkles className="h-4 w-4" /> },
                      { label: "Family Vault", route: "family-vault" as Route, icon: <ShieldCheck className="h-4 w-4" /> },
                    ].map((m) => (
                      <button
                        key={m.label}
                        onClick={() => {
                          navigate(m.route);
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        <span className="text-slate-400">{m.icon}</span>
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-0.5">
                    <button
                      onClick={() => {
                        navigate("login");
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-slate-400"><User className="h-4 w-4" /></span>
                      Sign in / Switch account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => navigate("onboarding")}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-glow-brand px-4 py-2 h-9 hidden sm:inline-flex"
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
        <div className="lg:hidden border-t border-slate-200 bg-white animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV.map((item) =>
              item.children ? (
                <details key={item.label} className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    {item.icon}
                    {item.label}
                    <ChevronDown className="h-4 w-4 ml-auto transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pl-3 pb-2 space-y-1">
                    {item.children.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => {
                          navigate(c.route);
                          setMobileOpen(false);
                        }}
                        className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-blue-50/60"
                      >
                        {c.icon && <span className="text-slate-400 mt-0.5">{c.icon}</span>}
                        <div className="min-w-0">
                          <span className="block text-sm font-medium text-slate-900">{c.label}</span>
                          {c.description && (
                            <span className="block text-xs text-slate-500 mt-0.5">{c.description}</span>
                          )}
                        </div>
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
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.icon}
                  {item.label}
                </button>
              ),
            )}

            {/* User about */}
            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  navigate("about");
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold">
                  AM
                </span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-900">Arjun Mehta</div>
                  <div className="text-xs text-slate-500">Family Plan · 87 score</div>
                </div>
              </button>
            </div>

            <Button
              onClick={() => {
                navigate("onboarding");
                setMobileOpen(false);
              }}
              className="w-full mt-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
