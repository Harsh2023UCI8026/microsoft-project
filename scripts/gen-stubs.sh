#!/bin/bash
# Generate stub page files so imports don't break
PAGES_DIR="/home/z/my-project/src/pages"
mkdir -p "$PAGES_DIR"

declare -A PAGES=(
  ["product"]="ProductPage"
  ["solutions"]="SolutionsPage"
  ["pricing"]="PricingPage"
  ["resources"]="ResourcesPage"
  ["login"]="LoginPage"
  ["onboarding-step1"]="OnboardingStep1Page"
  ["onboarding-risk"]="OnboardingRiskPage"
  ["onboarding-profile"]="OnboardingProfilePage"
  ["onboarding-vehicle"]="OnboardingVehiclePage"
  ["policies-browser"]="PoliciesBrowserPage"
  ["policy-inspector"]="PolicyInspectorPage"
  ["claim-simulator"]="ClaimSimulatorPage"
  ["ai-assistant"]="AIAssistantPage"
  ["recommendations"]="RecommendationsPage"
  ["risk-engine"]="RiskEnginePage"
  ["diagnostic-engine"]="DiagnosticEnginePage"
  ["lifecycle"]="LifecyclePage"
  ["emergency"]="EmergencyPage"
  ["family-vault"]="FamilyVaultPage"
  ["readiness"]="ReadinessPage"
  ["hero-health"]="HeroHealthPage"
  ["hero-motor"]="HeroMotorPage"
  ["hero-family"]="HeroFamilyPage"
  ["hero-dashboard"]="HeroDashboardPage"
)

for file in "${!PAGES[@]}"; do
  comp="${PAGES[$file]}"
  path="$PAGES_DIR/$file.tsx"
  if [ ! -f "$path" ]; then
    cat > "$path" <<EOF
"use client";

export function $comp() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-bold text-slate-900">$comp</h1>
      <p className="mt-2 text-sm text-slate-500">Coming soon.</p>
    </div>
  );
}
EOF
    echo "Created $path"
  fi
done
echo "Done"
