import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { AppLogo } from "./AppLogo";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border bg-[var(--gradient-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <AppLogo size={36} />
            <span className="font-semibold tracking-tight">AgroVision Intelligence</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">{t("About desc")}</p>
          <div className="mt-5 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
            {["Open-Meteo", "data.gov.in", "ICAR", "NIC eNAM"].map(s => (
              <span key={s} className="rounded-full border border-border px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("Quick Links")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/crop-recommendation" className="hover:text-primary">{t("Crop Recommendation")}</Link></li>
            <li><Link to="/disease-diagnosis" className="hover:text-primary">{t("Disease Diagnosis")}</Link></li>
            <li><Link to="/market-prices" className="hover:text-primary">{t("Market Prices")}</Link></li>
            <li><Link to="/weather" className="hover:text-primary">{t("Weather")}</Link></li>
            <li><Link to="/schemes" className="hover:text-primary">Govt Schemes</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("About")}</h4>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Built for Indian farmers. Maharashtra-first datasets, English / हिन्दी / मराठी.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} AgroVision Intelligence. {t("All rights reserved")}</span>
          <span className="font-mono">v1.0 · Maharashtra Edition</span>
        </div>
      </div>
    </footer>
  );
}
