"use client";

import * as React from "react";
import { useRouter } from "@/lib/router";
import { api, type ChatThread } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { SoftCard, Pill } from "@/components/site-primitives";
import {
  Brain,
  Send,
  Sparkles,
  FileSearch,
  ShieldCheck,
  Activity,
  TrendingUp,
  Upload,
  Paperclip,
  Mic,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  ts: string;
}

const QUICK_CHIPS = [
  { label: "What's my underwriting score?", icon: <TrendingUp className="h-3 w-3" /> },
  { label: "Explain the room-rent cap", icon: <FileSearch className="h-3 w-3" /> },
  { label: "Compare my top 3 plans", icon: <Activity className="h-3 w-3" /> },
  { label: "Hidden clauses in my policy", icon: <ShieldCheck className="h-3 w-3" /> },
  { label: "Simulate a hospitalization claim", icon: <Activity className="h-3 w-3" /> },
  { label: "When does my co-pay activate?", icon: <CheckCircle2 className="h-3 w-3" /> },
];

const SIDEBAR_CONVERSATIONS = [
  { title: "Health policy review", time: "2 min ago", active: true },
  { title: "Motor premium comparison", time: "1 hour ago", active: false },
  { title: "Family floater options", time: "Yesterday", active: false },
  { title: "Claim scenario for surgery", time: "2 days ago", active: false },
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hi Rajesh! I'm your specialized Insurance Intelligence Assistant. I've analyzed your Health Shield Pro Plus policy and I'm ready to answer any questions about your coverage, claims, or alternatives.\n\nWhat would you like to know?",
    ts: "10:42 AM",
  },
  {
    role: "user",
    content: "What's my underwriting score and what does it mean?",
    ts: "10:43 AM",
  },
  {
    role: "assistant",
    content: "Your current underwriting score is **87/100** — that's in the top 25% of policyholders in your age band.\n\nHere's the breakdown:\n\n• **Age factor**: 92/100 (optimal range)\n• **Lifestyle**: 85/100 (non-smoker, moderate exercise)\n• **Occupation risk**: 78/100 (tech industry, sedentary)\n• **Stress index**: 81/100 (moderate)\n\nWhat this means: Your risk profile qualifies you for **premium-tier plans** at standard rates. With a few lifestyle improvements, you could unlock 8-12% additional premium discounts.\n\nWant me to suggest specific improvements?",
    ts: "10:43 AM",
  },
];

export function AIAssistantPage() {
  const { navigate } = useRouter();
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    setMessages((m) => [...m, { role: "user", content: text, ts: now }]);
    setInput("");
    setIsThinking(true);

    try {
      const result = await api.sendChat(text);
      setMessages((m) => [...m, { role: "assistant", content: result.response, ts: result.ts }]);
    } catch (err: any) {
      // Fallback to local generation if the API is unavailable
      const fallback = generateResponse(text);
      setMessages((m) => [...m, { role: "assistant", content: fallback, ts: now }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-glow-brand">
              <Brain className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                AI Underwriting Assistant
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink-dot" />
                Online · responds in ~1 second
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <Sparkles className="h-4 w-4" />
            New Conversation
          </Button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar — conversations */}
          <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
            <SoftCard padding="sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Recent conversations
                </div>
              </div>
              <div className="space-y-1">
                {SIDEBAR_CONVERSATIONS.map((c) => (
                  <button
                    key={c.title}
                    className={`flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors ${
                      c.active ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{c.title}</div>
                      <div className="text-[10px] text-slate-400">{c.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SoftCard>

            <SoftCard padding="sm" className="bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-100">
                  AI Context
                </span>
              </div>
              <div className="text-xs font-semibold text-white">Your active policy</div>
              <p className="text-[11px] text-blue-100 leading-relaxed mt-0.5">
                Health Shield Pro Plus · ₹10L · Renewal: Mar 2025
              </p>
              <Button
                onClick={() => navigate("inspector")}
                size="sm"
                className="mt-3 w-full bg-white text-blue-700 hover:bg-blue-50 text-xs font-semibold h-8"
              >
                Open Inspector
              </Button>
            </SoftCard>

            <SoftCard padding="sm">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Quick stats
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Messages today</span>
                  <span className="font-semibold text-slate-900">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Avg response time</span>
                  <span className="font-semibold text-slate-900">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Accuracy</span>
                  <span className="font-semibold text-emerald-600">98.4%</span>
                </div>
              </div>
            </SoftCard>
          </aside>

          {/* Chat interface */}
          <SoftCard padding="none" className="flex flex-col h-[calc(100vh-220px)] min-h-[500px] overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Brain className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Insurance Intelligence Assistant</div>
                  <div className="text-[10px] text-slate-500">Powered by GPT-4 + 4M policy knowledge base</div>
                </div>
              </div>
              <Pill variant="green">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink-dot" />
                Active
              </Pill>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}
              {isThinking && (
                <div className="flex items-center gap-2 pl-9">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 rounded-full bg-blue-400 animate-pulse-soft"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">Assistant is thinking…</span>
                </div>
              )}
            </div>

            {/* Quick action chips */}
            <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/30">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {QUICK_CHIPS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => sendMessage(c.label)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {c.icon}
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="border-t border-slate-100 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Upload className="h-4 w-4" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything about your policy, claims, or coverage…"
                  className="flex-1 resize-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none max-h-32"
                />
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Mic className="h-4 w-4" />
                </button>
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  size="icon"
                  className="h-9 w-9 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-slate-400">
                <span>Press Enter to send · Shift+Enter for new line</span>
                <span>AI responses may be inaccurate · Verify critical info</span>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
        isUser ? "bg-slate-200 text-slate-700" : "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
      }`}>
        {isUser ? <span className="text-xs font-bold">R</span> : <Brain className="h-3.5 w-3.5" />}
      </div>
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-sm"
              : "bg-white text-slate-800 ring-1 ring-slate-200 rounded-tl-sm"
          }`}
        >
          {formatContent(message.content)}
        </div>
        <span className="text-[10px] text-slate-400 px-1">{message.ts}</span>
      </div>
    </div>
  );
}

function formatContent(content: string) {
  // Render basic **bold** markdown
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

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
  if (q.includes("co-pay")) {
    return "Your **20% co-pay** activates on the first renewal after you turn 45 (Clause 9.1).\n\nThis means a ₹5L claim becomes a ₹4L payout — ₹1L out of pocket.\n\n**AI suggestion**: Switch to a no-co-pay variant before turning 45. The premium difference (~₹1,800/yr) pays back in a single claim.";
  }
  if (q.includes("underwriting") || q.includes("score")) {
    return "Your **underwriting score is 87/100** — top 25% in your age band.\n\nBreakdown:\n• Age factor: 92/100\n• Lifestyle: 85/100\n• Occupation risk: 78/100\n• Stress index: 81/100\n\nWith minor lifestyle improvements, you could unlock 8-12% additional premium discounts. Want specific suggestions?";
  }
  return "Great question! Let me look that up in your policy.\n\nBased on my analysis of your Health Shield Pro Plus plan and our 4M+ policy knowledge base, I can give you a precise answer. Could you share a bit more context about what you're trying to decide?";
}
