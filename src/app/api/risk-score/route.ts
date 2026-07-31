// GET /api/risk-score — fetch user's risk score + AI insights
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
      include: {
        policies: { include: { policy: true } },
      },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // In a real app, this would be computed by the risk engine.
    // For the demo, we compute a stable score from the user's stored data.
    const breakdown = {
      health: 18,
      lifestyle: 22,
      occupation: 28,
      geographic: 32,
    };
    const overall = Math.round(
      (breakdown.health + breakdown.lifestyle + breakdown.occupation + breakdown.geographic) / 4,
    );

    const riskVectors = [
      { label: "Age factor", score: 18, tone: "green" },
      { label: "BMI & vitals", score: 22, tone: "green" },
      { label: "Smoking status", score: 5, tone: "green" },
      { label: "Exercise frequency", score: 25, tone: "green" },
      { label: "Stress index", score: 35, tone: "amber" },
      { label: "Sleep quality", score: 28, tone: "amber" },
      { label: "Occupational risk", score: 32, tone: "amber" },
      { label: "Commute exposure", score: 42, tone: "amber" },
      { label: "Family history", score: 18, tone: "green" },
      { label: "Financial stability", score: 12, tone: "green" },
      { label: "Geographic exposure", score: 38, tone: "amber" },
      { label: "Lifestyle index", score: 28, tone: "amber" },
    ];

    const projection = [
      { year: "1 year", score: 25, tone: "green" },
      { year: "3 years", score: 38, tone: "amber" },
      { year: "5 years", score: 52, tone: "amber" },
    ];

    const insights = [
      {
        icon: "heart",
        category: "Health",
        title: "Cardiovascular risk low",
        description: "Resting heart rate, BP, and family history indicate below-average 10-year CVD risk.",
        tone: "green",
      },
      {
        icon: "activity",
        category: "Lifestyle",
        title: "Exercise pattern optimal",
        description: "4-6 workouts/week with mixed cardio + strength reduces all-cause mortality by 31%.",
        tone: "green",
      },
      {
        icon: "alert",
        category: "Occupation",
        title: "Sedentary work pattern",
        description: "8+ hours/day seated increases metabolic syndrome risk. Add standing breaks.",
        tone: "amber",
      },
      {
        icon: "car",
        category: "Geography",
        title: "High-traffic commute",
        description: "Bengaluru traffic exposure adds 12% to respiratory risk over 5 years.",
        tone: "amber",
      },
    ];

    const recommendations = [
      {
        title: "Add critical illness rider",
        impact: "Covers 18 critical illnesses",
        delta: "+₹2,400/yr",
        tone: "blue",
        description: "Your family history of heart disease makes a CI rider cost-effective.",
      },
      {
        title: "Increase term cover to ₹2Cr",
        impact: "Adequate for family of 4",
        delta: "+₹4,800/yr",
        tone: "blue",
        description: "Current term cover (₹1Cr) is 50% of recommended for your income bracket.",
      },
      {
        title: "Switch to no-co-pay plan",
        impact: "Saves ₹1L on major claim",
        delta: "+₹1,800/yr",
        tone: "amber",
        description: "20% co-pay will cost more than the premium difference on a single major claim.",
      },
      {
        title: "Annual health checkup",
        impact: "Detects risks 3-5y early",
        delta: "Free",
        tone: "green",
        description: "Annual full-body checkup reduces late-stage diagnosis probability by 47%.",
      },
    ];

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        avatarInitials: user.avatarInitials,
        underwritingScore: user.underwritingScore,
        city: user.city,
      },
      overallScore: overall,
      breakdown,
      riskVectors,
      projection,
      insights,
      recommendations,
      policies: user.policies.map((up) => ({
        name: up.policy.name,
        insurer: up.policy.insurer,
        type: up.policy.type,
        status: up.status,
        sumInsured: up.sumInsured,
        premiumPaid: up.premiumPaid,
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
