import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Sprout, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LINKS = [
  { to: "/", key: "Home" },
  { to: "/crop-recommendation", key: "Crop Recommendation" },
  { to: "/disease-diagnosis", key: "Disease Diagnosis" },
  { to: "/market-prices", key: "Market Prices" },
  { to: "/weather", key: "Weather" },
  { to: "/ai-chat", key: "AI Assistant" },
  { to: "/organic-farming", key: "Organic Farming" },
  { to: "/feedback", key: "Feedback" },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </span>
          AgroVision AI
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary hover:bg-accent"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="ml-2"><LanguageSwitcher /></div>
        </nav>
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-accent" aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3 flex flex-col gap-1">
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground/70"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}