import csvText from "../data/Crop_recommendation.csv?raw";

export interface CropRow {
  N: number; P: number; K: number;
  temperature: number; humidity: number; ph: number; rainfall: number;
  label: string;
}

let cache: CropRow[] | null = null;

export function loadCropRows(): CropRow[] {
  if (cache) return cache;
  const lines = csvText.trim().split(/\r?\n/);
  lines.shift();
  cache = lines.map((line) => {
    const [N, P, K, t, h, ph, r, label] = line.split(",");
    return {
      N: +N, P: +P, K: +K,
      temperature: +t, humidity: +h, ph: +ph, rainfall: +r,
      label: (label || "").trim(),
    };
  }).filter(r => r.label);
  return cache;
}

export interface CsvQuery {
  N: number; P: number; K: number;
  temperature: number; humidity: number; ph: number; rainfall: number;
}

export function recommendFromCsv(q: CsvQuery): string[] {
  const rows = loadCropRows();
  const matches = rows.filter(r =>
    Math.abs(r.N - q.N) <= 25 &&
    Math.abs(r.P - q.P) <= 25 &&
    Math.abs(r.K - q.K) <= 25 &&
    Math.abs(r.temperature - q.temperature) <= 5 &&
    Math.abs(r.humidity - q.humidity) <= 12 &&
    Math.abs(r.ph - q.ph) <= 1.2 &&
    Math.abs(r.rainfall - q.rainfall) <= 60
  );
  const counts = new Map<string, number>();
  for (const m of matches) counts.set(m.label, (counts.get(m.label) || 0) + 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(e => e[0]);
  if (sorted.length >= 3) return sorted.slice(0, 3).map(cap);
  const scored = rows.map(r => {
    const d =
      Math.abs(r.N - q.N) / 50 + Math.abs(r.P - q.P) / 50 + Math.abs(r.K - q.K) / 50 +
      Math.abs(r.temperature - q.temperature) / 10 +
      Math.abs(r.humidity - q.humidity) / 30 +
      Math.abs(r.ph - q.ph) / 3 + Math.abs(r.rainfall - q.rainfall) / 150;
    return { label: r.label, d };
  }).sort((a, b) => a.d - b.d);
  const seen = new Set(sorted);
  for (const s of scored) {
    if (!seen.has(s.label)) {
      sorted.push(s.label); seen.add(s.label);
      if (sorted.length === 3) break;
    }
  }
  return sorted.slice(0, 3).map(cap);
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }