import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-secondary/30 mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Sprout className="h-5 w-5" /> AgroVision AI
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t("About desc")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{t("Quick Links")}</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><Link to="/crop-recommendation" className="hover:text-primary">{t("Crop Recommendation")}</Link></li>
            <li><Link to="/disease-diagnosis" className="hover:text-primary">{t("Disease Diagnosis")}</Link></li>
            <li><Link to="/market-prices" className="hover:text-primary">{t("Market Prices")}</Link></li>
            <li><Link to="/ai-chat" className="hover:text-primary">{t("AI Assistant")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{t("About")}</h4>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AgroVision AI. {t("All rights reserved")}</p>
        </div>
      </div>
    </footer>
  );
}