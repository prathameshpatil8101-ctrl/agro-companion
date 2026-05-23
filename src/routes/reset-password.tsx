import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Loader2, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, LabeledInput } from "./login";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — AgroVision AI" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash.includes("type=recovery") || window.location.hash.includes("access_token")) {
      setMode("update");
    }
  }, []);

  const onRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Check your email for the reset link.");
  };

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. You're signed in.");
    window.location.href = "/dashboard";
  };

  return <AuthShell title={mode === "request" ? "Reset password" : "Set new password"} subtitle={mode === "request" ? "We'll email you a secure reset link." : "Choose a new password for your account."}>
    {mode === "request" ? (
      <form onSubmit={onRequest} className="space-y-3">
        <LabeledInput label="Email" type="email" value={email} onChange={setEmail} required />
        <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Send reset link
        </button>
      </form>
    ) : (
      <form onSubmit={onUpdate} className="space-y-3">
        <LabeledInput label="New password (8+ characters)" type="password" value={password} onChange={setPassword} required />
        <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Update password
        </button>
      </form>
    )}
    <p className="text-center text-sm text-muted-foreground mt-6">
      Remember it? <Link to="/login" className="text-primary font-medium hover:underline">Back to sign in</Link>
    </p>
  </AuthShell>;
}