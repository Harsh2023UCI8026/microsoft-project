// GET /api/policies — list policies with optional filters
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || undefined;
    const search = searchParams.get("q") || undefined;
    const maxPremium = searchParams.get("maxPremium");
    const sort = searchParams.get("sort") || "match";
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = {};
    if (type && type !== "all") where.type = type;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { insurer: { contains: search } },
      ];
    }
    if (maxPremium) where.premiumAnnual = { lte: parseInt(maxPremium) };

    let orderBy: any = { matchScore: "desc" };
    if (sort === "premium-low") orderBy = { premiumAnnual: "asc" };
    if (sort === "premium-high") orderBy = { premiumAnnual: "desc" };
    if (sort === "transparency") orderBy = { transparency: "desc" };
    if (sort === "rating") orderBy = { rating: "desc" };

    const policies = await db.policy.findMany({
      where,
      orderBy,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      count: policies.length,
      policies: policies.map((p) => ({
        ...p,
        benefits: p.benefits.split("|"),
        tags: p.tags.split(","),
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
