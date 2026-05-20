import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sprout, Leaf, Bug, LineChart, CloudSun, MessageCircle, Flower2, MessageSquareHeart, ArrowRight } from "lucide-react";

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
  { to: "/crop-recommendation", icon: Leaf, titleKey: "Crop Recommendation", descKey: "Crop Recommendation desc", color: "from-emerald-500 to-green-600" },
  { to: "/disease-diagnosis", icon: Bug, titleKey: "Disease Diagnosis", descKey: "Disease Diagnosis desc", color: "from-rose-500 to-red-600" },
  { to: "/market-prices", icon: LineChart, titleKey: "Market Prices", descKey: "Market Prices desc", color: "from-amber-500 to-orange-600" },
  { to: "/weather", icon: CloudSun, titleKey: "Weather", descKey: "Weather desc", color: "from-sky-500 to-blue-600" },
  { to: "/ai-chat", icon: MessageCircle, titleKey: "AI Assistant", descKey: "AI Assistant desc", color: "from-violet-500 to-purple-600" },
  { to: "/organic-farming", icon: Flower2, titleKey: "Organic Farming", descKey: "Organic Farming desc", color: "from-lime-500 to-emerald-600" },
] as const;

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sprout className="h-3.5 w-3.5" /> AI for Indian Agriculture
          </div>
          <h1 className="mt-5 text-4xl sm:text-6xl font-bold leading-tight max-w-3xl">{t("Empowering Farmers")}</h1>
          <p className="mt-5 text-base sm:text-lg max-w-2xl text-white/90">{t("Hero Description")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/crop-recommendation" className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-5 py-3 font-semibold shadow-lg hover:scale-[1.02] transition">
              {t("Get Started")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ai-chat" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-semibold hover:bg-white/10 transition">
              {t("AI Farming Assistant")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">All-in-one farming toolkit</h2>
        <p className="text-center text-muted-foreground mt-2 max-w-xl mx-auto">Powered by AI, trained on Indian crops, calibrated for your soil and season.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <Link key={f.to} to={f.to} className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t(f.titleKey)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(f.descKey)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14 grid sm:grid-cols-4 gap-6 text-center">
          {[
            { n: "22+", l: "Crops in dataset" },
            { n: "2,200", l: "Soil-condition rows" },
            { n: "3", l: "Indian languages" },
            { n: "100%", l: "Free for farmers" },
          ].map(s => (
            <div key={s.l}>
              <div className="text-4xl font-bold text-primary">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <MessageSquareHeart className="h-10 w-10 text-primary mx-auto" />
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold">Tell us what would help your farm</h2>
        <p className="text-muted-foreground mt-2">Your feedback shapes the next features we build.</p>
        <Link to="/feedback" className="mt-6 inline-flex rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-90 transition">
          Share Feedback
        </Link>
      </section>
    </div>
  );
}