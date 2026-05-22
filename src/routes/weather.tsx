import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { CloudSun, Droplets, Wind, CloudRain, Loader2, MapPin } from "lucide-react";
import { getWeather } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/weather")({
  head: () => ({ meta: [
    { title: "Weather Forecast — AgroVision AI" },
    { name: "description", content: "7-day weather forecast for any village or city in India." },
  ]}),
  component: Weather,
});

function Weather() {
  const [loc, setLoc] = useState("Pune");
  const fn = useServerFn(getWeather);
  const m = useMutation({ mutationFn: (l: string) => fn({ data: { location: l } }) });
  const useGps = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const q = `${pos.coords.latitude.toFixed(4)},${pos.coords.longitude.toFixed(4)}`;
        setLoc(q); m.mutate(q);
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };
  return (
    <div>
      <PageHeader icon={CloudSun} title="Weather Forecast" subtitle="Plan irrigation, sowing and harvest using a 7-day forecast." />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex gap-3 mb-6">
          <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Enter city or village" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
          <button onClick={useGps} className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-accent" title="Use my location">
            <MapPin className="h-4 w-4" /> GPS
          </button>
          <button onClick={() => m.mutate(loc)} disabled={m.isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-60">
            {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Check
          </button>
        </div>
        {m.isError && <p className="text-sm text-destructive">Could not find that location.</p>}
        {m.data && (
          <>
            <div className="rounded-2xl border border-border p-6 mb-6" style={{ background: "var(--gradient-hero)" }}>
              <div className="text-primary-foreground">
                <div className="text-sm opacity-80">{m.data.location}</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-6xl font-bold">{Math.round(m.data.temperature)}°</div>
                  <div className="text-xl">{m.data.condition}</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
                  <Stat icon={Droplets} label="Humidity" value={`${m.data.humidity}%`} />
                  <Stat icon={Wind} label="Wind" value={`${m.data.windSpeed} km/h`} />
                  <Stat icon={CloudRain} label="Rain" value={`${m.data.precipitation} mm`} />
                </div>
              </div>
            </div>
            {m.data.advisory?.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {m.data.advisory.map((a: string, i: number) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium border border-primary/15">{a}</span>
                ))}
              </div>
            )}
            <h3 className="text-xl font-bold mb-3">7-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {m.data.forecast.map((d: any) => (
                <div key={d.day} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className="text-sm font-semibold">{d.day}</div>
                  <div className="text-xs text-muted-foreground mt-1">{d.condition}</div>
                  <div className="mt-2 text-lg font-bold">{Math.round(d.high)}° <span className="text-muted-foreground font-normal text-sm">{Math.round(d.low)}°</span></div>
                  <div className="text-xs text-sky-600 mt-1">💧 {d.rainChance}%</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function Stat({ icon: I, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/15 backdrop-blur p-3">
      <div className="flex items-center gap-1.5 text-xs opacity-80"><I className="h-3.5 w-3.5" /> {label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}