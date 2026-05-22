import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Bug, Upload, Loader2, AlertTriangle } from "lucide-react";
import { diagnoseDisease } from "@/lib/agro.functions";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/disease-diagnosis")({
  head: () => ({ meta: [
    { title: "Plant Disease Diagnosis — AgroVision AI" },
    { name: "description", content: "Upload a leaf photo and get instant AI-powered diagnosis and treatment advice." },
  ]}),
  component: Disease,
});

function Disease() {
  const [preview, setPreview] = useState<string | null>(null);
  const fn = useServerFn(diagnoseDisease);
  const m = useMutation({ mutationFn: (b: string) => fn({ data: { imageBase64: b } }) });

  const onFile = (f: File) => {
    const r = new FileReader();
    r.onload = () => { const b = r.result as string; setPreview(b); m.mutate(b); };
    r.readAsDataURL(f);
  };

  return (
    <div>
      <PageHeader icon={Bug} title="Disease Diagnosis" subtitle="Upload a clear photo of an affected leaf — our AI identifies the disease and recommends treatment." />
      <div className="mx-auto max-w-4xl px-6 py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <label className="block rounded-2xl border-2 border-dashed border-border bg-card hover:bg-accent/40 transition cursor-pointer p-8 text-center">
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
            {preview ? (
              <img src={preview} alt="leaf preview" className="mx-auto max-h-72 rounded-lg" />
            ) : (
              <div className="py-10 text-muted-foreground">
                <Upload className="h-10 w-10 mx-auto text-primary" />
                <p className="mt-3 font-medium text-foreground">Drag & drop or click to upload</p>
                <p className="text-sm mt-1">JPG / PNG up to ~5MB</p>
              </div>
            )}
          </label>
        </div>
        <div>
          {m.isPending && (
            <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" /> Analyzing image with AI…
            </div>
          )}
          {m.data && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              {m.data.isPlant === false ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm">
                  <div className="font-semibold text-amber-900">This doesn't look like a plant leaf.</div>
                  <p className="mt-1 text-amber-800">{m.data.photoTips}</p>
                </div>
              ) : (m.data.confidence ?? 0) < 60 ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm">
                  <div className="font-semibold text-amber-900">Low confidence ({m.data.confidence}%) — please retry</div>
                  <p className="mt-1 text-amber-800">{m.data.photoTips}</p>
                </div>
              ) : null}
              {m.data.isPlant !== false && (
                <>
              <div className="flex items-center gap-2 text-destructive font-semibold"><AlertTriangle className="h-5 w-5" /> {m.data.diseaseName}</div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Crop:</span>
                <span className="font-medium">{m.data.cropName}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold">
                  {m.data.confidence}% confidence
                </span>
              </div>
              {m.data.alternatives?.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Other possibilities: {m.data.alternatives.join(" · ")}
                </div>
              )}
              <Section title="Symptoms" body={m.data.symptoms} />
              <Section title="Cause" body={m.data.cause} />
              <Section title="Recommended Medicine" body={m.data.medicine} />
              <Section title="Treatment" body={m.data.treatment} />
              <Section title="Prevention" body={m.data.prevention} />
              <Section title="Organic Option" body={m.data.organicTreatment} highlight />
                </>
              )}
            </div>
          )}
          {!m.data && !m.isPending && (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-sm text-muted-foreground">
              Results will appear here after upload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function Section({ title, body, highlight }: { title: string; body: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-lg bg-primary/10 p-3 border border-primary/20" : ""}>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</h4>
      <p className="text-sm mt-1 text-foreground/90">{body}</p>
    </div>
  );
}