export interface DiseaseInfo {
  cropName: string; diseaseName: string; symptoms: string; cause: string;
  medicine: string; treatment: string; prevention: string; organicTreatment: string;
}

export const fallbackDiseases: DiseaseInfo[] = [
  {
    cropName: "Tomato", diseaseName: "Early Blight",
    symptoms: "Dark brown circular spots with concentric rings; yellow halo; leaf drop from base upward.",
    cause: "Fungal infection caused by Alternaria solani.",
    medicine: "Mancozeb 75% WP, Copper fungicide spray, Chlorothalonil 75% WP.",
    treatment: "Spray copper fungicide every 7 days. Remove infected lower leaves. Avoid overhead irrigation.",
    prevention: "Use resistant varieties, crop rotation, proper plant spacing.",
    organicTreatment: "Neem oil (5ml/L) weekly, Trichoderma bio-fungicide, copper sulfate 0.5%, mulch to prevent soil splash.",
  },
  {
    cropName: "Rice", diseaseName: "Leaf Blight",
    symptoms: "Yellow-brown necrotic lesions on leaf edges; progressive drying from tip to base.",
    cause: "Bacterial infection caused by Xanthomonas oryzae pv. oryzae.",
    medicine: "Mancozeb 75% WP, Copper Oxychloride 50% WP, Streptocycline.",
    treatment: "Spray fungicide at 0.2% every 7-10 days. Remove and burn infected leaves.",
    prevention: "Use resistant varieties, drainage, field sanitation.",
    organicTreatment: "Neem oil spray (5ml/L), Trichoderma viride, garlic-chilli extract spray.",
  },
];

export function pickFallbackDisease(): DiseaseInfo {
  return fallbackDiseases[Math.floor(Math.random() * fallbackDiseases.length)];
}