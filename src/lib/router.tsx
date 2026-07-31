"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Lightweight hash-based router. We are constrained to a single Next.js `/` route,
 * so the 27 pages of the InsurIntel AI site are exposed via hash segments.
 *
 * Examples:
 *   #/                    -> home
 *   #/product             -> product overview
 *   #/policies            -> policy browser
 *   #/inspector           -> AI Policy Inspector
 *   #/simulator           -> Claim Simulator
 *   #/assistant           -> AI Chat Assistant
 *   #/onboarding          -> Onboarding step 1
 *   #/onboarding/risk     -> Risk Assessment Profile form
 *   #/onboarding/profile  -> Medical & Financial Profile form
 *   #/recommendations     -> AI Recommendations
 *   #/risk-engine         -> AI Risk Analysis Engine
 *   #/diagnostic          -> AI Diagnostic Engine
 *   #/lifecycle           -> Policy Life Cycle
 *   #/emergency           -> Emergency Insurance Dashboard
 *   #/family-vault        -> Family Vault Dashboard
 *   #/readiness           -> Insurance Readiness Dashboard
 *   #/solutions           -> Solutions
 *   #/pricing             -> Pricing
 *   #/resources           -> Resources
 *   #/login               -> Login
 *   #/hero/health         -> Health Insurance hero
 *   #/hero/motor          -> Motor Insurance hero
 *   #/hero/family         -> SecureLife family hero
 *   #/hero/dashboard      -> Product Dashboard preview hero
 */

export type Route =
  | "home"
  | "product"
  | "solutions"
  | "pricing"
  | "resources"
  | "login"
  | "onboarding"
  | "onboarding-risk"
  | "onboarding-profile"
  | "onboarding-vehicle"
  | "policies"
  | "inspector"
  | "simulator"
  | "assistant"
  | "recommendations"
  | "risk-engine"
  | "diagnostic"
  | "lifecycle"
  | "emergency"
  | "family-vault"
  | "readiness"
  | "hero-health"
  | "hero-motor"
  | "hero-family"
  | "hero-dashboard";

export interface RouterCtx {
  route: Route;
  path: string;
  navigate: (to: Route | string, opts?: { replace?: boolean }) => void;
  back: () => void;
}

const Ctx = createContext<RouterCtx | null>(null);

function pathToRoute(path: string): Route {
  const p = path.replace(/^#/, "").replace(/^\/+/, "").toLowerCase();
  switch (p) {
    case "":
    case "home":
      return "home";
    case "product":
      return "product";
    case "solutions":
      return "solutions";
    case "pricing":
      return "pricing";
    case "resources":
      return "resources";
    case "login":
    case "signin":
      return "login";
    case "onboarding":
    case "onboarding/step1":
      return "onboarding";
    case "onboarding/risk":
    case "onboarding/step2":
      return "onboarding-risk";
    case "onboarding/profile":
    case "onboarding/step3":
      return "onboarding-profile";
    case "onboarding/vehicle":
      return "onboarding-vehicle";
    case "policies":
    case "policy-browser":
      return "policies";
    case "inspector":
    case "policy-inspector":
      return "inspector";
    case "simulator":
    case "claim-simulator":
      return "simulator";
    case "assistant":
    case "ai-assistant":
      return "assistant";
    case "recommendations":
      return "recommendations";
    case "risk-engine":
      return "risk-engine";
    case "diagnostic":
      return "diagnostic";
    case "lifecycle":
    case "policy-lifecycle":
      return "lifecycle";
    case "emergency":
      return "emergency";
    case "family-vault":
      return "family-vault";
    case "readiness":
      return "readiness";
    case "hero/health":
      return "hero-health";
    case "hero/motor":
      return "hero-motor";
    case "hero/family":
      return "hero-family";
    case "hero/dashboard":
      return "hero-dashboard";
    default:
      return "home";
  }
}

export function routeToHash(route: Route): string {
  const map: Record<Route, string> = {
    home: "/",
    product: "/product",
    solutions: "/solutions",
    pricing: "/pricing",
    resources: "/resources",
    login: "/login",
    onboarding: "/onboarding",
    "onboarding-risk": "/onboarding/risk",
    "onboarding-profile": "/onboarding/profile",
    "onboarding-vehicle": "/onboarding/vehicle",
    policies: "/policies",
    inspector: "/inspector",
    simulator: "/simulator",
    assistant: "/assistant",
    recommendations: "/recommendations",
    "risk-engine": "/risk-engine",
    diagnostic: "/diagnostic",
    lifecycle: "/lifecycle",
    emergency: "/emergency",
    "family-vault": "/family-vault",
    readiness: "/readiness",
    "hero-health": "/hero/health",
    "hero-motor": "/hero/motor",
    "hero-family": "/hero/family",
    "hero-dashboard": "/hero/dashboard",
  };
  return `#${map[route]}`;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>("");

  // Sync from window hash on mount + on hashchange
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash || "#/";
      setPath(h);
      // Scroll to top on route change unless we have an in-page anchor
      if (!h.includes("?")) {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const navigate = useCallback(
    (to: Route | string, opts?: { replace?: boolean }) => {
      const hash =
        typeof to === "string" && to.startsWith("#")
          ? to
          : routeToHash(to as Route);
      if (opts?.replace) {
        const url = window.location.pathname + window.location.search + hash;
        window.history.replaceState(null, "", url);
        setPath(hash);
      } else {
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        } else {
          setPath(hash);
        }
      }
    },
    [],
  );

  const back = useCallback(() => {
    window.history.back();
  }, []);

  const route = useMemo(() => pathToRoute(path), [path]);

  const value = useMemo(
    () => ({ route, path, navigate, back }),
    [route, path, navigate, back],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRouter() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

/** Link component for client-side navigation */
export function RouterLink({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: Route;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { navigate } = useRouter();
  return (
    <a
      {...rest}
      href={routeToHash(to)}
      className={className}
      onClick={(e) => {
        // Allow modifier-click to open in new tab etc.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
