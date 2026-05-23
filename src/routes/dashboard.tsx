import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2, CheckCircle2, Circle, MapPin, Bell, Sprout, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login", search: { redirect: "/dashboard" } });
  },
  head: () => ({ meta: [{ title: "Dashboard — AgroVision AI" }, { name: "description", content: "Your farm plots, crop reminders and saved diagnoses in one place." }] }),
  component: Dashboard,
});

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  if (!user) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div>
      <PageHeader icon={UserIcon} title={`Welcome${user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}`} subtitle="Your farm plots, reminders and saved diagnoses." />
      <div className="mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-2 gap-6">
        <PlotsCard userId={user.id} />
        <RemindersCard userId={user.id} />
        <DiagnosesCard userId={user.id} />
        <ProfileCard userId={user.id} email={user.email ?? ""} />
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children, className = "" }: { title: string; icon: any; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ---------------- Plots ---------------- */
function PlotsCard({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", area_acres: "", soil_type: "Black", current_crop: "" });

  const { data: plots = [], isLoading } = useQuery({
    queryKey: ["plots", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("farm_plots").select("*").order("created_at", { ascending: false });
      if (error) throw error; return data;
    },
  });

  const addPlot = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("farm_plots").insert({
        user_id: userId, name: form.name, area_acres: form.area_acres ? Number(form.area_acres) : null,
        soil_type: form.soil_type, current_crop: form.current_crop || null,
      });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Plot added"); setAdding(false); setForm({ name: "", area_acres: "", soil_type: "Black", current_crop: "" }); qc.invalidateQueries({ queryKey: ["plots"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const deletePlot = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("farm_plots").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["plots"] }); },
  });

  return (
    <Card title="My Farm Plots" icon={MapPin}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
        <div className="space-y-2">
          {plots.length === 0 && <p className="text-sm text-muted-foreground">No plots yet. Add your first plot below.</p>}
          {plots.map((p: any) => (
            <div key={p.id} className="flex items-start justify-between rounded-lg border border-border p-3">
              <div>
                <div className="font-medium text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{[p.area_acres && `${p.area_acres} acres`, p.soil_type && `${p.soil_type} soil`, p.current_crop].filter(Boolean).join(" · ")}</div>
              </div>
              <button onClick={() => deletePlot.mutate(p.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      )}
      {adding ? (
        <form onSubmit={(e) => { e.preventDefault(); addPlot.mutate(); }} className="mt-4 space-y-2 rounded-lg border border-border p-3 bg-secondary/40">
          <input required placeholder="Plot name (e.g. North Field)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" step="0.1" placeholder="Acres" value={form.area_acres} onChange={e => setForm({ ...form, area_acres: e.target.value })} className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
            <select value={form.soil_type} onChange={e => setForm({ ...form, soil_type: e.target.value })} className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm">
              {["Black", "Red", "Sandy", "Clay", "Loamy", "Alluvial"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <input placeholder="Current crop (optional)" value={form.current_crop} onChange={e => setForm({ ...form, current_crop: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button type="submit" disabled={addPlot.isPending} className="flex-1 rounded-md bg-foreground text-background py-1.5 text-sm font-medium hover:opacity-90 disabled:opacity-60">{addPlot.isPending ? "Saving…" : "Save plot"}</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-md border border-border px-3 py-1.5 text-sm">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition"><Plus className="h-3.5 w-3.5" /> Add plot</button>
      )}
    </Card>
  );
}

/* ---------------- Reminders ---------------- */
function RemindersCard({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ crop_name: "", task: "", due_date: new Date().toISOString().slice(0, 10) });

  const { data: rems = [], isLoading } = useQuery({
    queryKey: ["reminders", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("crop_reminders").select("*").order("due_date", { ascending: true });
      if (error) throw error; return data;
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("crop_reminders").insert({ user_id: userId, ...form });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Reminder added"); setAdding(false); setForm({ crop_name: "", task: "", due_date: new Date().toISOString().slice(0, 10) }); qc.invalidateQueries({ queryKey: ["reminders"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const { error } = await supabase.from("crop_reminders").update({ done: !done }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("crop_reminders").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] }),
  });

  return (
    <Card title="Crop Reminders" icon={Bell}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
        <ul className="space-y-1.5">
          {rems.length === 0 && <p className="text-sm text-muted-foreground">No reminders. Set sowing, spraying or harvest reminders below.</p>}
          {rems.map((r: any) => (
            <li key={r.id} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
              <button onClick={() => toggle.mutate({ id: r.id, done: r.done })} className="flex-shrink-0">
                {r.done ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${r.done ? "line-through text-muted-foreground" : ""}`}><span className="font-medium">{r.crop_name}</span> · {r.task}</div>
                <div className="text-xs text-muted-foreground">Due {new Date(r.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
              <button onClick={() => del.mutate(r.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
      {adding ? (
        <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="mt-4 space-y-2 rounded-lg border border-border p-3 bg-secondary/40">
          <input required placeholder="Crop name" value={form.crop_name} onChange={e => setForm({ ...form, crop_name: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <input required placeholder="Task (e.g. Apply urea, Spray neem oil)" value={form.task} onChange={e => setForm({ ...form, task: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <input type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button type="submit" disabled={add.isPending} className="flex-1 rounded-md bg-foreground text-background py-1.5 text-sm font-medium disabled:opacity-60">{add.isPending ? "Saving…" : "Save reminder"}</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-md border border-border px-3 py-1.5 text-sm">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition"><Plus className="h-3.5 w-3.5" /> Add reminder</button>
      )}
    </Card>
  );
}

/* ---------------- Diagnoses ---------------- */
function DiagnosesCard({ userId }: { userId: string }) {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["diagnoses", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("saved_diagnoses").select("*").order("created_at", { ascending: false }).limit(8);
      if (error) throw error; return data;
    },
  });

  return (
    <Card title="Saved Diagnoses" icon={Sprout}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No diagnoses saved yet. <Link to="/disease-diagnosis" className="text-primary font-medium hover:underline">Scan a leaf →</Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((d: any) => (
            <li key={d.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{d.disease_name}</div>
                {d.confidence != null && <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">{d.confidence}%</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{d.crop_name} · {new Date(d.created_at).toLocaleDateString("en-IN")}</div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/* ---------------- Profile ---------------- */
function ProfileCard({ userId, email }: { userId: string; email: string }) {
  const qc = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
      return data;
    },
  });
  const [form, setForm] = useState({ display_name: "", state: "Maharashtra", district: "", village: "", mobile: "" });
  useEffect(() => {
    if (profile) setForm({ display_name: profile.display_name ?? "", state: profile.state ?? "Maharashtra", district: profile.district ?? "", village: profile.village ?? "", mobile: profile.mobile ?? "" });
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").upsert({ user_id: userId, ...form }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Profile saved"); qc.invalidateQueries({ queryKey: ["profile"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card title="Profile" icon={UserIcon}>
      <div className="text-xs text-muted-foreground mb-3">{email}</div>
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-2">
        <input placeholder="Display name" value={form.display_name} onChange={e => setForm({ ...form, display_name: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
          <input placeholder="District" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
        </div>
        <input placeholder="Village" value={form.village} onChange={e => setForm({ ...form, village: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
        <input placeholder="Mobile" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm" />
        <button type="submit" disabled={save.isPending} className="w-full rounded-md bg-foreground text-background py-1.5 text-sm font-medium disabled:opacity-60">{save.isPending ? "Saving…" : "Save profile"}</button>
      </form>
    </Card>
  );
}