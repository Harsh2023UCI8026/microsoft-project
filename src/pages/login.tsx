"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  User,
  Building2,
} from "lucide-react";

export function LoginPage() {
  const { navigate } = useRouter();
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col bg-white">
        {/* Top brand */}
        <div className="px-8 py-6">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-glow-brand">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-[17px] font-bold tracking-tight text-slate-900">
              InsurIntel<span className="text-blue-600"> AI</span>
            </span>
          </button>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              {mode === "signin" ? "Welcome back" : "Get started"}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              {mode === "signin" ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {mode === "signin"
                ? "Continue your AI underwriting journey."
                : "Start your free 14-day trial. No credit card required."}
            </p>

            {/* Tabs */}
            <div className="mt-7 flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                  mode === "signin" ? "bg-white text-blue-700 shadow-soft" : "text-slate-600"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                  mode === "signup" ? "bg-white text-blue-700 shadow-soft" : "text-slate-600"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("onboarding");
              }}
            >
              {mode === "signup" && (
                <div>
                  <Label htmlFor="name" className="text-xs font-medium text-slate-600">Full name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="name" placeholder="Arjun Mehta" className="pl-10" />
                  </div>
                </div>
              )}
              <div>
                <Label htmlFor="email" className="text-xs font-medium text-slate-600">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-xs font-medium text-slate-600">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === "signin" && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300" />
                    Remember me
                  </label>
                  <button type="button" className="font-semibold text-blue-700 hover:text-blue-800">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
              >
                {mode === "signin" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Or continue with</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social auth */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Building2 className="h-4 w-4" />
                SSO
              </button>
            </div>

            <p className="mt-6 text-center text-[11px] text-slate-500">
              By continuing, you agree to our{" "}
              <button className="font-medium text-slate-700 hover:text-blue-700 underline">Terms</button>{" "}
              and{" "}
              <button className="font-medium text-slate-700 hover:text-blue-700 underline">Privacy Policy</button>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 flex items-center justify-between text-[11px] text-slate-400">
          <span>© 2024 InsurIntel AI</span>
          <div className="flex items-center gap-3">
            <button className="hover:text-slate-700">Privacy</button>
            <button className="hover:text-slate-700">Terms</button>
            <button className="hover:text-slate-700">Support</button>
          </div>
        </div>
      </div>

      {/* Right — hero panel */}
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" aria-hidden />

        <div className="relative flex-1 flex flex-col justify-center px-12 py-16">
          <Sparkles className="h-10 w-10 text-blue-300 mb-6" />
          <h2 className="text-4xl font-bold tracking-tight leading-tight">
            Underwrite smarter.<br />Decide with confidence.
          </h2>
          <p className="mt-4 text-blue-100 leading-relaxed max-w-md">
            Join 4M+ policyholders who use InsurIntel AI to find better coverage, decode hidden
            clauses, and save an average of 32% on annual premiums.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { value: "4M+", label: "Policies analyzed" },
              { value: "98.4%", label: "AI accuracy" },
              { value: "32%", label: "Avg savings" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold tabular-nums text-white">{s.value}</div>
                <div className="text-[11px] text-blue-200">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5 max-w-md">
            <div className="flex items-center gap-1 text-amber-300 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 1l2.6 5.9 6.4.5-4.9 4.2 1.5 6.3L10 14.8l-5.6 3.1 1.5-6.3L1.4 7.4l6.4-.5L10 1z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-blue-50 leading-relaxed">
              "InsurIntel AI found three hidden sub-limits in my health policy that my broker
              never mentioned. I switched and saved 28% on premiums with better coverage."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs font-bold">
                AS
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Anita Sharma</div>
                <div className="text-[10px] text-blue-200">Mother of two, Bengaluru</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom badges */}
        <div className="relative px-12 py-6 flex items-center gap-6 text-xs text-blue-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            SOC 2 Type II
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            ISO 27001
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            HIPAA compliant
          </div>
        </div>
      </div>
    </div>
  );
}
