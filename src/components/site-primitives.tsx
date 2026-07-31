"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/** Section heading band — used at the top of dashboard pages */
export function PageHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  actions,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        actions && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-2", align === "center" && "items-center")}>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Card with the soft shadow + rounded corner treatment used across the site */
export const SoftCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
  }
>(({ className, interactive, padding = "md", ...props }, ref) => {
  const padCls =
    padding === "none"
      ? ""
      : padding === "sm"
      ? "p-4"
      : padding === "lg"
      ? "p-7 sm:p-8"
      : "p-5 sm:p-6";
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-soft",
        padCls,
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md hover:border-slate-300",
        className,
      )}
      {...props}
    />
  );
});
SoftCard.displayName = "SoftCard";

/** Section header inside a dashboard card */
export function CardSectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="space-y-1">
        {eyebrow && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {eyebrow}
          </div>
        )}
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="text-xs text-slate-500 leading-relaxed max-w-md">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Pill badge */
export function Pill({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "amber" | "red" | "purple" | "slate" | "outline";
  className?: string;
}) {
  const variants: Record<string, string> = {
    default: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    red: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
    purple: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
    slate: "bg-slate-800 text-white ring-1 ring-slate-900",
    outline: "bg-transparent text-slate-600 ring-1 ring-slate-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Progress stepper used at the top of onboarding / inspector / simulator flows */
export function StepStepper({
  steps,
  current,
  variant = "horizontal",
  onStepClick,
}: {
  steps: { label: string; sub?: string }[];
  current: number; // 0-indexed
  variant?: "horizontal" | "horizontal-compact";
  onStepClick?: (index: number) => void;
}) {
  if (variant === "horizontal-compact") {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => onStepClick?.(i)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors",
                i < current && "bg-emerald-50 text-emerald-700",
                i === current && "bg-blue-600 text-white",
                i > current && "bg-slate-100 text-slate-500",
              )}
            >
              {i < current ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="flex h-3.5 w-3.5 items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </span>
              )}
              <span className="font-medium">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className="h-px w-4 bg-slate-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <button
            onClick={() => onStepClick?.(i)}
            className="flex flex-col items-start gap-1.5 group"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
                  i < current && "bg-emerald-500 text-white",
                  i === current && "bg-blue-600 text-white ring-4 ring-blue-100",
                  i > current && "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
                )}
              >
                {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <div
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    i <= current ? "text-slate-900" : "text-slate-400",
                  )}
                >
                  {s.label}
                </div>
                {s.sub && (
                  <div className="text-[11px] text-slate-400">{s.sub}</div>
                )}
              </div>
            </div>
          </button>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-3 h-0.5 bg-slate-200 relative overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 bg-blue-600 transition-all duration-500",
                  i < current ? "w-full" : "w-0",
                )}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/** Stat block */
export function StatBlock({
  label,
  value,
  unit,
  trend,
  trendValue,
  variant = "default",
  icon,
}: {
  label: string;
  value: React.ReactNode;
  unit?: string;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
  variant?: "default" | "blue" | "green" | "amber" | "red";
  icon?: React.ReactNode;
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
      ? "text-rose-600"
      : "text-slate-500";
  const variantBg: Record<string, string> = {
    default: "bg-white",
    blue: "bg-blue-50/60 ring-1 ring-blue-100",
    green: "bg-emerald-50/60 ring-1 ring-emerald-100",
    amber: "bg-amber-50/60 ring-1 ring-amber-100",
    red: "bg-rose-50/60 ring-1 ring-rose-100",
  };
  return (
    <div className={cn("rounded-xl p-4", variantBg[variant])}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {icon && (
          <span className="text-slate-400">{icon}</span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
          {value}
        </span>
        {unit && <span className="text-sm text-slate-500">{unit}</span>}
      </div>
      {(trend || trendValue) && (
        <div className={cn("text-xs mt-1.5 font-medium", trendColor)}>
          {trendValue}
        </div>
      )}
    </div>
  );
}

/** Linear progress bar */
export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  size = "md",
  showLabel = false,
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const heightCls = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="font-medium text-slate-600">{label}</span>
          {showLabel && (
            <span className="font-semibold tabular-nums text-slate-900">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-slate-100",
          heightCls,
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-blue-600 transition-all duration-500",
            barClassName,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Circular progress (SVG ring) */
export function ProgressRing({
  value,
  max = 100,
  size = 96,
  strokeWidth = 8,
  color = "#2563eb",
  trackColor = "#e2e8f0",
  label,
  sublabel,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label}
        {sublabel}
      </div>
    </div>
  );
}

/** Two-column page layout with sidebar (used on assistant, inspector pages) */
export function SidebarLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <aside className="lg:sticky lg:top-20 lg:self-start">{sidebar}</aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}

/** CTA band at the bottom of marketing pages */
export function CtaBand({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primary: { label: string; onClick?: () => void };
  secondary?: { label: string; onClick?: () => void };
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-8 py-12 sm:px-12 sm:py-14 text-white">
      <div className="absolute inset-0 bg-grid-slate opacity-10" aria-hidden />
      <div className="relative max-w-2xl">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
        {subtitle && (
          <p className="mt-3 text-blue-100 leading-relaxed">{subtitle}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={primary.onClick}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-soft hover:bg-blue-50 transition-colors"
          >
            {primary.label}
          </button>
          {secondary && (
            <button
              onClick={secondary.onClick}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {secondary.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Empty state for grid sections */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          {icon}
        </div>
      )}
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      {description && (
        <p className="mt-1 text-xs text-slate-500 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
