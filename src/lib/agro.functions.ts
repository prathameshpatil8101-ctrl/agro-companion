import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { recommendFromCsv } from "./csvCrops";
import { recommendCropsByLocation } from "../data/cropDatabase";
import { getMarketPricesByLocation } from "../data/marketPriceDatabase";
import { pickFallbackDisease } from "../data/diseaseDatabase";

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callAI(messages: any[], model = "google/gemini-3-flash-preview"): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY missing");
  const res = await fetch(AI_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`AI error ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function reasonForCrops(crops: string[], ctx: string): Promise<Record<string, string>> {
  try {
    const prompt = `For each of these crops give ONE concise sentence (max 22 words) on why it suits ${ctx}. Reply as JSON object: {"crop": "reason"}. Crops: ${crops.join(", ")}`;
    const content = await callAI([
      { role: "system", content: "You are an expert Indian agricultural advisor. Respond ONLY with valid JSON." },
      { role: "user", content: prompt },
    ]);
    const m = content.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
  } catch (e) {
    console.error("reasonForCrops failed", e);
  }
  return Object.fromEntries(crops.map(c => [c, `${c} is well-suited to ${ctx}.`]));
}

const cropInput = z.object({
  method: z.enum(["simple", "advanced"]),
  state: z.string().optional().default(""),
  district: z.string().optional().default(""),
  village: z.string().optional().default(""),
  soilType: z.string().optional().default(""),
  season: z.string().optional().default(""),
  water: z.string().optional().default(""),
  N: z.number().optional(), P: z.number().optional(), K: z.number().optional(),
  ph: z.number().optional(), temperature: z.number().optional(),
  humidity: z.number().optional(), rainfall: z.number().optional(),
});

export const recommendCrops = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => cropInput.parse(d))
  .handler(async ({ data }) => {
    let crops: string[] = [];
    let ctx = "";
    if (data.method === "advanced" && data.N != null) {
      // Advanced: return exactly 1 best crop from dataset
      const bestCrop = recommendFromCsv({
        N: data.N!, P: data.P!, K: data.K!,
        temperature: data.temperature ?? 25, humidity: data.humidity ?? 60,
        ph: data.ph ?? 6.5, rainfall: data.rainfall ?? 100,
      });
      crops = bestCrop.slice(0, 1); // exactly 1 best match
      ctx = `N=${data.N}, P=${data.P}, K=${data.K}, pH=${data.ph}, temp=${data.temperature}°C, humidity=${data.humidity}%, rainfall=${data.rainfall}mm in ${data.state || "India"}`;
    } else {
      const matches = recommendCropsByLocation({
        state: data.state, district: data.district,
        soilType: data.soilType, season: data.season, water: data.water,
      });
      crops = matches.map(m => m.name).slice(0, 3); // exactly 3 crops for simple
      ctx = `${data.state}/${data.district}, ${data.season} season, ${data.soilType} soil, ${data.water} water`;
    }
    const reasons = await reasonForCrops(crops, ctx);
    return { crops: crops.map(c => ({ name: c, reason: reasons[c] || reasons[c.toLowerCase()] || `${c} suits these conditions.` })) };
  });

const diseaseInput = z.object({ imageBase64: z.string().min(10) });

export const diagnoseDisease = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => diseaseInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const content = await callAI([
        { role: "system", content: "You are an expert plant pathologist for Indian crops (Maharashtra focus). Be honest about uncertainty. Always reply with valid JSON only." },
        { role: "user", content: [
          { type: "text", text: `Look at this image. First decide: is this a clear photo of a plant or leaf? If NOT (e.g. selfie, screenshot, blurry, dark, non-plant), set isPlant=false and confidence=0 and explain in symptoms what to retake. If YES, identify the most likely disease for an Indian crop. Provide a confidence 0-100 (be honest — give <60 if photo is blurry, partial, or ambiguous). Reply ONLY as this exact JSON:\n{"isPlant":true|false,"cropName":"...","diseaseName":"...","confidence":0-100,"alternatives":["...","..."],"symptoms":"...","cause":"...","medicine":"...","treatment":"...","prevention":"...","organicTreatment":"...","photoTips":"..."}` },
          { type: "image_url", image_url: { url: data.imageBase64 } },
        ]},
      ], "google/gemini-2.5-flash");
      const m = content.match(/\{[\s\S]*\}/);
      if (m) {
        const parsed = JSON.parse(m[0]);
        return {
          isPlant: parsed.isPlant !== false,
          cropName: parsed.cropName || "Unknown",
          diseaseName: parsed.diseaseName || "Unidentified",
          confidence: Math.max(0, Math.min(100, Number(parsed.confidence) || 0)),
          alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives.slice(0, 4) : [],
          symptoms: parsed.symptoms || "",
          cause: parsed.cause || "",
          medicine: parsed.medicine || "",
          treatment: parsed.treatment || "",
          prevention: parsed.prevention || "",
          organicTreatment: parsed.organicTreatment || "",
          photoTips: parsed.photoTips || "Take a sharp daylight close-up of a single affected leaf, filling most of the frame. Avoid shadows and blur.",
        };
      }
    } catch (e) {
      console.error("disease AI failed", e);
    }
    const fb = pickFallbackDisease();
    return { ...fb, isPlant: true, confidence: 40, alternatives: [], photoTips: "We couldn't read this image. Try a sharp daylight close-up of one affected leaf." };
  });

const weatherInput = z.object({ location: z.string().min(1) });

// Pre-mapped coordinates for all 36 Maharashtra districts + common cities
const MAHARASHTRA_COORDS: Record<string, { lat: number; lon: number; name: string }> = {
  "pune": { lat: 18.5204, lon: 73.8567, name: "Pune, Maharashtra" },
  "mumbai": { lat: 19.0760, lon: 72.8777, name: "Mumbai, Maharashtra" },
  "mumbai city": { lat: 18.9388, lon: 72.8354, name: "Mumbai City, Maharashtra" },
  "mumbai suburban": { lat: 19.1716, lon: 72.9498, name: "Mumbai Suburban, Maharashtra" },
  "thane": { lat: 19.2183, lon: 72.9781, name: "Thane, Maharashtra" },
  "nashik": { lat: 19.9975, lon: 73.7898, name: "Nashik, Maharashtra" },
  "nagpur": { lat: 21.1458, lon: 79.0882, name: "Nagpur, Maharashtra" },
  "aurangabad": { lat: 19.8762, lon: 75.3433, name: "Aurangabad (Chhatrapati Sambhajinagar), Maharashtra" },
  "solapur": { lat: 17.6805, lon: 75.9064, name: "Solapur, Maharashtra" },
  "kolhapur": { lat: 16.7050, lon: 74.2433, name: "Kolhapur, Maharashtra" },
  "amravati": { lat: 20.9374, lon: 77.7796, name: "Amravati, Maharashtra" },
  "ahmednagar": { lat: 19.0952, lon: 74.7480, name: "Ahmednagar, Maharashtra" },
  "latur": { lat: 18.4088, lon: 76.5604, name: "Latur, Maharashtra" },
  "dhule": { lat: 20.9042, lon: 74.7749, name: "Dhule, Maharashtra" },
  "jalgaon": { lat: 21.0077, lon: 75.5626, name: "Jalgaon, Maharashtra" },
  "sangli": { lat: 16.8524, lon: 74.5815, name: "Sangli, Maharashtra" },
  "satara": { lat: 17.6805, lon: 74.0183, name: "Satara, Maharashtra" },
  "raigad": { lat: 18.5122, lon: 73.1810, name: "Raigad, Maharashtra" },
  "ratnagiri": { lat: 16.9944, lon: 73.3000, name: "Ratnagiri, Maharashtra" },
  "sindhudurg": { lat: 16.3500, lon: 73.5667, name: "Sindhudurg, Maharashtra" },
  "wardha": { lat: 20.7453, lon: 78.5997, name: "Wardha, Maharashtra" },
  "yavatmal": { lat: 20.3888, lon: 78.1204, name: "Yavatmal, Maharashtra" },
  "akola": { lat: 20.7059, lon: 77.0001, name: "Akola, Maharashtra" },
  "washim": { lat: 20.1118, lon: 77.1460, name: "Washim, Maharashtra" },
  "buldana": { lat: 20.5292, lon: 76.1842, name: "Buldhana, Maharashtra" },
  "buldhana": { lat: 20.5292, lon: 76.1842, name: "Buldhana, Maharashtra" },
  "jalna": { lat: 19.8347, lon: 75.8816, name: "Jalna, Maharashtra" },
  "beed": { lat: 18.9891, lon: 75.7601, name: "Beed, Maharashtra" },
  "nanded": { lat: 19.1383, lon: 77.3210, name: "Nanded, Maharashtra" },
  "osmanabad": { lat: 18.1860, lon: 76.0386, name: "Dharashiv (Osmanabad), Maharashtra" },
  "dharashiv": { lat: 18.1860, lon: 76.0386, name: "Dharashiv, Maharashtra" },
  "parbhani": { lat: 19.2704, lon: 76.7749, name: "Parbhani, Maharashtra" },
  "hingoli": { lat: 19.7178, lon: 77.1476, name: "Hingoli, Maharashtra" },
  "nandurbar": { lat: 21.3681, lon: 74.2430, name: "Nandurbar, Maharashtra" },
  "palghar": { lat: 19.6967, lon: 72.7697, name: "Palghar, Maharashtra" },
  "chandrapur": { lat: 19.9615, lon: 79.2961, name: "Chandrapur, Maharashtra" },
  "gadchiroli": { lat: 20.1809, lon: 80.0012, name: "Gadchiroli, Maharashtra" },
  "gondia": { lat: 21.4624, lon: 80.1963, name: "Gondia, Maharashtra" },
  "bhandara": { lat: 21.1661, lon: 79.6486, name: "Bhandara, Maharashtra" },
};

function findMaharashtraCoords(location: string): { lat: number; lon: number; name: string } | null {
  const key = location.toLowerCase().trim();
  // Exact match
  if (MAHARASHTRA_COORDS[key]) return MAHARASHTRA_COORDS[key];
  // Partial match
  for (const [k, v] of Object.entries(MAHARASHTRA_COORDS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

export const getWeather = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => weatherInput.parse(d))
  .handler(async ({ data }) => {
    let place: any = null;
    const latlng = data.location.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (latlng) {
      const lat = Number(latlng[1]); const lon = Number(latlng[2]);
      try {
        const r = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en`);
        const j = await r.json();
        place = j?.results?.[0] || { name: `${lat.toFixed(2)}, ${lon.toFixed(2)}`, latitude: lat, longitude: lon, country_code: "IN", admin1: "" };
      } catch {
        place = { name: `${lat.toFixed(2)}, ${lon.toFixed(2)}`, latitude: lat, longitude: lon, country_code: "IN", admin1: "" };
      }
    } else {
      // 1. Try our hardcoded Maharashtra district map first
      const mh = findMaharashtraCoords(data.location);
      if (mh) {
        place = { name: mh.name, latitude: mh.lat, longitude: mh.lon, country_code: "IN", admin1: "Maharashtra" };
      } else {
        // 2. Try Open-Meteo geocoding with India scope
        try {
          const geoIn = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.location)}&count=5&countryCode=IN&language=en`);
          const gjIn = await geoIn.json();
          place = gjIn?.results?.[0];
        } catch { /* ignore */ }
        // 3. Global fallback
        if (!place) {
          try {
            const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.location)}&count=1`);
            const gj = await geo.json();
            place = gj?.results?.[0];
          } catch { /* ignore */ }
        }
      }
    }
    if (!place) throw new Error("Location not found");
    const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=7`);
    const wj = await w.json();
    const codeMap: Record<number, string> = {
      0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
      61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow",
      80: "Showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Storm", 99: "Storm",
    };
    const advisory: string[] = [];
    const cur = wj.current;
    if (cur.precipitation > 1) advisory.push("Rain now — postpone spraying and irrigation.");
    if (cur.wind_speed_10m > 25) advisory.push("Strong wind — avoid pesticide spraying today.");
    if (cur.temperature_2m > 38) advisory.push("Heat stress — irrigate early morning or evening.");
    const rainNext = (wj.daily?.precipitation_probability_max ?? []).slice(0, 3).some((p: number) => (p ?? 0) > 60);
    if (rainNext) advisory.push("Rain likely in next 3 days — plan harvest / fertilizer accordingly.");
    if (!advisory.length) advisory.push("Good window for routine field work and spraying.");

    return {
      location: [place.name, place.admin1, place.country_code].filter(Boolean).join(", "),
      temperature: wj.current.temperature_2m,
      humidity: wj.current.relative_humidity_2m,
      windSpeed: wj.current.wind_speed_10m,
      precipitation: wj.current.precipitation,
      condition: codeMap[wj.current.weather_code] || "—",
      advisory,
      forecast: wj.daily.time.map((t: string, i: number) => ({
        day: new Date(t).toLocaleDateString("en-IN", { weekday: "short" }),
        high: wj.daily.temperature_2m_max[i],
        low: wj.daily.temperature_2m_min[i],
        condition: codeMap[wj.daily.weathercode[i]] || "—",
        rainChance: wj.daily.precipitation_probability_max[i] ?? 0,
      })),
    };
  });

const marketInput = z.object({ state: z.string().optional(), district: z.string().optional() });
export const getMarketPrices = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => marketInput.parse(d))
  .handler(async ({ data }) => ({ prices: getMarketPricesByLocation(data.state, data.district) }));

const chatInput = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
});
export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => chatInput.parse(d))
  .handler(async ({ data }) => {
    const reply = await callAI([
      { role: "system", content: "You are AgroVision AI, an expert farming assistant for Indian farmers. Answer questions about crops, diseases, fertilizers, irrigation, government schemes, organic farming and market prices. Use simple language. Be concise and actionable. Use markdown for lists when helpful." },
      ...data.messages,
    ]);
    return { reply };
  });

const organicInput = z.object({ crop: z.string().min(1) });
export const getOrganicTips = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => organicInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const content = await callAI([
        { role: "system", content: "You are an organic farming expert for Indian crops. Reply with valid JSON only." },
        { role: "user", content: `For the crop "${data.crop}" provide organic farming guidance. Reply as: {"tips":["...","...","...","...","..."],"certificationInfo":"...","marketBenefit":"..."} 5-7 practical tips. Indian context.` },
      ]);
      const m = content.match(/\{[\s\S]*\}/);
      if (m) return { crop: data.crop, ...JSON.parse(m[0]) };
    } catch (e) { console.error(e); }
    return {
      crop: data.crop,
      tips: [
        "Use compost and vermicompost as primary soil fertility input.",
        "Apply neem oil spray (5ml/L) for pest control every 10 days.",
        "Practice crop rotation with legumes to improve soil nitrogen.",
        "Use mulching to retain moisture and suppress weeds.",
        "Install pheromone traps and release Trichogramma for natural pest control.",
      ],
      certificationInfo: "Apply for PGS-India (group certification, low cost) or NPOP (export-grade). Conversion takes 2-3 years.",
      marketBenefit: "Organic produce typically fetches 20-50% premium over conventional in eNAM, FPO outlets and organic mandis.",
    };
  });
