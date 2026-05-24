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

const mh = (district: string, market: string, rows: Array<[string, number, number]>): MarketPrice[] =>
  rows.map(([crop, mn, mx]) => ({
    state: "Maharashtra", district, market,
    crop, minPrice: mn, maxPrice: mx, avgPrice: Math.round((mn + mx) / 2),
    unit: "quintal", source: "curated" as const,
  }));

const st = (state: string, district: string, market: string, rows: Array<[string, number, number]>): MarketPrice[] =>
  rows.map(([crop, mn, mx]) => ({
    state, district, market,
    crop, minPrice: mn, maxPrice: mx, avgPrice: Math.round((mn + mx) / 2),
    unit: "quintal", source: "curated" as const,
  }));

export const marketPrices: MarketPrice[] = [
  // ── MAHARASHTRA ── All 36 districts ─────────────────────────────────────
  ...mh("Pune", "Pune APMC", [
    ["Onion", 1400, 2400], ["Tomato", 800, 1800], ["Sugarcane", 3100, 3600],
    ["Wheat", 2400, 2800], ["Jowar", 2200, 2900], ["Bajra", 2100, 2600],
    ["Soybean", 4100, 4700], ["Maize", 2050, 2400], ["Garlic", 7000, 12000],
    ["Potato", 1200, 2000], ["Cabbage", 600, 1200], ["Cauliflower", 800, 1500],
    ["Brinjal", 600, 1200], ["Capsicum", 2000, 4000], ["Green Chilli", 3000, 6000],
  ]),
  ...mh("Nashik", "Nashik APMC (Pimpalgaon)", [
    ["Onion", 1200, 2200], ["Grapes", 6000, 11000], ["Tomato", 600, 1600],
    ["Pomegranate", 5000, 9000], ["Soybean", 4200, 4800], ["Wheat", 2350, 2750],
    ["Maize", 2000, 2400], ["Garlic", 6500, 11000], ["Sweet Corn", 1500, 2500],
    ["Strawberry", 8000, 15000], ["Cucumber", 800, 1500],
  ]),
  ...mh("Nashik", "Lasalgaon APMC", [
    ["Onion", 1100, 2100], ["Tomato", 700, 1500], ["Wheat", 2350, 2700],
    ["Garlic", 6000, 10000], ["Grapes", 5500, 10000],
  ]),
  ...mh("Mumbai City", "Vashi APMC (Mumbai)", [
    ["Onion", 1500, 2500], ["Tomato", 900, 2000], ["Banana", 1200, 2400],
    ["Mango", 6000, 14000], ["Vegetables", 1500, 3500], ["Coconut", 2500, 3500],
    ["Potato", 1300, 2200], ["Garlic", 8000, 14000], ["Ginger", 10000, 18000],
    ["Apple", 6000, 12000], ["Pomegranate", 6000, 10000],
  ]),
  ...mh("Mumbai Suburban", "Vashi APMC (Mumbai Suburban)", [
    ["Onion", 1500, 2500], ["Tomato", 900, 2000], ["Banana", 1200, 2400],
    ["Potato", 1300, 2200], ["Cabbage", 600, 1200], ["Cauliflower", 800, 1500],
  ]),
  ...mh("Thane", "Thane APMC", [
    ["Rice", 2200, 2800], ["Vegetables", 1200, 3000], ["Mango", 5000, 12000],
    ["Banana", 1100, 2200], ["Coconut", 2400, 3400],
  ]),
  ...mh("Kolhapur", "Kolhapur APMC", [
    ["Sugarcane", 3100, 3600], ["Rice", 2300, 2800], ["Soybean", 4000, 4600],
    ["Groundnut", 5400, 6400], ["Turmeric", 8000, 11000], ["Chilli", 8000, 14000],
    ["Tur", 7800, 9500], ["Jowar", 2300, 3000], ["Wheat", 2350, 2750],
    ["Ginger", 9000, 16000], ["Banana", 1200, 2200],
  ]),
  ...mh("Sangli", "Sangli APMC", [
    ["Sugarcane", 3100, 3600], ["Turmeric", 8500, 12500], ["Soybean", 4100, 4700],
    ["Jowar", 2300, 3000], ["Grapes", 5500, 10500], ["Groundnut", 5300, 6200],
    ["Wheat", 2350, 2750], ["Tur", 7700, 9300], ["Onion", 1200, 2200],
  ]),
  ...mh("Satara", "Satara APMC", [
    ["Sugarcane", 3100, 3500], ["Rice", 2300, 2700], ["Soybean", 4100, 4700],
    ["Wheat", 2400, 2800], ["Strawberry", 9000, 16000], ["Tur", 7700, 9200],
    ["Tomato", 700, 1600], ["Ginger", 9000, 15000],
  ]),
  ...mh("Ahmednagar", "Ahmednagar APMC", [
    ["Sugarcane", 3000, 3500], ["Onion", 1300, 2200], ["Bajra", 2100, 2600],
    ["Wheat", 2350, 2750], ["Soybean", 4100, 4700], ["Pomegranate", 4500, 8500],
    ["Tomato", 700, 1600], ["Maize", 2000, 2400], ["Gram", 5200, 6000],
  ]),
  ...mh("Solapur", "Solapur APMC", [
    ["Jowar", 2400, 3100], ["Sugarcane", 3050, 3550], ["Pomegranate", 4800, 9000],
    ["Grapes", 5000, 9000], ["Tur", 7800, 9400], ["Wheat", 2350, 2750],
    ["Maize", 2000, 2400], ["Onion", 1300, 2200], ["Gram", 5200, 5900],
    ["Bajra", 2100, 2600], ["Sunflower", 5500, 6500],
  ]),
  ...mh("Aurangabad", "Chhatrapati Sambhajinagar APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Maize", 2050, 2450], ["Jowar", 2300, 2900], ["Wheat", 2300, 2700],
    ["Sweet Lime", 1500, 3000], ["Bajra", 2100, 2600], ["Gram", 5200, 5900],
  ]),
  ...mh("Jalna", "Jalna APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Sweet Lime", 1500, 3000],
    ["Tur", 7700, 9300], ["Bajra", 2100, 2600], ["Wheat", 2300, 2700],
    ["Maize", 2000, 2400],
  ]),
  ...mh("Beed", "Beed APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Sugarcane", 3000, 3500],
    ["Bajra", 2100, 2600], ["Jowar", 2300, 2900], ["Tur", 7700, 9300],
    ["Pomegranate", 4500, 8000], ["Wheat", 2300, 2700],
  ]),
  ...mh("Latur", "Latur APMC", [
    ["Soybean", 4200, 4800], ["Tur", 7800, 9500], ["Sugarcane", 3050, 3550],
    ["Gram", 5300, 6000], ["Wheat", 2350, 2750], ["Jowar", 2300, 2900],
    ["Bajra", 2100, 2600], ["Maize", 2000, 2400],
  ]),
  ...mh("Dharashiv", "Dharashiv APMC", [
    ["Soybean", 4100, 4700], ["Tur", 7700, 9300], ["Jowar", 2300, 2900],
    ["Bajra", 2100, 2600], ["Sunflower", 5500, 6500], ["Gram", 5200, 5900],
    ["Wheat", 2300, 2700],
  ]),
  ...mh("Nanded", "Nanded APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Jowar", 2300, 2900],
    ["Tur", 7700, 9300], ["Sugarcane", 3050, 3550], ["Turmeric", 8000, 11000],
    ["Banana", 1100, 2200], ["Wheat", 2300, 2700],
  ]),
  ...mh("Parbhani", "Parbhani APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Wheat", 2300, 2700], ["Jowar", 2300, 2900], ["Bajra", 2100, 2600],
  ]),
  ...mh("Hingoli", "Hingoli APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Turmeric", 8500, 12000],
    ["Tur", 7700, 9300], ["Jowar", 2300, 2900],
  ]),
  ...mh("Amravati", "Amravati APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Orange", 2500, 4500], ["Wheat", 2300, 2700], ["Gram", 5200, 5900],
    ["Jowar", 2300, 2900], ["Bajra", 2100, 2600],
  ]),
  ...mh("Akola", "Akola APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Jowar", 2300, 2900], ["Gram", 5200, 5900], ["Wheat", 2300, 2700],
    ["Bajra", 2100, 2600],
  ]),
  ...mh("Yavatmal", "Yavatmal APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Sunflower", 5500, 6500], ["Jowar", 2300, 2900], ["Wheat", 2300, 2700],
  ]),
  ...mh("Buldhana", "Buldhana APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Wheat", 2300, 2700], ["Jowar", 2300, 2900],
  ]),
  ...mh("Washim", "Washim APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Gram", 5200, 5900], ["Jowar", 2300, 2900],
  ]),
  ...mh("Nagpur", "Nagpur APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Tur", 7700, 9300],
    ["Orange", 2800, 5000], ["Wheat", 2300, 2700], ["Gram", 5200, 5900],
    ["Maize", 2000, 2400], ["Rice", 2300, 2900], ["Jowar", 2300, 2900],
  ]),
  ...mh("Wardha", "Wardha APMC", [
    ["Cotton", 7000, 7800], ["Soybean", 4100, 4700], ["Orange", 2700, 4900],
    ["Tur", 7700, 9300], ["Wheat", 2300, 2700],
  ]),
  ...mh("Chandrapur", "Chandrapur APMC", [
    ["Rice", 2300, 2900], ["Cotton", 7000, 7800], ["Soybean", 4100, 4700],
    ["Tur", 7700, 9300], ["Wheat", 2300, 2700],
  ]),
  ...mh("Gadchiroli", "Gadchiroli APMC", [
    ["Rice", 2300, 2900], ["Maize", 2000, 2400], ["Tur", 7700, 9200],
  ]),
  ...mh("Bhandara", "Bhandara APMC", [
    ["Rice", 2300, 2900], ["Wheat", 2300, 2700], ["Sugarcane", 3000, 3500],
    ["Vegetables", 1000, 2500],
  ]),
  ...mh("Gondia", "Gondia APMC", [
    ["Rice", 2300, 2900], ["Wheat", 2300, 2700], ["Tur", 7700, 9200],
    ["Vegetables", 1000, 2500],
  ]),
  ...mh("Jalgaon", "Jalgaon APMC", [
    ["Banana", 1100, 2200], ["Cotton", 7000, 7800], ["Sugarcane", 3050, 3550],
    ["Wheat", 2350, 2750], ["Groundnut", 5400, 6400], ["Jowar", 2200, 2700],
    ["Tur", 7700, 9200], ["Maize", 2000, 2400],
  ]),
  ...mh("Dhule", "Dhule APMC", [
    ["Cotton", 7000, 7800], ["Jowar", 2200, 2700], ["Bajra", 2100, 2600],
    ["Wheat", 2350, 2750], ["Onion", 1200, 2100], ["Soybean", 4100, 4700],
  ]),
  ...mh("Nandurbar", "Nandurbar APMC", [
    ["Cotton", 7000, 7800], ["Chilli", 8000, 14000], ["Maize", 2000, 2400],
    ["Tur", 7700, 9300], ["Jowar", 2200, 2700],
  ]),
  ...mh("Palghar", "Palghar APMC", [
    ["Rice", 2300, 2900], ["Chiku", 3000, 5000], ["Mango", 6000, 14000],
    ["Vegetables", 1000, 2500], ["Coconut", 2400, 3400],
  ]),
  ...mh("Raigad", "Raigad APMC (Pen)", [
    ["Rice", 2300, 2900], ["Mango", 6000, 14000], ["Coconut", 2400, 3400],
    ["Cashew", 12000, 17000], ["Vegetables", 1000, 2500],
  ]),
  ...mh("Ratnagiri", "Ratnagiri APMC", [
    ["Mango", 8000, 18000], ["Cashew", 13000, 18000], ["Coconut", 2500, 3500],
    ["Rice", 2400, 3000], ["Kokum", 15000, 25000],
  ]),
  ...mh("Sindhudurg", "Sindhudurg APMC", [
    ["Mango", 9000, 20000], ["Cashew", 13000, 18000], ["Coconut", 2500, 3500],
    ["Rice", 2400, 3000], ["Kokum", 15000, 25000],
  ]),

  // ── PUNJAB ───────────────────────────────────────────────────────────────
  ...st("Punjab", "Ludhiana", "Ludhiana APMC", [
    ["Wheat", 2350, 2750], ["Rice", 2400, 2900], ["Maize", 2100, 2500],
    ["Cotton", 7000, 7800], ["Sunflower", 5500, 6500], ["Potato", 1200, 2000],
    ["Mustard", 5500, 6500],
  ]),
  ...st("Punjab", "Amritsar", "Amritsar APMC", [
    ["Wheat", 2350, 2750], ["Rice", 2400, 2900], ["Maize", 2100, 2500],
    ["Barley", 2000, 2400], ["Potato", 1200, 2000],
  ]),
  ...st("Punjab", "Patiala", "Patiala APMC", [
    ["Wheat", 2350, 2750], ["Rice", 2400, 2900], ["Sugarcane", 3200, 3700],
    ["Cotton", 7000, 7800], ["Barley", 2000, 2400],
  ]),
  ...st("Punjab", "Jalandhar", "Jalandhar APMC", [
    ["Wheat", 2350, 2750], ["Rice", 2400, 2900], ["Vegetables", 1000, 3000],
    ["Potato", 1200, 2000], ["Maize", 2100, 2500],
  ]),

  // ── UTTAR PRADESH ────────────────────────────────────────────────────────
  ...st("Uttar Pradesh", "Lucknow", "Lucknow APMC", [
    ["Wheat", 2350, 2750], ["Sugarcane", 3200, 3700], ["Rice", 2200, 2700],
    ["Pulses", 6000, 8000], ["Potato", 1100, 1900], ["Mustard", 5500, 6500],
    ["Vegetables", 1000, 3000],
  ]),
  ...st("Uttar Pradesh", "Agra", "Agra APMC", [
    ["Wheat", 2350, 2750], ["Mustard", 5500, 6500], ["Potato", 1100, 1900],
    ["Bajra", 2100, 2600], ["Barley", 2000, 2400], ["Pea", 3000, 5000],
  ]),
  ...st("Uttar Pradesh", "Varanasi", "Varanasi APMC", [
    ["Rice", 2200, 2700], ["Wheat", 2350, 2750], ["Vegetables", 1000, 3000],
    ["Maize", 2050, 2450], ["Gram", 5200, 6000], ["Pea", 3000, 5000],
  ]),
  ...st("Uttar Pradesh", "Meerut", "Meerut APMC", [
    ["Sugarcane", 3200, 3700], ["Wheat", 2350, 2750], ["Rice", 2200, 2700],
    ["Mustard", 5500, 6500], ["Potato", 1100, 1900],
  ]),

  // ── MADHYA PRADESH ───────────────────────────────────────────────────────
  ...st("Madhya Pradesh", "Indore", "Indore APMC", [
    ["Soybean", 4100, 4700], ["Wheat", 2350, 2750], ["Gram", 5200, 6000],
    ["Cotton", 7000, 7800], ["Maize", 2000, 2400], ["Onion", 1200, 2200],
  ]),
  ...st("Madhya Pradesh", "Bhopal", "Bhopal APMC", [
    ["Soybean", 4100, 4700], ["Wheat", 2350, 2750], ["Gram", 5200, 6000],
    ["Mustard", 5500, 6500], ["Maize", 2000, 2400],
  ]),
  ...st("Madhya Pradesh", "Jabalpur", "Jabalpur APMC", [
    ["Rice", 2200, 2700], ["Wheat", 2350, 2750], ["Soybean", 4100, 4700],
    ["Gram", 5200, 6000], ["Maize", 2000, 2400],
  ]),
  ...st("Madhya Pradesh", "Gwalior", "Gwalior APMC", [
    ["Wheat", 2350, 2750], ["Mustard", 5500, 6500], ["Bajra", 2100, 2600],
    ["Gram", 5200, 6000], ["Pea", 3000, 5000],
  ]),

  // ── KARNATAKA ────────────────────────────────────────────────────────────
  ...st("Karnataka", "Bengaluru", "Bengaluru APMC (Yeshwanthpur)", [
    ["Vegetables", 1000, 4000], ["Ragi", 3500, 4200], ["Groundnut", 5500, 6500],
    ["Maize", 2000, 2400], ["Coconut", 2200, 3200], ["Tomato", 700, 2000],
    ["Onion", 1200, 2200], ["Potato", 1200, 2000],
  ]),
  ...st("Karnataka", "Mysore", "Mysore APMC", [
    ["Paddy", 2100, 2600], ["Sugarcane", 2900, 3400], ["Ragi", 3500, 4200],
    ["Groundnut", 5500, 6500], ["Maize", 2000, 2400], ["Turmeric", 8000, 11000],
  ]),
  ...st("Karnataka", "Belagavi", "Belagavi APMC", [
    ["Sugarcane", 3000, 3500], ["Cotton", 7000, 7800], ["Jowar", 2300, 2900],
    ["Tur", 7700, 9300], ["Groundnut", 5500, 6500], ["Wheat", 2350, 2750],
  ]),
  ...st("Karnataka", "Hubli", "Hubli APMC (Dharwad)", [
    ["Cotton", 7000, 7800], ["Groundnut", 5500, 6500], ["Jowar", 2300, 2900],
    ["Sunflower", 5500, 6500], ["Tur", 7700, 9300],
  ]),
  ...st("Karnataka", "Gulbarga", "Kalaburagi APMC", [
    ["Tur", 7700, 9300], ["Gram", 5200, 6000], ["Cotton", 7000, 7800],
    ["Jowar", 2300, 2900], ["Sunflower", 5500, 6500],
  ]),

  // ── TAMIL NADU ───────────────────────────────────────────────────────────
  ...st("Tamil Nadu", "Chennai", "Koyambedu Market Chennai", [
    ["Paddy", 2150, 2550], ["Vegetables", 1000, 4000], ["Coconut", 2000, 3000],
    ["Banana", 1200, 2500], ["Onion", 1300, 2300], ["Tomato", 800, 2000],
  ]),
  ...st("Tamil Nadu", "Coimbatore", "Coimbatore APMC", [
    ["Sugarcane", 2900, 3400], ["Groundnut", 5500, 6500], ["Cotton", 7000, 7800],
    ["Maize", 2000, 2400], ["Banana", 1200, 2500], ["Paddy", 2150, 2550],
  ]),
  ...st("Tamil Nadu", "Madurai", "Madurai APMC", [
    ["Paddy", 2150, 2550], ["Banana", 1200, 2500], ["Cotton", 7000, 7800],
    ["Groundnut", 5500, 6500], ["Onion", 1300, 2300],
  ]),
  ...st("Tamil Nadu", "Salem", "Salem APMC", [
    ["Tapioca", 1200, 1800], ["Turmeric", 8000, 11000], ["Mango", 5000, 12000],
    ["Paddy", 2150, 2550], ["Vegetables", 1000, 3000],
  ]),

  // ── GUJARAT ──────────────────────────────────────────────────────────────
  ...st("Gujarat", "Ahmedabad", "Ahmedabad APMC", [
    ["Cotton", 7000, 7800], ["Wheat", 2350, 2750], ["Bajra", 2100, 2600],
    ["Castor", 5500, 6500], ["Groundnut", 5500, 6500], ["Cumin", 25000, 38000],
  ]),
  ...st("Gujarat", "Rajkot", "Rajkot APMC", [
    ["Cotton", 7000, 7800], ["Groundnut", 5500, 6500], ["Sesame", 8000, 11000],
    ["Cumin", 25000, 38000], ["Bajra", 2100, 2600], ["Castor", 5500, 6500],
  ]),
  ...st("Gujarat", "Surat", "Surat APMC", [
    ["Sugarcane", 3000, 3500], ["Cotton", 7000, 7800], ["Rice", 2200, 2700],
    ["Banana", 1200, 2400], ["Vegetables", 1000, 3000],
  ]),
  ...st("Gujarat", "Vadodara", "Vadodara APMC", [
    ["Cotton", 7000, 7800], ["Tobacco", 8000, 12000], ["Banana", 1200, 2400],
    ["Wheat", 2350, 2750], ["Groundnut", 5500, 6500],
  ]),

  // ── RAJASTHAN ────────────────────────────────────────────────────────────
  ...st("Rajasthan", "Jaipur", "Jaipur APMC", [
    ["Wheat", 2350, 2750], ["Gram", 5200, 6000], ["Bajra", 2100, 2600],
    ["Mustard", 5500, 6500], ["Cumin", 25000, 38000], ["Potato", 1100, 1900],
  ]),
  ...st("Rajasthan", "Jodhpur", "Jodhpur APMC", [
    ["Bajra", 2100, 2600], ["Mustard", 5500, 6500], ["Guar", 4500, 6000],
    ["Cumin", 25000, 38000], ["Moth Bean", 4500, 5500],
  ]),
  ...st("Rajasthan", "Kota", "Kota APMC", [
    ["Soybean", 4100, 4700], ["Wheat", 2350, 2750], ["Mustard", 5500, 6500],
    ["Gram", 5200, 6000], ["Coriander", 8000, 14000],
  ]),
  ...st("Rajasthan", "Udaipur", "Udaipur APMC", [
    ["Maize", 2000, 2400], ["Wheat", 2350, 2750], ["Gram", 5200, 6000],
    ["Soybean", 4100, 4700], ["Garlic", 6000, 11000],
  ]),

  // ── ANDHRA PRADESH ───────────────────────────────────────────────────────
  ...st("Andhra Pradesh", "Visakhapatnam", "Visakhapatnam APMC", [
    ["Paddy", 2150, 2600], ["Sugarcane", 3000, 3500], ["Banana", 1200, 2400],
    ["Cashew", 12000, 18000], ["Maize", 2000, 2400],
  ]),
  ...st("Andhra Pradesh", "Vijayawada", "Vijayawada APMC", [
    ["Paddy", 2150, 2600], ["Cotton", 7000, 7800], ["Sugarcane", 3000, 3500],
    ["Chilli", 10000, 20000], ["Turmeric", 8000, 11000],
  ]),
  ...st("Andhra Pradesh", "Guntur", "Guntur APMC", [
    ["Chilli", 10000, 20000], ["Cotton", 7000, 7800], ["Tobacco", 8000, 12000],
    ["Paddy", 2150, 2600], ["Maize", 2000, 2400],
  ]),

  // ── TELANGANA ────────────────────────────────────────────────────────────
  ...st("Telangana", "Hyderabad", "Hyderabad Bowenpally APMC", [
    ["Rice", 2200, 2700], ["Cotton", 7000, 7800], ["Maize", 2000, 2400],
    ["Tur", 7700, 9300], ["Soybean", 4100, 4700], ["Onion", 1200, 2200],
    ["Tomato", 700, 1800], ["Chilli", 8000, 15000],
  ]),
  ...st("Telangana", "Warangal", "Warangal APMC", [
    ["Cotton", 7000, 7800], ["Paddy", 2150, 2600], ["Maize", 2000, 2400],
    ["Tur", 7700, 9300], ["Jowar", 2300, 2900],
  ]),

  // ── WEST BENGAL ──────────────────────────────────────────────────────────
  ...st("West Bengal", "Kolkata", "Kolkata APMC (Kolay)", [
    ["Rice", 2200, 2700], ["Potato", 1000, 1800], ["Vegetables", 1000, 3500],
    ["Jute", 5000, 6500], ["Onion", 1200, 2200], ["Tomato", 700, 1800],
    ["Mustard", 5500, 6500], ["Banana", 1200, 2400],
  ]),
  ...st("West Bengal", "Murshidabad", "Murshidabad APMC", [
    ["Rice", 2200, 2700], ["Jute", 5000, 6500], ["Mustard", 5500, 6500],
    ["Vegetables", 1000, 3000], ["Potato", 1000, 1800],
  ]),

  // ── HARYANA ──────────────────────────────────────────────────────────────
  ...st("Haryana", "Karnal", "Karnal APMC", [
    ["Wheat", 2350, 2750], ["Rice", 2400, 2900], ["Sugarcane", 3200, 3700],
    ["Mustard", 5500, 6500], ["Barley", 2000, 2400], ["Potato", 1100, 1900],
  ]),
  ...st("Haryana", "Hisar", "Hisar APMC", [
    ["Wheat", 2350, 2750], ["Cotton", 7000, 7800], ["Bajra", 2100, 2600],
    ["Mustard", 5500, 6500], ["Gram", 5200, 6000],
  ]),
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
