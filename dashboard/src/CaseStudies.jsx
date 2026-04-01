import { useState } from "react";

const CASE_STUDIES = [
  {
    id: "anca-gn",
    connectionName: "ANCA-Associated Glomerulonephritis",
    color: "#EF4444",
    synthesis:
      "Silent progression is the rule, not the exception — routine labs catch what symptoms miss. Across all three cases below, patients felt well while kidney function was quietly declining. The consistent lesson: urinalysis and creatinine at every visit are not optional, they are the early-warning system.",
    cases: [
      {
        label: "Case 1 — Sarah, 45",
        scenario:
          "Sarah had been on rituximab for GPA for 18 months and felt completely well. A routine urinalysis at her rheumatology visit showed new microscopic hematuria and protein — no symptoms whatsoever. Her creatinine had risen from 0.9 to 1.4 mg/dL over three months, a change her team had initially attributed to dehydration.",
        outcome:
          "A kidney biopsy confirmed active crescentic GN with minimal scarring — caught early enough for avacopan plus rituximab to achieve full renal recovery.",
      },
      {
        label: "Case 2 — Michael, 58",
        scenario:
          "Michael noticed his urine looked slightly foamy in the shower but assumed it was nothing. He mentioned it offhandedly at a GP appointment three weeks later. A urine dipstick showed 3+ protein; his creatinine had nearly doubled since his last rheumatology check six months earlier.",
        outcome:
          "A home observation — foamy urine — triggered the referral that preserved his remaining kidney function before it deteriorated further.",
      },
      {
        label: "Case 3 — Lin, 62",
        scenario:
          "Lin was in remission from MPA and her ANCA was undetectable. Her rheumatologist stretched follow-up to every six months. At the eight-month mark, her GFR had drifted from 72 to 51 mL/min — a 29% drop with no symptoms and no ANCA rise. Biopsy showed chronic fibrosis mixed with active inflammation.",
        outcome:
          "Treatment was escalated, halting further decline, but the window for full recovery had narrowed due to the six-month monitoring gap.",
      },
    ],
    actionSteps: [
      "Ask your doctor to check both urinalysis AND creatinine/GFR at every visit — even when you feel completely well.",
      "Buy OTC urine dipstick test strips (e.g. Combur) and test at home monthly. Any protein or blood reading = call your doctor that day.",
      "Write down your personal baseline: your last creatinine, GFR, and ANCA titer in confirmed remission. Keep it in your phone.",
      "If you notice foamy or frothy urine, swollen ankles, or puffiness around the eyes — call your rheumatologist the same day, don't wait for the next appointment.",
      "Ask specifically: 'Is avacopan appropriate for my degree of kidney involvement?'",
      "If your monitoring has been stretched beyond three months, ask to return to quarterly labs until your team is confident in your trajectory.",
    ],
  },
  {
    id: "pulmonary-fibrosis",
    connectionName: "Pulmonary Fibrosis in MPA",
    color: "#06B6D4",
    synthesis:
      "Fibrosis advances during apparent remission — the intervention window only opens if you are actively looking for it. In each case below, normal inflammatory markers gave false reassurance while lung scarring progressed silently. Baseline pulmonary function tests and annual monitoring are the difference between catching it early and discovering it late.",
    cases: [
      {
        label: "Case 1 — Marcus, 54",
        scenario:
          "Marcus had been in clinical remission from MPA for two years when he noticed increasing breathlessness climbing stairs. His ANCA was negative and his CRP was normal. His rheumatologist was initially reassuring. A pulmonologist he saw independently ordered PFTs and a high-resolution CT chest that revealed early interstitial lung disease with honeycombing.",
        outcome:
          "Referred to an ILD specialist, Marcus started nintedanib and stabilised. His rheumatologist later acknowledged no baseline CT had ever been taken.",
      },
      {
        label: "Case 2 — Yuki, 67",
        scenario:
          "Yuki had missed her last two annual PFTs because her vasculitis felt controlled and she was busy. When she eventually had them, her DLCO had dropped 22% from her last recorded baseline. A CT chest showed bilateral ground-glass opacities and traction bronchiectasis progressing from a previous scan.",
        outcome:
          "The two-year monitoring gap meant the fibrosis was now moderate rather than mild. She joined a nintedanib trial and halted further decline, but the lost lung function was not recovered.",
      },
      {
        label: "Case 3 — Graham, 71",
        scenario:
          "Graham's MPA was well controlled on rituximab maintenance. He had no breathing complaints. At a routine visit his GP heard velcro crackles at both lung bases and referred him to a chest physician, who found fibrosis on CT that had not been present three years earlier during his last imaging.",
        outcome:
          "Early referral to an ILD-specialist pulmonologist meant treatment started before significant functional impairment. Graham now has joint rheumatology-pulmonology follow-up every six months.",
      },
    ],
    actionSteps: [
      "Ask for pulmonary function tests (spirometry + DLCO) NOW as a baseline, even if you have no breathing symptoms.",
      "Ask your rheumatologist to refer you to a pulmonologist with ILD experience for co-management — not just a general chest physician.",
      "Ask: 'Should I have annual PFTs and CT chest, even during remission, given my MPO-ANCA status?'",
      "Track any changes in exercise tolerance yourself — note if stairs or hills are getting harder and report it at your next visit.",
      "Ask about anti-fibrotic agents (nintedanib, pirfenidone) if fibrosis is found: 'Is there a trial I should be considered for?'",
      "Understand that normal ANCA and normal CRP do NOT rule out active pulmonary fibrosis progression.",
    ],
  },
  {
    id: "pachymeningitis",
    connectionName: "Hypertrophic Pachymeningitis",
    color: "#8B5CF6",
    synthesis:
      "GPA context is the key that unlocks the right diagnosis — specialists who don't know your history miss it. All three patients below saw multiple clinicians before the connection to GPA was made. The consistent pattern: leading every specialist visit with your ANCA diagnosis is what changes the differential diagnosis.",
    cases: [
      {
        label: "Case 1 — Diane, 47",
        scenario:
          "For nearly a year, Diane had daily severe headaches that three neurologists attributed to tension-type or migraine. She had PR3-ANCA-positive GPA but had not mentioned it at neurology appointments because no one had asked. A fourth neurologist, told upfront about her GPA diagnosis, ordered an MRI brain with gadolinium that showed striking dural enhancement.",
        outcome:
          "Pachymeningitis was confirmed, rituximab was added to her regimen, and her headaches resolved over six weeks.",
      },
      {
        label: "Case 2 — Robert, 52",
        scenario:
          "Robert developed slowly progressive double vision and was referred to neurology, where MS was considered and an MRI without contrast was ordered — which appeared normal. Six months later, severe headaches prompted a repeat MRI with gadolinium contrast revealing extensive pachymeningitis. He had had GPA for four years.",
        outcome:
          "The contrast made the difference. He was started on rituximab and high-dose steroids; cranial nerve function improved over three months.",
      },
      {
        label: "Case 3 — Anna, 39",
        scenario:
          "Anna was undergoing routine surveillance MRI for her GPA when radiologists incidentally noted subtle dural thickening. She had no headaches. Her rheumatologist was alerted, a dedicated MRI with gadolinium confirmed early pachymeningitis, and treatment was pre-empted before symptoms developed.",
        outcome:
          "Early identification through routine surveillance allowed treatment to begin before cranial nerve involvement, preventing what could have been disabling complications.",
      },
    ],
    actionSteps: [
      "At every specialist visit — neurology, ophthalmology, ENT, urgent care — lead with: 'I have PR3-ANCA-positive GPA.' This directly changes the differential diagnosis.",
      "If you develop persistent headaches or any cranial nerve symptoms (double vision, facial numbness, hearing change), ask specifically for an MRI brain WITH gadolinium contrast — not a standard MRI.",
      "Ask your rheumatologist: 'Given my GPA, should I have a baseline brain MRI with contrast even without symptoms?'",
      "Ask for a neurologist to be actively involved in your care, not just consulted once.",
      "Keep a headache diary — date, severity 1–10, character, and any associated symptoms — and bring it to appointments.",
      "Ask: 'Is rituximab the right treatment for dural disease, and when should we expect to see a response?'",
    ],
  },
  {
    id: "arachnoid-cyst",
    connectionName: "Arachnoid Cysts & GPA",
    color: "#A78BFA",
    synthesis:
      "Documentation turns an 'incidental' finding into a monitored one — advocacy determines what gets tracked. Each patient below was initially told their cyst was unrelated and required no follow-up. The consistent lesson: insisting that a finding be formally recorded in your vasculitis notes, and asking both specialists to communicate, is what creates a safety net.",
    cases: [
      {
        label: "Case 1 — Tom, 42",
        scenario:
          "Tom's brain MRI for pachymeningitis workup showed an arachnoid cyst that his neurologist called incidental. Having connected with other GPA patients online, Tom asked whether the two findings could be related and requested the cyst be documented in his rheumatology record. Neither team had been sharing notes.",
        outcome:
          "Serial MRI was agreed upon. At 12 months the cyst was stable. The cross-documentation meant that any future change would be visible to both teams simultaneously.",
      },
      {
        label: "Case 2 — Priya, 36",
        scenario:
          "Priya's arachnoid cyst had been found three years before her GPA diagnosis and was never followed up. After her GPA diagnosis, she developed positional headaches and brought up the old cyst finding. Her new neurologist had not been told about it and had no prior imaging for comparison.",
        outcome:
          "Reconstructing the baseline took several months and a second MRI. She now keeps all imaging reports in a personal folder and shares them proactively at every new specialist appointment.",
      },
      {
        label: "Case 3 — James, 55",
        scenario:
          "James was scanned for suspected pachymeningitis; a cyst was found but no dural thickening. His rheumatologist and neurologist had a joint review and concluded the cyst was likely pre-existing and unrelated, but agreed to reassess if new neurological symptoms developed. James had this decision documented in writing.",
        outcome:
          "Having a written joint decision meant James could present a clear clinical history to any future treating clinician rather than re-explaining the situation from scratch each time.",
      },
    ],
    actionSteps: [
      "Ask your rheumatologist to formally document any incidental cyst finding in your vasculitis records — so both teams are working from the same information.",
      "Ask: 'Should my neurologist and rheumatologist review this finding together, or at minimum share notes?'",
      "Request a neurosurgery consultation to establish a baseline assessment and decide whether surveillance imaging is warranted.",
      "Keep your own folder of all imaging reports and bring it to every new specialist appointment — don't assume records have been transferred.",
      "Consider joining the Vasculitis Foundation patient forum to connect with others who have reported the same co-occurrence.",
      "Ask: 'If my symptoms change in any way, which team should I call first — and what specifically should prompt an urgent contact?'",
    ],
  },
  {
    id: "orbital-gpa",
    connectionName: "Orbital GPA / Pseudotumor",
    color: "#F97316",
    synthesis:
      "Delay is the enemy — weeks matter when the optic nerve is at risk. In each case below, the time between first symptom and correct diagnosis determined whether vision was preserved. The consistent lesson: any proptosis, eye pain, or double vision in a patient with GPA is an optic nerve emergency until proven otherwise.",
    cases: [
      {
        label: "Case 1 — Priya, 51",
        scenario:
          "Priya noticed her right eye being pushed forward over six weeks. She saw three general ophthalmologists who attributed it to thyroid eye disease. By the time her ANCA was tested and orbital GPA was diagnosed, she had permanent partial vision loss from optic nerve compression.",
        outcome:
          "After diagnosis, she joined the care of an oculoplastics specialist and achieved remission in the remaining disease — but the delayed diagnosis cost her irreplaceable vision.",
      },
      {
        label: "Case 2 — David, 44",
        scenario:
          "David had known GPA and developed aching pain behind his left eye with mild proptosis. He called his rheumatologist the same day. An urgent orbital MRI showed a retrobulbar mass compressing the optic nerve. Rituximab was started within 72 hours.",
        outcome:
          "Full visual recovery. The one-day turnaround from symptom to imaging meant the optic nerve was decompressed before permanent damage occurred.",
      },
      {
        label: "Case 3 — Helen, 38",
        scenario:
          "Helen had been in GPA remission for three years and had regular orbital MRI as part of her surveillance plan. An asymptomatic increase in soft-tissue density behind the right eye was detected — no proptosis, no pain, no visual change. Her team escalated rituximab pre-emptively.",
        outcome:
          "Surveillance imaging caught the recurrence before it became symptomatic. Helen never experienced vision loss or proptosis because the regrowth was treated before it reached the optic nerve.",
      },
    ],
    actionSteps: [
      "Any proptosis (eye bulging forward), pain behind the eye, or new double vision = call your rheumatologist the same day — treat it as urgent.",
      "Ask for a referral to an oculoplastics surgeon or orbital disease specialist, not just a general ophthalmologist.",
      "Ask: 'Should I have regular orbital MRI surveillance given my GPA history, even without symptoms?'",
      "Tell every eye doctor about your GPA at every visit — they may not know to screen for orbital involvement without prompting.",
      "Ask before treatment starts: 'Should we do an orbital MRI with contrast first to map the extent of disease?'",
      "Ask about local recurrence: 'Orbital GPA is known to recur — what is our monitoring plan after remission is achieved?'",
    ],
  },
  {
    id: "subglottic-stenosis",
    connectionName: "Subglottic Stenosis",
    color: "#14B8A6",
    synthesis:
      "Stenosis progresses independently of systemic disease — normal bloodwork does not mean a safe airway. All three patients below had normal ANCA titers or CRP when their airway disease worsened. The consistent lesson: if you have GPA and breathing difficulties that don't respond to standard treatment, the subglottis must be examined directly.",
    cases: [
      {
        label: "Case 1 — Keisha, 35",
        scenario:
          "For two years Keisha was treated for difficult asthma with escalating inhalers. Her stridor on exertion was attributed to vocal cord dysfunction. A pulmonologist finally ordered flow-volume loops, which showed a fixed airway obstruction pattern inconsistent with asthma. Laryngoscopy confirmed 70% subglottic stenosis — her ANCA had been negative throughout.",
        outcome:
          "Endoscopic balloon dilation brought near-immediate relief. She avoided a systemic treatment escalation that had been planned based on the asthma misdiagnosis.",
      },
      {
        label: "Case 2 — Ben, 41",
        scenario:
          "Ben had GPA in remission with normal ANCA and CRP. He developed a slowly worsening sensation of throat tightness and a changed voice. Because his markers were normal, his rheumatologist initially attributed it to post-nasal drip. Three months later, an ENT found significant stenosis on direct laryngoscopy.",
        outcome:
          "Intralesional steroid injection and dilation stabilised his airway. The delay reinforced that ENT examination, not bloodwork, is the gold standard for this manifestation.",
      },
      {
        label: "Case 3 — Claire, 29",
        scenario:
          "Claire had established subglottic stenosis from GPA that had been stable for 18 months. She developed new exertional breathlessness and assumed her stenosis had worsened during a vasculitis flare. Laryngoscopy showed her stenosis was unchanged — the breathlessness was from a new pulmonary GPA lesion found on CT.",
        outcome:
          "The case highlighted that airway and systemic disease can change independently, and that each symptom needs its own targeted investigation rather than a single assumption.",
      },
    ],
    actionSteps: [
      "If you have GPA and breathing difficulties that don't improve with standard asthma therapy, ask specifically: 'Could this be subglottic stenosis?'",
      "Ask for a referral to an ENT surgeon who has experience managing GPA-related airway disease — not all ENT surgeons are familiar with this.",
      "Ask for flow-volume loops (not just spirometry) — the fixed obstruction pattern is highly specific for subglottic stenosis.",
      "Ask whether endoscopic balloon dilation or intralesional steroid injection could manage your stenosis locally, avoiding systemic immunosuppression escalation.",
      "Create an emergency airway plan with your doctor and carry a written copy — noting your GPA diagnosis, airway history, and emergency contact — in your wallet.",
      "Understand that your ANCA and CRP can be completely normal while your subglottis is actively narrowing.",
    ],
  },
  {
    id: "neuropathy",
    connectionName: "Peripheral Neuropathy in AAV",
    color: "#EC4899",
    synthesis:
      "Speed of response determines how much nerve function is recoverable — hours matter more than days. The three cases below span the full range of outcomes: permanent deficit from a week's delay, near-full recovery from same-day action, and subclinical damage caught by EMG before functional loss occurred. The consistent lesson: asymmetric limb weakness or sudden numbness in a known vasculitis patient is an emergency.",
    cases: [
      {
        label: "Case 1 — James, 47",
        scenario:
          "James woke with right-sided footdrop and waited a week before calling his doctor, assuming he had slept awkwardly. Left-hand weakness followed four days later. A neurologist recognised mononeuritis multiplex and his MPO-ANCA came back strongly positive. EMG confirmed multi-focal axonal neuropathy.",
        outcome:
          "High-dose cyclophosphamide was started, but the week's delay meant permanent right footdrop that has not recovered despite two years of treatment.",
      },
      {
        label: "Case 2 — Nina, 33",
        scenario:
          "Nina had EGPA and knew to watch for neuropathy. When she woke with sudden right wrist weakness, she called her rheumatologist the same morning. She was seen that day, treatment was escalated immediately, and nerve conduction studies confirmed early mononeuritis multiplex with axonal involvement.",
        outcome:
          "Near-full recovery of wrist function within four months. Early treatment meant axonal loss was limited before remission was achieved.",
      },
      {
        label: "Case 3 — Paul, 61",
        scenario:
          "Paul complained vaguely of 'tired legs' at a routine rheumatology visit. There was no obvious weakness on examination. His rheumatologist ordered an EMG, which showed subclinical axonal neuropathy in two limbs — nerve damage that had not yet caused functional loss.",
        outcome:
          "Treatment was adjusted pre-emptively. Paul never experienced functional deficit because the neuropathy was treated at the subclinical stage.",
      },
    ],
    actionSteps: [
      "Any new sudden weakness or numbness in a single limb = call your doctor TODAY. Do not wait to see if it improves.",
      "Know the pattern: vasculitic neuropathy is typically ASYMMETRIC — weakness or numbness in one arm AND one leg (or different sides) is a red flag.",
      "Ask your rheumatologist for a referral to a neurologist who has seen vasculitic neuropathy specifically.",
      "Ask for an EMG/nerve conduction study to document nerve function as a baseline — it can detect subclinical damage before you feel it.",
      "Ask about neuropathic pain management: 'Are there medications that can reduce the burning or electric-shock pain while the vasculitis responds to treatment?'",
      "Keep a simple log of any tingling, numbness, or weakness episodes — location, duration, and severity — and bring it to every appointment.",
    ],
  },
  {
    id: "cardiac-egpa",
    connectionName: "Cardiac Involvement in EGPA",
    color: "#F43F5E",
    synthesis:
      "Cardiac EGPA is often entirely silent until imaging is done — symptoms are a late sign, not an early warning. Each patient below had significant cardiac pathology found only because someone ordered imaging, not because they felt unwell. The consistent lesson: an echocardiogram and cardiac MRI at diagnosis are not optional for EGPA — they are the only way to find disease before it is advanced.",
    cases: [
      {
        label: "Case 1 — Claire, 44",
        scenario:
          "Claire had EGPA with well-controlled asthma and eosinophilia on mepolizumab. At her six-month review she specifically asked for the echocardiogram her cardiologist had been deferring. It showed biventricular dysfunction with an ejection fraction of 35%. She had zero cardiac symptoms.",
        outcome:
          "Cardiac MRI confirmed eosinophilic myocarditis. Management was changed immediately, including cardiology co-management and anticoagulation. She has since recovered to EF 55%.",
      },
      {
        label: "Case 2 — Henri, 57",
        scenario:
          "Henri's EGPA flare included a troponin rise that his team attributed to demand ischaemia during an acute illness. A cardiologist reviewed the case three weeks later and ordered cardiac MRI, which showed patchy myocardial fibrosis consistent with prior eosinophilic myocarditis — the troponin had been the only clue.",
        outcome:
          "The delayed recognition meant the acute inflammatory phase had passed, but the fibrosis was permanent. Henri now has regular cardiac MRI surveillance to ensure no further progression.",
      },
      {
        label: "Case 3 — Fatima, 38",
        scenario:
          "Fatima was newly diagnosed with EGPA. Her rheumatologist arranged a cardiac MRI as part of the standard baseline workup. It showed early subendocardial enhancement — a sign of active eosinophilic inflammation — with no symptoms and a normal echocardiogram.",
        outcome:
          "Aggressive early treatment targeting the cardiac involvement prevented progression to cardiomyopathy. The cardiac MRI found what the echo missed.",
      },
    ],
    actionSteps: [
      "Ask for an echocardiogram AND a cardiac MRI at or immediately after your EGPA diagnosis — do not wait for cardiac symptoms.",
      "Ask for troponin levels to be checked at every visit during active eosinophilic disease, even if you feel completely well.",
      "Ask your rheumatologist for a cardiology referral specifically mentioning 'eosinophilic cardiomyopathy' — this tells the cardiologist what to look for.",
      "Ask about mepolizumab: 'Can Nucala reduce my eosinophil burden enough to protect my heart alongside standard treatment?'",
      "Know the warning signs that require urgent evaluation: unexplained breathlessness at rest, palpitations, swollen ankles, or chest pain.",
      "Ask: 'Should I have a follow-up cardiac MRI at 6 months to confirm the inflammation has resolved?'",
    ],
  },
  {
    id: "refractory-aav",
    connectionName: "Treatment-Refractory AAV",
    color: "#6366F1",
    synthesis:
      "Community hospitals often don't know what trials exist — a single specialist referral can open options the local team had never considered. All three patients below were told there were no more options, or had been cycling through the same treatments repeatedly, before access to a major vasculitis centre changed their trajectory. The consistent lesson: 'refractory' is a clinical definition that should trigger an automatic referral, not a conversation-ender.",
    cases: [
      {
        label: "Case 1 — Elena, 49",
        scenario:
          "After three courses of rituximab and one of cyclophosphamide over five years, Elena continued to relapse with worsening renal function and recurrent orbital disease. Her community rheumatologist told her there were no other options. At the insistence of her GP, she was referred to a VCRC-affiliated centre where she was identified as a candidate for a CAR-T trial.",
        outcome:
          "She enrolled in a Phase 1/2 CAR-T trial. At 12 months she remained in drug-free remission for the first time in six years.",
      },
      {
        label: "Case 2 — Raj, 44",
        scenario:
          "Raj had relapsed four times on rituximab maintenance. Each relapse was managed by retreating with rituximab without escalation or a formal refractory assessment. A second opinion at Johns Hopkins identified that he had not been offered azathioprine bridging between courses, and that his dosing interval had been too long.",
        outcome:
          "An adjusted maintenance protocol including shorter rituximab intervals achieved sustained remission. The second opinion identified a simple protocol adjustment that his local team had not considered.",
      },
      {
        label: "Case 3 — Susan, 52",
        scenario:
          "Susan registered with the VCRC Patient Contact Registry after her second relapse, not knowing what it was but hoping it might help. Eight months later she was contacted about a trial she qualified for at a centre 90 minutes from her home — she had not known the trial existed, and her rheumatologist had not mentioned it.",
        outcome:
          "She enrolled, received a novel B-cell depleting agent, and achieved remission at 26 weeks. The registry notification was the only reason she found the trial.",
      },
    ],
    actionSteps: [
      "Ask your rheumatologist directly: 'Does my pattern of relapse meet the definition of refractory AAV, and if so, what should happen next?'",
      "Ask for a referral to a VCRC-affiliated or major vasculitis centre for a second opinion — even one consultation by video can open doors.",
      "Register with the VCRC Patient Contact Registry (vcrc.org) today — it notifies you of trials you may qualify for, even if your local team is not aware of them.",
      "Ask specifically about CAR-T cell therapy eligibility: 'Am I a candidate, and which is the nearest enrolling site?'",
      "Bring a written timeline to every appointment: dates of each flare, treatments used, doses, and how well you responded.",
      "Do not accept 'there are no more options' without a second opinion from a specialist centre — the refractory AAV trial landscape in 2025–2026 is more active than at any prior point.",
    ],
  },
  {
    id: "dah",
    connectionName: "Diffuse Alveolar Hemorrhage",
    color: "#DC2626",
    synthesis:
      "DAH can present without visible blood — a falling haemoglobin and new breathlessness is enough to go to hospital. All three patients below demonstrated that the absence of haemoptysis does not rule out severe lung bleeding. The consistent lesson: in a known vasculitis patient, unexplained breathlessness or a dropping haemoglobin is an emergency, and telling the ER team about your diagnosis immediately changes the workup.",
    cases: [
      {
        label: "Case 1 — David, 55",
        scenario:
          "David had MPA and developed increasing fatigue and breathlessness over 36 hours with no haemoptysis. He went to his local ER for what he assumed was anaemia. The team initially attributed it to iron deficiency. His wife mentioned his MPA diagnosis; pulmonology was called immediately and BAL confirmed diffuse alveolar haemorrhage.",
        outcome:
          "High-dose methylprednisolone and rituximab were started within hours. The wife's mention of his vasculitis diagnosis was the single event that changed the ER workup.",
      },
      {
        label: "Case 2 — Maria, 61",
        scenario:
          "Maria carried a laminated emergency card listing her GPA diagnosis, ANCA subtype, current medications, and her specialist's direct number. When she arrived at the ER with breathlessness, she handed it to the triage nurse. Vasculitis was on the differential before the first doctor saw her.",
        outcome:
          "Imaging was expedited, DAH was diagnosed and treated within four hours of arrival. Her pre-prepared card was cited by the attending as directly reducing time to diagnosis.",
      },
      {
        label: "Case 3 — George, 48",
        scenario:
          "George's husband noticed he looked unusually pale at breakfast before George himself noticed any breathlessness. He took him to the ER; George's haemoglobin had dropped from 13 to 8 g/dL in less than 48 hours. He had no cough and no blood visible. Chest CT showed bilateral consolidation consistent with alveolar haemorrhage.",
        outcome:
          "The pallor — noticed by a family member, not the patient — was the first sign. George now asks family members to watch for pallor, unusual fatigue, or lips losing colour as early warning signs.",
      },
    ],
    actionSteps: [
      "Create an emergency medical summary card (diagnosis, ANCA subtype, current medications, specialist contact) and carry it in your wallet — a physical card works when you are too unwell to explain.",
      "Give a copy of your emergency summary to family members and tell them to hand it to ER staff immediately on arrival.",
      "Know that you can have severe lung bleeding WITHOUT coughing up blood. New breathlessness, rapid fatigue, or pallor in a vasculitis patient = go to hospital, do not wait.",
      "Ask your rheumatologist: 'What symptoms should go straight to the ER versus calling your office first?'",
      "Ask your rheumatologist to add a DAH risk assessment to your care plan: 'Are there monitoring findings that would suggest I am at higher risk of a pulmonary flare?'",
      "Store your specialist's direct line in your phone and make sure your family has it too.",
    ],
  },
  {
    id: "ent-sinus",
    connectionName: "Upper Airway & Sinus Disease in GPA",
    color: "#0EA5E9",
    synthesis:
      "ENT disease drives quality of life more than bloodwork captures — and coordinated specialist care changes the daily experience of living with GPA. All three patients below suffered years of unnecessary procedures or symptoms because their ENT and rheumatology care were not joined up. The consistent lesson: finding an ENT surgeon who knows GPA, and making sure they speak to your rheumatologist, is the single most impactful step for upper airway disease.",
    cases: [
      {
        label: "Case 1 — Rachel, 33",
        scenario:
          "Over seven years Rachel had eight sinus surgeries for what surgeons called unusually aggressive chronic sinusitis. Between procedures she developed a saddle-nose deformity and septal perforation. ANCA was finally tested after a new ENT took a thorough history and came back strongly PR3-positive. GPA was confirmed.",
        outcome:
          "After diagnosis she found an ENT experienced in GPA and established a joint care plan with her rheumatologist. Daily saline rinses and TMP-SMX maintenance reduced her relapse frequency dramatically.",
      },
      {
        label: "Case 2 — Owen, 58",
        scenario:
          "Owen had known GPA with sinusitis managed independently by his rheumatologist and ENT, who had never communicated. He kept relapsing, with each specialist adjusting treatment without knowing what the other was doing. His GP eventually convened a joint letter, prompting a shared care protocol.",
        outcome:
          "Coordinated management eliminated the therapeutic confusion. His relapse frequency halved within a year once both teams were operating from the same plan.",
      },
      {
        label: "Case 3 — Yemi, 45",
        scenario:
          "Yemi had severe nasal crusting and epistaxis that significantly affected her quality of life but were never flagged as a problem in her rheumatology notes — she assumed it was just something to live with. When she mentioned it to a new rheumatologist, a referral to a GPA-experienced ENT and the introduction of daily NeilMed saline rinses transformed her daily comfort within weeks.",
        outcome:
          "A simple intervention — daily irrigation — provided more quality-of-life benefit than her systemic treatment had in years. She had not mentioned it because no one had asked.",
      },
    ],
    actionSteps: [
      "Ask your rheumatologist for a referral to an ENT surgeon who specifically has experience with GPA — ask them by name if you need to, and check whether your centre has an ENT-vasculitis pathway.",
      "Start daily saline nasal irrigation (e.g. NeilMed Sinus Rinse) — OTC, inexpensive, and evidence-based for reducing crusting and infection risk.",
      "Ask about low-dose trimethoprim-sulfamethoxazole (TMP-SMX): 'Could this reduce my relapse rate or nasal Staphylococcal colonisation?'",
      "Request baseline audiometry and ask for it to be repeated annually — conductive hearing loss from GPA is common, progressive, and often missed.",
      "Tell your rheumatologist about all ENT symptoms at every visit — crusting, epistaxis, voice change, hearing loss — even if you think they are minor.",
      "Ask: 'Are my ENT disease and my systemic disease being managed as a coordinated plan, or separately?'",
    ],
  },
  {
    id: "biomarkers",
    connectionName: "Biomarker Monitoring & Disease Activity",
    color: "#7C3AED",
    synthesis:
      "Patients who track their own data catch patterns their doctors are too time-pressured to see. All three cases below show that the patient — not the clinical team — was first to notice the trend that predicted a flare. The consistent lesson: building a simple personal lab log and bringing a printed trend chart to every appointment puts you in a position to act before a full relapse rather than after.",
    cases: [
      {
        label: "Case 1 — Michael, 50",
        scenario:
          "Michael's ANCA titer doubled over two consecutive visits. His rheumatologist noted it but said 'let's watch it.' Six weeks later Michael had a full renal flare requiring hospitalisation. In hindsight, the ANCA trend had been the signal; it was not acted on quickly enough.",
        outcome:
          "After recovery, Michael established a written protocol with his rheumatologist: a specific ANCA level at which treatment would be escalated without waiting for symptoms. He has not been hospitalised since.",
      },
      {
        label: "Case 2 — Sophie, 39",
        scenario:
          "Sophie bought OTC urine dipstick test strips and tested monthly between appointments. Three weeks before her scheduled rheumatology review she got a 2+ protein reading on two successive days. She called her rheumatologist, who brought the appointment forward. A fresh-catch urine confirmed active nephritis.",
        outcome:
          "Early treatment meant the flare was treated as outpatient rather than requiring admission. The dipstick cost less than £10 and gave her independent monitoring capability.",
      },
      {
        label: "Case 3 — Alan, 63",
        scenario:
          "Alan printed a trend chart of his last eight CRP, creatinine, and ANCA results and brought it to his appointment. His rheumatologist had not noticed a slow upward CRP trend across three months — normal at each single visit, but clearly rising across the series. Rituximab was moved forward by six weeks.",
        outcome:
          "The flare was pre-empted. Alan's chart spotted a pattern that visit-by-visit assessment had missed entirely.",
      },
    ],
    actionSteps: [
      "Start a personal lab log today — a phone note, spreadsheet, or notebook. Record the date, ANCA titer, CRP, creatinine, and GFR after every blood test.",
      "Buy OTC urine dipstick strips and test at home once a month. Any protein or blood reading = call your doctor that day.",
      "Bring a printed or phone-screen trend chart of your last 6–8 results to every appointment — don't just tell your doctor 'my markers are normal,' show them the direction of travel.",
      "Ask your doctor to set explicit written thresholds: 'At what ANCA level, creatinine value, or symptom combination would you escalate treatment without waiting for a full flare?'",
      "Ask about MMP-3 and CXCL13 testing: 'Are these available at your lab, and would they give us earlier warning than ANCA alone?'",
      "Ask about enrolling in an observational biomarker study — your data contributes directly to improving early-warning tools for future patients.",
    ],
  },
];

function CaseStudyCard({ entry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(148,163,184,0.12)",
        borderLeft: `3px solid ${entry.color}`,
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
      {/* Header — always visible */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: "inline-block",
              background: `${entry.color}18`,
              color: entry.color,
              border: `1px solid ${entry.color}40`,
              borderRadius: "10px",
              padding: "1px 9px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {entry.connectionName}
          </span>
          <p style={{ margin: 0, fontSize: "13px", color: "#CBD5E1", lineHeight: 1.7 }}>
            {entry.synthesis}
          </p>
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
          {/* Case vignettes */}
          <div
            style={{
              fontSize: "11px", fontWeight: 700, color: "#475569",
              letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px",
            }}
          >
            Patient Cases
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {entry.cases.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15,23,42,0.5)",
                  border: "1px solid rgba(148,163,184,0.1)",
                  borderRadius: "6px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", marginBottom: "6px" }}>
                  {c.label}
                </div>
                <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#94A3B8", lineHeight: 1.6 }}>
                  {c.scenario}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#64748B", lineHeight: 1.5, fontStyle: "italic" }}>
                  {c.outcome}
                </p>
              </div>
            ))}
          </div>

          {/* Action steps */}
          <div
            style={{
              background: "rgba(96,165,250,0.06)",
              border: "1px solid rgba(96,165,250,0.15)",
              borderRadius: "8px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: "11px", fontWeight: 700, color: "#60A5FA",
                letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px",
              }}
            >
              What You Can Do Now
            </div>
            <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {entry.actionSteps.map((step, i) => (
                <li key={i} style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.6 }}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CaseStudies() {
  return (
    <>
      {CASE_STUDIES.map((entry) => (
        <CaseStudyCard key={entry.id} entry={entry} />
      ))}
    </>
  );
}
