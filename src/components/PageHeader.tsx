import { LucideIcon } from "lucide-react";

export function PageHeader({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-12 text-primary-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            {subtitle && <p className="text-white/85 mt-1 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}