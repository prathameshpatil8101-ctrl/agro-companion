// Deep organic farming knowledge — crop packages, ROI, certification, suppliers

export interface OrganicPackage {
  crop: string;
  inputs: string;
  pestControl: string;
  fertility: string;
  harvest: string;
  yieldVsConventional: string;  // e.g. "-10% Y1, then equals Y3"
  pricePremium: string;          // e.g. "25-40% premium in organic mandis"
}

export const organicPackages: OrganicPackage[] = [
  { crop: "Cotton", inputs: "Beejamrut seed treatment; FYM 5t/acre + neem cake 200kg/acre at sowing.",
    pestControl: "NPV + neem oil 5% rotation. Trap crop marigold/okra borders. Pheromone traps.",
    fertility: "Jeevamrut 200L/acre every 21 days. Green manure dhaincha before sowing.",
    harvest: "Hand-pick to keep fibre clean. Sun-dry before storage.",
    yieldVsConventional: "-15% Y1, parity by Y3", pricePremium: "20-30% premium via FPO organic cotton bales" },
  { crop: "Sugarcane", inputs: "Setts dipped in Trichoderma + cow urine. FYM 10t/acre + neem cake 500kg/acre.",
    pestControl: "Trichogramma cards 50,000/ha every 10 days for borers. Light traps.",
    fertility: "Jeevamrut + Panchagavya. Intercrop with daincha (green manure).",
    harvest: "Cut close to ground for tonnage. Avoid burning.",
    yieldVsConventional: "-10% Y1, equal Y2", pricePremium: "10-15% via organic jaggery/gur markets" },
  { crop: "Soybean", inputs: "Rhizobium + PSB seed treatment. FYM 4t/acre + neem cake 100kg/acre.",
    pestControl: "Neem oil + Bt for caterpillars. Yellow traps for whitefly.",
    fertility: "Jeevamrut at flowering + pod fill stage.",
    harvest: "Cut when pods rattle. Dry to 11% moisture.",
    yieldVsConventional: "-12% Y1, parity Y3", pricePremium: "15-25% via organic soyabean processors" },
  { crop: "Tur", inputs: "Beejamrut + Rhizobium seed treatment. FYM 4t/acre.",
    pestControl: "NPV + neem against pod borer. Intercrop with maize/jowar.",
    fertility: "Jeevamrut at branching and flowering stages.",
    harvest: "Harvest when 80% pods dry. Manual threshing preferred.",
    yieldVsConventional: "-10% Y1, parity Y2", pricePremium: "20-35% in organic dal market" },
  { crop: "Onion", inputs: "Vermicompost 2t/acre + neem cake 150kg/acre.",
    pestControl: "Blue sticky traps for thrips + neem + Beauveria. Mulch straw.",
    fertility: "Jeevamrut weekly during bulb formation.",
    harvest: "Cure 7 days in shade. Store in ventilated structure.",
    yieldVsConventional: "-15% Y1, near parity Y2", pricePremium: "30-50% in organic export channels" },
  { crop: "Grapes", inputs: "FYM 8t/acre + vermicompost 2t. Bordeaux paste on cuts.",
    pestControl: "Sulfur dust + neem against mildew. Pheromone for moths.",
    fertility: "Panchagavya foliar spray every 15 days post-pruning.",
    harvest: "Cluster-by-cluster ripeness check. Cool transport.",
    yieldVsConventional: "-20% Y1, -10% Y2", pricePremium: "40-60% premium in export & organic juice" },
  { crop: "Pomegranate", inputs: "FYM 10kg/plant + neem cake 1kg/plant + vermicompost 2kg/plant.",
    pestControl: "Pheromone + bagging fruit for bacterial blight. Bordeaux mixture.",
    fertility: "Jeevamrut soil drench monthly.",
    harvest: "Hand-pick at full color. Cool transport.",
    yieldVsConventional: "-15% Y1, parity Y3", pricePremium: "30-50% in export Anar markets" },
  { crop: "Banana", inputs: "FYM 15kg/plant + vermicompost 2kg + neem cake 1kg.",
    pestControl: "Trichoderma soil + Pseudomonas. Bunch covers for thrips.",
    fertility: "Jeevamrut weekly + banana pseudo-stem composting.",
    harvest: "Cut at 75% maturity for transport. Ripening chambers.",
    yieldVsConventional: "-10% Y1, parity Y2", pricePremium: "20-35% via organic chains, export" },
  { crop: "Tomato", inputs: "Vermicompost 2t/acre + neem cake 100kg.",
    pestControl: "Bt + NPV + neem rotation. Yellow + blue traps.",
    fertility: "Jeevamrut weekly + cow milk 5% foliar fortnightly.",
    harvest: "Pick at breaker stage for transport.",
    yieldVsConventional: "-20% Y1, -10% Y2", pricePremium: "30-50% in organic city markets" },
  { crop: "Wheat", inputs: "Beejamrut seed treatment. FYM 3t/acre + green manure sunhemp.",
    pestControl: "Aphid: neem oil 3ml/L. Rust: cow milk + Trichoderma.",
    fertility: "Jeevamrut at tillering and grain filling.",
    harvest: "Cut at hard-dough stage. Sun-dry sheaves.",
    yieldVsConventional: "-15% Y1, -5% Y3", pricePremium: "20-30% in organic atta market" },
  { crop: "Rice", inputs: "Beejamrut + Azospirillum seed dip. FYM 5t/acre + green manure dhaincha.",
    pestControl: "Light traps + Trichogramma for stem borer. Neem oil for plant hopper.",
    fertility: "SRI method + jeevamrut every 15 days.",
    harvest: "Cut at 80% golden grains. Dry to 12% moisture.",
    yieldVsConventional: "-10% Y1, parity Y2 with SRI", pricePremium: "25-40% in organic basmati & traditional varieties" },
  { crop: "Turmeric", inputs: "FYM 10t/acre + neem cake 200kg + vermicompost 2t.",
    pestControl: "Trichoderma for rhizome rot. Mulch heavily.",
    fertility: "Jeevamrut monthly + panchagavya foliar.",
    harvest: "Lift at 8-9 months when leaves yellow. Cure-boil.",
    yieldVsConventional: "-15% Y1, parity Y2", pricePremium: "30-60% in organic spice export" },
  { crop: "Chilli", inputs: "FYM 5t/acre + neem cake 150kg + vermicompost 2t.",
    pestControl: "Sulfur dust + Beauveria for mites/thrips. Neem oil weekly.",
    fertility: "Jeevamrut + panchagavya alternate weeks.",
    harvest: "Pick red ripe pods. Sun-dry on plastic sheets.",
    yieldVsConventional: "-15% Y1, near parity Y2", pricePremium: "25-40% in organic chilli powder market" },
  { crop: "Jowar", inputs: "Beejamrut + FYM 3t/acre.",
    pestControl: "Neem oil for shoot fly. Bird perches.",
    fertility: "Jeevamrut at panicle stage.",
    harvest: "Cut at hard-dough stage. Sun-dry.",
    yieldVsConventional: "-10% Y1, parity Y2", pricePremium: "20-30% in organic millets boom" },
  { crop: "Bajra", inputs: "Beejamrut + FYM 2t/acre.",
    pestControl: "Generally low pest issues. Bird scaring at maturity.",
    fertility: "Jeevamrut at tillering.",
    harvest: "Cut at hard-dough. Sun-dry ear-heads.",
    yieldVsConventional: "-5% Y1, parity Y2", pricePremium: "20-30% in organic millets market" },
  { crop: "Groundnut", inputs: "Rhizobium seed treatment + FYM 4t/acre + gypsum 200kg/acre.",
    pestControl: "Neem oil + Trichoderma for tikka.",
    fertility: "Jeevamrut at pegging stage.",
    harvest: "Lift at 60% pod maturity. Sun-cure 5 days.",
    yieldVsConventional: "-15% Y1, parity Y2", pricePremium: "25-40% in organic oil & nut market" },
  { crop: "Sunflower", inputs: "FYM 3t/acre + vermicompost 1t.",
    pestControl: "Yellow traps for thrips. Neem oil 3ml/L.",
    fertility: "Jeevamrut at button + flowering stage.",
    harvest: "Cut heads at brown back stage. Dry to 9%.",
    yieldVsConventional: "-15% Y1, parity Y2", pricePremium: "20-35% in cold-pressed organic oil" },
  { crop: "Gram", inputs: "Rhizobium seed dip + FYM 2t/acre.",
    pestControl: "NPV + Bt for pod borer. Bird perches.",
    fertility: "Jeevamrut at flowering.",
    harvest: "Pull at 75% pod maturity. Sun-dry.",
    yieldVsConventional: "-10% Y1, parity Y2", pricePremium: "20-35% in organic dal" },
  { crop: "Brinjal", inputs: "Vermicompost 2t/acre + neem cake 100kg.",
    pestControl: "Pheromone + Bt for fruit borer. Remove damaged shoots.",
    fertility: "Jeevamrut every 15 days.",
    harvest: "Pick tender stage every 3-4 days.",
    yieldVsConventional: "-20% Y1, -10% Y2", pricePremium: "30-50% in organic veg market" },
  { crop: "Mango", inputs: "FYM 50kg/tree + neem cake 5kg + vermicompost 5kg annually.",
    pestControl: "Pheromone for fruit fly. Bordeaux for anthracnose.",
    fertility: "Panchagavya soil drench post-monsoon.",
    harvest: "Hand-pick at physiological maturity with 1cm stalk.",
    yieldVsConventional: "-15% Y1, parity Y3", pricePremium: "40-70% in Alphonso export & organic markets" },
];

// 3-Year organic conversion roadmap
export const conversionRoadmap = [
  { phase: "Year 1 (Setup)", months: "0-12",
    actions: [
      "Stop all chemical fertilizers and pesticides immediately.",
      "Build farm pond / vermicompost shed / cattle shed.",
      "Apply 5-10 tons FYM/acre + green manure (dhaincha, sunhemp).",
      "Start jeevamrut/beejamrut preparation routine.",
      "Apply for PGS-India registration via local PGS group / FPO.",
      "Soil test for baseline organic carbon.",
    ],
    expect: "Yield drops 15-25%. Soil starts healing. Costs reduce 30-40%."
  },
  { phase: "Year 2 (Transition)", months: "13-24",
    actions: [
      "Crop rotation with legume in every cycle.",
      "Install drip + mulch on at least 50% of farm.",
      "Increase biomass — agro-forestry, hedge rows.",
      "Start internal inspection for PGS — peer farmer audit.",
      "Sell as 'in-conversion' or via FPO bulk channel.",
    ],
    expect: "Yield recovers to 90-95%. Premium starts at 10-20%."
  },
  { phase: "Year 3 (Certified Organic)", months: "25-36",
    actions: [
      "Complete PGS audit, receive 'Organic' certificate (PGS Green).",
      "Direct selling — organic mandis, e-commerce, restaurants.",
      "Brand your own packaging with QR code traceability.",
      "Apply for NPOP if export targeted.",
    ],
    expect: "Yield ≈ chemical levels. Net profit 30-60% higher. Soil organic carbon 2x baseline."
  },
];

// PGS-India certification info
export const certificationInfo = {
  PGS_India: {
    name: "PGS-India (Participatory Guarantee System)",
    cost: "₹500 - ₹2,000 / farmer (group-based, very low cost)",
    duration: "Conversion 2-3 years; certificate valid 1 year, annual renewal",
    process: [
      "Form / join a PGS Local Group of 5+ farmers in your village.",
      "Register the group with a PGS Regional Council (free).",
      "Maintain field diary — inputs, sprays, rotations.",
      "Internal peer inspection annually.",
      "External Regional Council audit before certificate issue.",
    ],
    bestFor: "Domestic market, farmers' markets, e-commerce, FPO bulk sales.",
    apply: "https://pgsindia-ncof.gov.in/",
  },
  NPOP: {
    name: "NPOP (National Programme for Organic Production)",
    cost: "₹25,000 - ₹50,000 per farm initially (third-party certified)",
    duration: "3 years conversion; annual recertification",
    process: [
      "Hire APEDA-accredited certification body (e.g. INDOCERT, OneCert, ECOCERT).",
      "Application + farm history declaration.",
      "Annual on-site inspection.",
      "Soil & produce residue testing.",
    ],
    bestFor: "Export markets (EU, US, Japan), bulk processors.",
    apply: "https://apeda.gov.in/apedawebsite/organic/",
  },
};

// Organic input suppliers (Maharashtra)
export const organicSuppliers = [
  { name: "Madhumakshika Organics", type: "Vermicompost / Bio-fertilizers", region: "Pune, Satara, Sangli", contact: "Pune district FPOs" },
  { name: "Amrut Krushak FPO", type: "Bio-fertilizers + organic seeds", region: "Marathwada (Latur, Aurangabad)", contact: "Via MahaFPC network" },
  { name: "Sahaja Samrudha", type: "Native seeds + training", region: "Karnataka + Maharashtra", contact: "sahajasamrudha.org" },
  { name: "Ekgaon Organics", type: "Inputs + buy-back of produce", region: "Pan-India", contact: "ekgaon.com" },
  { name: "Vidarbha Organic Farmers Assoc.", type: "Cotton + tur, peer support", region: "Vidarbha", contact: "Via Wardha district KVK" },
  { name: "Krushi Vigyan Kendra (KVK)", type: "Free training + Trichoderma + neem cake supply", region: "Every district", contact: "Local KVK office" },
];

// Premium organic mandis in / serving Maharashtra
export const organicMandis = [
  { name: "Maharashtra Organic Farmers Federation (MOFF)", type: "FPO collective", premium: "20-40%", channel: "Bulk buyback for processing" },
  { name: "Pune Farmers' Market (Pune Saturday Market)", type: "Direct-to-consumer", premium: "30-50%", channel: "Weekly stall, ₹500/stall" },
  { name: "Mumbai - Two Brothers Organic Farms platform", type: "Online", premium: "40-60%", channel: "Listing + delivery" },
  { name: "Sahyadri Farms FPO (Nashik)", type: "Grapes, pomegranate, onion export", premium: "35-55%", channel: "Member contract farming" },
  { name: "I Say Organic (Bangalore + MH delivery)", type: "Online D2C", premium: "40-70%", channel: "Vendor onboarding" },
  { name: "Big Basket / Amazon Fresh organic listing", type: "E-commerce", premium: "25-45%", channel: "FSSAI + Organic cert required" },
  { name: "APEDA Export channel", type: "International export", premium: "50-100%", channel: "Need NPOP cert + APEDA registration" },
];
