// Seed the InsurIntel AI database with a demo user + sample policies
import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding InsurIntel AI database...");

  // Demo user
  const user = await db.user.upsert({
    where: { email: "arjun.mehta@email.com" },
    update: {},
    create: {
      email: "arjun.mehta@email.com",
      name: "Arjun Mehta",
      avatarInitials: "AM",
      role: "user",
      underwritingScore: 87,
      riskScore: 22,
      city: "Bengaluru",
      memberSince: new Date("2024-03-12"),
    },
  });
  console.log("Created user:", user.email);

  // Policies — match the data shown on the Recommendations and Policy Browser pages
  const policies = [
    {
      name: "Health Shield Pro Plus",
      insurer: "SecureLife Health",
      type: "health",
      sumInsured: 1000000,
      premiumAnnual: 18400,
      transparency: 92,
      claimApproval: 94,
      cashlessCount: 12400,
      rating: 4.9,
      reviewCount: 1247,
      matchScore: 98,
      redFlagCount: 3,
      tags: "best-match,health,family-floater,no-room-cap",
      benefits: "No room-rent cap|No co-pay|Restoration benefit|Free annual checkup",
    },
    {
      name: "FamilyCare Premier",
      insurer: "Star Health",
      type: "health",
      sumInsured: 1000000,
      premiumAnnual: 16200,
      transparency: 88,
      claimApproval: 91,
      cashlessCount: 11200,
      rating: 4.6,
      reviewCount: 942,
      matchScore: 88,
      redFlagCount: 2,
      tags: "best-value,health,maternity",
      benefits: "Lower premium|Maternity included|No co-pay|Wellness rewards",
    },
    {
      name: "MediSecure Elite",
      insurer: "HDFC Ergo",
      type: "health",
      sumInsured: 1500000,
      premiumAnnual: 21800,
      transparency: 95,
      claimApproval: 96,
      cashlessCount: 8400,
      rating: 4.8,
      reviewCount: 738,
      matchScore: 84,
      redFlagCount: 1,
      tags: "most-transparent,health,premium",
      benefits: "No room-rent cap|Maternity rider|Critical illness|Global cover",
    },
    {
      name: "SecureLife Family",
      insurer: "ICICI Lombard",
      type: "health",
      sumInsured: 1200000,
      premiumAnnual: 19400,
      transparency: 86,
      claimApproval: 89,
      cashlessCount: 9800,
      rating: 4.5,
      reviewCount: 612,
      matchScore: 82,
      redFlagCount: 2,
      tags: "balanced,health",
      benefits: "Restoration benefit|Mid-tier premium|Wellness rewards|Optional riders",
    },
    {
      name: "Prime Health Plus",
      insurer: "Bajaj Allianz",
      type: "health",
      sumInsured: 1000000,
      premiumAnnual: 17600,
      transparency: 81,
      claimApproval: 87,
      cashlessCount: 10200,
      rating: 4.3,
      reviewCount: 524,
      matchScore: 78,
      redFlagCount: 3,
      tags: "budget,health",
      benefits: "Lowest premium|Free health checkup|Optional riders|NCB up to 50%",
    },
    {
      name: "Wellness Shield",
      insurer: "Max Bupa",
      type: "health",
      sumInsured: 800000,
      premiumAnnual: 15800,
      transparency: 78,
      claimApproval: 85,
      cashlessCount: 7600,
      rating: 4.2,
      reviewCount: 418,
      matchScore: 74,
      redFlagCount: 4,
      tags: "economy,health",
      benefits: "Free checkup|Maternity rider|Wellness rewards|NCB",
    },
    {
      name: "HealthGuard Basic",
      insurer: "Tata AIG",
      type: "health",
      sumInsured: 500000,
      premiumAnnual: 12400,
      transparency: 72,
      claimApproval: 82,
      cashlessCount: 5400,
      rating: 4.0,
      reviewCount: 312,
      matchScore: 68,
      redFlagCount: 5,
      tags: "entry,health",
      benefits: "Low premium|Basic coverage|Free checkup|NCB",
    },
    // Motor policies
    {
      name: "Motor Comprehensive Plus",
      insurer: "HDFC ERGO",
      type: "motor",
      sumInsured: 680000,
      premiumAnnual: 12400,
      transparency: 88,
      claimApproval: 92,
      cashlessCount: 4217,
      rating: 4.6,
      reviewCount: 824,
      matchScore: 92,
      redFlagCount: 1,
      tags: "best-match,motor,zero-dep",
      benefits: "Zero depreciation|Engine protect|NCB guard|24/7 roadside",
    },
    {
      name: "Motor Secure",
      insurer: "ICICI Lombard",
      type: "motor",
      sumInsured: 650000,
      premiumAnnual: 11800,
      transparency: 85,
      claimApproval: 89,
      cashlessCount: 3800,
      rating: 4.4,
      reviewCount: 612,
      matchScore: 85,
      redFlagCount: 2,
      tags: "value,motor",
      benefits: "Zero depreciation|Roadside assistance|Engine protect|NCB 50%",
    },
    {
      name: "Motor Shield",
      insurer: "Bajaj Allianz",
      type: "motor",
      sumInsured: 620000,
      premiumAnnual: 9800,
      transparency: 78,
      claimApproval: 84,
      cashlessCount: 3200,
      rating: 4.1,
      reviewCount: 418,
      matchScore: 75,
      redFlagCount: 3,
      tags: "budget,motor",
      benefits: "Basic coverage|Roadside assistance|NCB guard|Optional riders",
    },
    // Home policies
    {
      name: "Home Shield Complete",
      insurer: "ICICI Lombard",
      type: "home",
      sumInsured: 1500000,
      premiumAnnual: 8200,
      transparency: 84,
      claimApproval: 88,
      cashlessCount: 0,
      rating: 4.3,
      reviewCount: 248,
      matchScore: 80,
      redFlagCount: 2,
      tags: "home,structure,contents",
      benefits: "Structure + contents|Earthquake rider|Flood rider|Burglary",
    },
  ];

  for (const p of policies) {
    const existing = await db.policy.findFirst({ where: { name: p.name } });
    if (existing) {
      await db.policy.update({ where: { id: existing.id }, data: p });
      console.log(`Updated policy: ${p.name}`);
    } else {
      await db.policy.create({ data: p });
      console.log(`Created policy: ${p.name}`);
    }
  }

  // Link active user policies (3 from the About page)
  const healthPolicy = await db.policy.findFirst({ where: { name: "Health Shield Pro Plus" } });
  const motorPolicy = await db.policy.findFirst({ where: { name: "Motor Comprehensive Plus" } });
  const homePolicy = await db.policy.findFirst({ where: { name: "Home Shield Complete" } });

  if (healthPolicy && motorPolicy && homePolicy) {
    await db.userPolicy.deleteMany({ where: { userId: user.id } });
    await db.userPolicy.createMany({
      data: [
        {
          userId: user.id,
          policyId: healthPolicy.id,
          status: "active",
          startDate: new Date("2024-03-12"),
          endDate: new Date("2025-03-12"),
          premiumPaid: 18400,
          sumInsured: 1000000,
        },
        {
          userId: user.id,
          policyId: motorPolicy.id,
          status: "active",
          startDate: new Date("2024-04-05"),
          endDate: new Date("2025-04-05"),
          premiumPaid: 12400,
          sumInsured: 680000,
        },
        {
          userId: user.id,
          policyId: homePolicy.id,
          status: "renewing",
          startDate: new Date("2023-11-15"),
          endDate: new Date("2024-11-15"),
          premiumPaid: 8200,
          sumInsured: 1500000,
        },
      ],
    });
    console.log("Linked 3 active user policies");
  }

  // Create recommendations for the user (top 7)
  if (healthPolicy) {
    await db.recommendation.deleteMany({ where: { userId: user.id } });
    const allPolicies = await db.policy.findMany({
      where: { type: "health" },
      orderBy: { matchScore: "desc" },
      take: 7,
    });
    await db.recommendation.createMany({
      data: allPolicies.map((p, i) => ({
        userId: user.id,
        policyId: p.id,
        rank: i + 1,
        matchScore: p.matchScore,
        reason: i === 0 ? "Best overall fit for your risk profile and budget." : `Ranked #${i + 1} based on your age, lifestyle, and family history.`,
      })),
    });
    console.log(`Created ${allPolicies.length} recommendations`);
  }

  // Sample chat thread
  await db.chatThread.deleteMany({ where: { userId: user.id } });
  const thread = await db.chatThread.create({
    data: {
      userId: user.id,
      title: "Health policy review",
    },
  });
  await db.chatMessage.createMany({
    data: [
      {
        threadId: thread.id,
        role: "assistant",
        content: "Hi Arjun! I'm your specialized Insurance Intelligence Assistant. I've analyzed your Health Shield Pro Plus policy and I'm ready to answer any questions about your coverage, claims, or alternatives.",
      },
      {
        threadId: thread.id,
        role: "user",
        content: "What's my underwriting score and what does it mean?",
      },
      {
        threadId: thread.id,
        role: "assistant",
        content: "Your current underwriting score is **87/100** — that's in the top 25% of policyholders in your age band. This qualifies you for premium-tier plans at standard rates.",
      },
    ],
  });
  console.log("Created sample chat thread");

  // Active emergency claim
  await db.emergencyClaim.deleteMany({ where: { userId: user.id } });
  await db.emergencyClaim.create({
    data: {
      userId: user.id,
      claimNumber: "CLM-2024-7842",
      emergencyType: "hospitalization",
      hospitalName: "Apollo Hospitals, Bengaluru",
      status: "treatment",
      preauthAmount: 520000,
      approvedAmount: 480000,
    },
  });
  console.log("Created sample emergency claim");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
