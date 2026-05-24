import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Bug, Upload, Loader2, AlertTriangle, Camera, RefreshCw } from "lucide-react";
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
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fn = useServerFn(diagnoseDisease);
  const m = useMutation({ mutationFn: (b: string) => fn({ data: { imageBase64: b } }) });

  const processFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please use an image under 10MB.");
      return;
    }
    const r = new FileReader();
    r.onload = () => {
      const b = r.result as string;
      setPreview(b);
      m.mutate(b);
    };
    r.onerror = () => alert("Could not read the file. Please try a different image.");
    r.readAsDataURL(f);
  }, [m]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  const reset = () => { setPreview(null); m.reset(); };

  return (
    <div>
      <PageHeader icon={Bug} title="Disease Diagnosis" subtitle="Upload a clear photo of an affected leaf — our AI identifies the disease and recommends treatment." />
      <div className="mx-auto max-w-4xl px-6 py-10 grid lg:grid-cols-2 gap-8">
        {/* Upload panel */}
        <div className="space-y-3">
          {/* Hidden inputs */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed transition cursor-pointer min-h-64 flex items-center justify-center
              ${dragOver ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-accent/40"}`}
          >
            {preview ? (
              <div className="p-4 text-center">
                <img src={preview} alt="leaf preview" className="mx-auto max-h-56 rounded-lg object-contain" />
                <p className="text-xs text-muted-foreground mt-2">Click to upload a different image</p>
              </div>
            ) : (
              <div className="py-10 px-6 text-center text-muted-foreground">
                <Upload className="h-10 w-10 mx-auto text-primary mb-3" />
                <p className="font-medium text-foreground">Drag & drop or click to upload</p>
                <p className="text-sm mt-1">JPG / PNG — clear daylight photo of affected leaf</p>
              </div>
            )}
          </div>

          {/* Camera button for mobile */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent transition"
          >
            <Camera className="h-4 w-4" /> Take Photo with Camera
          </button>

          {preview && (
            <button onClick={reset} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition text-muted-foreground">
              <RefreshCw className="h-4 w-4" /> Start Over
            </button>
          )}

          <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <strong>Tips for best results:</strong> Take a sharp, well-lit close-up of one affected leaf filling most of the frame. Avoid blurry or dark photos.
          </div>
        </div>

        {/* Results panel */}
        <div>
          {m.isPending && (
            <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" /> Analyzing image with AI…
            </div>
          )}
          {m.isError && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
              <p className="font-semibold">Analysis failed</p>
              <p className="mt-1">Could not connect to the AI. Please check your connection and try again.</p>
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
                  <div className="font-semibold text-amber-900">Low confidence ({m.data.confidence}%) — please retry with a clearer photo</div>
                  <p className="mt-1 text-amber-800">{m.data.photoTips}</p>
                </div>
              ) : null}
              {m.data.isPlant !== false && (
                <>
                  <div className="flex items-center gap-2 text-destructive font-semibold">
                    <AlertTriangle className="h-5 w-5" /> {m.data.diseaseName}
                  </div>
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
                  <Section title="Organic Treatment Option" body={m.data.organicTreatment} highlight />
                </>
              )}
            </div>
          )}
          {!m.data && !m.isPending && !m.isError && (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-sm text-muted-foreground">
              Upload a leaf photo and results will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, body, highlight }: { title: string; body: string; highlight?: boolean }) {
  if (!body) return null;
  return (
    <div className={highlight ? "rounded-lg bg-primary/10 p-3 border border-primary/20" : ""}>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</h4>
      <p className="text-sm mt-1 text-foreground/90">{body}</p>
    </div>
  );
}
