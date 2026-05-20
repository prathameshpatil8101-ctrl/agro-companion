export const indianCropDatabase: Record<string, Record<string, string[]>> = {
  "Maharashtra": {
    "Pune": ["Sugarcane", "Jowar", "Bajra", "Soybean", "Wheat", "Maize", "Onion", "Pomegranate"],
    "Nashik": ["Grapes", "Onion", "Soybean", "Wheat", "Maize", "Tomato", "Pomegranate"],
    "Kolhapur": ["Sugarcane", "Rice", "Groundnut", "Soybean", "Maize", "Tur", "Chilli"],
    "Nagpur": ["Cotton", "Soybean", "Tur", "Orange", "Wheat", "Maize", "Gram"],
    "Aurangabad": ["Cotton", "Soybean", "Tur", "Maize", "Wheat", "Jowar", "Bajra"],
    "Solapur": ["Jowar", "Bajra", "Sugarcane", "Pomegranate", "Wheat", "Maize", "Tur"],
    "Sangli": ["Sugarcane", "Turmeric", "Soybean", "Jowar", "Maize", "Groundnut"],
    "Ahmednagar": ["Sugarcane", "Bajra", "Jowar", "Wheat", "Onion", "Soybean"],
    "Satara": ["Sugarcane", "Rice", "Soybean", "Tur", "Maize", "Wheat"],
    "Jalgaon": ["Banana", "Cotton", "Soybean", "Jowar", "Wheat", "Maize", "Groundnut"],
    "default": ["Cotton", "Soybean", "Jowar", "Bajra", "Sugarcane", "Wheat"],
  },
  "Punjab": {
    "Ludhiana": ["Wheat", "Rice", "Maize", "Cotton", "Sunflower"],
    "Amritsar": ["Wheat", "Rice", "Maize", "Cotton", "Barley"],
    "default": ["Wheat", "Rice", "Maize", "Cotton", "Gram"],
  },
  "Tamil Nadu": {
    "Coimbatore": ["Sugarcane", "Groundnut", "Cotton", "Maize", "Banana"],
    "Chennai": ["Paddy", "Vegetables", "Coconut", "Banana"],
    "Madurai": ["Paddy", "Banana", "Cotton", "Groundnut"],
    "default": ["Paddy", "Banana", "Coconut", "Groundnut", "Sugarcane"],
  },
  "Rajasthan": {
    "Jaipur": ["Wheat", "Gram", "Bajra", "Mustard"],
    "Jodhpur": ["Bajra", "Mustard", "Groundnut", "Wheat"],
    "default": ["Bajra", "Mustard", "Wheat", "Gram", "Guar"],
  },
  "Uttar Pradesh": {
    "Agra": ["Wheat", "Mustard", "Potato"],
    "Lucknow": ["Sugarcane", "Wheat", "Rice", "Pulses"],
    "Varanasi": ["Paddy", "Wheat", "Vegetables", "Maize"],
    "default": ["Wheat", "Sugarcane", "Rice", "Mustard", "Gram"],
  },
  "Karnataka": {
    "Bengaluru": ["Vegetables", "Ragi", "Groundnut", "Maize"],
    "Mysore": ["Paddy", "Sugarcane", "Groundnut", "Ragi"],
    "default": ["Ragi", "Groundnut", "Cotton", "Sunflower", "Jowar"],
  },
  "default": { "default": ["Wheat", "Rice", "Maize", "Cotton", "Soybean", "Groundnut"] },
};

export function getCropsByLocation(state: string, district: string): string[] {
  const stateKey = Object.keys(indianCropDatabase).find(
    s => s.toLowerCase() === state.toLowerCase() || state.toLowerCase().includes(s.toLowerCase())
  ) || "default";
  const stateData = indianCropDatabase[stateKey];
  const districtKey = Object.keys(stateData).find(
    d => d.toLowerCase() === district.toLowerCase() || district.toLowerCase().includes(d.toLowerCase())
  ) || "default";
  return stateData[districtKey] || stateData["default"];
}

export function filterBySeasonAndSoil(crops: string[], season: string, soil: string): string[] {
  const seasonMap: Record<string, string[]> = {
    "Kharif": ["Rice", "Paddy", "Cotton", "Soybean", "Maize", "Jowar", "Bajra", "Groundnut", "Tur", "Sugarcane"],
    "Rabi": ["Wheat", "Gram", "Mustard", "Barley", "Pulses", "Potato"],
    "Zaid": ["Watermelon", "Cucumber", "Vegetables", "Moong"],
  };
  const soilMap: Record<string, string[]> = {
    "Black": ["Cotton", "Soybean", "Sugarcane", "Jowar", "Tur"],
    "Red": ["Groundnut", "Maize", "Ragi", "Pulses"],
    "Sandy": ["Bajra", "Groundnut", "Pulses"],
    "Clay": ["Rice", "Paddy", "Sugarcane"],
    "Loamy": ["Wheat", "Rice", "Maize", "Vegetables"],
    "Alluvial": ["Rice", "Wheat", "Sugarcane", "Maize"],
  };
  const allowedSeason = seasonMap[season] || crops;
  const allowedSoil = soilMap[soil] || crops;
  const scored = crops.map(c => {
    let score = 1;
    if (allowedSeason.some(s => s.toLowerCase() === c.toLowerCase())) score += 2;
    if (allowedSoil.some(s => s.toLowerCase() === c.toLowerCase())) score += 2;
    return { crop: c, score };
  }).sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.crop);
}