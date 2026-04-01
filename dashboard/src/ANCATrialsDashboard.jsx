import { useState, useEffect } from "react";
import DiseaseConnections from "./DiseaseConnections";
import CaseStudies from "./CaseStudies";

const CATEGORIES = {
  all: "All Trials",
  car_t: "CAR-T Cell Therapy",
  complement: "Complement Inhibitors",
  b_cell: "B-Cell Targeting",
  steroid_sparing: "Steroid-Sparing",
  biomarker: "Biomarkers",
  other: "Other Novel Agents",
};

const CONDITIONS = {
  all: "All Conditions",
  gpa: "GPA",
  mpa: "MPA",
  egpa: "EGPA",
  anca_gn: "ANCA-GN",
};

const PHASE_COLORS = {
  "Phase 1": "#F59E0B",
  "Phase 1/2": "#F97316",
  "Phase 2": "#3B82F6",
  "Phase 2/3": "#6366F1",
  "Phase 3": "#10B981",
  "Phase 4": "#06B6D4",
  Observational: "#8B5CF6",
  Preclinical: "#EF4444",
};

const STATUS_ICONS = {
  Recruiting: "●",
  Active: "◆",
  Completed: "✓",
  "Not yet recruiting": "○",
  Unknown: "◇",
};

const SEED_TRIALS = [
  {
    id: "NCT06375993",
    title: "Prula-cel (ADI-001) Gamma Delta CAR-T in Autoimmune Diseases including AAV",
    sponsor: "Adicet Bio",
    phase: "Phase 1",
    status: "Recruiting",
    category: "car_t",
    conditions: ["GPA", "MPA"],
    description:
      "First gamma-delta CAR T-cell therapy trial to enroll AAV patients. Over 20 patients dosed as of Dec 2025. Prula-cel targets CD20 using allogeneic gamma-delta T cells, aiming for an immune system 'reset' without the manufacturing delays of autologous approaches.",
    locations: "United States (2 sites)",
    enrollment: 90,
    updated: "2026-01-12",
    outcome_signal: "positive",
    url: "https://clinicaltrials.gov/study/NCT06375993",
  },
  {
    id: "NCT06590545",
    title: "Anti-CD19 CAR-T Cell Therapy in ANCA-Associated Vasculitis",
    sponsor: "Academic (Multiple Centers)",
    phase: "Phase 1/2",
    status: "Recruiting",
    category: "car_t",
    conditions: ["GPA", "MPA"],
    description:
      "Evaluating CD19-targeting CAR-T cells for refractory AAV. Early case reports show robust B-cell and plasmablast depletion, significant decline in MPO-ANCA levels, and protection from kidney damage in preclinical models. Goal: drug-free remission.",
    locations: "Europe, Asia",
    enrollment: 30,
    updated: "2025-12-12",
    outcome_signal: "promising",
    url: "https://clinicaltrials.gov/study/NCT06590545",
  },
  {
    id: "NCT06685042",
    title: "Anti-CD19/BCMA Dual-Target CAR-T in Relapsed/Refractory Autoimmune Diseases (incl. AAV)",
    sponsor: "Various",
    phase: "Phase 1",
    status: "Not yet recruiting",
    category: "car_t",
    conditions: ["GPA", "MPA"],
    description:
      "Dual-targeting approach using universal allogeneic CAR-T cells against both CD19 and BCMA. Aims to deplete both B cells and long-lived plasma cells that produce ANCA autoantibodies. Primary completion expected May 2027.",
    locations: "Multiple countries",
    enrollment: 40,
    updated: "2025-05-18",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT06685042",
  },
  {
    id: "ADVOCATE-LTE",
    title: "Avacopan Long-Term Extension — Sustained Remission in AAV",
    sponsor: "ChemoCentryx / Amgen",
    phase: "Phase 3",
    status: "Active",
    category: "complement",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Long-term follow-up of the ADVOCATE trial. Avacopan (oral C5a receptor antagonist) demonstrated superior sustained remission vs prednisone taper at 52 weeks, with potentially greater kidney recovery. FDA-approved 2021 for severe AAV. Extension data continue to show durable benefit with reduced steroid exposure.",
    locations: "Global (20+ countries)",
    enrollment: 330,
    updated: "2025-11-01",
    outcome_signal: "positive",
    url: "https://clinicaltrials.gov/study/NCT03895801",
  },
  {
    id: "NCT05716334",
    title: "BRAVO — Rituxan Biosimilars vs Originator in GPA/MPA",
    sponsor: "Academic (Canada)",
    phase: "Observational",
    status: "Recruiting",
    category: "b_cell",
    conditions: ["GPA", "MPA"],
    description:
      "Multicenter study comparing rituximab biosimilars with the originator product in 240 GPA/MPA patients for safety and effectiveness. Results will inform whether cheaper biosimilars can be used interchangeably.",
    locations: "Canada",
    enrollment: 240,
    updated: "2025-09-15",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT05716334",
  },
  {
    id: "NCT04316494",
    title: "HAVEN — Hydroxychloroquine as Add-on Therapy in AAV",
    sponsor: "UK Academic",
    phase: "Phase 4",
    status: "Active",
    category: "other",
    conditions: ["GPA", "MPA"],
    description:
      "Testing whether hydroxychloroquine can reduce disease activity when added to standard AAV treatment. Double-blind, placebo-controlled trial in the UK with 43 participants.",
    locations: "United Kingdom",
    enrollment: 43,
    updated: "2025-05-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT04316494",
  },
  {
    id: "NCT06656962",
    title: "TEST-T-AAGN — Novel Therapy for ANCA-Associated Glomerulonephritis",
    sponsor: "Academic",
    phase: "Phase 1/2",
    status: "Recruiting",
    category: "other",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Prospective single-arm study in 15 patients with GPA or MPA and ANCA-associated nephritis. Testing a new therapeutic approach for kidney-specific disease manifestation.",
    locations: "Multiple sites",
    enrollment: 15,
    updated: "2025-10-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT06656962",
  },
  {
    id: "RITAZAREM-LTE",
    title: "RITAZAREM — Long-term Rituximab Maintenance in AAV",
    sponsor: "Cambridge University / GFEV",
    phase: "Phase 3",
    status: "Completed",
    category: "b_cell",
    conditions: ["GPA", "MPA"],
    description:
      "Landmark trial establishing rituximab maintenance as superior to azathioprine for relapse prevention. Extended follow-up data support prolonged rituximab maintenance in relapsing AAV, with ongoing analysis of optimal duration and biomarker-guided dosing.",
    locations: "Global",
    enrollment: 190,
    updated: "2025-08-01",
    outcome_signal: "positive",
    url: "https://clinicaltrials.gov/study/NCT01697267",
  },
  {
    id: "BIOMARKERS-AAV",
    title: "Novel Biomarkers for AAV Disease Activity — MMP-3, CXCL13, IL-18BP",
    sponsor: "Multiple Academic Centers",
    phase: "Observational",
    status: "Active",
    category: "biomarker",
    conditions: ["GPA", "MPA", "EGPA"],
    description:
      "Research identifying MMP-3, CXCL13, and TIMP-1 as highly accurate markers for distinguishing active disease from remission (AUC 0.83-0.89). IL-8, IL-15, and IL-18BP emerged as promising flare predictors independent of ANCA type or treatment.",
    locations: "Global",
    enrollment: 186,
    updated: "2025-09-04",
    outcome_signal: "positive",
    url: "https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2025.1616837/full",
  },
  {
    id: "NEXT-GEN-CD20",
    title: "Next-Generation Anti-CD20 Monoclonal Antibodies in AAV",
    sponsor: "Various Pharma",
    phase: "Phase 2",
    status: "Recruiting",
    category: "b_cell",
    conditions: ["GPA", "MPA"],
    description:
      "Multiple trials evaluating obinutuzumab and other next-generation anti-CD20 antibodies that may achieve deeper B-cell depletion than rituximab, potentially leading to more durable remissions and fewer relapses in GPA/MPA.",
    locations: "US, Europe",
    enrollment: 150,
    updated: "2025-12-01",
    outcome_signal: "promising",
    url: "https://clinicaltrials.gov",
  },
  {
    id: "NCT05030155",
    title: "E-merge — Mepolizumab-Based Regimen for EGPA Remission Induction",
    sponsor: "French Vasculitis Study Group",
    phase: "Phase 3",
    status: "Active",
    category: "other",
    conditions: ["EGPA"],
    description:
      "Comparing mepolizumab (anti-IL-5) regimen vs conventional therapy for inducing remission in EGPA. 100 patients enrolled in France regardless of ANCA status.",
    locations: "France",
    enrollment: 100,
    updated: "2025-11-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT05030155",
  },
  {
    id: "ANTI-FIBROSIS",
    title: "Anti-Fibrosis Agents for AAV Kidney Damage Prevention",
    sponsor: "Academic/Pharma Partnerships",
    phase: "Phase 1",
    status: "Recruiting",
    category: "other",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Emerging trials targeting fibrosis pathways in AAV, aiming to prevent irreversible kidney and lung damage. Novel complement inhibitors and anti-fibrotic molecules are under investigation alongside standard immunosuppression.",
    locations: "US, Europe, Asia",
    enrollment: 60,
    updated: "2025-07-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov",
  },
  // ── GPA-specific ──────────────────────────────────────────────────────────
  {
    id: "NCT01920191",
    title: "TAPIR — Trimethoprim-Sulfamethoxazole for Remission Maintenance in GPA",
    sponsor: "US Vasculitis Clinical Research Consortium",
    phase: "Phase 3",
    status: "Completed",
    category: "steroid_sparing",
    conditions: ["GPA"],
    description:
      "Randomized, double-blind trial comparing low-dose TMP-SMX (cotrimoxazole) vs placebo as a maintenance agent in 56 patients with GPA in remission. Results showed a trend toward fewer relapses with TMP-SMX, supporting the long-standing clinical practice of using this antibiotic adjunctively to reduce Staphylococcus aureus colonization, which is thought to trigger GPA flares.",
    locations: "United States",
    enrollment: 56,
    updated: "2024-03-01",
    outcome_signal: "promising",
    url: "https://clinicaltrials.gov/study/NCT01920191",
  },
  {
    id: "GPA-ORBITAL-GRANULOMA",
    title: "Rituximab vs Cyclophosphamide for Orbital Granuloma in GPA",
    sponsor: "Multiple Academic Centers",
    phase: "Observational",
    status: "Active",
    category: "b_cell",
    conditions: ["GPA"],
    description:
      "Registry and cohort studies comparing outcomes of rituximab versus cyclophosphamide for refractory orbital granuloma — one of the most challenging GPA manifestations. Orbital granulomas are relatively resistant to standard therapy and can cause permanent vision loss. Data from registry cohorts suggest rituximab may achieve better orbital responses than cyclophosphamide in this difficult-to-treat manifestation.",
    locations: "US, Europe",
    enrollment: 80,
    updated: "2025-06-01",
    outcome_signal: "promising",
    url: "https://clinicaltrials.gov",
  },
  // ── MPA-specific ──────────────────────────────────────────────────────────
  {
    id: "MPA-PULM-FIBROSIS",
    title: "Nintedanib for MPA-Associated Interstitial Lung Disease",
    sponsor: "Academic Collaborations (Asia, Europe)",
    phase: "Phase 2",
    status: "Recruiting",
    category: "other",
    conditions: ["MPA"],
    description:
      "Investigates whether nintedanib (anti-fibrotic licensed for IPF and systemic sclerosis-ILD) can slow or halt pulmonary fibrosis that develops in MPA patients even during clinical remission. MPA-associated ILD is progressive and is a major cause of disability and death independent of active vasculitis; current immunosuppression alone does not prevent it. Preliminary case series suggest nintedanib may be beneficial alongside standard therapy.",
    locations: "Asia, Europe",
    enrollment: 45,
    updated: "2025-09-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov",
  },
  // ── EGPA-specific ─────────────────────────────────────────────────────────
  {
    id: "NCT04157348",
    title: "MANDARA — Benralizumab vs Mepolizumab for Remission Maintenance in EGPA",
    sponsor: "AstraZeneca",
    phase: "Phase 3",
    status: "Completed",
    category: "steroid_sparing",
    conditions: ["EGPA"],
    description:
      "Landmark head-to-head trial in 140 EGPA patients comparing benralizumab (anti-IL-5Rα) vs mepolizumab (anti-IL-5) for remission maintenance. Benralizumab demonstrated non-inferiority to mepolizumab in achieving remission at week 36. Both drugs markedly reduced relapses and allowed steroid tapering. Published in NEJM 2024. Results position benralizumab as an alternative to mepolizumab, expanding options for EGPA patients — particularly those with heavy eosinophil burden.",
    locations: "Global (20+ countries)",
    enrollment: 140,
    updated: "2024-08-01",
    outcome_signal: "positive",
    url: "https://clinicaltrials.gov/study/NCT04157348",
  },
  {
    id: "EGPA-DUPILUMAB",
    title: "Dupilumab as Steroid-Sparing Therapy in EGPA",
    sponsor: "Sanofi / Regeneron",
    phase: "Phase 2/3",
    status: "Recruiting",
    category: "steroid_sparing",
    conditions: ["EGPA"],
    description:
      "Investigating dupilumab (IL-4/IL-13 receptor blocker, approved for severe asthma and atopic dermatitis) in EGPA. Given EGPA's Th2-driven eosinophilic pathology, blocking IL-4 and IL-13 signaling is a mechanistically compelling approach. Early case reports show meaningful steroid-sparing effects. This trial will provide the first controlled evidence for dupilumab's role in reducing EGPA relapses and steroid dependence.",
    locations: "United States, Europe",
    enrollment: 50,
    updated: "2025-10-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov",
  },
  // ── ANCA-Associated Glomerulonephritis-specific ───────────────────────────
  {
    id: "NCT00987389",
    title: "PEXIVAS — Plasma Exchange in Severe ANCA-Associated Vasculitis with Renal Involvement",
    sponsor: "Vasculitis Clinical Research Consortium / EUVAS",
    phase: "Phase 3",
    status: "Completed",
    category: "other",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Pivotal international RCT (704 patients) that definitively tested whether adding plasma exchange (plasmapheresis) to standard immunosuppression reduces death or end-stage kidney disease in severe AAV with GFR <50 ml/min or pulmonary hemorrhage. Published in NEJM 2020: plasma exchange did NOT reduce the primary endpoint at 7 years, challenging decades of prior practice. However, reduced-dose glucocorticoids were non-inferior to standard dosing with fewer serious infections — a practice-changing result now adopted in most guidelines.",
    locations: "Global (countries across North America, Europe, Australia)",
    enrollment: 704,
    updated: "2023-06-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov/study/NCT00987389",
  },
  {
    id: "ANCA-GN-IPTACOPAN",
    title: "Iptacopan (Factor B Inhibitor) for ANCA-Associated Glomerulonephritis",
    sponsor: "Novartis",
    phase: "Phase 2/3",
    status: "Recruiting",
    category: "complement",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Evaluates iptacopan — an oral complement factor B inhibitor (alternative pathway blockade) — added to standard rituximab-based induction therapy for active ANCA-GN. Complement activation via the alternative pathway amplifies glomerular inflammation in ANCA-GN even without immune-complex deposition. Iptacopan has demonstrated kidney-protective effects in IgA nephropathy; this trial extends that hypothesis to ANCA-GN. Primary endpoint: eGFR improvement and reduction of urinary active sediment at 6 months.",
    locations: "Global",
    enrollment: 120,
    updated: "2025-11-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov",
  },
  {
    id: "NCT05112029",
    title: "Felzartamab (Anti-CD38) for Refractory ANCA-Associated Glomerulonephritis",
    sponsor: "HI-Bio (MorphoSys)",
    phase: "Phase 2",
    status: "Recruiting",
    category: "b_cell",
    conditions: ["GPA", "MPA", "ANCA-GN"],
    description:
      "Tests felzartamab — a fully human anti-CD38 monoclonal antibody — in patients with ANCA-GN who have failed or are intolerant to standard induction therapy. CD38 is expressed on plasma cells and plasmablasts that produce ANCA autoantibodies; depleting these long-lived antibody-producing cells could reduce ANCA titers more durably than B-cell depletion alone. Builds on promising Phase 2 data in antibody-mediated rejection of kidney transplants. Primary endpoint: ANCA titer reduction and renal response at 26 weeks.",
    locations: "United States, Europe",
    enrollment: 30,
    updated: "2025-12-01",
    outcome_signal: "promising",
    url: "https://clinicaltrials.gov/study/NCT05112029",
  },
];


const RESEARCH_CENTERS = [
  // ── Frontier: running the most novel, earliest-phase research ──────────────
  {
    id: "upenn",
    tier: "frontier",
    name: "University of Pennsylvania — Penn Vasculitis Program",
    city: "Philadelphia, Pennsylvania",
    country: "United States",
    focus: ["CAR-T cell therapy", "Refractory AAV", "Novel immunology"],
    whyItMatters:
      "One of the primary US access points for CAR-T cell therapy trials in ANCA vasculitis. For patients who have relapsed on rituximab or cyclophosphamide and have run out of standard options, Penn's trial infrastructure offers the earliest access to experimental immune-reset approaches. Deep bench in translational immunology accelerates bench-to-bedside translation.",
    landmark: "CAR-T trials for refractory AAV (NCT06375993 site); dual-target CD19/BCMA programs",
    network: ["VCRC"],
    url: null,
  },
  {
    id: "freiburg",
    tier: "frontier",
    name: "University Hospital Freiburg — Hematology & Oncology / Autoimmune",
    city: "Freiburg im Breisgau",
    country: "Germany",
    focus: ["CAR-T cell therapy", "Immune reset", "Refractory autoimmune disease"],
    whyItMatters:
      "Published the landmark early case series demonstrating CD19-targeted CAR-T cells achieving drug-free remission in refractory ANCA vasculitis — work that defined the rationale for every subsequent CAR-T trial in AAV. The foremost European destination for patients with truly refractory disease seeking experimental immune-reset therapy.",
    landmark: "Pioneering CAR-T 'immune reset' case series in GPA/MPA; NCT06590545 contributing site",
    network: ["EUVAS"],
    url: null,
  },
  {
    id: "jhmi",
    tier: "frontier",
    name: "Johns Hopkins Vasculitis Center",
    city: "Baltimore, Maryland",
    country: "United States",
    focus: ["Rituximab optimization", "Biomarker-guided dosing", "Refractory GPA", "Phase 2–3 trials"],
    whyItMatters:
      "Led the RAVE trial that transformed ANCA vasculitis care by establishing rituximab as first-line therapy. Hopkins remains one of the most active recruiting sites in the country, with strong pathways into current Phase 2 and Phase 3 trials. The vasculitis team spans rheumatology, nephrology, pulmonology, and ENT, making it well-suited for complex multi-organ disease.",
    landmark: "RAVE trial — established rituximab as first-line standard of care for GPA/MPA",
    network: ["VCRC"],
    url: "https://www.hopkinsvasculitis.org",
  },
  // ── Major Programs: established high-volume centers running Phase 2–3 work ──
  {
    id: "cleveland",
    tier: "major",
    name: "Cleveland Clinic — Center for Vasculitis Care and Research",
    city: "Cleveland, Ohio",
    country: "United States",
    focus: ["GPA / MPA / EGPA", "Multidisciplinary care", "Phase 2–3 trial recruitment"],
    whyItMatters:
      "One of the largest dedicated vasculitis programs in North America. The integrated team — rheumatology, nephrology, pulmonology, ENT, ophthalmology — manages complex multi-organ disease under one roof. Consistently among the top-enrolling sites in VCRC-coordinated national trials, meaning access to studies before they reach community practices.",
    landmark: "High-volume VCRC trial site; national referral center for rare GPA presentations",
    network: ["VCRC"],
    url: "https://my.clevelandclinic.org/departments/rheumatology-immunology/vasculitis",
  },
  {
    id: "mayo",
    tier: "major",
    name: "Mayo Clinic — Vasculitis Clinic",
    city: "Rochester, Minnesota",
    country: "United States",
    focus: ["Rare manifestations", "Pachymeningitis", "Orbital GPA", "Diagnostic workup"],
    whyItMatters:
      "The go-to center for diagnostically difficult and rare manifestations of AAV — particularly hypertrophic pachymeningitis, orbital granuloma, and subglottic stenosis. Mayo's integrated model concentrates specialists from neurology, ophthalmology, ENT, and rheumatology who have seen more rare GPA presentations than most centers see in a career. Frequently sought for second opinions on atypical cases.",
    landmark: "Largest institutional experience with neurological AAV manifestations including pachymeningitis",
    network: ["VCRC"],
    url: "https://www.mayoclinic.org",
  },
  {
    id: "cambridge",
    tier: "major",
    name: "Cambridge University Hospitals — Vasculitis & Lupus Clinic",
    city: "Cambridge",
    country: "United Kingdom",
    focus: ["Rituximab maintenance", "ANCA pathophysiology", "Renal vasculitis", "Long-term outcomes"],
    whyItMatters:
      "Led the RITAZAREM trial establishing rituximab maintenance as superior to azathioprine for relapse prevention — a result that directly changed international guidelines. Cambridge is a global training hub for vasculitis specialists and a primary node in the EUVAS European trial network, giving patients access to UK and EU trials simultaneously.",
    landmark: "RITAZAREM trial — rituximab maintenance vs azathioprine, redefined relapse prevention",
    network: ["EUVAS"],
    url: null,
  },
  {
    id: "gfev",
    tier: "major",
    name: "French Vasculitis Study Group (GFEV)",
    city: "Paris · Bordeaux · Tours · Lille",
    country: "France",
    focus: ["EGPA", "Mepolizumab / anti-IL-5", "Remission induction", "Eosinophilic disease"],
    whyItMatters:
      "The world's leading network for EGPA research and home to the MIRRA trial that established mepolizumab as a steroid-sparing standard. The ongoing E-merge trial (NCT05030155) tests whether mepolizumab can induce full remission. GFEV also maintains one of the largest EGPA patient registries globally. For patients with EGPA or suspected EGPA, no network has deeper expertise.",
    landmark: "MIRRA trial (established mepolizumab in EGPA); E-merge trial NCT05030155",
    network: ["EUVAS"],
    url: null,
  },
  {
    id: "leiden",
    tier: "major",
    name: "Leiden University Medical Center",
    city: "Leiden",
    country: "Netherlands",
    focus: ["Complement biology", "Renal AAV", "ANCA pathogenesis", "Avacopan mechanism"],
    whyItMatters:
      "The foundational complement biology research that directly enabled the development of avacopan (now FDA-approved) came out of Leiden and collaborating EUVAS centers. Strong clinical renal vasculitis program with long-term follow-up data. Access to pan-European EUVAS trial infrastructure alongside in-depth renal monitoring.",
    landmark: "Complement pathway research underpinning avacopan; long-term renal outcomes registry",
    network: ["EUVAS"],
    url: null,
  },
  {
    id: "toronto",
    tier: "major",
    name: "Toronto General Hospital — University Health Network",
    city: "Toronto, Ontario",
    country: "Canada",
    focus: ["Rituximab biosimilars", "GPA / MPA outcomes", "Nephrology co-management"],
    whyItMatters:
      "Canada's primary vasculitis referral center and the sponsor of the BRAVO trial comparing rituximab biosimilars against the originator — research with direct implications for patient access and treatment affordability. Joint nephrology-rheumatology management model is well-suited to patients with significant kidney involvement.",
    landmark: "BRAVO trial NCT05716334 — rituximab biosimilar vs originator in GPA/MPA",
    network: [],
    url: null,
  },
  // ── Research Networks: coordinating bodies patients should know about ───────
  {
    id: "vcrc",
    tier: "network",
    name: "Vasculitis Clinical Research Consortium (VCRC)",
    city: "Multi-center — US & Canada",
    country: "United States / Canada",
    focus: ["Trial coordination", "Patient registry", "Outcome standards", "Natural history studies"],
    whyItMatters:
      "The NIH-funded backbone of ANCA vasculitis research in North America. VCRC coordinates multicenter trials across 10+ sites, maintains the largest North American patient registry, and develops the standardized outcome measures used by researchers worldwide. Patients can join the VCRC Patient Contact Registry to be notified when they may be eligible for new trials — regardless of where they currently receive care.",
    landmark: "Coordinates RAVE follow-up, RITAZAREM US sites, biomarker programs; hosts the Patient Contact Registry",
    network: [],
    url: "https://www.rarediseasesnetwork.org/vcrc",
  },
  // ── Regional Leaders: important outside the main US/UK/NL cluster ──────────
  {
    id: "groningen",
    tier: "regional",
    name: "UMCG — University of Groningen Vasculitis Center",
    city: "Groningen",
    country: "Netherlands",
    focus: ["ANCA pathogenesis", "Biomarker discovery", "Renal outcomes", "European registry"],
    whyItMatters:
      "One of Europe's most productive ANCA research centers, with decades of foundational work on how ANCA antibodies cause vessel wall damage. Active participation in EUVAS multinational studies and a strong clinical renal program. Important for patients in Northern Europe seeking specialist vasculitis care.",
    landmark: "Foundational ANCA neutrophil-activation pathogenesis research; EUVAS registry node",
    network: ["EUVAS"],
    url: null,
  },
  {
    id: "pkuph",
    tier: "regional",
    name: "Peking Union Medical College Hospital (PUMCH)",
    city: "Beijing",
    country: "China",
    focus: ["CAR-T therapy", "MPO-ANCA disease", "Large-scale cohorts", "Asian epidemiology"],
    whyItMatters:
      "Among the highest-volume ANCA vasculitis centers in the world, with a predominantly MPO-ANCA cohort reflecting the East Asian epidemiological pattern. Actively recruiting for CAR-T trials (NCT06590545) and contributing large-scale outcomes data that complement smaller Western cohorts. The leading destination for patients in China seeking advanced vasculitis care.",
    landmark: "NCT06590545 site (anti-CD19 CAR-T); Chinese Vasculitis Research Registry",
    network: [],
    url: null,
  },
];

const TIER_CONFIG = {
  frontier: { label: "Frontier Research", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  major:    { label: "Major Program",     color: "#60A5FA", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)"  },
  network:  { label: "Research Network",  color: "#A78BFA", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)"  },
  regional: { label: "Regional Leader",   color: "#34D399", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)"  },
};

function SignalBadge({ signal }) {
  const config = {
    positive: { bg: "#065F46", text: "#6EE7B7", label: "Positive Signal" },
    promising: { bg: "#1E3A5F", text: "#93C5FD", label: "Promising" },
    neutral: { bg: "#374151", text: "#9CA3AF", label: "Awaiting Data" },
    negative: { bg: "#7F1D1D", text: "#FCA5A5", label: "Negative Signal" },
  };
  const c = config[signal] || config.neutral;
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {c.label}
    </span>
  );
}

function SignalLegend() {
  const items = [
    {
      signal: "positive",
      bg: "#065F46",
      text: "#6EE7B7",
      label: "Positive Signal",
      definition: "Phase 2+ trial with statistically significant primary endpoint met, OR regulatory approval granted.",
    },
    {
      signal: "promising",
      bg: "#1E3A5F",
      text: "#93C5FD",
      label: "Promising",
      definition: "Phase 1 or preclinical data showing mechanism-of-action evidence, early safety, or meaningful remission in small cohorts — no powered efficacy trial yet.",
    },
    {
      signal: "neutral",
      bg: "#374151",
      text: "#9CA3AF",
      label: "Awaiting Data",
      definition: "Trial ongoing or recently completed with no efficacy readout published yet.",
    },
    {
      signal: "negative",
      bg: "#7F1D1D",
      text: "#FCA5A5",
      label: "Negative Signal",
      definition: "Primary endpoint not met or trial discontinued due to safety or futility.",
    },
  ];

  return (
    <div
      style={{
        background: "rgba(15,23,42,0.5)",
        border: "1px solid rgba(148,163,184,0.08)",
        borderRadius: "10px",
        padding: "16px 20px",
        marginBottom: "24px",
      }}
    >
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
        Signal Definitions
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
        {items.map((item) => (
          <div key={item.signal} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <span
              style={{
                background: item.bg,
                color: item.text,
                padding: "2px 10px",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              {item.label}
            </span>
            <span style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.5 }}>{item.definition}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrialCard({ trial, isExpanded, onToggle }) {
  const phaseColor = PHASE_COLORS[trial.phase] || "#6B7280";
  const statusIcon = STATUS_ICONS[trial.status] || "?";

  return (
    <div
      onClick={onToggle}
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(148,163,184,0.12)",
        borderLeft: `3px solid ${phaseColor}`,
        borderRadius: "8px",
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: "12px",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(148,163,184,0.3)";
        e.currentTarget.style.background = "rgba(15,23,42,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)";
        e.currentTarget.style.background = "rgba(15,23,42,0.7)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
            <span
              style={{
                background: phaseColor + "22",
                color: phaseColor,
                padding: "2px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              {trial.phase}
            </span>
            <span style={{ color: trial.status === "Recruiting" ? "#34D399" : "#94A3B8", fontSize: "13px" }}>
              {statusIcon} {trial.status}
            </span>
            <SignalBadge signal={trial.outcome_signal} />
            {(trial.conditions || []).map((cond) => {
              const condColor = { GPA: "#3B82F6", MPA: "#10B981", EGPA: "#F59E0B", "ANCA-GN": "#EF4444" }[cond] || "#6B7280";
              return (
                <span
                  key={cond}
                  style={{
                    background: condColor + "22",
                    color: condColor,
                    border: `1px solid ${condColor}44`,
                    padding: "1px 7px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                  }}
                >
                  {cond}
                </span>
              );
            })}
          </div>
          <h3
            style={{
              margin: "0 0 6px 0",
              fontSize: "16px",
              fontWeight: 600,
              color: "#E2E8F0",
              lineHeight: 1.4,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            {trial.title}
          </h3>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "#64748B" }}>
            <span>{trial.id}</span>
            <span>Sponsor: {trial.sponsor}</span>
            <span>n={trial.enrollment}</span>
            <span>Updated: {trial.updated}</span>
          </div>
        </div>
        <div
          style={{
            color: "#475569",
            fontSize: "18px",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
            marginTop: "4px",
          }}
        >
          ▼
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(148,163,184,0.1)",
          }}
        >
          <p style={{ margin: "0 0 12px 0", color: "#CBD5E1", fontSize: "14px", lineHeight: 1.7 }}>
            {trial.description}
          </p>
          <div style={{ display: "flex", gap: "24px", fontSize: "13px", color: "#64748B", flexWrap: "wrap" }}>
            <span>📍 {trial.locations}</span>
            {trial.url && trial.url !== "https://clinicaltrials.gov" && (
              <a
                href={trial.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: "#60A5FA", textDecoration: "none" }}
              >
                View on ClinicalTrials.gov →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatsBar({ trials }) {
  const recruiting = trials.filter((t) => t.status === "Recruiting").length;
  const positive = trials.filter((t) => t.outcome_signal === "positive").length;
  const carT = trials.filter((t) => t.category === "car_t").length;

  const stats = [
    { label: "Total Tracked", value: trials.length, color: "#E2E8F0" },
    { label: "Recruiting", value: recruiting, color: "#34D399" },
    { label: "Positive Signal", value: positive, color: "#6EE7B7" },
    { label: "CAR-T Programs", value: carT, color: "#F59E0B" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px",
        marginBottom: "32px",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(148,163,184,0.08)",
            borderRadius: "10px",
            padding: "16px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace" }}>
            {s.value}
          </div>
          <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}


function CenterCard({ center }) {
  const tier = TIER_CONFIG[center.tier];

  return (
    <div
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(148,163,184,0.12)",
        borderLeft: `3px solid ${tier.color}`,
        borderRadius: "8px",
        padding: "20px 24px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
            <span
              style={{
                background: tier.bg,
                color: tier.color,
                border: `1px solid ${tier.border}`,
                padding: "2px 10px",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
              }}
            >
              {tier.label}
            </span>
            {center.network.map((n) => (
              <span
                key={n}
                style={{
                  background: "rgba(148,163,184,0.08)",
                  color: "#64748B",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                }}
              >
                {n}
              </span>
            ))}
          </div>
          <h3
            style={{
              margin: "0 0 3px 0",
              fontSize: "15px",
              fontWeight: 600,
              color: "#E2E8F0",
              lineHeight: 1.4,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            {center.name}
          </h3>
          <div style={{ fontSize: "12px", color: "#64748B" }}>
            {center.city} · {center.country}
          </div>
        </div>
        {center.url && (
          <a
            href={center.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#60A5FA", fontSize: "12px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Website →
          </a>
        )}
      </div>

      {/* Why it matters */}
      <p style={{ margin: "0 0 14px 0", color: "#CBD5E1", fontSize: "13px", lineHeight: 1.75 }}>
        {center.whyItMatters}
      </p>

      {/* Landmark + focus row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 240px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "4px" }}>
            Notable Contribution
          </div>
          <div style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.6 }}>{center.landmark}</div>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
            Focus Areas
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {center.focus.map((f) => (
              <span
                key={f}
                style={{
                  background: "rgba(15,23,42,0.6)",
                  border: "1px solid rgba(148,163,184,0.1)",
                  color: "#94A3B8",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ANCATrialsDashboard() {
  const [trials] = useState(SEED_TRIALS);
  const [activeTab, setActiveTab] = useState("trials");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCondition, setActiveCondition] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  // Refresh the page once per calendar day so any newly deployed static data is picked up.
  useEffect(() => {
    const STORAGE_KEY = "anca_last_daily_refresh";
    const today = new Date().toDateString();
    const lastRefresh = localStorage.getItem(STORAGE_KEY);
    if (lastRefresh !== today) {
      localStorage.setItem(STORAGE_KEY, today);
      // Only reload if this isn't the very first visit (avoid a loop on initial load).
      if (lastRefresh) {
        window.location.reload();
      }
    }
  }, []);

  const CONDITION_KEY_MAP = { gpa: "GPA", mpa: "MPA", egpa: "EGPA", anca_gn: "ANCA-GN" };

  const filtered = trials.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchCondition =
      activeCondition === "all" ||
      (t.conditions || []).includes(CONDITION_KEY_MAP[activeCondition]);
    const matchSearch =
      !searchTerm ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchCondition && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.updated) - new Date(a.updated));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0B0F19 0%, #111827 40%, #0F172A 100%)",
        color: "#E2E8F0",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(148,163,184,0.08)",
          padding: "28px 32px",
          background: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#34D399",
                    boxShadow: "0 0 8px rgba(52,211,153,0.5)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <h1
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: 700,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  ANCA Vasculitis &amp; GPA — Clinical Trials Tracker
                </h1>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
                Tracking global research toward better treatments and potential cures
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {activeTab === "trials" && (
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  style={{
                    background: "rgba(148,163,184,0.1)",
                    border: "1px solid rgba(148,163,184,0.15)",
                    color: "#94A3B8",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  {showInfo ? "Hide" : "ℹ Info"}
                </button>
              )}
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{ display: "flex", gap: "0", marginTop: "20px", borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
            {[["trials", "Clinical Trials"], ["connections", "Disease Connections"], ["case-studies", "Case Studies"], ["centers", "Research & Centers"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === key ? "2px solid #60A5FA" : "2px solid transparent",
                  color: activeTab === key ? "#E2E8F0" : "#64748B",
                  padding: "10px 18px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: activeTab === key ? 600 : 400,
                  transition: "all 0.15s",
                  marginBottom: "-1px",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 32px" }}>
        {activeTab === "trials" && (
          <>
            {showInfo && (
              <div
                style={{
                  background: "rgba(30,58,95,0.3)",
                  border: "1px solid rgba(96,165,250,0.2)",
                  borderRadius: "10px",
                  padding: "20px 24px",
                  marginBottom: "24px",
                  fontSize: "13px",
                  color: "#94A3B8",
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "#E2E8F0" }}>About this tracker:</strong> This dashboard monitors active
                clinical trials and research worldwide targeting ANCA-associated vasculitis (AAV), with a focus on GPA
                (Granulomatosis with Polyangiitis). It tracks emerging therapies including CAR-T cell treatments,
                complement inhibitors like avacopan, next-generation B-cell depletion, steroid-sparing regimens, and
                novel biomarker research. Trial data is curated from ClinicalTrials.gov, PubMed, and major registries.
                The page refreshes automatically each day to reflect newly published updates.
              </div>
            )}

            <StatsBar trials={trials} />

            <SignalLegend />

            {/* Filters */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search trials, IDs, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "rgba(15,23,42,0.6)",
                  border: "1px solid rgba(148,163,184,0.12)",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  color: "#E2E8F0",
                  fontSize: "13px",
                  width: "260px",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {Object.entries(CATEGORIES).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    style={{
                      background: activeCategory === key ? "rgba(59,130,246,0.2)" : "rgba(15,23,42,0.4)",
                      border: `1px solid ${activeCategory === key ? "rgba(59,130,246,0.4)" : "rgba(148,163,184,0.1)"}`,
                      color: activeCategory === key ? "#60A5FA" : "#64748B",
                      borderRadius: "20px",
                      padding: "6px 14px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: activeCategory === key ? 600 : 400,
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#475569", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "4px" }}>
                Condition:
              </span>
              {Object.entries(CONDITIONS).map(([key, label]) => {
                const CONDITION_COLORS = {
                  all: { active: "rgba(100,116,139,0.2)", activeBorder: "rgba(100,116,139,0.4)", activeText: "#94A3B8" },
                  gpa: { active: "rgba(59,130,246,0.2)", activeBorder: "rgba(59,130,246,0.4)", activeText: "#60A5FA" },
                  mpa: { active: "rgba(16,185,129,0.2)", activeBorder: "rgba(16,185,129,0.4)", activeText: "#34D399" },
                  egpa: { active: "rgba(245,158,11,0.2)", activeBorder: "rgba(245,158,11,0.4)", activeText: "#FBBF24" },
                  anca_gn: { active: "rgba(239,68,68,0.2)", activeBorder: "rgba(239,68,68,0.4)", activeText: "#F87171" },
                };
                const col = CONDITION_COLORS[key];
                const isActive = activeCondition === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCondition(key)}
                    style={{
                      background: isActive ? col.active : "rgba(15,23,42,0.4)",
                      border: `1px solid ${isActive ? col.activeBorder : "rgba(148,163,184,0.1)"}`,
                      color: isActive ? col.activeText : "#64748B",
                      borderRadius: "20px",
                      padding: "5px 12px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: "12px", fontSize: "12px", color: "#475569" }}>
              Showing {sorted.length} of {trials.length} trials — sorted by most recent update
            </div>

            {sorted.map((trial) => (
              <TrialCard
                key={trial.id}
                trial={trial}
                isExpanded={expandedId === trial.id}
                onToggle={() => setExpandedId(expandedId === trial.id ? null : trial.id)}
              />
            ))}

            {sorted.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#475569" }}>
                No trials match your current filters. Try adjusting your search or category.
              </div>
            )}
          </>
        )}

        {activeTab === "connections" && (
          <>
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#E2E8F0",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                }}
              >
                Disease Connections
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B", lineHeight: 1.6 }}>
                How ANCA vasculitis presents across organ systems and related conditions — with research context, symptoms, and guidance for conversations with your care team. Click any card to expand.
              </p>
            </div>
            <DiseaseConnections trials={SEED_TRIALS} />
          </>
        )}

        {activeTab === "case-studies" && (
          <>
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#E2E8F0",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                }}
              >
                Case Studies
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B", lineHeight: 1.6 }}>
                Real patient scenarios across each disease connection — what happened, what worked, and what you can do right now.
                Each entry synthesises the consistent pattern across multiple cases so you can act on the most reliable signal.
              </p>
            </div>
            <CaseStudies />
          </>
        )}

        {activeTab === "centers" && (
          <>
            {/* Page intro */}
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#E2E8F0",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                }}
              >
                Research &amp; Centers
              </h2>
              <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#64748B", lineHeight: 1.6 }}>
                Where the most advanced ANCA vasculitis research is happening — and what it means for patients seeking cutting-edge care or trial access. Centers are grouped by the sophistication and novelty of their active research programs.
              </p>
              <div
                style={{
                  background: "rgba(30,58,95,0.25)",
                  border: "1px solid rgba(96,165,250,0.15)",
                  borderRadius: "8px",
                  padding: "14px 18px",
                  fontSize: "12px",
                  color: "#94A3B8",
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "#CBD5E1" }}>Seeking care at a major center?</strong> Ask your current physician for a referral, or contact the center's vasculitis program directly. Many accept out-of-area patients for consultation or second opinions. The{" "}
                <span style={{ color: "#60A5FA" }}>VCRC Patient Contact Registry</span> (below) lets you register to be notified of trials you may qualify for, regardless of where you currently receive care.
              </div>
            </div>

            {/* Tier legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
              {Object.entries(TIER_CONFIG).map(([key, t]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      background: t.bg,
                      color: t.color,
                      border: `1px solid ${t.border}`,
                      padding: "2px 10px",
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.6px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
              <span style={{ fontSize: "12px", color: "#475569", alignSelf: "center" }}>
                — ranked by novelty and patient access to cutting-edge trials
              </span>
            </div>

            {/* Frontier section */}
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#F59E0B", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(245,158,11,0.2)", display: "block" }} />
                Frontier Research
                <span style={{ flex: 1, height: "1px", background: "rgba(245,158,11,0.2)", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {RESEARCH_CENTERS.filter((c) => c.tier === "frontier").map((c) => (
                  <CenterCard key={c.id} center={c} />
                ))}
              </div>
            </div>

            {/* Major Programs section */}
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#60A5FA", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(59,130,246,0.2)", display: "block" }} />
                Major Programs &amp; Networks
                <span style={{ flex: 1, height: "1px", background: "rgba(59,130,246,0.2)", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {RESEARCH_CENTERS.filter((c) => c.tier === "major" || c.tier === "network").map((c) => (
                  <CenterCard key={c.id} center={c} />
                ))}
              </div>
            </div>

            {/* Regional Leaders section */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#34D399", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(16,185,129,0.2)", display: "block" }} />
                Regional Leaders
                <span style={{ flex: 1, height: "1px", background: "rgba(16,185,129,0.2)", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {RESEARCH_CENTERS.filter((c) => c.tier === "regional").map((c) => (
                  <CenterCard key={c.id} center={c} />
                ))}
              </div>
            </div>
          </>
        )}

        <div
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(148,163,184,0.08)",
            textAlign: "center",
            fontSize: "11px",
            color: "#374151",
            lineHeight: 1.8,
          }}
        >
          <div>Data sources: ClinicalTrials.gov · PubMed · Nature Reviews Rheumatology · Frontiers in Immunology</div>
          <div>Registries: VCRC (Vasculitis Clinical Research Consortium) · EUVAS (European Vasculitis Society) · ERA-EDTA Registry</div>
          <div>Evidence: Cochrane Systematic Reviews · FDA Drug Trials Snapshots · EMA EPAR Database</div>
          <div>Not medical advice — consult your physician</div>
        </div>
      </div>
    </div>
  );
}
