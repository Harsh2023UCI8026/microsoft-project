// GET /api/recommendations — fetch AI-curated recommendations for the demo user
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const recs = await db.recommendation.findMany({
      where: { userId: user.id },
      orderBy: { rank: "asc" },
      include: { policy: true },
    });

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        underwritingScore: user.underwritingScore,
        riskScore: user.riskScore,
      },
      recommendations: recs.map((r) => ({
        id: r.id,
        rank: r.rank,
        matchScore: r.matchScore,
        reason: r.reason,
        policy: {
          ...r.policy,
          benefits: r.policy.benefits.split("|"),
          tags: r.policy.tags.split(","),
        },
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
