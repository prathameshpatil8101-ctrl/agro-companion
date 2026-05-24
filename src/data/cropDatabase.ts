// Maharashtra-first crop database — all 36 districts mapped to soils + seasons
// Plus other major Indian states with their main cities

export type Region = "state" | "district";
export interface DistrictProfile {
  soils: string[];           // soils naturally found in this district
  primaryCrops: string[];    // commonly grown crops in this district
}

// All 36 Maharashtra districts with their actual soil types
export const maharashtraDistricts: Record<string, DistrictProfile> = {
  "Pune":         { soils: ["Black", "Red"], primaryCrops: ["Sugarcane", "Onion", "Wheat", "Jowar", "Bajra", "Soybean", "Pomegranate", "Tomato", "Grapes", "Maize"] },
  "Mumbai City":  { soils: ["Coastal", "Alluvial"], primaryCrops: ["Vegetables", "Coconut", "Banana"] },
  "Mumbai Suburban": { soils: ["Coastal", "Alluvial"], primaryCrops: ["Vegetables", "Mango", "Banana"] },
  "Thane":        { soils: ["Coastal", "Alluvial", "Lateritic"], primaryCrops: ["Rice", "Vegetables", "Mango", "Coconut"] },
  "Palghar":      { soils: ["Coastal", "Lateritic"], primaryCrops: ["Rice", "Chiku", "Mango", "Vegetables"] },
  "Raigad":       { soils: ["Coastal", "Lateritic"], primaryCrops: ["Rice", "Mango", "Coconut", "Cashew", "Vegetables"] },
  "Ratnagiri":    { soils: ["Lateritic", "Coastal"], primaryCrops: ["Mango", "Cashew", "Coconut", "Rice", "Kokum"] },
  "Sindhudurg":   { soils: ["Lateritic", "Coastal"], primaryCrops: ["Mango", "Cashew", "Coconut", "Rice", "Spices"] },
  "Nashik":       { soils: ["Black", "Red"], primaryCrops: ["Grapes", "Onion", "Tomato", "Pomegranate", "Soybean", "Wheat", "Maize"] },
  "Dhule":        { soils: ["Black"], primaryCrops: ["Cotton", "Jowar", "Bajra", "Wheat", "Onion", "Soybean"] },
  "Nandurbar":    { soils: ["Black", "Red"], primaryCrops: ["Cotton", "Jowar", "Tur", "Chilli", "Maize"] },
  "Jalgaon":      { soils: ["Black", "Alluvial"], primaryCrops: ["Banana", "Cotton", "Sugarcane", "Wheat", "Jowar", "Groundnut", "Tur"] },
  "Ahmednagar":   { soils: ["Black", "Red"], primaryCrops: ["Sugarcane", "Onion", "Bajra", "Wheat", "Pomegranate", "Soybean", "Tomato"] },
  "Solapur":      { soils: ["Black"], primaryCrops: ["Jowar", "Sugarcane", "Pomegranate", "Grapes", "Tur", "Wheat", "Maize", "Onion"] },
  "Kolhapur":     { soils: ["Black", "Lateritic"], primaryCrops: ["Sugarcane", "Rice", "Soybean", "Groundnut", "Turmeric", "Chilli", "Tur"] },
  "Sangli":       { soils: ["Black", "Red"], primaryCrops: ["Sugarcane", "Turmeric", "Grapes", "Pomegranate", "Soybean", "Jowar", "Groundnut"] },
  "Satara":       { soils: ["Black", "Lateritic"], primaryCrops: ["Sugarcane", "Rice", "Soybean", "Wheat", "Strawberry", "Tur"] },
  "Aurangabad":   { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Maize", "Jowar", "Bajra", "Wheat"] },
  "Jalna":        { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Sweet Lime", "Tur", "Bajra", "Wheat"] },
  "Beed":         { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Sugarcane", "Bajra", "Jowar", "Tur"] },
  "Latur":        { soils: ["Black"], primaryCrops: ["Soybean", "Tur", "Sugarcane", "Sorghum", "Gram", "Wheat"] },
  "Dharashiv":    { soils: ["Black"], primaryCrops: ["Soybean", "Tur", "Jowar", "Bajra", "Sunflower", "Gram"] },
  "Nanded":       { soils: ["Black", "Alluvial"], primaryCrops: ["Cotton", "Soybean", "Jowar", "Tur", "Sugarcane", "Banana", "Turmeric"] },
  "Parbhani":     { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Jowar", "Wheat"] },
  "Hingoli":      { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Turmeric", "Jowar"] },
  "Amravati":     { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Orange", "Wheat", "Gram"] },
  "Akola":        { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Jowar", "Gram", "Wheat"] },
  "Buldhana":     { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Jowar", "Wheat"] },
  "Washim":       { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Jowar", "Gram"] },
  "Yavatmal":     { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Jowar", "Wheat", "Sunflower"] },
  "Nagpur":       { soils: ["Black", "Red"], primaryCrops: ["Cotton", "Soybean", "Tur", "Orange", "Wheat", "Gram", "Maize"] },
  "Wardha":       { soils: ["Black"], primaryCrops: ["Cotton", "Soybean", "Tur", "Orange", "Wheat"] },
  "Chandrapur":   { soils: ["Black", "Red"], primaryCrops: ["Rice", "Cotton", "Soybean", "Tur", "Wheat"] },
  "Gadchiroli":   { soils: ["Red", "Lateritic"], primaryCrops: ["Rice", "Tur", "Maize", "Mahua"] },
  "Bhandara":     { soils: ["Red", "Alluvial"], primaryCrops: ["Rice", "Sugarcane", "Wheat", "Vegetables"] },
  "Gondia":       { soils: ["Red", "Alluvial"], primaryCrops: ["Rice", "Tur", "Wheat", "Vegetables"] },
};

// Other states — main cities only
export const otherStates: Record<string, Record<string, DistrictProfile>> = {
  "Punjab": {
    "Ludhiana":  { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Maize", "Cotton", "Sunflower"] },
    "Amritsar":  { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Maize", "Barley"] },
    "Patiala":   { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Sugarcane", "Cotton"] },
  },
  "Uttar Pradesh": {
    "Lucknow":   { soils: ["Alluvial"], primaryCrops: ["Wheat", "Sugarcane", "Rice", "Pulses"] },
    "Agra":      { soils: ["Alluvial"], primaryCrops: ["Wheat", "Mustard", "Potato", "Bajra"] },
    "Varanasi":  { soils: ["Alluvial"], primaryCrops: ["Rice", "Wheat", "Vegetables", "Maize"] },
    "Meerut":    { soils: ["Alluvial"], primaryCrops: ["Sugarcane", "Wheat", "Rice", "Mustard"] },
  },
  "Madhya Pradesh": {
    "Indore":    { soils: ["Black"], primaryCrops: ["Soybean", "Wheat", "Gram", "Cotton"] },
    "Bhopal":    { soils: ["Black"], primaryCrops: ["Soybean", "Wheat", "Gram", "Mustard"] },
    "Jabalpur":  { soils: ["Black", "Red"], primaryCrops: ["Rice", "Wheat", "Soybean", "Gram"] },
    "Gwalior":   { soils: ["Alluvial", "Black"], primaryCrops: ["Wheat", "Mustard", "Bajra", "Gram"] },
  },
  "Karnataka": {
    "Bengaluru": { soils: ["Red"], primaryCrops: ["Vegetables", "Ragi", "Groundnut", "Maize"] },
    "Mysore":    { soils: ["Red", "Black"], primaryCrops: ["Paddy", "Sugarcane", "Ragi", "Groundnut"] },
    "Belagavi":  { soils: ["Black", "Red"], primaryCrops: ["Sugarcane", "Cotton", "Jowar", "Tur"] },
    "Hubli":     { soils: ["Black"], primaryCrops: ["Cotton", "Groundnut", "Jowar", "Sunflower"] },
  },
  "Tamil Nadu": {
    "Chennai":     { soils: ["Alluvial", "Coastal"], primaryCrops: ["Paddy", "Vegetables", "Coconut", "Banana"] },
    "Coimbatore":  { soils: ["Red", "Black"], primaryCrops: ["Sugarcane", "Groundnut", "Cotton", "Maize", "Banana"] },
    "Madurai":     { soils: ["Red", "Black"], primaryCrops: ["Paddy", "Banana", "Cotton", "Groundnut"] },
    "Salem":       { soils: ["Red"], primaryCrops: ["Tapioca", "Turmeric", "Mango", "Paddy"] },
  },
  "Gujarat": {
    "Ahmedabad": { soils: ["Black", "Alluvial"], primaryCrops: ["Cotton", "Wheat", "Bajra", "Castor"] },
    "Rajkot":    { soils: ["Black"], primaryCrops: ["Cotton", "Groundnut", "Sesame", "Cumin"] },
    "Surat":     { soils: ["Black", "Coastal"], primaryCrops: ["Sugarcane", "Cotton", "Rice", "Banana"] },
    "Vadodara":  { soils: ["Black"], primaryCrops: ["Cotton", "Tobacco", "Banana", "Wheat"] },
  },
  "Rajasthan": {
    "Jaipur":    { soils: ["Sandy", "Alluvial"], primaryCrops: ["Wheat", "Gram", "Bajra", "Mustard"] },
    "Jodhpur":   { soils: ["Sandy"], primaryCrops: ["Bajra", "Mustard", "Guar", "Cumin"] },
    "Kota":      { soils: ["Black"], primaryCrops: ["Soybean", "Wheat", "Mustard", "Gram"] },
    "Udaipur":   { soils: ["Red", "Sandy"], primaryCrops: ["Maize", "Wheat", "Gram", "Soybean"] },
  },
  "Andhra Pradesh": {
    "Visakhapatnam": { soils: ["Red", "Coastal"], primaryCrops: ["Paddy", "Sugarcane", "Banana", "Cashew"] },
    "Vijayawada":    { soils: ["Alluvial", "Black"], primaryCrops: ["Paddy", "Cotton", "Sugarcane", "Turmeric"] },
    "Guntur":        { soils: ["Black", "Alluvial"], primaryCrops: ["Chilli", "Cotton", "Tobacco", "Paddy"] },
  },
};

// Season-suitability mapping
const SEASON_CROPS: Record<string, string[]> = {
  "Kharif": ["Rice","Paddy","Cotton","Soybean","Maize","Jowar","Bajra","Groundnut","Tur","Sugarcane","Turmeric","Chilli","Sunflower","Vegetables"],
  "Rabi":   ["Wheat","Gram","Mustard","Barley","Pulses","Potato","Onion","Sunflower","Sweet Lime","Sorghum","Strawberry"],
  "Zaid":   ["Watermelon","Cucumber","Vegetables","Moong","Maize","Vegetables","Tomato"],
};

const WATER_NEED: Record<string, string[]> = {
  "High": ["Sugarcane","Rice","Paddy","Banana","Turmeric","Vegetables","Tomato","Strawberry"],
  "Medium": ["Wheat","Cotton","Soybean","Maize","Tur","Onion","Pomegranate","Grapes","Chilli","Groundnut","Tomato","Mango"],
  "Low":  ["Bajra","Jowar","Mustard","Gram","Sunflower","Guar","Sesame","Cumin","Ragi","Castor","Pulses"],
};

const CROP_REASONS: Record<string, string> = {
  "Cotton": "Thrives in deep black cotton soil with 6-8 month warm season; high cash value.",
  "Soybean": "Excellent kharif legume for black soil, fixes nitrogen, low input cost.",
  "Sugarcane": "High income perennial; needs reliable irrigation and rich soil.",
  "Jowar": "Drought-tolerant millet ideal for black soil and low rainfall.",
  "Bajra": "Resilient millet for sandy/light soil and dry zones; short duration.",
  "Tur": "Long-duration pulse, fits black soil; improves fertility.",
  "Onion": "Cash crop suiting Nashik/Pune belt; strong export market.",
  "Pomegranate": "High-value fruit thriving in dry black soil with drip irrigation.",
  "Grapes": "Premium fruit crop for Nashik/Sangli; needs well-drained black soil.",
  "Wheat": "Main rabi staple; suits cooler months and assured water.",
  "Rice": "Best for clay/alluvial soil with standing water in kharif.",
  "Paddy": "Same as rice — ideal for waterlogged coastal/lateritic belts.",
  "Maize": "Versatile cereal for kharif & rabi; needs well-drained loam.",
  "Tomato": "Short-duration vegetable, high market demand near urban mandis.",
  "Banana": "High-income perennial for Jalgaon belt with deep alluvial soil.",
  "Mango": "Long-life fruit for Konkan lateritic soil; premium Alphonso market.",
  "Cashew": "Hardy tree crop for Konkan lateritic; consistent export demand.",
  "Coconut": "Coastal staple; long economic life.",
  "Groundnut": "Oilseed legume for red/sandy soil, kharif & rabi.",
  "Mustard": "Rabi oilseed for cooler dry zones.",
  "Gram": "Hardy rabi pulse; suits black & alluvial soil.",
  "Turmeric": "High-value spice for Sangli/Hingoli; needs assured water.",
  "Chilli": "Cash spice for Nandurbar/Guntur belt.",
  "Orange": "Vidarbha specialty (Nagpur santra); deep black soil.",
  "Sunflower": "Short-duration oilseed for medium soil.",
  "Ragi": "Nutritious millet for red soil hill regions.",
  "Vegetables": "Year-round demand near cities; good for irrigated plots.",
  "Sweet Lime": "Marathwada citrus with strong domestic market.",
  "Strawberry": "Premium fruit for Satara/Mahabaleshwar plateau.",
};

export interface RecommendationInput {
  state: string; district: string;
  soilType: string; season: string; water: string;
}

export interface CropMatch {
  name: string;
  reason: string;
  matchScore: number; // 0-100
  seasonFit: boolean;
  soilFit: boolean;
  waterFit: boolean;
}

function getDistrictProfile(state: string, district: string): DistrictProfile | null {
  if (state === "Maharashtra") {
    const key = Object.keys(maharashtraDistricts).find(
      k => k.toLowerCase() === district.toLowerCase() ||
           district.toLowerCase().includes(k.toLowerCase()) ||
           k.toLowerCase().includes(district.toLowerCase())
    );
    return key ? maharashtraDistricts[key] : null;
  }
  const stateData = otherStates[state];
  if (!stateData) return null;
  const key = Object.keys(stateData).find(
    k => k.toLowerCase() === district.toLowerCase() ||
         district.toLowerCase().includes(k.toLowerCase())
  );
  return key ? stateData[key] : null;
}

export function recommendCropsByLocation(input: RecommendationInput): CropMatch[] {
  const profile = getDistrictProfile(input.state, input.district);
  const fallback = ["Cotton", "Soybean", "Jowar", "Bajra", "Wheat", "Tur", "Maize", "Sunflower"];
  const candidates = profile?.primaryCrops ?? fallback;
  const districtSoils = profile?.soils ?? ["Black", "Red"];

  const seasonAllowed = SEASON_CROPS[input.season] || [];
  const waterAllowed = WATER_NEED[input.water] || [];

  const scored: CropMatch[] = candidates.map((crop) => {
    const soilFit = districtSoils.includes(input.soilType) || input.soilType === "";
    const seasonFit = seasonAllowed.some(s => s.toLowerCase() === crop.toLowerCase());
    const waterFit = waterAllowed.some(w => w.toLowerCase() === crop.toLowerCase());

    let score = 40; // base score for being grown locally
    if (soilFit) score += 25;
    if (seasonFit) score += 25;
    if (waterFit) score += 10;
    if (!soilFit && !seasonFit) score = Math.max(score - 15, 20);

    const reason = `${CROP_REASONS[crop] || `${crop} grows in this district.`} ${
      seasonFit ? `Perfect for ${input.season}.` : ""
    } ${soilFit ? `Suits ${input.soilType} soil.` : ""}`.trim();

    return { name: crop, reason, matchScore: Math.min(score, 99), seasonFit, soilFit, waterFit };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  // return top 6 unique
  const seen = new Set<string>();
  const out: CropMatch[] = [];
  for (const m of scored) {
    if (seen.has(m.name)) continue;
    seen.add(m.name);
    out.push(m);
    if (out.length >= 6) break;
  }
  return out;
}

// State / district listings for UI dropdowns
export const ALL_STATES = ["Maharashtra", ...Object.keys(otherStates)];
export const MAHARASHTRA_DISTRICTS = Object.keys(maharashtraDistricts).sort();
export function districtsForState(state: string): string[] {
  if (state === "Maharashtra") return MAHARASHTRA_DISTRICTS;
  return Object.keys(otherStates[state] || {});
}

// Expanded state coverage — added in v2
const _ext: Record<string, Record<string, DistrictProfile>> = {
  "Bihar": {
    "Patna":    { soils: ["Alluvial"], primaryCrops: ["Rice", "Wheat", "Maize", "Pulses", "Vegetables", "Potato"] },
    "Gaya":     { soils: ["Alluvial", "Red"], primaryCrops: ["Wheat", "Rice", "Maize", "Pulses", "Gram"] },
    "Muzaffarpur": { soils: ["Alluvial"], primaryCrops: ["Litchi", "Banana", "Vegetables", "Wheat", "Maize"] },
    "Bhagalpur":{ soils: ["Alluvial"], primaryCrops: ["Rice", "Wheat", "Maize", "Mustard", "Vegetables"] },
  },
  "West Bengal": {
    "Kolkata":  { soils: ["Alluvial"], primaryCrops: ["Rice", "Vegetables", "Jute", "Potato", "Mustard"] },
    "Murshidabad": { soils: ["Alluvial"], primaryCrops: ["Rice", "Jute", "Mustard", "Vegetables", "Potato"] },
    "Bardhaman":{ soils: ["Alluvial"], primaryCrops: ["Rice", "Potato", "Mustard", "Vegetables", "Wheat"] },
    "Cooch Behar": { soils: ["Alluvial"], primaryCrops: ["Rice", "Jute", "Vegetables", "Maize"] },
  },
  "Haryana": {
    "Karnal":   { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Sugarcane", "Mustard", "Barley"] },
    "Hisar":    { soils: ["Alluvial", "Sandy"], primaryCrops: ["Wheat", "Cotton", "Bajra", "Mustard", "Gram"] },
    "Ambala":   { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Sugarcane", "Mustard"] },
    "Sonipat":  { soils: ["Alluvial"], primaryCrops: ["Wheat", "Rice", "Vegetables", "Mustard"] },
  },
  "Telangana": {
    "Hyderabad":{ soils: ["Red", "Black"], primaryCrops: ["Rice", "Cotton", "Maize", "Tur", "Vegetables", "Chilli"] },
    "Warangal": { soils: ["Red", "Black"], primaryCrops: ["Cotton", "Paddy", "Maize", "Tur", "Jowar"] },
    "Nizamabad":{ soils: ["Red", "Black"], primaryCrops: ["Rice", "Maize", "Cotton", "Turmeric", "Tur"] },
    "Nalgonda": { soils: ["Red", "Black"], primaryCrops: ["Cotton", "Rice", "Jowar", "Groundnut", "Tur"] },
  },
  "Odisha": {
    "Bhubaneswar": { soils: ["Alluvial", "Red"], primaryCrops: ["Rice", "Maize", "Vegetables", "Pulses"] },
    "Cuttack":  { soils: ["Alluvial"], primaryCrops: ["Rice", "Vegetables", "Jute", "Coconut", "Banana"] },
    "Sambalpur":{ soils: ["Red", "Lateritic"], primaryCrops: ["Rice", "Jowar", "Maize", "Cotton", "Pulses"] },
    "Koraput":  { soils: ["Red", "Lateritic"], primaryCrops: ["Rice", "Maize", "Ragi", "Pulses", "Turmeric"] },
  },
  "Chhattisgarh": {
    "Raipur":   { soils: ["Red", "Alluvial"], primaryCrops: ["Rice", "Wheat", "Maize", "Pulses", "Vegetables"] },
    "Bilaspur": { soils: ["Red", "Lateritic"], primaryCrops: ["Rice", "Wheat", "Maize", "Soybean", "Pulses"] },
    "Durg":     { soils: ["Black", "Red"], primaryCrops: ["Rice", "Wheat", "Cotton", "Soybean", "Vegetables"] },
  },
  "Assam": {
    "Guwahati": { soils: ["Alluvial"], primaryCrops: ["Rice", "Jute", "Tea", "Mustard", "Vegetables"] },
    "Jorhat":   { soils: ["Alluvial"], primaryCrops: ["Rice", "Tea", "Maize", "Vegetables", "Mustard"] },
    "Dibrugarh":{ soils: ["Alluvial"], primaryCrops: ["Rice", "Tea", "Jute", "Mustard"] },
  },
  "Himachal Pradesh": {
    "Shimla":   { soils: ["Sandy", "Loamy"], primaryCrops: ["Apple", "Potato", "Pea", "Wheat", "Maize"] },
    "Kullu":    { soils: ["Loamy", "Sandy"], primaryCrops: ["Apple", "Pea", "Maize", "Wheat", "Vegetables"] },
    "Kangra":   { soils: ["Alluvial", "Loamy"], primaryCrops: ["Rice", "Wheat", "Maize", "Tea", "Vegetables"] },
  },
  "Uttarakhand": {
    "Dehradun": { soils: ["Alluvial", "Loamy"], primaryCrops: ["Rice", "Wheat", "Maize", "Vegetables", "Sugarcane"] },
    "Haridwar": { soils: ["Alluvial"], primaryCrops: ["Sugarcane", "Wheat", "Rice", "Vegetables"] },
    "Nainital": { soils: ["Loamy", "Sandy"], primaryCrops: ["Apple", "Pear", "Vegetables", "Wheat", "Maize"] },
  },
  "Kerala": {
    "Thiruvananthapuram": { soils: ["Lateritic", "Coastal"], primaryCrops: ["Coconut", "Rice", "Banana", "Cassava", "Vegetables"] },
    "Kochi":    { soils: ["Alluvial", "Coastal"], primaryCrops: ["Coconut", "Paddy", "Banana", "Vegetables", "Spices"] },
    "Kozhikode":{ soils: ["Lateritic", "Alluvial"], primaryCrops: ["Coconut", "Rice", "Banana", "Pepper", "Ginger"] },
    "Thrissur": { soils: ["Lateritic", "Alluvial"], primaryCrops: ["Coconut", "Rice", "Banana", "Vegetables", "Rubber"] },
  },
};
// Merge extended states into otherStates
Object.assign(otherStates, _ext);
