import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Leaf, Sparkles, Loader2 } from "lucide-react";
import { recommendCrops } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/crop-recommendation")({
  head: () => ({ meta: [
    { title: "Crop Recommendation — AgroVision AI" },
    { name: "description", content: "Get AI-recommended crops for your soil, season and region in India." },
  ]}),
  component: CropRec,
});

const STATES = ["Maharashtra", "Punjab", "Tamil Nadu", "Rajasthan", "Uttar Pradesh", "Karnataka", "Madhya Pradesh", "Gujarat"];
const SOILS = ["Black", "Red", "Sandy", "Clay", "Loamy", "Alluvial"];
const SEASONS = ["Kharif", "Rabi", "Zaid"];
const WATER = ["Low", "Medium", "High"];

function CropRec() {
  const [tab, setTab] = useState<"simple" | "advanced">("simple");
  const [simple, setSimple] = useState({ state: "Maharashtra", district: "Pune", village: "", soilType: "Black", season: "Kharif", water: "Medium" });
  const [adv, setAdv] = useState({ N: 90, P: 42, K: 43, ph: 6.5, temperature: 25, humidity: 60, rainfall: 100, state: "Maharashtra" });
  const fn = useServerFn(recommendCrops);
  const m = useMutation({ mutationFn: (input: any) => fn({ data: input }) });

  return (
    <div>
      <PageHeader icon={Leaf} title="Crop Recommendation" subtitle="Find the best crops to grow based on your soil, season and region — powered by AI and 2,200 soil-condition records." />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="inline-flex rounded-xl bg-secondary p-1 mb-6">
          <button onClick={() => setTab("simple")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "simple" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}>Simple Farmer Method</button>
          <button onClick={() => setTab("advanced")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "advanced" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}>Advanced (NPK + Soil)</button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {tab === "simple" ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="State"><Select value={simple.state} options={STATES} onChange={v => setSimple({ ...simple, state: v })} /></Field>
              <Field label="District"><Input value={simple.district} onChange={v => setSimple({ ...simple, district: v })} placeholder="e.g. Pune" /></Field>
              <Field label="Village (optional)"><Input value={simple.village} onChange={v => setSimple({ ...simple, village: v })} /></Field>
              <Field label="Soil Type"><Select value={simple.soilType} options={SOILS} onChange={v => setSimple({ ...simple, soilType: v })} /></Field>
              <Field label="Season"><Select value={simple.season} options={SEASONS} onChange={v => setSimple({ ...simple, season: v })} /></Field>
              <Field label="Water Availability"><Select value={simple.water} options={WATER} onChange={v => setSimple({ ...simple, water: v })} /></Field>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {(["N", "P", "K", "ph", "temperature", "humidity", "rainfall"] as const).map(k => (
                <Field key={k} label={k.toUpperCase()}>
                  <Input type="number" value={String((adv as any)[k])} onChange={v => setAdv({ ...adv, [k]: Number(v) })} />
                </Field>
              ))}
              <Field label="State"><Select value={adv.state} options={STATES} onChange={v => setAdv({ ...adv, state: v })} /></Field>
            </div>
          )}

          <button
            onClick={() => m.mutate(tab === "simple" ? { method: "simple", ...simple } : { method: "advanced", ...adv })}
            disabled={m.isPending}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-90 disabled:opacity-60 transition"
          >
            {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Get Recommendation
          </button>
        </div>

        {m.isError && <p className="mt-4 text-sm text-destructive">Could not load recommendations. Please try again.</p>}

        {m.data && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Top Recommended Crops</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {m.data.crops.map((c: any, i: number) => (
                <div key={c.name} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">#{i + 1} match</div>
                  <h3 className="text-xl font-bold mt-1 text-primary">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm font-medium text-foreground/80">{label}</span><div className="mt-1.5">{children}</div></label>;
}
function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />;
}
function Select({ value, options, onChange }: { value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>;
}