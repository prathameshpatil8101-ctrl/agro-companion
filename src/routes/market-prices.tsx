import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Search } from "lucide-react";
import { getMarketPrices } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/market-prices")({
  head: () => ({ meta: [
    { title: "Live Market Prices — AgroVision AI" },
    { name: "description", content: "Live APMC mandi prices for crops across India." },
  ]}),
  component: Market,
});

function Market() {
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("");
  const fn = useServerFn(getMarketPrices);
  const q = useQuery({
    queryKey: ["mkt", state, district],
    queryFn: () => fn({ data: { state, district } }),
  });
  return (
    <div>
      <PageHeader icon={LineChart} title="Market Prices" subtitle="Compare crop prices across major Indian APMC mandis." />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input value={state} onChange={e => setState(e.target.value)} placeholder="State" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
          <input value={district} onChange={e => setDistrict(e.target.value)} placeholder="Market / District (optional)" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
          <button onClick={() => q.refetch()} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-semibold hover:opacity-90"><Search className="h-4 w-4" /> Search</button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-foreground/80">
              <tr>
                {["Market", "Crop", "Min", "Max", "Avg", "Unit"].map(h => <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {q.data?.prices.map((p, i) => (
                <tr key={i} className="border-t border-border hover:bg-accent/40">
                  <td className="px-4 py-3">{p.market}</td>
                  <td className="px-4 py-3 font-medium text-primary">{p.crop}</td>
                  <td className="px-4 py-3">₹{p.minPrice}</td>
                  <td className="px-4 py-3">₹{p.maxPrice}</td>
                  <td className="px-4 py-3 font-semibold">₹{p.avgPrice}</td>
                  <td className="px-4 py-3 text-muted-foreground">/{p.unit}</td>
                </tr>
              ))}
              {q.data && q.data.prices.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No prices found. Try a different state.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}