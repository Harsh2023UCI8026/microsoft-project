// GET /api/me — fetch current user profile (demo user)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
      include: {
        policies: { include: { policy: true } },
        emergencyClaims: { orderBy: { createdAt: "desc" }, take: 1 },
        _count: {
          select: {
            chatThreads: true,
            claimSimulations: true,
            recommendations: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarInitials: user.avatarInitials,
        city: user.city,
        memberSince: user.memberSince,
        underwritingScore: user.underwritingScore,
        riskScore: user.riskScore,
        role: user.role,
      },
      policies: user.policies.map((up) => ({
        id: up.id,
        name: up.policy.name,
        insurer: up.policy.insurer,
        type: up.policy.type,
        status: up.status,
        startDate: up.startDate,
        endDate: up.endDate,
        premiumPaid: up.premiumPaid,
        sumInsured: up.sumInsured,
      })),
      activeClaim: user.emergencyClaims[0] || null,
      stats: {
        policiesAnalyzed: 12,
        claimsSimulated: user._count.claimSimulations,
        chatThreads: user._count.chatThreads,
        recommendations: user._count.recommendations,
        redFlagsFound: 9,
        moneySaved: 84200,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
