import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Leaf, Bug, LineChart, CloudSun, MessageCircle, Flower2,
  ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, Globe2, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgroVision AI — Smart Farming for Indian Farmers" },
      { name: "description", content: "AI-powered crop recommendations, plant disease detection, weather forecasts and live market prices for Indian farmers." },
      { property: "og:title", content: "AgroVision AI — Smart Farming for Indian Farmers" },
      { property: "og:description", content: "AI-powered crop recommendations, plant disease detection, weather forecasts and live market prices for Indian farmers." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { to: "/crop-recommendation", icon: Leaf, titleKey: "Crop Recommendation", descKey: "Crop Recommendation desc", span: "md:col-span-2 md:row-span-2", featured: true },
  { to: "/disease-diagnosis", icon: Bug, titleKey: "Disease Diagnosis", descKey: "Disease Diagnosis desc" },
  { to: "/weather", icon: CloudSun, titleKey: "Weather", descKey: "Weather desc" },
  { to: "/market-prices", icon: LineChart, titleKey: "Market Prices", descKey: "Market Prices desc", span: "md:col-span-2" },
  { to: "/organic-farming", icon: Flower2, titleKey: "Organic Farming", descKey: "Organic Farming desc" },
  { to: "/ai-chat", icon: MessageCircle, titleKey: "AI Assistant", descKey: "AI Assistant desc" },
] as const;

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      {/* HERO — typographic, no imagery */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="blob animate-float" style={{ background: "color-mix(in oklab, var(--primary) 50%, transparent)", width: 520, height: 520, top: -180, left: -120 }} />
        <div className="blob animate-float" style={{ background: "color-mix(in oklab, var(--primary-glow) 50%, transparent)", width: 440, height: 440, top: -80, right: -80, animationDelay: "3s" }} />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-[11px] font-medium tracking-wide">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="uppercase tracking-[0.18em] text-muted-foreground">Maharashtra Edition · Live</span>
            </div>
          </div>
          <h1 className="mt-7 text-5xl sm:text-7xl lg:text-[88px] tracking-tight max-w-4xl leading-[0.95] animate-rise" style={{ animationDelay: "0.05s" }}>
            Intelligent farming, <em className="text-primary not-italic" style={{ fontStyle: "italic" }}>without the guesswork</em>.
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-rise" style={{ animationDelay: "0.12s" }}>
            {t("Hero Description")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "0.18s" }}>
            <Link to="/crop-recommendation" className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition shadow-soft">
              {t("Get Started")}
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
            <Link to="/ai-chat" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3.5 text-sm font-medium hover:bg-card transition">
              <Sparkles className="h-4 w-4 text-primary" /> {t("AI Farming Assistant")}
            </Link>
          </div>

          {/* Stat strip inline */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-border bg-border overflow-hidden">
            {[
              { n: "36", l: "MH districts mapped" },
              { n: "2,200+", l: "Soil-condition rows" },
              { n: "60+", l: "Plant diseases" },
              { n: "3", l: "Languages · EN HI MR" },
            ].map(s => (
              <div key={s.l} className="bg-card p-5 sm:p-6">
                <div className="text-3xl sm:text-4xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE BENTO */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">What's inside</div>
            <h2 className="mt-3 text-4xl sm:text-5xl tracking-tight">A complete <em className="text-primary" style={{ fontStyle: "italic" }}>farm operating system</em>.</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Each tool is built for Indian conditions — your soil, your district, your season, your language.
          </p>
        </div>

        <div className="grid md:grid-cols-3 md:auto-rows-[200px] gap-4">
          {FEATURES.map(f => (
            <Link
              key={f.to}
              to={f.to}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-0.5 flex flex-col justify-between ${f.span ?? ""}`}
            >
              {f.featured && <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />}
              <div className="relative flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
                  <f.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
              <div className="relative">
                <h3 className={`tracking-tight ${f.featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>{t(f.titleKey)}</h3>
                <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${f.featured ? "max-w-md" : "line-clamp-2"}`}>{t(f.descKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST / PRINCIPLES */}
      <section className="border-t border-border bg-[var(--gradient-subtle)]">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, t: "Built for accuracy", d: "Confidence scoring on every diagnosis. Low-confidence results ask for a clearer photo instead of guessing." },
            { icon: Globe2, t: "India-first data", d: "All 36 Maharashtra districts mapped to real soils + seasons. Open-Meteo for weather, AGMARKNET for prices." },
            { icon: Zap, t: "Free for farmers", d: "No fees, no ads, no data selling. Free to use, in three Indian languages." },
          ].map(x => (
            <div key={x.t}>
              <x.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-2xl tracking-tight">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-4xl sm:text-5xl tracking-tight">
          Start with your <em className="text-primary" style={{ fontStyle: "italic" }}>next crop</em>.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Pick your district and season. We'll rank the best-fit crops in 5 seconds.
        </p>
        <Link to="/crop-recommendation" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition">
          {t("Get Recommendation")} <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}