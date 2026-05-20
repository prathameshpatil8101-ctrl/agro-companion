import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle, Send, Loader2, User, Bot } from "lucide-react";
import { chatWithAI } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({ meta: [
    { title: "AI Farming Assistant — AgroVision AI" },
    { name: "description", content: "Ask anything about crops, pests, fertilizers, schemes and organic farming." },
  ]}),
  component: Chat,
});

type Msg = { role: "user" | "assistant"; content: string };

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Namaste 🙏 I am your AgroVision AI assistant. Ask me about crops, pests, fertilizers, irrigation, government schemes or organic farming." },
  ]);
  const [input, setInput] = useState("");
  const fn = useServerFn(chatWithAI);
  const m = useMutation({ mutationFn: (msgs: Msg[]) => fn({ data: { messages: msgs } }) });
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, m.isPending]);

  const send = () => {
    if (!input.trim()) return;
    const next = [...messages, { role: "user" as const, content: input }];
    setMessages(next);
    setInput("");
    m.mutate(next, {
      onSuccess: (r) => setMessages([...next, { role: "assistant", content: r.reply }]),
      onError: () => setMessages([...next, { role: "assistant", content: "Sorry, I couldn't reach the AI service right now. Please try again." }]),
    });
  };

  return (
    <div>
      <PageHeader icon={MessageCircle} title="AI Farming Assistant" subtitle="Get instant answers in plain language about farming in India." />
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col h-[calc(100vh-260px)] min-h-[500px]">
        <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
              </div>
              <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {m.isPending && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"><Bot className="h-4 w-4 text-primary" /></div>
              <div className="rounded-2xl px-4 py-2.5 bg-secondary text-sm flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Thinking…</div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything about farming…" className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={send} disabled={m.isPending} className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold disabled:opacity-60">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}