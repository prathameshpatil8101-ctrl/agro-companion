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
  // Score every row by weighted distance — lower = better match
  const scored = rows.map(r => {
    const d =
      Math.abs(r.N - q.N) / 50 +
      Math.abs(r.P - q.P) / 50 +
      Math.abs(r.K - q.K) / 50 +
      Math.abs(r.temperature - q.temperature) / 10 +
      Math.abs(r.humidity - q.humidity) / 30 +
      Math.abs(r.ph - q.ph) / 3 +
      Math.abs(r.rainfall - q.rainfall) / 150;
    return { label: r.label, d };
  }).sort((a, b) => a.d - b.d);

  // Count the best-matching crop by frequency among top 50 matches
  const top50 = scored.slice(0, 50);
  const counts = new Map<string, number>();
  for (const s of top50) counts.set(s.label, (counts.get(s.label) || 0) + 1);
  const winner = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || scored[0].label;
  return [cap(winner)];
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
