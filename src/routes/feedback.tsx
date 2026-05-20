import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MessageSquareHeart, Star, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [
    { title: "Feedback — AgroVision AI" },
    { name: "description", content: "Share your feedback to help us improve AgroVision AI." },
  ]}),
  component: Feedback,
});

function Feedback() {
  const [form, setForm] = useState({ name: "", location: "", rating: 5, message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false }).limit(10);
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    setStatus("loading");
    const { error } = await supabase.from("feedback").insert(form);
    if (error) { setStatus("error"); return; }
    setStatus("done");
    setForm({ name: "", location: "", rating: 5, message: "" });
    load();
  };

  return (
    <div>
      <PageHeader icon={MessageSquareHeart} title="Feedback" subtitle="Help us build features that matter to your farm." />
      <div className="mx-auto max-w-4xl px-6 py-10 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4">Share your thoughts</h2>
          {status === "done" ? (
            <div className="rounded-xl bg-primary/10 p-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
              <p className="mt-2 font-semibold">Thank you!</p>
              <button onClick={() => setStatus("idle")} className="mt-3 text-sm text-primary underline">Submit another</button>
            </div>
          ) : (
            <div className="space-y-3">
              <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <input placeholder="Location (village / city)" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <div>
                <div className="text-sm font-medium mb-1">Rating</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setForm({ ...form, rating: n })}>
                      <Star className={`h-7 w-7 ${n <= form.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <button onClick={submit} disabled={status === "loading" || !form.name || !form.message} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-60">
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Submit
              </button>
              {status === "error" && <p className="text-sm text-destructive">Could not save feedback. Try again.</p>}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Recent feedback</h2>
          <div className="space-y-3">
            {items.length === 0 && <p className="text-sm text-muted-foreground">Be the first to share!</p>}
            {items.map(it => (
              <div key={it.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{it.name} <span className="text-muted-foreground font-normal text-sm">· {it.location}</span></div>
                  <div className="flex">
                    {Array.from({ length: it.rating || 0 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{it.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}