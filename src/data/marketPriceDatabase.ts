export interface MarketPrice {
  state: string;
  market: string;
  district: string;
  crop: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  unit: string;
  source: "curated" | "live";
  updatedAt?: string;
}

// Top 30 Maharashtra APMC mandis × major commodities (weekly curated baseline)
const mh = (district: string, market: string, rows: Array<[string, number, number]>): MarketPrice[] =>
  rows.map(([crop, mn, mx]) => ({
    state: "Maharashtra", district, market,
    crop, minPrice: mn, maxPrice: mx, avgPrice: Math.round((mn + mx) / 2),
    unit: "quintal", source: "curated" as const,
  }));

export const marketPrices: MarketPrice[] = [
  ...mh("Pune", "Pune APMC", [
    ["Onion", 1400, 2400], ["Tomato", 800, 1800], ["Sugarcane", 3100, 3600],
    ["Wheat", 2400, 2800], ["Jowar", 2200, 2900], ["Bajra", 2100, 2600],
    ["Soybean", 4100, 4700], ["Maize", 2050, 2400],
  ]),
  ...mh("Nashik", "Nashik APMC (Pimpalgaon)", [
    ["Onion", 1200, 2200], ["Grapes", 6000, 11000], ["Tomato", 600, 1600],
    ["Pomegranate", 5000, 9000], ["Soybean", 4200, 4800], ["Wheat", 2350, 2750],
    ["Maize", 2000, 2400],
  ]),
  ...mh("Nashik", "Lasalgaon APMC", [
    ["Onion", 1100, 2100], ["Tomato", 700, 1500], ["Wheat", 2350, 2700],
  ]),
  ...mh("Mumbai", "Vashi APMC (Mumbai)", [
    ["Onion", 1500, 2500], ["Tomato", 900, 2000], ["Banana", 1200, 2400],
    ["Mango", 6000, 14000], ["Vegetables", 1500, 3500], ["Coconut", 2500, 3500],
  ]),
  ...mh("Kolhapur", "Kolhapur APMC", [
    ["Sugarcane", 3100, 3600], ["Rice", 2300, 2800], ["Soybean", 4000, 4600],
    ["Groundnut", 5400, 6400], ["Turmeric", 8000, 11000], ["Chilli", 8000, 14000],
    ["Tur", 7800, 9500],
  ]),
  ...mh("Sangli", "Sangli APMC", [
    ["Sugarcane", 3100, 3600], ["Turmeric", 8500, 12500], ["Soybean", 4100, 4700],
    ["Jowar", 2300, 3000], ["Grapes", 5500, 10500], ["Groundnut", 5300, 6200],
  ]),
  ...mh("Satara", "Satara APMC", [
    ["Sugarcane", 3100, 3500], ["Rice", 2300, 2700], ["Soybean", 4100, 4700],
    ["Wheat", 2400, 2800],
  ]),
  ...mh("Ahmednagar", "Ahmednagar APMC", [
    ["Sugarcane", 3000, 3500], ["Onion", 1300, 2200], ["Bajra", 2100, 2600],
    ["Wheat", 2350, 2750], ["Soybean", 4100, 4700], ["Pomegranate", 4500, 8500],
  ]),
  ...mh("Solapur", "Solapur APMC", [
    ["Jowar", 2400, 3100], ["Sugarcane", 3050, 3550], ["Pomegranate", 4800, 9000],
    ["Grapes", 5000, 9000], ["Tur", 7800, 9400], ["Wheat", 2350, 2750],
    ["Maize", 2000, 2400], ["Onion", 1300, 2200],
  ]),
  ...mh("Aurangabad", "Aurangabad APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Maize", 2050, 2450], ["Jowar", 2300, 2900], ["Wheat", 2300, 2700],
  ]),
  ...mh("Jalna", "Jalna APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Sweet Lime", 1500, 3000],
    ["Tur", 7700, 9300], ["Bajra", 2100, 2600],
  ]),
  ...mh("Beed", "Beed APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Sugarcane", 3000, 3500],
    ["Bajra", 2100, 2600], ["Jowar", 2300, 2900], ["Tur", 7700, 9300],
  ]),
  ...mh("Latur", "Latur APMC", [
    ["Soybean", 4200, 4800], ["Tur", 7800, 9500], ["Sugarcane", 3050, 3550],
    ["Gram", 5300, 6000], ["Wheat", 2350, 2750],
  ]),
  ...mh("Dharashiv", "Dharashiv APMC", [
    ["Soybean", 4100, 4700], ["Tur", 7700, 9300], ["Jowar", 2300, 2900],
    ["Bajra", 2100, 2600], ["Sunflower", 5500, 6500], ["Gram", 5200, 5900],
  ]),
  ...mh("Nanded", "Nanded APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Jowar", 2300, 2900],
    ["Tur", 7700, 9300], ["Sugarcane", 3050, 3550], ["Turmeric", 8000, 11000],
  ]),
  ...mh("Parbhani", "Parbhani APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Wheat", 2300, 2700],
  ]),
  ...mh("Hingoli", "Hingoli APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Turmeric", 8500, 12000],
    ["Tur", 7700, 9300],
  ]),
  ...mh("Amravati", "Amravati APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Orange", 2500, 4500], ["Wheat", 2300, 2700], ["Gram", 5200, 5900],
  ]),
  ...mh("Akola", "Akola APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Jowar", 2300, 2900], ["Gram", 5200, 5900],
  ]),
  ...mh("Yavatmal", "Yavatmal APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Sunflower", 5500, 6500], ["Jowar", 2300, 2900],
  ]),
  ...mh("Buldhana", "Buldhana APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Wheat", 2300, 2700],
  ]),
  ...mh("Washim", "Washim APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Gram", 5200, 5900],
  ]),
  ...mh("Nagpur", "Nagpur APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Orange", 2800, 5000], ["Wheat", 2300, 2700], ["Gram", 5200, 5900],
    ["Maize", 2000, 2400],
  ]),
  ...mh("Wardha", "Wardha APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Orange", 2700, 4900],
    ["Tur", 7700, 9300],
  ]),
  ...mh("Chandrapur", "Chandrapur APMC", [
    ["Rice", 2300, 2900], ["Cotton", 7000, 7800], ["Soybean", 4100, 4700],
    ["Tur", 7700, 9300],
  ]),
  ...mh("Jalgaon", "Jalgaon APMC", [
    ["Banana", 1100, 2200], ["Cotton", 7000, 7800], ["Sugarcane", 3050, 3550],
    ["Wheat", 2350, 2750], ["Groundnut", 5400, 6400], ["Jowar", 2200, 2700],
  ]),
  ...mh("Dhule", "Dhule APMC", [
    ["Cotton", 7000, 7800], ["Jowar", 2200, 2700], ["Bajra", 2100, 2600],
    ["Wheat", 2350, 2750], ["Onion", 1200, 2100],
  ]),
  ...mh("Nandurbar", "Nandurbar APMC", [
    ["Cotton", 7000, 7800], ["Chilli", 8000, 14000], ["Maize", 2000, 2400],
    ["Tur", 7700, 9300],
  ]),
  ...mh("Ratnagiri", "Ratnagiri APMC", [
    ["Mango", 8000, 18000], ["Cashew", 13000, 18000], ["Coconut", 2500, 3500],
    ["Rice", 2400, 3000],
  ]),
  ...mh("Sindhudurg", "Sindhudurg APMC", [
    ["Mango", 9000, 20000], ["Cashew", 13000, 18000], ["Coconut", 2500, 3500],
  ]),

  // Other states (brief)
  { state: "Punjab", district: "Ludhiana", market: "Ludhiana APMC", crop: "Wheat", minPrice: 2350, maxPrice: 2750, avgPrice: 2550, unit: "quintal", source: "curated" },
  { state: "Punjab", district: "Ludhiana", market: "Ludhiana APMC", crop: "Rice", minPrice: 2400, maxPrice: 2900, avgPrice: 2650, unit: "quintal", source: "curated" },
  { state: "Uttar Pradesh", district: "Lucknow", market: "Lucknow APMC", crop: "Wheat", minPrice: 2350, maxPrice: 2750, avgPrice: 2550, unit: "quintal", source: "curated" },
  { state: "Uttar Pradesh", district: "Lucknow", market: "Lucknow APMC", crop: "Sugarcane", minPrice: 3200, maxPrice: 3700, avgPrice: 3450, unit: "quintal", source: "curated" },
  { state: "Madhya Pradesh", district: "Indore", market: "Indore APMC", crop: "Soybean", minPrice: 4100, maxPrice: 4700, avgPrice: 4400, unit: "quintal", source: "curated" },
  { state: "Karnataka", district: "Bengaluru", market: "Bengaluru APMC", crop: "Ragi", minPrice: 3500, maxPrice: 4200, avgPrice: 3850, unit: "quintal", source: "curated" },
  { state: "Tamil Nadu", district: "Chennai", market: "Chennai Market", crop: "Paddy", minPrice: 2150, maxPrice: 2550, avgPrice: 2350, unit: "quintal", source: "curated" },
  { state: "Gujarat", district: "Rajkot", market: "Rajkot APMC", crop: "Groundnut", minPrice: 5500, maxPrice: 6500, avgPrice: 6000, unit: "quintal", source: "curated" },
  { state: "Rajasthan", district: "Jodhpur", market: "Jodhpur APMC", crop: "Mustard", minPrice: 5500, maxPrice: 6500, avgPrice: 6000, unit: "quintal", source: "curated" },
];

export function getMarketPricesByLocation(state?: string, district?: string, crop?: string): MarketPrice[] {
  let out = marketPrices;
  if (state) {
    const s = state.toLowerCase();
    out = out.filter(p => p.state.toLowerCase() === s);
  }
  if (district) {
    const d = district.toLowerCase();
    out = out.filter(p =>
      p.district.toLowerCase().includes(d) ||
      p.market.toLowerCase().includes(d)
    );
  }
  if (crop) {
    const c = crop.toLowerCase();
    out = out.filter(p => p.crop.toLowerCase().includes(c));
  }
  return out.length ? out : marketPrices.filter(p => p.state === "Maharashtra");
}
