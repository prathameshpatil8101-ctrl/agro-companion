import { createFileRoute, Link, useNavigate, useSearch, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Loader2, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AppLogo } from "@/components/AppLogo";
import { toast } from "sonner";

const searchSchema = z.object({ redirect: z.string().optional().default("/dashboard") });

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: search.redirect as any });
  },
  head: () => ({ meta: [{ title: "Sign in — AgroVision AI" }, { name: "description", content: "Sign in to AgroVision AI to access your dashboard, saved plots and reminders." }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const { redirect: redirectTo } = useSearch({ from: "/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    nav({ to: redirectTo as any });
  };

  const onGoogle = async () => {
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + redirectTo });
    if (result.error) { toast.error("Google sign-in failed"); setGoogleLoading(false); }
  };

  return <AuthShell title="Welcome back" subtitle="Sign in to access your farm dashboard.">
    <button onClick={onGoogle} disabled={googleLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent transition disabled:opacity-60">
      {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
      Continue with Google
    </button>
    <Divider />
    <form onSubmit={onSubmit} className="space-y-3">
      <LabeledInput label="Email" type="email" value={email} onChange={setEmail} required />
      <LabeledInput label="Password" type="password" value={password} onChange={setPassword} required />
      <div className="flex justify-end -mt-1">
        <Link to="/reset-password" className="text-xs text-muted-foreground hover:text-primary">Forgot password?</Link>
      </div>
      <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} Sign in
      </button>
    </form>
    <p className="text-center text-sm text-muted-foreground mt-6">
      New to AgroVision? <Link to="/signup" className="text-primary font-medium hover:underline">Create account</Link>
    </p>
  </AuthShell>;
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-foreground text-background flex-col justify-between p-12">
        <div className="absolute inset-0 dot-bg opacity-10 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "color-mix(in oklab, var(--primary) 40%, transparent)" }} />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="bg-background rounded-xl p-1"><AppLogo size={32} /></div>
          <span className="font-semibold tracking-tight">AgroVision Intelligence</span>
        </Link>
        <div className="relative">
          <h2 className="text-4xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Smarter decisions. <em className="text-primary not-italic" style={{ fontStyle: "italic" }}>Better harvests.</em>
          </h2>
          <p className="mt-4 text-sm text-background/70 max-w-sm leading-relaxed">
            AI-powered crop recommendations, disease diagnosis, weather, and live mandi prices — built for Indian farmers.
          </p>
        </div>
        <div className="relative text-xs text-background/60">
          Maharashtra Edition · EN · हिन्दी · मराठी
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex justify-center mb-6"><AppLogo size={48} /></div>
          <h1 className="text-3xl tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1.5">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function LabeledInput({ label, type, value, onChange, required, placeholder }: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground/80">{label}</span>
      <input type={type ?? "text"} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Divider() {
  return <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-border" /><span className="text-[11px] uppercase tracking-wider text-muted-foreground">or</span><div className="h-px flex-1 bg-border" /></div>;
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.32z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}