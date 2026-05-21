export interface DiseaseInfo {
  cropName: string;
  diseaseName: string;
  symptoms: string;
  cause: string;
  medicine: string;
  treatment: string;
  prevention: string;
  organicTreatment: string;
  severity?: "Low" | "Medium" | "High";
}

// 30+ diseases covering top Maharashtra & Indian crops
export const diseaseDatabase: DiseaseInfo[] = [
  // COTTON
  { cropName: "Cotton", diseaseName: "American Bollworm", severity: "High",
    symptoms: "Round holes in bolls, larvae inside, premature boll drop.",
    cause: "Helicoverpa armigera larvae feeding on bolls.",
    medicine: "Emamectin benzoate 5% SG (220g/ha), Spinosad 45% SC, Chlorantraniliprole.",
    treatment: "Install pheromone traps @5/acre. Spray at 5-10% boll damage. Rotate insecticides.",
    prevention: "Sow Bt cotton, install bird perches, intercrop with marigold.",
    organicTreatment: "NPV (Nuclear Polyhedrosis Virus) 250 LE/ha, neem oil 5ml/L weekly, Trichogramma cards." },
  { cropName: "Cotton", diseaseName: "Bacterial Blight", severity: "Medium",
    symptoms: "Angular water-soaked spots on leaves turning brown, vein blackening.",
    cause: "Xanthomonas axonopodis pv. malvacearum bacterium.",
    medicine: "Copper oxychloride 50% WP (3g/L) + Streptocycline (1g/10L).",
    treatment: "Spray every 10 days. Remove infected plants. Use acid-delinted seed.",
    prevention: "Crop rotation, resistant varieties, certified seed.",
    organicTreatment: "Cow urine (10%) spray, Pseudomonas fluorescens soil drench." },
  { cropName: "Cotton", diseaseName: "Pink Bollworm", severity: "High",
    symptoms: "Rosetted flowers, locule discoloration, sticky cotton, exit holes.",
    cause: "Pectinophora gossypiella larvae inside bolls.",
    medicine: "Chlorantraniliprole 18.5% SC, Profenofos 50% EC.",
    treatment: "Pheromone traps, destroy infested bolls, end-of-season ploughing.",
    prevention: "Short-duration varieties, avoid late cotton, follow refuge plots.",
    organicTreatment: "Mating disruption pheromone, neem seed kernel extract 5%." },

  // SUGARCANE
  { cropName: "Sugarcane", diseaseName: "Red Rot", severity: "High",
    symptoms: "Red discoloration with white spots inside stem, alcoholic smell, drying leaves.",
    cause: "Fungus Colletotrichum falcatum.",
    medicine: "Carbendazim 50% WP (1g/L) dip + soil drench.",
    treatment: "Uproot and burn infected plants. Hot-water treat setts (50°C for 2hr).",
    prevention: "Use disease-free setts, crop rotation with rice/legume.",
    organicTreatment: "Trichoderma viride soil application 5kg/ha + FYM." },
  { cropName: "Sugarcane", diseaseName: "Smut", severity: "Medium",
    symptoms: "Black whip-like growth from top of cane, stunted thin stems.",
    cause: "Sporisorium scitamineum fungus.",
    medicine: "Triadimefon 25% WP or Propiconazole sett treatment.",
    treatment: "Remove and burn smut whips before spore release. Replant healthy setts.",
    prevention: "Hot-water + fungicide sett treatment, resistant varieties (Co-86032, Co-0238).",
    organicTreatment: "Trichoderma sett dip, panchagavya foliar spray." },

  // SOYBEAN
  { cropName: "Soybean", diseaseName: "Yellow Mosaic Virus", severity: "High",
    symptoms: "Bright yellow patches on leaves, leaf crinkling, stunted growth, low pod set.",
    cause: "Mungbean Yellow Mosaic Virus, spread by whitefly Bemisia tabaci.",
    medicine: "Thiamethoxam 25% WG (0.4g/L) or Imidacloprid 17.8% SL for vector control.",
    treatment: "Spray insecticide on whitefly, rogue infected plants.",
    prevention: "Resistant varieties (JS-335, MAUS-71), avoid late sowing, yellow sticky traps.",
    organicTreatment: "Neem oil 5ml/L weekly, Verticillium lecanii spray for whitefly." },
  { cropName: "Soybean", diseaseName: "Rust", severity: "Medium",
    symptoms: "Small reddish-brown pustules on underside of leaves, premature defoliation.",
    cause: "Phakopsora pachyrhizi fungus.",
    medicine: "Hexaconazole 5% EC (2ml/L) or Propiconazole 25% EC.",
    treatment: "Spray at first sign, repeat after 15 days.",
    prevention: "Wider spacing, balanced N fertilization, early sowing.",
    organicTreatment: "Trichoderma + cow milk (10%) foliar spray." },

  // TUR / PIGEON PEA
  { cropName: "Tur", diseaseName: "Wilt", severity: "High",
    symptoms: "Wilting starting from one branch, vascular browning when stem split, plant death.",
    cause: "Fusarium udum soil-borne fungus.",
    medicine: "Carbendazim 50% WP (2g/L) seed treatment + soil drench.",
    treatment: "Remove infected plants. Apply Trichoderma to soil.",
    prevention: "Wilt-resistant varieties (BSMR-736, BDN-708), 3-year rotation.",
    organicTreatment: "Trichoderma harzianum 5kg + 50kg FYM/acre, neem cake 100kg/acre." },
  { cropName: "Tur", diseaseName: "Pod Borer", severity: "High",
    symptoms: "Round holes in pods, larvae inside, partial seed damage.",
    cause: "Helicoverpa armigera caterpillar.",
    medicine: "Emamectin benzoate 5% SG or Flubendiamide 39.35% SC.",
    treatment: "Pheromone traps, spray at pod formation.",
    prevention: "Intercrop with sorghum/maize as trap crop, bird perches.",
    organicTreatment: "NPV 250 LE/ha, neem oil 5%, Bt 1.5kg/ha." },

  // ONION
  { cropName: "Onion", diseaseName: "Purple Blotch", severity: "Medium",
    symptoms: "Small white sunken spots growing into purple blotches with concentric rings.",
    cause: "Alternaria porri fungus, worse in humid weather.",
    medicine: "Mancozeb 75% WP (2.5g/L) or Hexaconazole 5% EC.",
    treatment: "Spray every 10 days starting 30 days after transplant.",
    prevention: "Wider spacing, balanced nitrogen, avoid overhead irrigation.",
    organicTreatment: "Trichoderma viride spray, garlic-chilli extract." },
  { cropName: "Onion", diseaseName: "Thrips", severity: "High",
    symptoms: "Silvery streaks on leaves, twisted curled tips, reduced bulb size.",
    cause: "Thrips tabaci feeding on leaves.",
    medicine: "Fipronil 5% SC (1.5ml/L) or Spinosad 45% SC.",
    treatment: "Blue sticky traps, spray at first sight, rotate chemistry.",
    prevention: "Mulching, avoid water stress, weed control.",
    organicTreatment: "Neem oil 5ml/L + Beauveria bassiana spray." },

  // GRAPES
  { cropName: "Grapes", diseaseName: "Downy Mildew", severity: "High",
    symptoms: "Yellow oily spots on upper leaf, white fuzzy growth below, berry shrivelling.",
    cause: "Plasmopara viticola, after rain or high humidity.",
    medicine: "Metalaxyl-Mancozeb 72% WP (2.5g/L) or Fosetyl-Al 80% WP.",
    treatment: "Spray before/after rain, alternate systemic + contact fungicides.",
    prevention: "Pruning, canopy management, avoid evening irrigation.",
    organicTreatment: "Bordeaux mixture 1%, copper hydroxide, baking soda spray." },
  { cropName: "Grapes", diseaseName: "Anthracnose", severity: "Medium",
    symptoms: "Dark sunken spots on shoots and berries (bird's-eye), cracking.",
    cause: "Elsinoe ampelina fungus.",
    medicine: "Carbendazim 50% WP or Mancozeb spray.",
    treatment: "Spray fortnightly during rainy season.",
    prevention: "Prune affected canes, good air circulation.",
    organicTreatment: "Bordeaux paste on cuts, Trichoderma spray." },

  // POMEGRANATE
  { cropName: "Pomegranate", diseaseName: "Bacterial Blight (Telya)", severity: "High",
    symptoms: "Small water-soaked spots on leaves and fruits turning black, fruit cracking.",
    cause: "Xanthomonas axonopodis pv. punicae.",
    medicine: "Bronopol 0.05% + Streptocycline 0.025% + Copper oxychloride 0.25%.",
    treatment: "Spray every 7-10 days. Remove and burn infected parts.",
    prevention: "Sanitation, avoid overhead irrigation, disease-free planting material.",
    organicTreatment: "Cow urine 10% + ash dust + neem oil rotation." },

  // BANANA
  { cropName: "Banana", diseaseName: "Panama Wilt", severity: "High",
    symptoms: "Yellowing of older leaves from bottom, leaves hang down, vascular browning.",
    cause: "Fusarium oxysporum f.sp. cubense soil fungus.",
    medicine: "Carbendazim 50% WP injection into pseudostem (2ml/plant).",
    treatment: "Uproot and burn infected plants. Apply lime to soil.",
    prevention: "Tissue-cultured resistant varieties (Grand Naine), avoid replanting on infected land.",
    organicTreatment: "Trichoderma + Pseudomonas + neem cake 1kg/plant." },
  { cropName: "Banana", diseaseName: "Sigatoka Leaf Spot", severity: "Medium",
    symptoms: "Yellow-green streaks turning brown with grey center, leaves dry early.",
    cause: "Mycosphaerella musicola fungus.",
    medicine: "Propiconazole 25% EC (1ml/L) + mineral oil.",
    treatment: "Spray during humid months, deleaf affected leaves.",
    prevention: "Proper drainage, optimum spacing, balanced fertilization.",
    organicTreatment: "Trichoderma + neem oil + cow milk spray." },

  // TOMATO
  { cropName: "Tomato", diseaseName: "Early Blight", severity: "Medium",
    symptoms: "Dark concentric ring spots on lower leaves, yellow halo, leaf drop bottom-up.",
    cause: "Alternaria solani fungus.",
    medicine: "Mancozeb 75% WP (2.5g/L) or Chlorothalonil 75% WP.",
    treatment: "Weekly spray, remove infected lower leaves, mulch.",
    prevention: "Resistant varieties, crop rotation, stake plants for airflow.",
    organicTreatment: "Trichoderma soil + neem oil 5ml/L + cow milk 10% spray." },
  { cropName: "Tomato", diseaseName: "Late Blight", severity: "High",
    symptoms: "Large water-soaked greasy spots on leaves with white sporulation below, rapid spread.",
    cause: "Phytophthora infestans, in cool wet weather.",
    medicine: "Metalaxyl-Mancozeb (2.5g/L), Cymoxanil + Mancozeb.",
    treatment: "Spray before/after rains, destroy infected plants.",
    prevention: "Resistant varieties, drip irrigation, plastic mulch.",
    organicTreatment: "Bordeaux mixture 1%, copper soap, garlic extract." },
  { cropName: "Tomato", diseaseName: "Leaf Curl Virus", severity: "High",
    symptoms: "Upward curling, yellowing leaf edges, stunted plant, no flowers.",
    cause: "Tomato Yellow Leaf Curl Virus spread by whitefly.",
    medicine: "Imidacloprid 17.8% SL (0.3ml/L) for vector.",
    treatment: "Remove infected plants, control whitefly.",
    prevention: "Tolerant hybrids, yellow sticky traps, reflective mulch.",
    organicTreatment: "Neem oil 5ml/L, Verticillium lecanii spray." },

  // CHILLI
  { cropName: "Chilli", diseaseName: "Fruit Rot & Die Back", severity: "High",
    symptoms: "Black tip dieback, soft rot of fruits, dropping.",
    cause: "Colletotrichum capsici and C. gloeosporioides.",
    medicine: "Carbendazim 50% WP (2g/L) + Mancozeb.",
    treatment: "Spray at flowering and fortnightly after fruit set.",
    prevention: "Seed treatment, resistant varieties, good drainage.",
    organicTreatment: "Trichoderma + Pseudomonas + neem oil." },
  { cropName: "Chilli", diseaseName: "Thrips & Mites", severity: "Medium",
    symptoms: "Upward and downward leaf curl (Murda), bronzing, deformed fruits.",
    cause: "Scirtothrips dorsalis + Polyphagotarsonemus latus mite.",
    medicine: "Spinosad 45% SC + Spiromesifen 22.9% SC.",
    treatment: "Sticky traps, spray on undersides.",
    prevention: "Avoid water stress, balanced nitrogen.",
    organicTreatment: "Neem oil 5ml/L + sulfur dust + Beauveria." },

  // GRAM / CHICKPEA
  { cropName: "Gram", diseaseName: "Wilt", severity: "High",
    symptoms: "Sudden drooping of branches, vascular browning, plant death.",
    cause: "Fusarium oxysporum f.sp. ciceri.",
    medicine: "Carbendazim + Thiram (2g/kg) seed treatment.",
    treatment: "Remove infected plants, soil drench.",
    prevention: "Wilt-resistant varieties (JG-11, BDN-9-3), 3-year rotation.",
    organicTreatment: "Trichoderma seed + soil treatment, neem cake." },
  { cropName: "Gram", diseaseName: "Pod Borer", severity: "High",
    symptoms: "Holes in pods, larvae inside, partial grain damage.",
    cause: "Helicoverpa armigera caterpillar.",
    medicine: "Emamectin benzoate or Indoxacarb.",
    treatment: "Pheromone traps, spray at pod stage.",
    prevention: "Intercrop with mustard/coriander, bird perches.",
    organicTreatment: "NPV, Bt 1kg/ha, neem oil 5%." },

  // WHEAT
  { cropName: "Wheat", diseaseName: "Yellow Rust", severity: "High",
    symptoms: "Yellow stripes of pustules between leaf veins, premature drying.",
    cause: "Puccinia striiformis, in cool humid weather.",
    medicine: "Propiconazole 25% EC (1ml/L) or Tebuconazole 25% EC.",
    treatment: "Spray at first sight, repeat after 15 days.",
    prevention: "Resistant varieties, timely sowing.",
    organicTreatment: "Trichoderma + cow milk (10%) spray." },
  { cropName: "Wheat", diseaseName: "Loose Smut", severity: "Medium",
    symptoms: "Black powdery mass replacing grains in ear.",
    cause: "Ustilago tritici seed-borne fungus.",
    medicine: "Carboxin or Carbendazim seed treatment (2g/kg).",
    treatment: "Treat seed before sowing.",
    prevention: "Clean disease-free seed, treated seed only.",
    organicTreatment: "Solar heat treatment of seed + Trichoderma." },

  // RICE / PADDY
  { cropName: "Rice", diseaseName: "Bacterial Leaf Blight", severity: "High",
    symptoms: "Yellow-brown lesions from leaf tips, drying from tip downward.",
    cause: "Xanthomonas oryzae pv. oryzae.",
    medicine: "Copper oxychloride 50% WP + Streptocycline.",
    treatment: "Drain field 1-2 days, spray fortnightly.",
    prevention: "Resistant varieties, balanced nitrogen, clean weed hosts.",
    organicTreatment: "Pseudomonas fluorescens + cow urine spray." },
  { cropName: "Rice", diseaseName: "Blast", severity: "High",
    symptoms: "Diamond-shaped spots with grey center on leaves, neck rot causing white empty panicles.",
    cause: "Magnaporthe oryzae fungus.",
    medicine: "Tricyclazole 75% WP (0.6g/L) or Carbendazim 50% WP.",
    treatment: "Spray at tillering and panicle initiation.",
    prevention: "Resistant varieties, balanced N, avoid late planting.",
    organicTreatment: "Pseudomonas + neem oil + silicon application." },
  { cropName: "Rice", diseaseName: "Brown Plant Hopper", severity: "High",
    symptoms: "Hopper burn — patches of yellowing and drying plants.",
    cause: "Nilaparvata lugens insect.",
    medicine: "Imidacloprid 17.8% SL or Buprofezin 25% SC.",
    treatment: "Drain water for 4 days, spray base of plants.",
    prevention: "Avoid excess N, resistant varieties, alleys for aeration.",
    organicTreatment: "Metarhizium spray, fish amino acid foliar." },

  // ORANGE / CITRUS
  { cropName: "Orange", diseaseName: "Citrus Canker", severity: "Medium",
    symptoms: "Raised corky brown lesions with yellow halo on leaves and fruits.",
    cause: "Xanthomonas citri subsp. citri bacterium.",
    medicine: "Copper oxychloride 0.3% + Streptocycline 100ppm.",
    treatment: "Prune infected twigs and burn. Spray copper monthly.",
    prevention: "Wind breaks, disease-free saplings, leaf miner control.",
    organicTreatment: "Bordeaux mixture 1%, cow urine 10% spray." },

  // GROUNDNUT
  { cropName: "Groundnut", diseaseName: "Tikka Leaf Spot", severity: "Medium",
    symptoms: "Brown circular spots on leaves with yellow halo, leaves drop.",
    cause: "Cercospora arachidicola fungus.",
    medicine: "Mancozeb 75% WP or Chlorothalonil spray.",
    treatment: "Spray every 15 days from 40 days after sowing.",
    prevention: "Crop rotation, deep ploughing, resistant varieties.",
    organicTreatment: "Trichoderma + neem oil spray." },

  // BRINJAL
  { cropName: "Brinjal", diseaseName: "Shoot & Fruit Borer", severity: "High",
    symptoms: "Drooping growing tips, holes in fruits with frass.",
    cause: "Leucinodes orbonalis larvae.",
    medicine: "Emamectin benzoate or Cypermethrin.",
    treatment: "Remove damaged shoots, pheromone traps.",
    prevention: "Bt brinjal where allowed, resistant varieties, sanitation.",
    organicTreatment: "Bt 1kg/ha, NPV, neem 5%." },

  // POTATO
  { cropName: "Potato", diseaseName: "Late Blight", severity: "High",
    symptoms: "Water-soaked spots on leaves with white sporulation, tuber rot.",
    cause: "Phytophthora infestans.",
    medicine: "Metalaxyl-Mancozeb (2.5g/L) or Cymoxanil + Mancozeb.",
    treatment: "Spray prophylactically in cool wet weather.",
    prevention: "Earthing up, healthy seed, resistant varieties.",
    organicTreatment: "Bordeaux mixture 1%, copper soap." },
];

export function findDiseaseByName(name: string): DiseaseInfo | undefined {
  const n = name.toLowerCase();
  return diseaseDatabase.find(d =>
    d.diseaseName.toLowerCase() === n ||
    d.diseaseName.toLowerCase().includes(n) ||
    n.includes(d.diseaseName.toLowerCase())
  );
}

export function pickFallbackDisease(crop?: string): DiseaseInfo {
  if (crop) {
    const list = diseaseDatabase.filter(d => d.cropName.toLowerCase() === crop.toLowerCase());
    if (list.length) return list[Math.floor(Math.random() * list.length)];
  }
  return diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
}

export const SUPPORTED_CROPS_FOR_DIAGNOSIS = [
  "Cotton", "Sugarcane", "Soybean", "Tur", "Onion", "Grapes", "Pomegranate",
  "Banana", "Tomato", "Chilli", "Gram", "Wheat", "Rice", "Orange", "Groundnut",
  "Brinjal", "Potato", "Maize", "Jowar", "Bajra"
];
