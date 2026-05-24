import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, ExternalLink, Search, IndianRupee, FileText, Tractor, Droplets, Sun, Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/schemes")({
  head: () => ({ meta: [
    { title: "Government Schemes for Farmers — AgroVision AI" },
    { name: "description", content: "Find all central and Maharashtra state government schemes for farmers — PM-KISAN, crop insurance, soil health, irrigation and more." },
  ]}),
  component: Schemes,
});

interface Scheme {
  name: string;
  ministry: string;
  category: string;
  benefit: string;
  eligibility: string;
  howToApply: string;
  link: string;
  icon: typeof IndianRupee;
  tags: string[];
  state: "Central" | "Maharashtra";
}

const SCHEMES: Scheme[] = [
  // Central schemes
  {
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Income Support",
    benefit: "₹6,000/year in 3 installments of ₹2,000 directly to bank account",
    eligibility: "All landholder farmer families with cultivable land (excludes government employees, income tax payers, professionals)",
    howToApply: "Visit PM-KISAN portal, CSC centre, or local agriculture department. Aadhar + land records needed.",
    link: "https://pmkisan.gov.in",
    icon: IndianRupee,
    tags: ["income", "direct benefit"],
    state: "Central",
  },
  {
    name: "PM Fasal Bima Yojana (PMFBY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Crop Insurance",
    benefit: "Crop insurance against drought, flood, pest, disease. Farmer pays only 2% (Kharif), 1.5% (Rabi), 5% (commercial) premium",
    eligibility: "All farmers growing notified crops in notified areas. Loanee farmers compulsorily covered.",
    howToApply: "Apply via bank, CSC, or PMFBY portal before cutoff date of each season. Aadhar + land docs needed.",
    link: "https://pmfby.gov.in",
    icon: Shield,
    tags: ["insurance", "crop protection"],
    state: "Central",
  },
  {
    name: "Kisan Credit Card (KCC)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Credit / Loan",
    benefit: "Short-term credit up to ₹3 lakh at 4% interest (after 2% interest subvention) for crop production needs",
    eligibility: "Farmers, tenant farmers, sharecroppers, SHG members with agricultural land",
    howToApply: "Apply at nearest bank branch (SBI, cooperative bank) or through PM-KISAN portal if already enrolled",
    link: "https://www.nabard.org/auth/writereaddata/tender/1608180417KCC.pdf",
    icon: FileText,
    tags: ["credit", "loan"],
    state: "Central",
  },
  {
    name: "PM Krishi Sinchayee Yojana (PMKSY)",
    ministry: "Ministry of Jal Shakti",
    category: "Irrigation",
    benefit: "Subsidy on micro-irrigation (drip/sprinkler): 55% for small & marginal farmers, 45% for others",
    eligibility: "All farmers with agricultural land who install drip or sprinkler irrigation systems",
    howToApply: "Apply via state agriculture department or PMKSY portal. Pre-approval required before installation.",
    link: "https://pmksy.gov.in",
    icon: Droplets,
    tags: ["irrigation", "drip", "subsidy"],
    state: "Central",
  },
  {
    name: "Soil Health Card Scheme",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Soil Management",
    benefit: "Free soil testing and health card with NPK, pH, and micronutrient levels + crop-wise fertilizer recommendations",
    eligibility: "All farmers. Testing done every 2 years.",
    howToApply: "Contact local Krishi Vigyan Kendra (KVK) or agriculture department. Sample collection by department staff.",
    link: "https://soilhealth.dac.gov.in",
    icon: FileText,
    tags: ["soil", "npk", "free"],
    state: "Central",
  },
  {
    name: "PM Kisan Maandhan Yojana (PM-KMY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Pension",
    benefit: "₹3,000/month pension after age 60. Govt contributes equal amount to farmer's monthly contribution.",
    eligibility: "Farmers aged 18-40 with land up to 2 hectares. Monthly contribution ₹55–₹200 based on age.",
    howToApply: "Enroll at CSC centres with Aadhar and savings account linked to PM-KISAN",
    link: "https://maandhan.in/pmkmy",
    icon: IndianRupee,
    tags: ["pension", "60+"],
    state: "Central",
  },
  {
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Organic Farming",
    benefit: "₹50,000/ha over 3 years (₹31,000 for farmers, ₹8,800 for certification, ₹6,600 for label/pack) for organic farming conversion",
    eligibility: "Farmers willing to form clusters of 20+ ha and convert to organic farming for 3 years",
    howToApply: "Apply through state agriculture department or FPO. Group/cluster application required.",
    link: "https://pgsindia-ncof.gov.in",
    icon: Sun,
    tags: ["organic", "certification"],
    state: "Central",
  },
  {
    name: "eNAM (National Agriculture Market)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Market Access",
    benefit: "Online mandi platform — sell crop directly to highest bidder across India. Better price discovery.",
    eligibility: "All farmers with produce. Needs registration at any linked APMC mandi.",
    howToApply: "Register at eNAM portal or visit linked APMC mandi with Aadhar + bank details",
    link: "https://enam.gov.in",
    icon: Building2,
    tags: ["market", "mandi", "price"],
    state: "Central",
  },
  // Maharashtra-specific schemes
  {
    name: "Magel Tyala Shet Tale (Farm Pond Scheme)",
    ministry: "Maharashtra Agriculture Department",
    category: "Water Conservation",
    benefit: "100% subsidy for farm pond construction up to ₹75,000 for small/marginal farmers for rainwater harvesting",
    eligibility: "Small and marginal farmers in Maharashtra with land holding. Priority to drought-prone districts.",
    howToApply: "Apply at taluka agriculture office or through MahaDBT portal. Plot inspection by agriculture officer.",
    link: "https://mahadbt.maharashtra.gov.in",
    icon: Droplets,
    tags: ["water", "pond", "Maharashtra"],
    state: "Maharashtra",
  },
  {
    name: "Gopinath Munde Shetkari Apghat Vima Yojana",
    ministry: "Maharashtra Government",
    category: "Accidental Insurance",
    benefit: "₹2 lakh insurance coverage for accidental death or permanent disability of farmer. Free — no premium from farmer.",
    eligibility: "All registered farmers aged 10-75 in Maharashtra. Auto-enrolled.",
    howToApply: "Automatically covered if you have 7/12 land record. Claim through taluka agriculture office within 90 days.",
    link: "https://aaplesarkar.mahaonline.gov.in",
    icon: Shield,
    tags: ["insurance", "accident", "Maharashtra"],
    state: "Maharashtra",
  },
  {
    name: "Mukhyamantri Saur Krishi Pump Yojana",
    ministry: "Maharashtra Energy Department / MSEDCL",
    category: "Solar / Energy",
    benefit: "3 HP / 5 HP solar water pump at 95% subsidy (only 5% paid by farmer). Free electricity for irrigation.",
    eligibility: "Farmers without electricity connection or unreliable supply in Maharashtra. 2.5–5 acre irrigable land.",
    howToApply: "Apply at District Agriculture Office or MahaDBT portal. Select nearest taluka, submit land docs + Aadhar.",
    link: "https://mahadiscom.in/solar/",
    icon: Sun,
    tags: ["solar", "pump", "subsidy", "Maharashtra"],
    state: "Maharashtra",
  },
  {
    name: "Namo Shetkari Mahasanman Nidhi",
    ministry: "Maharashtra Government",
    category: "Income Support",
    benefit: "Additional ₹6,000/year from Maharashtra state (₹2,000 per installment) — combined with PM-KISAN gives ₹12,000/year total",
    eligibility: "Farmers eligible for PM-KISAN in Maharashtra",
    howToApply: "No separate application needed if you receive PM-KISAN. Registered automatically through agriculture dept.",
    link: "https://krishi.maharashtra.gov.in",
    icon: IndianRupee,
    tags: ["income", "Maharashtra", "PM-KISAN top-up"],
    state: "Maharashtra",
  },
  {
    name: "Shetkari Samridhi Yojana (Baliraja Chetna Abhiyan)",
    ministry: "Maharashtra Agriculture Department",
    category: "Crop Support",
    benefit: "Interest-free crop loans up to ₹3 lakh for farmers with no overdues. Zero interest for timely repayment.",
    eligibility: "Maharashtra farmers borrowing from cooperative banks or district central cooperative banks.",
    howToApply: "Apply through nearest district cooperative bank or Maharashtra State Cooperative Bank.",
    link: "https://www.mscbank.com",
    icon: FileText,
    tags: ["loan", "credit", "Maharashtra"],
    state: "Maharashtra",
  },
  {
    name: "Mahatma Phule Shetkari Karj Mukti Yojana (Loan Waiver)",
    ministry: "Maharashtra Government",
    category: "Debt Relief",
    benefit: "Crop loan waiver up to ₹2 lakh for distressed farmers of Maharashtra",
    eligibility: "Maharashtra farmers with outstanding short-term crop loans from banks. Check district agriculture office for current eligibility window.",
    howToApply: "Register at designated bank or district agriculture office. Aadhar + loan account docs needed.",
    link: "https://aaplesarkar.mahaonline.gov.in",
    icon: IndianRupee,
    tags: ["loan waiver", "debt", "Maharashtra"],
    state: "Maharashtra",
  },
  {
    name: "PM-KUSUM (Solar Pump for Farmers)",
    ministry: "Ministry of New & Renewable Energy",
    category: "Solar / Energy",
    benefit: "60% subsidy on solar pump. Farmers can also sell surplus power to DISCOM at ₹3.14/unit and earn extra income.",
    eligibility: "Farmers with agricultural land and irrigation infrastructure",
    howToApply: "Apply through state renewable energy agency (MEDA for Maharashtra) or DISCOM portal",
    link: "https://mnre.gov.in/solar/schemes",
    icon: Sun,
    tags: ["solar", "pump", "energy"],
    state: "Central",
  },
  {
    name: "Agriculture Infrastructure Fund (AIF)",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Infrastructure / Credit",
    benefit: "Loans up to ₹2 crore at 3% interest subsidy for post-harvest infrastructure — cold storage, warehouses, primary processing",
    eligibility: "Farmers, FPOs, PACS, cooperatives, agri-entrepreneurs",
    howToApply: "Apply on AIF portal or through any scheduled bank. Business plan required for large amounts.",
    link: "https://agriinfra.dac.gov.in",
    icon: Tractor,
    tags: ["infrastructure", "cold storage", "credit"],
    state: "Central",
  },
];

const CATEGORIES = ["All", "Income Support", "Crop Insurance", "Credit / Loan", "Irrigation", "Soil Management", "Organic Farming", "Market Access", "Solar / Energy", "Water Conservation", "Pension", "Debt Relief", "Infrastructure / Credit", "Accidental Insurance", "Crop Support"];

function Schemes() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<"All" | "Central" | "Maharashtra">("All");
  const [category, setCategory] = useState("All");

  const filtered = SCHEMES.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.tags.some(t => t.includes(q)) || s.category.toLowerCase().includes(q);
    const matchState = stateFilter === "All" || s.state === stateFilter;
    const matchCat = category === "All" || s.category === category;
    return matchSearch && matchState && matchCat;
  });

  return (
    <div>
      <PageHeader icon={Building2} title="Government Schemes for Farmers" subtitle="All central and Maharashtra state schemes — income support, crop insurance, subsidies, loans and more." />
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search schemes (e.g. insurance, solar, loan...)"
              className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            {(["All", "Central", "Maharashtra"] as const).map(f => (
              <button
                key={f}
                onClick={() => setStateFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${stateFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.slice(0, 8).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} scheme{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Scheme cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-xl bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${s.state === "Maharashtra" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                        {s.state}
                      </span>
                      <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">{s.category}</span>
                    </div>
                    <h3 className="font-bold text-foreground leading-tight">{s.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.ministry}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <InfoRow label="Benefit" value={s.benefit} />
                  <InfoRow label="Who can apply" value={s.eligibility} />
                  <InfoRow label="How to apply" value={s.howToApply} />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] bg-secondary rounded-full px-2 py-0.5 text-muted-foreground">{t}</span>
                  ))}
                </div>

                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                >
                  Official Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No schemes found for your search.</p>
            <p className="text-sm mt-1">Try a different keyword like "insurance", "loan", or "solar"</p>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-muted/50 border border-border p-5 text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Scheme details and eligibility criteria may change. Always verify with your local Krishi Kendra, bank, or official government portal before applying. For immediate help, call Kisan Call Centre: <strong className="text-foreground">1800-180-1551</strong> (free, 6 AM–10 PM).
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">{label}: </span>
      <span className="text-xs text-foreground/80">{value}</span>
    </div>
  );
}
