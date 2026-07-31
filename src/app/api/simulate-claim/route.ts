// POST /api/simulate-claim — compute AI claim simulation
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface SimRequest {
  policyType: string; // health | motor | home
  scenario: string;
  billAmount: number;
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SimRequest = await req.json();
    const { policyType, scenario, billAmount } = body;

    if (!policyType || !billAmount) {
      return NextResponse.json(
        { success: false, error: "policyType and billAmount are required" },
        { status: 400 },
      );
    }

    // AI underwriting logic — based on the user's risk profile + scenario
    // In production this would call the trained neural model.
    let coveragePct = 78;
    let approvalProb = 94;

    if (scenario === "surgery") {
      coveragePct = 70;
      approvalProb = 88;
    } else if (scenario === "diagnostics") {
      coveragePct = 92;
      approvalProb = 96;
    } else if (scenario === "hospitalization") {
      coveragePct = 78;
      approvalProb = 94;
    }

    // Adjust for policy type
    if (policyType === "motor") {
      coveragePct = 90;
      approvalProb = 92;
    } else if (policyType === "home") {
      coveragePct = 85;
      approvalProb = 89;
    }

    const outOfPocket = Math.round(billAmount * (1 - coveragePct / 100));
    const insurerPays = billAmount - outOfPocket;

    // Detailed breakdown
    const baseSumInsured = Math.round(billAmount * 0.78);
    const noClaimBonus = Math.round(billAmount * 0.10);
    const subLimitDeduction = -Math.round(billAmount * 0.12);
    const coPayDeduction = -Math.round(billAmount * 0.10);

    // Persist the simulation
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
    });
    if (user) {
      await db.claimSimulation.create({
        data: {
          userId: user.id,
          policyType,
          scenario,
          billAmount,
          coveragePct,
          approvalProb,
          outOfPocket,
        },
      });
    }

    return NextResponse.json({
      success: true,
      policyType,
      scenario,
      billAmount,
      coveragePct,
      approvalProb,
      insurerPays,
      outOfPocket,
      breakdown: [
        { label: "Base sum insured", value: baseSumInsured, pct: 78, tone: "bg-emerald-500" },
        { label: "No-claim bonus", value: noClaimBonus, pct: 10, tone: "bg-blue-500" },
        { label: "Sub-limit deductions", value: subLimitDeduction, pct: 12, tone: "bg-rose-400" },
        { label: "Co-pay (20%)", value: coPayDeduction, pct: 10, tone: "bg-rose-500" },
      ],
      optimization: {
        title: "Switch to Health Shield Pro Plus",
        coverageGain: "+22%",
        oopSaved: Math.round(outOfPocket * 0.7),
        premiumDelta: 2400,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
