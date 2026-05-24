import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AuthShell, LabeledInput } from "./login";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Create account — AgroVision AI" }, { name: "description", content: "Create a free AgroVision AI account to save your farm plots, scans and reminders." }] }),
  component: SignupPage,
});

function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: window.location.origin + "/dashboard" },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    // If Supabase auto-confirms (no email confirm required) — go straight to dashboard
    if (data.session) { toast.success("Account created! Welcome to AgroVision."); nav({ to: "/dashboard" }); return; }
    // If email confirmation is enabled, inform the user clearly
    toast.success("Account created! Please check your email and click the verification link, then come back and sign in.");
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) toast.error("Google sign-up failed");
  };

  return <AuthShell title="Create your account" subtitle="Free for farmers. No ads. No data selling.">
    <button onClick={onGoogle} className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent transition">
      <GoogleIcon /> Continue with Google
    </button>
    <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-border" /><span className="text-[11px] uppercase tracking-wider text-muted-foreground">or</span><div className="h-px flex-1 bg-border" /></div>
    <form onSubmit={onSubmit} className="space-y-3">
      <LabeledInput label="Full name" value={name} onChange={setName} required />
      <LabeledInput label="Email" type="email" value={email} onChange={setEmail} required />
      <LabeledInput label="Password (6+ characters)" type="password" value={password} onChange={setPassword} required />
      <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Create account
      </button>
    </form>
    <p className="text-center text-sm text-muted-foreground mt-6">
      Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
    </p>
  </AuthShell>;
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
