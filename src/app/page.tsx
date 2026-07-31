"use client";

import { RouterProvider, useRouter } from "@/lib/router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomePage } from "@/pages/home";
import { ProductPage } from "@/pages/product";
import { SolutionsPage } from "@/pages/solutions";
import { PricingPage } from "@/pages/pricing";
import { ResourcesPage } from "@/pages/resources";
import { LoginPage } from "@/pages/login";
import { OnboardingStep1Page } from "@/pages/onboarding-step1";
import { OnboardingRiskPage } from "@/pages/onboarding-risk";
import { OnboardingProfilePage } from "@/pages/onboarding-profile";
import { OnboardingVehiclePage } from "@/pages/onboarding-vehicle";
import { PoliciesBrowserPage } from "@/pages/policies-browser";
import { PolicyInspectorPage } from "@/pages/policy-inspector";
import { ClaimSimulatorPage } from "@/pages/claim-simulator";
import { AIAssistantPage } from "@/pages/ai-assistant";
import { RecommendationsPage } from "@/pages/recommendations";
import { RiskEnginePage } from "@/pages/risk-engine";
import { DiagnosticEnginePage } from "@/pages/diagnostic-engine";
import { LifecyclePage } from "@/pages/lifecycle";
import { EmergencyPage } from "@/pages/emergency";
import { FamilyVaultPage } from "@/pages/family-vault";
import { ReadinessPage } from "@/pages/readiness";
import { HeroHealthPage } from "@/pages/hero-health";
import { HeroMotorPage } from "@/pages/hero-motor";
import { HeroFamilyPage } from "@/pages/hero-family";
import { HeroDashboardPage } from "@/pages/hero-dashboard";

function Shell() {
  const { route } = useRouter();

  // Pages with hidden chrome (marketing hero variants get transparent header,
  // login screen is fully standalone)
  const minimalChrome = route === "login";
  const transparentHeader =
    route === "hero-health" ||
    route === "hero-motor" ||
    route === "hero-family" ||
    route === "hero-dashboard";

  let page: React.ReactNode;
  switch (route) {
    case "home":
      page = <HomePage />;
      break;
    case "product":
      page = <ProductPage />;
      break;
    case "solutions":
      page = <SolutionsPage />;
      break;
    case "pricing":
      page = <PricingPage />;
      break;
    case "resources":
      page = <ResourcesPage />;
      break;
    case "login":
      page = <LoginPage />;
      break;
    case "onboarding":
      page = <OnboardingStep1Page />;
      break;
    case "onboarding-risk":
      page = <OnboardingRiskPage />;
      break;
    case "onboarding-profile":
      page = <OnboardingProfilePage />;
      break;
    case "onboarding-vehicle":
      page = <OnboardingVehiclePage />;
      break;
    case "policies":
      page = <PoliciesBrowserPage />;
      break;
    case "inspector":
      page = <PolicyInspectorPage />;
      break;
    case "simulator":
      page = <ClaimSimulatorPage />;
      break;
    case "assistant":
      page = <AIAssistantPage />;
      break;
    case "recommendations":
      page = <RecommendationsPage />;
      break;
    case "risk-engine":
      page = <RiskEnginePage />;
      break;
    case "diagnostic":
      page = <DiagnosticEnginePage />;
      break;
    case "lifecycle":
      page = <LifecyclePage />;
      break;
    case "emergency":
      page = <EmergencyPage />;
      break;
    case "family-vault":
      page = <FamilyVaultPage />;
      break;
    case "readiness":
      page = <ReadinessPage />;
      break;
    case "hero-health":
      page = <HeroHealthPage />;
      break;
    case "hero-motor":
      page = <HeroMotorPage />;
      break;
    case "hero-family":
      page = <HeroFamilyPage />;
      break;
    case "hero-dashboard":
      page = <HeroDashboardPage />;
      break;
    default:
      page = <HomePage />;
  }

  if (minimalChrome) {
    return <div className="min-h-screen flex flex-col">{page}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader variant={transparentHeader ? "transparent" : "default"} />
      <main className="flex-1">{page}</main>
      <SiteFooter />
    </div>
  );
}

export default function Home() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
