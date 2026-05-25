import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { askDriveLegal } from "@/lib/chat.functions";

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
  head: () => ({
    meta: [
      { title: "AI Traffic Law Assistant — DriveLegal" },
      { name: "description", content: "Ask anything about Indian traffic laws, fines, the MV Act, and road safety. AI assistant available in Tamil, Hindi and English." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What is the fine for not wearing a helmet in Tamil Nadu?",
  "Explain Section 184 of the Motor Vehicles Act.",
  "तेज़ रफ़्तार पर कितना जुर्माना है?",
  "ஹெல்மெட் இல்லாமல் ஓட்டினால் என்ன ஆகும்?",
];

function AssistantPage() {
  const ask = useServerFn(askDriveLegal);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your DriveLegal AI assistant. Ask me about traffic rules, fines, or the Motor Vehicles Act — in English, हिंदी, or தமிழ்." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (history: Msg[]) => ask({ data: { messages: history } }),
    onSuccess: (data) => {
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong. Please try again." }]);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-primary">
        <Sparkles className="h-4 w-4" /> AI Legal Assistant
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">
        Ask DriveLegal <span className="text-gradient">anything</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Chat with an AI trained on Indian traffic laws, the Motor Vehicles Act, and state RTO rules.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-card overflow-hidden flex flex-col h-[65vh]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-secondary text-secondary-foreground rounded-tl-sm"
              }`}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {mutation.isPending && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-secondary rounded-2xl px-4 py-3 text-sm">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse [animation-delay:120ms]" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse [animation-delay:240ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs rounded-full border border-border px-3 py-1.5 hover:bg-secondary text-muted-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-border p-4 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a rule, fine, or section…"
            maxLength={1000}
            className="flex-1 bg-input border border-border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !input.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
