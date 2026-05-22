import { LucideIcon } from "lucide-react";

export function PageHeader({ icon: Icon, title, subtitle, eyebrow }: { icon: LucideIcon; title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-[var(--gradient-subtle)]">
      <div className="absolute inset-0 dot-bg opacity-60" />
      <div className="blob animate-float" style={{ background: "color-mix(in oklab, var(--primary) 30%, transparent)", width: 380, height: 380, top: -120, right: -100 }} />
      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-12">
        <div className="flex items-start gap-5 animate-rise">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background shadow-soft">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{eyebrow || "AgroVision · Tool"}</div>
            <h1 className="mt-1 text-4xl sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-3 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}