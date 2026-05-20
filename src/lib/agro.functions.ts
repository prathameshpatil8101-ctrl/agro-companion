import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { recommendFromCsv } from "./csvCrops";
import { getCropsByLocation, filterBySeasonAndSoil } from "../data/cropDatabase";
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
      crops = recommendFromCsv({
        N: data.N!, P: data.P!, K: data.K!,
        temperature: data.temperature ?? 25, humidity: data.humidity ?? 60,
        ph: data.ph ?? 6.5, rainfall: data.rainfall ?? 100,
      });
      ctx = `N=${data.N}, P=${data.P}, K=${data.K}, pH=${data.ph}, temp=${data.temperature}°C, humidity=${data.humidity}%, rainfall=${data.rainfall}mm in ${data.state || "India"}`;
    } else {
      const list = getCropsByLocation(data.state, data.district);
      crops = filterBySeasonAndSoil(list, data.season, data.soilType);
      if (crops.length < 3) crops = list.slice(0, 3);
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
        { role: "system", content: "You are an expert plant pathologist for Indian crops. Always reply with valid JSON only." },
        { role: "user", content: [
          { type: "text", text: `Analyze this plant/leaf image. Respond ONLY in this exact JSON format:\n{"cropName":"...","diseaseName":"...","symptoms":"...","cause":"...","medicine":"...","treatment":"...","prevention":"...","organicTreatment":"..."}` },
          { type: "image_url", image_url: { url: data.imageBase64 } },
        ]},
      ], "google/gemini-2.5-flash");
      const m = content.match(/\{[\s\S]*\}/);
      if (m) return JSON.parse(m[0]);
    } catch (e) {
      console.error("disease AI failed", e);
    }
    return pickFallbackDisease();
  });

const weatherInput = z.object({ location: z.string().min(1) });

export const getWeather = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => weatherInput.parse(d))
  .handler(async ({ data }) => {
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.location)}&count=1`);
    const gj = await geo.json();
    const place = gj?.results?.[0];
    if (!place) throw new Error("Location not found");
    const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=7`);
    const wj = await w.json();
    const codeMap: Record<number, string> = {
      0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
      61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow",
      80: "Showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Storm", 99: "Storm",
    };
    return {
      location: `${place.name}, ${place.country_code || ""}`,
      temperature: wj.current.temperature_2m,
      humidity: wj.current.relative_humidity_2m,
      windSpeed: wj.current.wind_speed_10m,
      precipitation: wj.current.precipitation,
      condition: codeMap[wj.current.weather_code] || "—",
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