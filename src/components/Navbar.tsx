import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, LayoutDashboard, LogOut, User } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AppLogo } from "./AppLogo";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

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
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "glass-card border-b border-border" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <AppLogo size={36} />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">AgroVision</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Intelligence</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                pathname === l.to ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="ml-2"><LanguageSwitcher /></div>
          {session ? (
            <>
              <Link to="/dashboard" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-[13px] font-medium hover:bg-primary/15 transition">
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </Link>
              <button onClick={handleSignOut} className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[13px] font-medium hover:bg-accent transition" title="Sign out">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-1.5 text-[13px] font-medium hover:opacity-90 transition">
              <LogIn className="h-3.5 w-3.5" /> Login
            </Link>
          )}
        </nav>
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          {session ? (
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-accent" aria-label="dashboard"><User className="h-5 w-5" /></Link>
          ) : (
            <Link to="/login" className="p-2 rounded-lg hover:bg-accent" aria-label="login"><LogIn className="h-5 w-5" /></Link>
          )}
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
          {session ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-primary">Dashboard</Link>
              <button onClick={() => { setOpen(false); handleSignOut(); }} className="text-left px-3 py-2 rounded-lg text-sm font-medium text-foreground/70">Sign out</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-primary">Login / Sign up</Link>
          )}
        </nav>
      )}
    </header>
  );
}