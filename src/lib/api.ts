// Tiny typed fetch helper for our API routes
// All routes are relative paths so they work in the sandbox gateway.

export interface Policy {
  id: string;
  name: string;
  insurer: string;
  type: string;
  sumInsured: number;
  premiumAnnual: number;
  transparency: number;
  claimApproval: number;
  cashlessCount: number;
  rating: number;
  reviewCount: number;
  matchScore: number;
  redFlagCount: number;
  tags: string[];
  benefits: string[];
}

export interface Recommendation {
  id: string;
  rank: number;
  matchScore: number;
  reason: string;
  policy: Policy;
}

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  ts?: string;
}

export interface ChatThread {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

async function fetchJSON<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // GET /api/policies
  getPolicies: (params: {
    type?: string;
    q?: string;
    maxPremium?: number;
    sort?: string;
    limit?: number;
  } = {}) => {
    const sp = new URLSearchParams();
    if (params.type) sp.set("type", params.type);
    if (params.q) sp.set("q", params.q);
    if (params.maxPremium) sp.set("maxPremium", String(params.maxPremium));
    if (params.sort) sp.set("sort", params.sort);
    if (params.limit) sp.set("limit", String(params.limit));
    return fetchJSON<{ success: boolean; count: number; policies: Policy[] }>(
      `/api/policies?${sp.toString()}`,
    );
  },

  // GET /api/recommendations
  getRecommendations: () =>
    fetchJSON<{
      success: boolean;
      user: { name: string; email: string; underwritingScore: number; riskScore: number };
      recommendations: Recommendation[];
    }>("/api/recommendations"),

  // POST /api/chat
  sendChat: (message: string, threadId?: string) =>
    fetchJSON<{
      success: boolean;
      threadId: string;
      response: string;
      ts: string;
    }>("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, threadId }),
    }),

  // GET /api/chat — fetch chat history
  getChatHistory: () =>
    fetchJSON<{ success: boolean; threads: ChatThread[] }>("/api/chat"),

  // GET /api/risk-score
  getRiskScore: () =>
    fetchJSON<{
      success: boolean;
      user: { name: string; email: string; avatarInitials: string; underwritingScore: number; city: string };
      overallScore: number;
      breakdown: { health: number; lifestyle: number; occupation: number; geographic: number };
      riskVectors: { label: string; score: number; tone: string }[];
      projection: { year: string; score: number; tone: string }[];
      insights: any[];
      recommendations: any[];
      policies: any[];
    }>("/api/risk-score"),

  // POST /api/simulate-claim
  simulateClaim: (data: { policyType: string; scenario: string; billAmount: number }) =>
    fetchJSON<{
      success: boolean;
      billAmount: number;
      coveragePct: number;
      approvalProb: number;
      insurerPays: number;
      outOfPocket: number;
      breakdown: { label: string; value: number; pct: number; tone: string }[];
      optimization: { title: string; coverageGain: string; oopSaved: number; premiumDelta: number };
    }>("/api/simulate-claim", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // GET /api/emergency
  getEmergency: () =>
    fetchJSON<{ success: boolean; activeClaim: any | null; hospitals: any[]; contacts: any[]; helplines: any[] }>(
      "/api/emergency",
    ),

  // POST /api/emergency
  createEmergencyClaim: (data: { emergencyType: string; hospitalName?: string }) =>
    fetchJSON<{ success: boolean; claim: any }>("/api/emergency", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // GET /api/me
  getMe: () =>
    fetchJSON<{
      success: boolean;
      user: any;
      policies: any[];
      activeClaim: any | null;
      stats: { policiesAnalyzed: number; claimsSimulated: number; chatThreads: number; recommendations: number; redFlagsFound: number; moneySaved: number };
    }>("/api/me"),
};
