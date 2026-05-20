export interface MarketPrice {
  state: string; market: string; crop: string;
  minPrice: number; maxPrice: number; avgPrice: number; unit: string;
}

export const marketPrices: MarketPrice[] = [
  { state: "Maharashtra", market: "Kolhapur APMC", crop: "Sugarcane", minPrice: 3000, maxPrice: 3500, avgPrice: 3250, unit: "quintal" },
  { state: "Maharashtra", market: "Kolhapur APMC", crop: "Rice", minPrice: 2200, maxPrice: 2600, avgPrice: 2400, unit: "quintal" },
  { state: "Maharashtra", market: "Kolhapur APMC", crop: "Soybean", minPrice: 3800, maxPrice: 4500, avgPrice: 4150, unit: "quintal" },
  { state: "Maharashtra", market: "Kolhapur APMC", crop: "Groundnut", minPrice: 4500, maxPrice: 5200, avgPrice: 4850, unit: "quintal" },
  { state: "Maharashtra", market: "Pune APMC", crop: "Sugarcane", minPrice: 3100, maxPrice: 3600, avgPrice: 3350, unit: "quintal" },
  { state: "Maharashtra", market: "Pune APMC", crop: "Jowar", minPrice: 1800, maxPrice: 2200, avgPrice: 2000, unit: "quintal" },
  { state: "Maharashtra", market: "Pune APMC", crop: "Onion", minPrice: 1200, maxPrice: 2200, avgPrice: 1700, unit: "quintal" },
  { state: "Maharashtra", market: "Nashik APMC", crop: "Onion", minPrice: 1200, maxPrice: 2000, avgPrice: 1600, unit: "quintal" },
  { state: "Maharashtra", market: "Nashik APMC", crop: "Grapes", minPrice: 8000, maxPrice: 12000, avgPrice: 10000, unit: "quintal" },
  { state: "Maharashtra", market: "Nashik APMC", crop: "Tomato", minPrice: 800, maxPrice: 1800, avgPrice: 1300, unit: "quintal" },
  { state: "Maharashtra", market: "Nagpur APMC", crop: "Cotton", minPrice: 5500, maxPrice: 6500, avgPrice: 6000, unit: "quintal" },
  { state: "Maharashtra", market: "Nagpur APMC", crop: "Orange", minPrice: 3000, maxPrice: 5000, avgPrice: 4000, unit: "quintal" },
  { state: "Maharashtra", market: "Solapur APMC", crop: "Cotton", minPrice: 5400, maxPrice: 6400, avgPrice: 5900, unit: "quintal" },
  { state: "Maharashtra", market: "Solapur APMC", crop: "Jowar", minPrice: 1700, maxPrice: 2100, avgPrice: 1900, unit: "quintal" },
  { state: "Maharashtra", market: "Sangli APMC", crop: "Turmeric", minPrice: 7000, maxPrice: 10000, avgPrice: 8500, unit: "quintal" },
  { state: "Maharashtra", market: "Aurangabad APMC", crop: "Cotton", minPrice: 5300, maxPrice: 6300, avgPrice: 5800, unit: "quintal" },
  { state: "Maharashtra", market: "Aurangabad APMC", crop: "Soybean", minPrice: 3900, maxPrice: 4600, avgPrice: 4250, unit: "quintal" },
  { state: "Punjab", market: "Ludhiana APMC", crop: "Wheat", minPrice: 1900, maxPrice: 2200, avgPrice: 2050, unit: "quintal" },
  { state: "Punjab", market: "Ludhiana APMC", crop: "Rice", minPrice: 2300, maxPrice: 2700, avgPrice: 2500, unit: "quintal" },
  { state: "Punjab", market: "Amritsar APMC", crop: "Wheat", minPrice: 1950, maxPrice: 2250, avgPrice: 2100, unit: "quintal" },
  { state: "Punjab", market: "Amritsar APMC", crop: "Maize", minPrice: 1700, maxPrice: 2100, avgPrice: 1900, unit: "quintal" },
  { state: "Tamil Nadu", market: "Coimbatore APMC", crop: "Sugarcane", minPrice: 2800, maxPrice: 3300, avgPrice: 3050, unit: "quintal" },
  { state: "Tamil Nadu", market: "Chennai APMC", crop: "Paddy", minPrice: 2150, maxPrice: 2550, avgPrice: 2350, unit: "quintal" },
  { state: "Tamil Nadu", market: "Madurai APMC", crop: "Banana", minPrice: 1000, maxPrice: 2000, avgPrice: 1500, unit: "quintal" },
  { state: "Rajasthan", market: "Jaipur APMC", crop: "Wheat", minPrice: 1850, maxPrice: 2150, avgPrice: 2000, unit: "quintal" },
  { state: "Rajasthan", market: "Jodhpur APMC", crop: "Mustard", minPrice: 5200, maxPrice: 6200, avgPrice: 5700, unit: "quintal" },
  { state: "Rajasthan", market: "Bikaner APMC", crop: "Bajra", minPrice: 1800, maxPrice: 2200, avgPrice: 2000, unit: "quintal" },
  { state: "Uttar Pradesh", market: "Agra APMC", crop: "Wheat", minPrice: 1900, maxPrice: 2200, avgPrice: 2050, unit: "quintal" },
  { state: "Uttar Pradesh", market: "Lucknow APMC", crop: "Sugarcane", minPrice: 3200, maxPrice: 3700, avgPrice: 3450, unit: "quintal" },
  { state: "Karnataka", market: "Bengaluru APMC", crop: "Groundnut", minPrice: 4400, maxPrice: 5100, avgPrice: 4750, unit: "quintal" },
  { state: "Karnataka", market: "Hassan APMC", crop: "Coffee", minPrice: 8000, maxPrice: 10000, avgPrice: 9000, unit: "quintal" },
  { state: "Madhya Pradesh", market: "Indore APMC", crop: "Soybean", minPrice: 3800, maxPrice: 4400, avgPrice: 4100, unit: "quintal" },
  { state: "Madhya Pradesh", market: "Bhopal APMC", crop: "Wheat", minPrice: 1900, maxPrice: 2200, avgPrice: 2050, unit: "quintal" },
  { state: "Gujarat", market: "Ahmedabad APMC", crop: "Cotton", minPrice: 5500, maxPrice: 6500, avgPrice: 6000, unit: "quintal" },
  { state: "Gujarat", market: "Rajkot APMC", crop: "Groundnut", minPrice: 4700, maxPrice: 5500, avgPrice: 5100, unit: "quintal" },
];

export function getMarketPricesByLocation(state?: string, district?: string): MarketPrice[] {
  if (!state && !district) return marketPrices.filter(p => p.state === "Maharashtra");
  const s = (state || "").toLowerCase();
  const d = (district || "").toLowerCase();
  const out = marketPrices.filter(p =>
    (s && p.state.toLowerCase().includes(s)) ||
    (d && p.market.toLowerCase().includes(d))
  );
  return out.length ? out : marketPrices.filter(p => p.state === "Maharashtra");
}