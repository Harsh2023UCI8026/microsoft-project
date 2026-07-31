// POST /api/chat — generate AI assistant response based on user message
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ChatRequest {
  message: string;
  threadId?: string;
  userId?: string;
}

// Rule-based underwriting assistant — covers the most common questions
// In production this would call the LLM via z-ai-web-dev-sdk, but we keep
// the rule engine here so the API works without external dependencies.
function generateResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("room-rent") || q.includes("room rent")) {
    return "Your policy has a **room-rent cap of 1% of sum insured per day** (Clause 4.7).\n\nThis means:\n• With ₹10L sum insured → max ₹10,000/day for room\n• Most metro private rooms cost ₹15,000-25,000/day\n• The difference comes out of YOUR pocket\n\n**AI suggestion**: Switch to Health Shield Pro Plus — it has no room-rent cap. Premium difference is just ₹2,400/yr and pays back on a single 3-day hospitalization.";
  }

  if (q.includes("compare") || q.includes("top 3") || q.includes("alternatives")) {
    return "Based on your risk profile, here are your **top 3 plans**:\n\n1. **Health Shield Pro Plus** — ₹18,400/yr, 92% transparency, no room-rent cap\n2. **FamilyCare Premier** — ₹16,200/yr, 88% transparency, lower co-pay\n3. **MediSecure Elite** — ₹21,800/yr, 95% transparency, includes maternity rider\n\nWant me to open a side-by-side comparison?";
  }

  if (q.includes("hidden") || q.includes("red flag")) {
    return "I found **3 hidden clauses** in your Health Shield Pro Plus policy:\n\n1. **Room-rent cap** (Clause 4.7) — limits room to ₹10K/day\n2. **20% co-pay after age 45** (Clause 9.1) — auto-activates on renewal\n3. **Maternity 2-year waiting** (Clause 8.3) — blocks maternity claims for 24 months\n\nWant detailed fix suggestions for each?";
  }

  if (q.includes("simulate") || q.includes("claim")) {
    return "Let me simulate a hospitalization claim for you. Based on your policy:\n\n• **Total bill**: ₹5,00,000 (5-day hospitalization + surgery)\n• **Insurer pays**: ₹3,90,000 (78% coverage)\n• **You pay**: ₹1,10,000 (22% out-of-pocket)\n• **Approval probability**: 94%\n\nThe 22% gap is from the room-rent cap and co-pay. Want me to open the Claim Simulator with these numbers?";
  }

  if (q.includes("co-pay") || q.includes("copay")) {
    return "Your **20% co-pay** activates on the first renewal after you turn 45 (Clause 9.1).\n\nThis means a ₹5L claim becomes a ₹4L payout — ₹1L out of pocket.\n\n**AI suggestion**: Switch to a no-co-pay variant before turning 45. The premium difference (~₹1,800/yr) pays back in a single claim.";
  }

  if (q.includes("underwriting") || q.includes("score")) {
    return "Your **underwriting score is 87/100** — top 25% in your age band.\n\nBreakdown:\n• Age factor: 92/100\n• Lifestyle: 85/100\n• Occupation risk: 78/100\n• Stress index: 81/100\n\nWith minor lifestyle improvements, you could unlock 8-12% additional premium discounts. Want specific suggestions?";
  }

  if (q.includes("simplif") || q.includes("plain english") || q.includes("explain")) {
    return "I can simplify any policy clause for you. Head over to the **AI Policy Simplifier** — upload your PDF and our neural model converts 80 pages of legalese into 5 minutes of plain English, ranked by financial impact.\n\nWant me to open it for you?";
  }

  if (q.includes("risk") || q.includes("profile")) {
    return "Your **overall risk score is 22/100** — top 8% lowest risk in your demographic.\n\nBreakdown:\n• Health & lifestyle: 18/100 (excellent)\n• Financial stability: 15/100 (excellent)\n• Occupational risk: 28/100 (moderate)\n• Geographic exposure: 32/100 (moderate)\n\nThe biggest improvement opportunity is reducing your occupational risk through standing breaks during long sedentary work sessions.";
  }

  if (q.includes("renew") || q.includes("renewal")) {
    return "Your next renewal is **March 12, 2025**. AI projects a **+4.2% premium increase** based on age-band trends.\n\n**3 ways to reduce the increase:**\n1. Lock in the current rate with a 3-year term\n2. Increase voluntary deductible by ₹5,000 (saves ~12%)\n3. Switch to Health Shield Pro Plus (no room-rent cap, similar premium)\n\nWant me to run a comparison?";
  }

  if (q.includes("family") || q.includes("dependent") || q.includes("child")) {
    return "Your family vault shows **4 members** with an **88% protection score**.\n\n• Rajesh (Self): 92% — fully protected\n• Anita (Spouse): 88% — fully protected\n• Aarav (Son, 14): 72% — **gap detected** (missing critical illness rider)\n• Meera (Daughter, 9): 95% — fully protected\n\nThe biggest opportunity is adding a critical illness rider for Aarav — ₹2,400/yr closes the largest gap.";
  }

  if (q.includes("emergency") || q.includes("hospital")) {
    return "For an emergency hospitalization:\n\n1. **Nearest cashless hospital**: Apollo Hospitals, 4.2km away\n2. **Pre-approval probability**: 96% (based on 4,200 similar claims)\n3. **Cashless coverage**: ₹4,80,000 of ₹5,00,000 estimated\n4. **Out-of-pocket max**: ₹20,000\n\nIf this is an actual emergency, tap the red 'Emergency Call' button at the top of the Emergency Dashboard to connect with our 24/7 support.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hi Arjun! I'm your specialized Insurance Intelligence Assistant. I've analyzed your Health Shield Pro Plus policy and I'm ready to help with anything — coverage questions, claim simulations, hidden clause detection, or plan comparisons.\n\nWhat would you like to know?";
  }

  if (q.includes("thank")) {
    return "You're welcome! Anything else I can help you with? I can also open the AI Policy Inspector, Claim Simulator, or Risk Engine if you'd like to dive deeper into any specific area.";
  }

  return "Great question! Let me analyze that against your policy and our 4M+ policy knowledge base.\n\nBased on your Health Shield Pro Plus plan, here's what I can tell you: your policy is in the top 12% for transparency, with a 92% transparency score and 94% claim approval probability. The 3 red flags I've identified are room-rent cap, co-pay after 45, and maternity waiting period.\n\nCould you share a bit more context about what specific decision you're trying to make?";
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, threadId } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 },
      );
    }

    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
    });

    let activeThreadId = threadId;
    if (!activeThreadId && user) {
      const thread = await db.chatThread.create({
        data: {
          userId: user.id,
          title: message.slice(0, 60),
        },
      });
      activeThreadId = thread.id;
    }

    // Persist user message
    if (activeThreadId) {
      await db.chatMessage.create({
        data: {
          threadId: activeThreadId,
          role: "user",
          content: message,
        },
      });
    }

    // Generate AI response
    const response = generateResponse(message);

    // Persist assistant message
    if (activeThreadId) {
      await db.chatMessage.create({
        data: {
          threadId: activeThreadId,
          role: "assistant",
          content: response,
        },
      });
    }

    return NextResponse.json({
      success: true,
      threadId: activeThreadId,
      response,
      ts: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// GET — fetch chat history for the demo user
export async function GET() {
  try {
    const user = await db.user.findFirst({
      where: { email: "arjun.mehta@email.com" },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const threads = await db.chatThread.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json({
      success: true,
      threads: threads.map((t) => ({
        id: t.id,
        title: t.title,
        updatedAt: t.updatedAt,
        messages: t.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          ts: m.createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        })),
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
