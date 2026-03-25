import { useState } from "react";

const CONNECTIONS = [
  {
    id: "anca-gn",
    name: "ANCA-Associated Glomerulonephritis",
    subtitle: "Renal manifestation of AAV",
    color: "#EF4444",
    symptoms: [
      "Hematuria: visible or microscopic blood in urine",
      "Proteinuria: foamy or frothy urine indicating kidney leak",
      "Rapidly rising creatinine — hallmark of rapidly progressive GN",
      "Edema: swelling in legs, ankles, or around the eyes",
      "Hypertension: new or worsening high blood pressure",
      "Reduced urine output in severe presentations",
      "Uremic symptoms in advanced disease: nausea, fatigue, difficulty concentrating",
    ],
    doctorTips: [
      "Ask about avacopan: 'Is Tavneos indicated for my severity of kidney involvement, and does it replace or reduce my steroid course?'",
      "Ask about home monitoring: 'What urine dipstick or blood values should I track, and what threshold should prompt an urgent call?'",
      "Ask about biopsy interpretation: 'Would a repeat biopsy help distinguish active inflammation from chronic scarring to guide treatment intensity?'",
      "Ask about long-term trajectory: 'At what GFR or creatinine level should we begin dialysis or transplantation planning?'",
      "Ask about nephrotoxicity: 'Are any of my current medications nephrotoxic, and should doses be adjusted for my current GFR?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Kidney disease in AAV can progress within days; any new urinary symptoms or a rising creatinine should be evaluated urgently by your care team.",
  },
  {
    id: "pulmonary-fibrosis",
    name: "Pulmonary Fibrosis in MPA",
    subtitle: "Irreversible lung scarring — can develop even during remission",
    color: "#06B6D4",
    symptoms: [
      "Progressive exertional dyspnea: shortness of breath that worsens with activity over months",
      "Dry, persistent cough unrelated to infection",
      "Velcro-like crackles at lung bases heard on examination",
      "Reduced exercise tolerance and fatigue",
      "Declining FVC or DLCO on pulmonary function testing",
      "Honeycombing or reticulation on high-resolution CT chest",
      "Clubbing of fingers (less common but reported)",
    ],
    doctorTips: [
      "Ask about baseline PFTs: 'Should I have spirometry and DLCO now to establish a baseline, even while my vasculitis is quiet?'",
      "Ask about monitoring frequency: 'How often should I have repeat pulmonary function tests and CT chest given my MPO-ANCA status?'",
      "Ask about anti-fibrotic therapy: 'Is there any role for nintedanib or pirfenidone if fibrosis progresses despite vasculitis remission?'",
      "Ask about pulmonary referral: 'Should a pulmonologist with ILD experience be co-managing my care alongside my rheumatologist?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Pulmonary fibrosis in MPA can progress silently; early detection through regular PFT surveillance is essential.",
  },
  {
    id: "pachymeningitis",
    name: "Hypertrophic Pachymeningitis",
    subtitle: "Dural inflammation associated with GPA / PR3-ANCA",
    color: "#8B5CF6",
    communityNote:
      "Some members of ANCA vasculitis patient communities report being diagnosed with arachnoid cysts alongside GPA-related pachymeningitis. This co-occurrence is not yet well-characterized in the published literature, but patient-reported accounts suggest it may warrant clinical attention. If you have both conditions, documenting this history with your neurologist and rheumatologist — and asking whether the two could be connected — may help build awareness of this potential association.",
    symptoms: [
      "Severe, persistent headache — the most common presenting symptom",
      "Cranial nerve palsies: double vision, facial numbness or weakness, hearing loss, drooping eyelid",
      "Cerebellar signs: balance problems, unsteady gait, coordination difficulties",
      "Visual disturbance or vision loss from optic nerve involvement",
      "Hydrocephalus: headache, nausea, and cognitive slowing from CSF obstruction",
      "Spinal cord compression if spinal dura is affected: limb weakness or sensory loss",
      "Cognitive changes or memory difficulties",
    ],
    doctorTips: [
      "Ask about imaging: 'Should I have an MRI brain and spine with gadolinium contrast to look for dural thickening or enhancement?'",
      "Ask about rituximab: 'Is rituximab appropriate for my pachymeningitis given the case-series evidence in GPA?'",
      "Ask about neurology co-management: 'Should a neurologist actively co-manage my care alongside my rheumatologist?'",
      "Ask about arachnoid cysts: 'If a cyst was found on my imaging, could it be related to my vasculitis or pachymeningitis, or is it likely incidental?'",
      "Ask about monitoring: 'How often should I have repeat MRI to track dural disease and response to treatment?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Hypertrophic pachymeningitis is rare; the association with arachnoid cysts in AAV is based on patient reports rather than established evidence. Specialist neurological evaluation is essential.",
  },
  {
    id: "arachnoid-cyst",
    name: "Arachnoid Cysts & GPA",
    subtitle: "Emerging patient-reported co-occurrence",
    color: "#A78BFA",
    communityNote:
      "Arachnoid cysts are typically considered incidental findings, but a subset of GPA patients report discovering them in the context of neurological symptoms or pachymeningitis workup. Whether GPA-related dural inflammation creates conditions for arachnoid cyst formation or expansion — or whether this represents chance co-occurrence in a population receiving frequent brain imaging — is an open question. Documenting and reporting such cases to your care team contributes to building clinical evidence.",
    symptoms: [
      "Often asymptomatic — found incidentally on MRI obtained for another reason",
      "Headache: pressure-type, often positional or worse when supine",
      "Dizziness or balance disturbance if cyst is in posterior fossa",
      "Vision changes or diplopia if cyst compresses optic pathways",
      "Focal neurological deficits depending on cyst location",
      "Cognitive symptoms if cyst causes hydrocephalus or CSF diversion",
    ],
    doctorTips: [
      "Ask about reporting: 'Should the finding of an arachnoid cyst be reported to a neurosurgeon for surveillance, given my GPA history?'",
      "Ask about causality: 'Is there any chance my dural inflammation contributed to this cyst, or is it almost certainly unrelated?'",
      "Ask about monitoring: 'Should I have serial MRI to assess whether the cyst is stable, growing, or symptomatic over time?'",
      "Ask about symptom attribution: 'Which of my neurological symptoms might be from pachymeningitis versus the cyst itself?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. The relationship between arachnoid cysts and GPA is not established in the clinical literature. Decisions about cyst management should be made with a neurosurgeon and neurologist.",
  },
  {
    id: "orbital-gpa",
    name: "Orbital GPA / Pseudotumor",
    subtitle: "Granulomatous mass behind the eye — 15–20% of GPA patients",
    color: "#F97316",
    symptoms: [
      "Proptosis: eye pushed forward out of the socket (exophthalmos)",
      "Periorbital pain, pressure, or aching behind the eye",
      "Diplopia: double vision from extraocular muscle involvement",
      "Decreased visual acuity or color desaturation if optic nerve is compressed",
      "Conjunctival injection or chemosis",
      "Eyelid swelling or ptosis",
      "Epiphora: excess tearing from nasolacrimal duct obstruction",
    ],
    doctorTips: [
      "Ask about ophthalmology referral: 'Should I see a specialist in orbital disease or oculoplastics, not just a general ophthalmologist?'",
      "Ask about vision risk: 'Is my optic nerve currently at risk, and how urgently should this be treated?'",
      "Ask about imaging: 'Should I have an orbital MRI with contrast to characterize the extent of the mass before treatment decisions?'",
      "Ask about rituximab: 'Is rituximab first-line for orbital disease, or should high-dose steroids be used first given the visual risk?'",
      "Ask about recurrence: 'Orbital GPA is known to recur locally — how will we monitor for regrowth after remission?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Orbital GPA can threaten vision; new or worsening eye symptoms in a patient with known GPA require urgent ophthalmological evaluation.",
  },
  {
    id: "subglottic-stenosis",
    name: "Subglottic Stenosis",
    subtitle: "Airway narrowing below the vocal cords — 15–25% of GPA patients",
    color: "#14B8A6",
    symptoms: [
      "Inspiratory stridor: high-pitched squeaking or wheezing on breathing in",
      "Exertional dyspnea disproportionate to disease activity elsewhere",
      "Hoarse or changed voice",
      "Sensation of throat tightness or incomplete breath",
      "Recurrent episodes of 'croup-like' illness in adults",
      "Exercise intolerance that does not respond to asthma medication",
      "Biphasic stridor in severe cases (on both inspiration and expiration)",
    ],
    doctorTips: [
      "Ask about ENT referral: 'Should I be evaluated by an ENT surgeon experienced with GPA-related subglottic disease specifically?'",
      "Ask about endoscopic dilation: 'Am I a candidate for endoscopic balloon dilation or intralesional steroid injection as an alternative to systemic treatment escalation?'",
      "Ask about systemic vs. local treatment: 'Is my subglottic stenosis driving my immunosuppression, or can it be managed locally?'",
      "Ask about surveillance: 'How often should my airway be scoped or imaged to monitor stenosis progression, even during remission?'",
      "Ask about airway emergency planning: 'Do I need a written emergency airway plan, and should I carry a medical alert card or bracelet?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Subglottic stenosis can be life-threatening if severe; inspiratory stridor should be evaluated urgently. Note that stenosis often progresses independently of systemic disease activity.",
  },
  {
    id: "neuropathy",
    name: "Peripheral Neuropathy in AAV",
    subtitle: "Nerve damage from vessel inflammation — most common in EGPA",
    color: "#EC4899",
    symptoms: [
      "Mononeuritis multiplex: sudden, severe pain or weakness in a specific limb pattern — footdrop, wrist drop",
      "Burning, tingling, or numbness in hands or feet",
      "Asymmetric sensory loss — a distinguishing feature from typical polyneuropathy",
      "Weakness causing difficulty gripping, walking, or holding objects",
      "Electric shock sensations with movement",
      "Allodynia: normal touch perceived as painful",
      "Autonomic symptoms in severe cases: blood pressure instability, sweating abnormalities",
    ],
    doctorTips: [
      "Ask about nerve conduction studies: 'Should I have EMG and nerve conduction studies to characterize the type and severity of my neuropathy?'",
      "Ask about neurology co-management: 'Should a neurologist who sees vasculitic neuropathy be involved in my care?'",
      "Ask about reversibility: 'How much of my nerve damage is likely to recover with treatment, and over what timeframe?'",
      "Ask about pain management: 'Are there neuropathic pain medications that can bridge while the vasculitis responds to immunosuppression?'",
      "Ask about monitoring: 'How will we track neurological recovery, and at what point would stable deficits be considered permanent?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Mononeuritis multiplex from vasculitis can progress to permanent deficits; new sudden focal weakness should be evaluated urgently as a possible vasculitis flare.",
  },
  {
    id: "cardiac-egpa",
    name: "Cardiac Involvement in EGPA",
    subtitle: "Leading cause of EGPA-related death — present in up to 50% of cases",
    color: "#F43F5E",
    symptoms: [
      "Dyspnea at rest or with minimal exertion from eosinophilic cardiomyopathy",
      "Chest pain or pressure — can mimic acute coronary syndrome",
      "Palpitations or documented arrhythmia: atrial fibrillation, VT",
      "Syncope or presyncope from arrhythmia or low cardiac output",
      "Peripheral edema from heart failure",
      "Pericardial effusion: pleuritic chest pain, friction rub",
      "Troponin elevation without obstructive coronary disease (eosinophilic myocarditis)",
    ],
    doctorTips: [
      "Ask about cardiac screening at diagnosis: 'Should I have an echocardiogram and cardiac MRI at baseline to assess myocardial involvement before symptoms develop?'",
      "Ask about troponin monitoring: 'Should serial troponin levels be checked during active eosinophilic disease, even if I have no cardiac symptoms?'",
      "Ask about mepolizumab: 'Can Nucala reduce eosinophilic burden enough to protect my heart, and is it appropriate given my cardiac status?'",
      "Ask about cardiology co-management: 'Should a cardiologist experienced with inflammatory cardiomyopathy be part of my multidisciplinary team?'",
      "Ask about anticoagulation: 'Given eosinophilic disease and any intracardiac thrombus risk, should I be anticoagulated?'",
    ],
    disclaimer:
      "For educational purposes only — not a substitute for professional medical advice. Eosinophilic myocarditis can present without symptoms and is the leading cause of EGPA mortality. Cardiac evaluation at diagnosis and during flares is essential.",
  },
];

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
          {/* Community note — pachymeningitis and arachnoid cyst */}
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
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#D97706",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Community Connection
              </div>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: "13px", lineHeight: 1.7 }}>
                {condition.communityNote}
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Key Symptoms */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#475569",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Key Symptoms
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {condition.symptoms.map((s, i) => (
                  <li key={i} style={{ color: "#94A3B8", fontSize: "13px", lineHeight: 1.6 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Guidance */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#475569",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                How to Talk to Your Doctor
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
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

export default function DiseaseConnections() {
  return (
    <>
      {CONNECTIONS.map((condition) => (
        <ConnectionCard key={condition.id} condition={condition} />
      ))}
    </>
  );
}
