import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Flower2, Sparkles, Loader2, Leaf, BadgeCheck, TrendingUp } from "lucide-react";
import { getOrganicTips } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/organic-farming")({
  head: () => ({ meta: [
    { title: "Organic Farming Guide — AgroVision AI" },
    { name: "description", content: "Switch to organic farming with crop-specific AI tips, certification info and market benefits." },
  ]}),
  component: Organic,
});

const GUIDES = [
  { title: "Soil Health", body: "Build soil with compost, green manure (sunhemp, dhaincha) and vermicompost. Test soil every 2 years." },
  { title: "Pest Control", body: "Use neem oil, pheromone traps, Trichogramma egg parasitoids, and intercrop with marigold to reduce pest pressure." },
  { title: "Water Management", body: "Mulch with crop residue, adopt drip irrigation, and harvest rainwater in farm ponds." },
  { title: "Certification", body: "PGS-India works for domestic markets; NPOP is needed for export. Conversion period is 2-3 years." },
];

function Organic() {
  const [crop, setCrop] = useState("Tomato");
  const fn = useServerFn(getOrganicTips);
  const m = useMutation({ mutationFn: (c: string) => fn({ data: { crop: c } }) });

  return (
    <div>
      <PageHeader icon={Flower2} title="Organic Farming" subtitle="Practical, low-cost organic guidance tailored to Indian farms." />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Get AI tips for your crop</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g. Tomato, Cotton, Wheat" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <button onClick={() => m.mutate(crop)} disabled={m.isPending} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-60">
              {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Get Tips
            </button>
          </div>
          {m.data && (
            <div className="mt-6 space-y-4">
              <h3 className="font-bold text-primary">Tips for {m.data.crop}</h3>
              <ul className="space-y-2">
                {m.data.tips.map((t: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm"><Leaf className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}</li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-secondary/60 p-4">
                  <div className="flex items-center gap-1.5 font-semibold text-sm"><BadgeCheck className="h-4 w-4 text-primary" /> Certification</div>
                  <p className="text-sm text-muted-foreground mt-1">{m.data.certificationInfo}</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-4">
                  <div className="flex items-center gap-1.5 font-semibold text-sm"><TrendingUp className="h-4 w-4 text-primary" /> Market Benefit</div>
                  <p className="text-sm text-muted-foreground mt-1">{m.data.marketBenefit}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">Core practices</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {GUIDES.map(g => (
            <div key={g.title} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition">
              <h3 className="font-bold text-primary">{g.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}