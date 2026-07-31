// GET /api/emergency — fetch active emergency claim status
// POST /api/emergency — create new emergency claim
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
      include: { emergencyClaims: { orderBy: { createdAt: "desc" } } },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const activeClaim = user.emergencyClaims[0];

    return NextResponse.json({
      success: true,
      activeClaim: activeClaim
        ? {
            id: activeClaim.id,
            claimNumber: activeClaim.claimNumber,
            emergencyType: activeClaim.emergencyType,
            hospitalName: activeClaim.hospitalName,
            status: activeClaim.status,
            preauthAmount: activeClaim.preauthAmount,
            approvedAmount: activeClaim.approvedAmount,
            createdAt: activeClaim.createdAt,
          }
        : null,
      hospitals: [
        { name: "Apollo Hospitals", distance: 4.2, beds: 280, specialties: 32, emergency: true },
        { name: "Manipal Hospital", distance: 6.8, beds: 240, specialties: 28, emergency: true },
        { name: "Fortis Hospital", distance: 8.4, beds: 320, specialties: 35, emergency: true },
        { name: "Narayana Health", distance: 11.2, beds: 410, specialties: 42, emergency: true },
        { name: "Columbia Asia", distance: 14.5, beds: 180, specialties: 22, emergency: false },
      ],
      contacts: [
        { name: "Anita Mehta", relation: "Spouse", phone: "+91 98765 43210" },
        { name: "Rajesh Mehta", relation: "Father", phone: "+91 98765 43211" },
        { name: "Dr. Suresh Patel", relation: "Family doctor", phone: "+91 98765 43212" },
      ],
      helplines: [
        { label: "Insurer hotline", value: "1800-200-4400" },
        { label: "Cashless desk", value: "+91-80-4612-0042" },
        { label: "InsurIntel AI support", value: "+91-80-4612-0099" },
      ],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { emergencyType, hospitalName } = body;

    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const claimNumber = `CLM-2024-${Math.floor(Math.random() * 10000)}`;
    const claim = await db.emergencyClaim.create({
      data: {
        userId: user.id,
        claimNumber,
        emergencyType: emergencyType || "hospitalization",
        hospitalName: hospitalName || "Apollo Hospitals, Bengaluru",
        status: "filed",
        preauthAmount: 0,
        approvedAmount: 0,
      },
    });

    return NextResponse.json({
      success: true,
      claim: {
        id: claim.id,
        claimNumber: claim.claimNumber,
        emergencyType: claim.emergencyType,
        hospitalName: claim.hospitalName,
        status: claim.status,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
