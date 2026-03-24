import { useState, useEffect } from "react";

const CATEGORIES = {
  all: "All Trials",
  car_t: "CAR-T Cell Therapy",
  complement: "Complement Inhibitors",
  b_cell: "B-Cell Targeting",
  steroid_sparing: "Steroid-Sparing",
  biomarker: "Biomarkers",
  other: "Other Novel Agents",
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
    description:
      "Emerging trials targeting fibrosis pathways in AAV, aiming to prevent irreversible kidney and lung damage. Novel complement inhibitors and anti-fibrotic molecules are under investigation alongside standard immunosuppression.",
    locations: "US, Europe, Asia",
    enrollment: 60,
    updated: "2025-07-01",
    outcome_signal: "neutral",
    url: "https://clinicaltrials.gov",
  },
];

const DISEASE_CONNECTIONS = [
  {
    id: "gpa",
    name: "GPA — Granulomatosis with Polyangiitis",
    subtitle: "Formerly Wegener's Granulomatosis",
    color: "#3B82F6",
    researchSummary:
      "GPA is the most common form of ANCA-associated vasculitis, predominantly driven by PR3-ANCA antibodies in ~75% of cases. It causes granulomatous inflammation of small and medium vessels with a predilection for the upper airways, lungs, and kidneys. Modern treatment with rituximab (established by the RAVE trial) achieves remission in ~75% of patients at 18 months. Active research includes CAR-T cell therapy for refractory disease, rituximab maintenance optimization (RITAZAREM), next-generation anti-CD20 agents, and biomarker-guided dosing.",
    symptoms: [
      "Upper airway: chronic sinusitis, nosebleeds, nasal crusting, saddle-nose deformity, subglottic stenosis",
      "Ear: chronic otitis media, conductive hearing loss",
      "Lung: cough, shortness of breath, pulmonary infiltrates or hemorrhage",
      "Kidney: blood or protein in urine, rising creatinine",
      "Eye: redness, pain, proptosis from orbital granuloma, scleritis",
      "Skin: purpura, ulcers, or nodules",
      "Joints: pain and swelling",
      "Systemic: fatigue, weight loss, fever",
    ],
    doctorTips: [
      "Ask about ANCA subtype: 'Is my ANCA PR3 or MPO — and how does that change my relapse risk or treatment plan?'",
      "Ask about maintenance: 'How long should I remain on rituximab maintenance, and how will we know when it's safe to stop?'",
      "Ask about monitoring: 'Which symptoms or lab changes should prompt me to call before my next scheduled visit?'",
      "Ask about ENT co-management: 'Should I see an ENT specialist for my upper airway disease separately from my rheumatologist?'",
      "Ask about trials: 'Given my disease history, am I a candidate for any open clinical trials?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Symptoms of GPA overlap with many conditions; always discuss new or worsening symptoms with your care team promptly.",
  },
  {
    id: "mpa",
    name: "MPA — Microscopic Polyangiitis",
    subtitle: null,
    color: "#10B981",
    researchSummary:
      "MPA is a small-vessel vasculitis associated with MPO-ANCA in ~60–70% of cases. Unlike GPA it rarely involves granulomas or upper airway disease, but causes severe glomerulonephritis and pulmonary capillaritis. Avacopan (C5a receptor blocker, FDA-approved 2021) demonstrated superior kidney recovery versus prednisone taper in the ADVOCATE trial. Key research areas include complement pathway biology, pulmonary fibrosis as a late complication even in remission, and biomarkers MMP-3 and CXCL13 for non-invasive disease activity monitoring.",
    symptoms: [
      "Kidney: hematuria, proteinuria, rapidly progressive glomerulonephritis",
      "Lung: cough, hemoptysis, pulmonary infiltrates or diffuse alveolar hemorrhage",
      "Pulmonary fibrosis (can develop even during remission)",
      "Peripheral neuropathy: numbness, tingling, or weakness in limbs",
      "Skin: purpura, livedo reticularis",
      "Systemic: profound fatigue, fever, weight loss",
      "Gastrointestinal: abdominal pain or bleeding (less common)",
    ],
    doctorTips: [
      "Ask about avacopan: 'Is Tavneos appropriate for my degree of kidney involvement alongside standard induction?'",
      "Ask about lung surveillance: 'Should I have periodic pulmonary function tests to screen for fibrosis, even when my disease is quiet?'",
      "Ask about kidney trajectory: 'What is my kidney function trend, and at what point should we discuss transplant planning?'",
      "Ask about neuropathy: 'Should I be assessed for peripheral nerve damage, and is it reversible with treatment?'",
      "Ask about maintenance: 'How long should I stay on maintenance immunosuppression given my MPO-ANCA status?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. MPA can present similarly to other vasculitides; accurate diagnosis requires specialist evaluation including ANCA testing and often tissue biopsy.",
  },
  {
    id: "egpa",
    name: "EGPA — Eosinophilic Granulomatosis with Polyangiitis",
    subtitle: "Formerly Churg-Strauss Syndrome",
    color: "#F59E0B",
    researchSummary:
      "EGPA is distinguished by marked peripheral eosinophilia, adult-onset asthma, and allergic disease. Only ~30–40% of patients are ANCA-positive (usually MPO-ANCA); ANCA-positive patients have higher rates of renal and neurological involvement, while ANCA-negative patients more often develop eosinophilic cardiac and pulmonary disease. The MIRRA trial established mepolizumab (anti-IL-5) as a steroid-sparing agent; the ongoing E-merge trial (NCT05030155) is evaluating it for remission induction. Cardiac involvement remains the leading cause of EGPA-related death.",
    symptoms: [
      "Severe, difficult-to-control asthma — often new onset in adulthood",
      "Allergic rhinitis, nasal polyps, chronic sinusitis",
      "Peripheral eosinophilia (markedly elevated eosinophil count on blood work)",
      "Peripheral neuropathy: mononeuritis multiplex causing footdrop or wrist drop",
      "Cardiac: cardiomyopathy, pericardial effusion, heart failure, arrhythmia",
      "Skin: purpura, subcutaneous nodules",
      "Gastrointestinal: eosinophilic gastroenteritis, abdominal pain",
      "Lung: fleeting infiltrates, pleural effusion",
    ],
    doctorTips: [
      "Ask about cardiac screening: 'Should I have an echocardiogram and cardiac MRI to rule out eosinophilic heart disease?'",
      "Ask about mepolizumab: 'Am I a candidate for Nucala to reduce my steroid dependence?'",
      "Ask about ANCA risk stratification: 'Does my ANCA result change my risk for kidney or neurological complications?'",
      "Ask about multidisciplinary care: 'Should my allergist and pulmonologist be actively involved alongside my rheumatologist?'",
      "Ask about cardiac monitoring: 'How often should cardiac imaging be repeated given my eosinophil levels?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. EGPA is rare and diagnostically complex. Cardiac involvement can be life-threatening and requires specialist evaluation.",
  },
  {
    id: "pachymeningitis",
    name: "Hypertrophic Pachymeningitis",
    subtitle: "Neurological manifestation associated with GPA / AAV",
    color: "#8B5CF6",
    communityNote:
      "Some members of ANCA vasculitis patient communities report being diagnosed with arachnoid cysts alongside GPA-related pachymeningitis. This co-occurrence is not yet well-characterized in the published literature, but patient-reported accounts suggest it may warrant clinical attention. If you have both conditions, documenting this history with your neurologist and rheumatologist — and specifically asking whether the two could be connected — may help build awareness of this potential association.",
    researchSummary:
      "Hypertrophic pachymeningitis (HP) is inflammation and fibrotic thickening of the dura mater — the outer lining of the brain and spinal cord. In AAV it occurs as a rare but serious neurological manifestation, most often in PR3-ANCA-positive GPA. Diagnosis relies on MRI with gadolinium contrast showing dural enhancement, combined with ANCA serology; biopsy is sometimes required. Evidence for treatment comes primarily from case series: rituximab has shown meaningful benefit in refractory cases. Diagnosis is frequently delayed due to the nonspecific nature of early symptoms.",
    symptoms: [
      "Severe, persistent headache — the most common presenting symptom",
      "Cranial nerve palsies: double vision, facial numbness or weakness, hearing loss, drooping eyelid",
      "Cerebellar signs: balance and coordination problems, unsteady gait",
      "Visual disturbance or vision loss from optic nerve involvement",
      "Hydrocephalus: headache, nausea, and cognitive slowing from CSF flow obstruction",
      "Spinal cord compression if the spinal dura is affected: limb weakness or sensory loss",
      "Cognitive changes or memory difficulties",
    ],
    doctorTips: [
      "Ask about imaging: 'Should I have an MRI brain and spine with gadolinium contrast to look for dural thickening or enhancement?'",
      "Ask about rituximab: 'Is rituximab appropriate for my pachymeningitis, given the case-series evidence in GPA?'",
      "Ask about neurology co-management: 'Should a neurologist be actively co-managing my care alongside my rheumatologist?'",
      "Ask about arachnoid cysts: 'If a cyst was found on my imaging, could it be related to my vasculitis or pachymeningitis, or is it likely incidental?'",
      "Ask about monitoring: 'How often should I have repeat MRI to track dural disease and response to treatment?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Hypertrophic pachymeningitis is rare and its association with arachnoid cysts in AAV patients is based on patient reports rather than established clinical evidence. Specialist neurological evaluation is essential.",
  },
  {
    id: "renal",
    name: "ANCA-Associated Glomerulonephritis",
    subtitle: "Kidney manifestation of AAV",
    color: "#EF4444",
    researchSummary:
      "Renal involvement is one of the most serious manifestations of AAV and a major driver of long-term morbidity. The hallmark is pauci-immune necrotizing crescentic glomerulonephritis on biopsy — severe inflammation with little immune-complex deposition. Avacopan demonstrated superior kidney recovery versus prednisone taper at 52 weeks in ADVOCATE and is now FDA-approved for severe AAV. Emerging research targets anti-fibrotic pathways to prevent irreversible scarring, and urinary biomarkers (MMP-3, CXCL13) are being validated for non-invasive disease monitoring.",
    symptoms: [
      "Hematuria: visible or microscopic blood in urine",
      "Proteinuria: foamy or frothy urine",
      "Rapidly rising creatinine indicating rapidly progressive glomerulonephritis",
      "Edema: swelling in legs, ankles, or around the eyes",
      "Hypertension: new or worsening high blood pressure",
      "Reduced urine output in severe presentations",
      "Uremic symptoms in advanced disease: nausea, fatigue, difficulty concentrating",
    ],
    doctorTips: [
      "Ask about avacopan: 'Is Tavneos indicated for my severity of kidney involvement?'",
      "Ask about home monitoring: 'What urine or blood values should I track, and what threshold should prompt an urgent call?'",
      "Ask about kidney biopsy: 'Would a biopsy help distinguish active inflammation from chronic scarring to guide treatment intensity?'",
      "Ask about long-term planning: 'At what stage should we start discussing dialysis or transplantation planning?'",
      "Ask about nephrotoxicity: 'Are any of my current medications hard on the kidneys, and should doses be adjusted for my GFR?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Kidney disease in AAV can progress rapidly — any new urinary symptoms or a rising creatinine should be evaluated urgently.",
  },
];

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

function ConnectionCard({ condition }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(148,163,184,0.12)",
        borderLeft: `3px solid ${condition.color}`,
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
      {/* Card header — always visible */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <div>
          <h3
            style={{
              margin: "0 0 4px 0",
              fontSize: "16px",
              fontWeight: 600,
              color: "#E2E8F0",
              lineHeight: 1.4,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            {condition.name}
          </h3>
          {condition.subtitle && (
            <div style={{ fontSize: "12px", color: "#64748B", fontStyle: "italic" }}>{condition.subtitle}</div>
          )}
        </div>
        <div
          style={{
            color: "#475569",
            fontSize: "18px",
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          ▼
        </div>
      </div>

      {expanded && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(148,163,184,0.1)", cursor: "default" }}
        >
          {/* Research Summary */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Research Summary
            </div>
            <p style={{ margin: 0, color: "#CBD5E1", fontSize: "14px", lineHeight: 1.75 }}>
              {condition.researchSummary}
            </p>
          </div>

          {/* Community note — present only on pachymeningitis */}
          {condition.communityNote && (
            <div
              style={{
                background: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#D97706", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
                Community connection — pachymeningitis &amp; arachnoid cysts
              </div>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: "13px", lineHeight: 1.7 }}>
                {condition.communityNote}
              </p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {/* Known Symptoms */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
                Known Symptoms
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {condition.symptoms.map((s, i) => (
                  <li key={i} style={{ color: "#94A3B8", fontSize: "13px", lineHeight: 1.6 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to talk to your doctor */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
                How to Talk to Your Doctor
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {condition.doctorTips.map((tip, i) => (
                  <li key={i} style={{ color: "#94A3B8", fontSize: "13px", lineHeight: 1.6 }}>
                    {tip}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: "14px",
                  padding: "10px 12px",
                  background: "rgba(15,23,42,0.5)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                ⓘ {condition.disclaimer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ANCATrialsDashboard() {
  const [trials] = useState(SEED_TRIALS);
  const [activeTab, setActiveTab] = useState("trials");
  const [activeCategory, setActiveCategory] = useState("all");
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

  const filtered = trials.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      !searchTerm ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
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
            {[["trials", "Clinical Trials"], ["connections", "Disease Connections"]].map(([key, label]) => (
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
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
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
            {DISEASE_CONNECTIONS.map((condition) => (
              <ConnectionCard key={condition.id} condition={condition} />
            ))}
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
