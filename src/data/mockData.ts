import { JobItem, StudyMaterialItem, NotificationItem } from '../types';

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'ssc-cgl-2026',
    title: 'SSC Combined Graduate Level (CGL) 2026',
    titleHi: 'एसएससी सीजीएल भर्ती 2026 (17,727 पद)',
    department: 'Staff Selection Commission (SSC)',
    departmentHi: 'कर्मचारी चयन आयोग (भारत सरकार)',
    advtNumber: 'SSC-HQ/CGL/2026/01',
    category: 'ssc',
    state: 'All India',
    qualification: 'graduate',
    totalVacancies: 17727,
    salaryPayScale: 'Pay Level 4 to 8 (₹25,500 - ₹1,51,100)',
    ageLimit: '18 to 30 Years (Age relaxation as per central rules)',
    applicationFee: {
      generalOBC: '₹100/-',
      scST: '₹0/- (Exempted)',
      female: '₹0/- (Exempted)',
      phDivyang: '₹0/-',
      paymentMode: 'Online via UPI, Net Banking, Debit/Credit Card'
    },
    dates: {
      applicationStart: '15 Sep 2026',
      applicationEnd: '24 Oct 2026',
      feeLastDate: '25 Oct 2026',
      examDate: '10 - 24 Dec 2026 (Tier 1)',
      admitCardDate: '01 Dec 2026'
    },
    vacancies: [
      { postName: 'Assistant Section Officer (CSS)', totalPosts: 1240, eligibility: 'Bachelor Degree in any stream' },
      { postName: 'Income Tax Inspector (CBDT)', totalPosts: 840, eligibility: 'Bachelor Degree in any stream' },
      { postName: 'Central Excise Inspector (CBIC)', totalPosts: 2450, eligibility: 'Bachelor Degree in any stream' },
      { postName: 'Sub Inspector (CBI)', totalPosts: 320, eligibility: 'Bachelor Degree with Physical standards' },
      { postName: 'Junior Statistical Officer (JSO)', totalPosts: 450, eligibility: 'Degree with 60% Maths in 12th or Statistics' },
      { postName: 'Auditor & Accountant (CAG)', totalPosts: 4620, eligibility: 'Bachelor Degree in any stream' }
    ],
    officialWebsite: 'https://ssc.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'job',
    selectionProcess: [
      'Tier-1 Computer Based Examination (Objective)',
      'Tier-2 Computer Based Examination & Module Tests',
      'Computer Knowledge Test & Data Entry Speed Test',
      'Document Verification & Medical Fitness'
    ],
    syllabusOverview: [
      'General Intelligence & Reasoning (50 Marks)',
      'General Awareness & Current Affairs (50 Marks)',
      'Quantitative Aptitude & Mathematics (50 Marks)',
      'English Comprehension & Grammar (50 Marks)'
    ],
    postedOn: '16 Sep 2026',
    isUrgent: true
  },
  {
    id: 'rrb-ntpc-2026',
    title: 'RRB NTPC Graduate & Under Graduate Posts 2026',
    titleHi: 'रेलवे आरआरबी एनटीपीसी भर्ती 2026 (11,558 पद)',
    department: 'Railway Recruitment Boards (Indian Railways)',
    departmentHi: 'रेलवे भर्ती बोर्ड (भारतीय रेल)',
    advtNumber: 'CEN 05/2026 & CEN 06/2026',
    category: 'railways',
    state: 'All India',
    qualification: 'graduate',
    totalVacancies: 11558,
    salaryPayScale: 'Pay Level 2 to 6 (₹19,900 - ₹35,400 Basic)',
    ageLimit: '18 to 36 Years (Graduate) / 18 to 33 Years (UG)',
    applicationFee: {
      generalOBC: '₹500/- (₹400 refundable on CBT-1 appearance)',
      scST: '₹250/- (₹250 full refundable on CBT-1)',
      female: '₹250/- (Refundable)',
      phDivyang: '₹250/- (Refundable)',
      paymentMode: 'SBI Online / Internet Banking / UPI'
    },
    dates: {
      applicationStart: '14 Sep 2026',
      applicationEnd: '20 Oct 2026',
      feeLastDate: '21 Oct 2026',
      examDate: 'Jan - Feb 2027 (Tentative)',
      admitCardDate: '4 days before exam'
    },
    vacancies: [
      { postName: 'Goods Train Manager', totalPosts: 3144, eligibility: 'Bachelor Degree from recognized university' },
      { postName: 'Senior Commercial cum Ticket Clerk', totalPosts: 1736, eligibility: 'Graduate in any discipline' },
      { postName: 'Station Master', totalPosts: 994, eligibility: 'Degree + CBAT Aptitude Test' },
      { postName: 'Junior Clerk cum Typist', totalPosts: 2980, eligibility: '12th Pass with English/Hindi Typing' },
      { postName: 'Accounts Clerk cum Typist', totalPosts: 760, eligibility: '12th Pass with 50% marks' }
    ],
    officialWebsite: 'https://rrbapply.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'closing-soon',
    type: 'job',
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1)',
      '2nd Stage Computer Based Test (CBT-2)',
      'Typing Skill Test / Computer Based Aptitude Test (as applicable)',
      'Document Verification and Medical Examination'
    ],
    syllabusOverview: [
      'General Awareness (40 Questions, 40 Marks)',
      'Mathematics (30 Questions, 30 Marks)',
      'General Intelligence & Reasoning (30 Questions, 30 Marks)',
      'Negative Marking: 1/3rd mark deduction'
    ],
    postedOn: '14 Sep 2026',
    isUrgent: true
  },
  {
    id: 'ibps-po-xv-2026',
    title: 'IBPS PO / Management Trainee CRP PO/MT-XV',
    titleHi: 'आईबीपीएस बैंक पीओ भर्ती 2026 (4,455 पद)',
    department: 'Institute of Banking Personnel Selection',
    departmentHi: 'बैंकिंग कार्मिक चयन संस्थान',
    advtNumber: 'IBPS/CRP-PO/MT-XV/2026',
    category: 'banking',
    state: 'All India',
    qualification: 'graduate',
    totalVacancies: 4455,
    salaryPayScale: 'Basic ₹36,000 + DA + HRA (Gross ~₹56,000/mo)',
    ageLimit: '20 to 30 Years (OBC +3 yrs, SC/ST +5 yrs)',
    applicationFee: {
      generalOBC: '₹850/-',
      scST: '₹175/-',
      female: '₹850/- (Category wise)',
      paymentMode: 'Online Payment Gateway'
    },
    dates: {
      applicationStart: '01 Aug 2026',
      applicationEnd: '28 Aug 2026',
      examDate: '19 & 20 Oct 2026 (Prelims)',
      admitCardDate: '10 Oct 2026',
      resultDate: 'Nov 2026'
    },
    vacancies: [
      { postName: 'Probationary Officer (PNB)', totalPosts: 1200, eligibility: 'Graduate in any discipline' },
      { postName: 'Probationary Officer (Bank of Baroda)', totalPosts: 800, eligibility: 'Graduate in any discipline' },
      { postName: 'Probationary Officer (Canara Bank)', totalPosts: 750, eligibility: 'Graduate in any discipline' },
      { postName: 'Probationary Officer (Union Bank of India)', totalPosts: 900, eligibility: 'Graduate in any discipline' }
    ],
    officialWebsite: 'https://ibps.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'admit-card-live',
    type: 'admit-card',
    admitCardStatus: 'Prelims Call Letter Download Active',
    selectionProcess: [
      'Preliminary Online Examination',
      'Mains Online Examination with Descriptive English',
      'Common Interview by Participating Banks'
    ],
    syllabusOverview: [
      'English Language (30 Qs / 30 Marks / 20 mins)',
      'Quantitative Aptitude (35 Qs / 35 Marks / 20 mins)',
      'Reasoning Ability (35 Qs / 35 Marks / 20 mins)'
    ],
    postedOn: '02 Oct 2026'
  },
  {
    id: 'up-police-constable-2026',
    title: 'UP Police Constable Recruitment Re-Exam 2026',
    titleHi: 'यूपी पुलिस कांस्टेबल 60,244 पद भर्ती परीक्षा परिणाम',
    department: 'Uttar Pradesh Police Recruitment Board (UPPRPB)',
    departmentHi: 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड, लखनऊ',
    advtNumber: 'PRPB-1(150)/2023-2026',
    category: 'defence-police',
    state: 'Uttar Pradesh',
    qualification: '12th',
    totalVacancies: 60244,
    salaryPayScale: 'Pay Band ₹5,200 - ₹20,200 (Grade Pay ₹2,000)',
    ageLimit: '18 to 25 Years (Male) / 18 to 28 Years (Female)',
    applicationFee: {
      generalOBC: '₹400/-',
      scST: '₹400/-',
      female: '₹400/-',
      paymentMode: 'Online E-Challan / Net Banking'
    },
    dates: {
      applicationStart: 'Closed',
      applicationEnd: 'Closed',
      examDate: '23, 24, 25, 30 & 31 Aug 2026',
      answerKeyDate: '15 Sep 2026',
      resultDate: 'Declared'
    },
    vacancies: [
      { postName: 'Civil Police Constable (Male & Female)', totalPosts: 60244, eligibility: '10+2 Intermediate Passed from UP Board or recognized board' }
    ],
    officialWebsite: 'https://uppbpb.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'result-declared',
    type: 'result',
    resultStatus: 'Written Exam Merit List & Scorecard Live',
    selectionProcess: [
      'OMR Based Written Examination (300 Marks)',
      'Document Verification and Physical Standard Test (DV/PST)',
      'Physical Efficiency Test (PET Race: 4.8 km in 25 min for male)'
    ],
    syllabusOverview: [
      'General Knowledge (38 Qs)',
      'General Hindi (37 Qs)',
      'Numerical & Mental Ability (38 Qs)',
      'Mental Aptitude, I.Q. and Reasoning Ability (37 Qs)'
    ],
    postedOn: '25 Sep 2026'
  },
  {
    id: 'bpsc-70th-cce-2026',
    title: 'BPSC 70th Integrated Combined Competitive Exam 2026',
    titleHi: 'बीपीएससी 70वीं संयुक्त सिविल सेवा भर्ती 2026 (1,957 पद)',
    department: 'Bihar Public Service Commission (BPSC)',
    departmentHi: 'बिहार लोक सेवा आयोग, पटना',
    advtNumber: 'Advt No. 70/2026',
    category: 'state-psc',
    state: 'Bihar',
    qualification: 'graduate',
    totalVacancies: 1957,
    salaryPayScale: 'Level 7 & Level 9 (SDM, DSP, Revenue Officer)',
    ageLimit: '20, 21, 22 to 37 Years (Male General) / 40 Years (Female)',
    applicationFee: {
      generalOBC: '₹600/-',
      scST: '₹150/- (Bihar Domicile)',
      female: '₹150/- (Bihar Domicile)',
      phDivyang: '₹150/-',
      paymentMode: 'Online Net Banking / Debit Card'
    },
    dates: {
      applicationStart: '28 Sep 2026',
      applicationEnd: '04 Nov 2026',
      examDate: '13 Dec 2026 (Prelims)',
      admitCardDate: '01 Dec 2026'
    },
    vacancies: [
      { postName: 'Sub Divisional Officer / SDM (BAS)', totalPosts: 120, eligibility: 'Graduation in any stream' },
      { postName: 'Deputy Superintendent of Police (DSP)', totalPosts: 145, eligibility: 'Graduation + Physical Standard' },
      { postName: 'Block Development Officer (BDO)', totalPosts: 380, eligibility: 'Graduation' },
      { postName: 'Revenue Officer (CO)', totalPosts: 450, eligibility: 'Graduation' }
    ],
    officialWebsite: 'https://bpsc.bih.nic.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'job',
    selectionProcess: [
      'Preliminary Exam (150 Marks Objective, Negative 1/3rd)',
      'Main Written Examination (Descriptive 900 Marks + Qualifying Hindi)',
      'Personal Interview (120 Marks)'
    ],
    syllabusOverview: [
      'General Science, History of India and Bihar',
      'Geography of India and Bihar rivers/minerals',
      'Indian Polity & Economy, 73rd Amendment',
      'Current Events of National & International Importance'
    ],
    postedOn: '26 Sep 2026'
  },
  {
    id: 'upsc-civil-services-pre-2026',
    title: 'UPSC Civil Services (IAS / IFS / IPS) 2026',
    titleHi: 'संघ लोक सेवा आयोग सिविल सेवा (IAS/IPS) परीक्षा 2026',
    department: 'Union Public Service Commission (UPSC)',
    departmentHi: 'संघ लोक सेवा आयोग (धौलपुर हाउस, नई दिल्ली)',
    advtNumber: '05/2026-CSP',
    category: 'upsc',
    state: 'All India',
    qualification: 'graduate',
    totalVacancies: 1105,
    salaryPayScale: 'Level 10 (₹56,100 to ₹2,50,000 Apex Level)',
    ageLimit: '21 to 32 Years as on 01 August 2026',
    applicationFee: {
      generalOBC: '₹100/-',
      scST: '₹0/- (Exempted)',
      female: '₹0/- (Exempted)',
      paymentMode: 'Online / State Bank Cash Challan'
    },
    dates: {
      applicationStart: '14 Feb 2026',
      applicationEnd: '05 Mar 2026',
      examDate: '24 May 2026',
      resultDate: 'Final Marks & Cutoff Declared'
    },
    vacancies: [
      { postName: 'Indian Administrative Service (IAS)', totalPosts: 180, eligibility: 'Degree in any discipline' },
      { postName: 'Indian Police Service (IPS)', totalPosts: 200, eligibility: 'Degree in any discipline' },
      { postName: 'Indian Foreign Service (IFS)', totalPosts: 55, eligibility: 'Degree in any discipline' },
      { postName: 'Central Services Group A & B', totalPosts: 670, eligibility: 'Degree in any discipline' }
    ],
    officialWebsite: 'https://upsc.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'result-declared',
    type: 'result',
    resultStatus: 'Final Merit List & Reserve List Published',
    selectionProcess: [
      'Civil Services Preliminary Exam (GS Paper I + CSAT Paper II)',
      'Civil Services Main Exam (9 Papers, 1750 Marks)',
      'Personality Test / Interview (275 Marks)'
    ],
    syllabusOverview: [
      'Paper I: General Studies (History, Polity, Economy, Sci-Tech, Geo)',
      'Paper II: CSAT (Comprehension, Reasoning, Basic Numeracy - 33% Qualifying)'
    ],
    postedOn: '20 Sep 2026'
  },
  {
    id: 'ctet-july-2026',
    title: 'Central Teacher Eligibility Test (CTET) July 2026',
    titleHi: 'केंद्रीय शिक्षक पात्रता परीक्षा (CTET) आंसर की व रिजल्ट',
    department: 'Central Board of Secondary Education (CBSE)',
    departmentHi: 'केंद्रीय माध्यमिक शिक्षा बोर्ड (सीबीएसई)',
    advtNumber: 'CBSE/CTET/JULY-2026',
    category: 'teaching',
    state: 'All India',
    qualification: 'bed-tet',
    totalVacancies: 0,
    salaryPayScale: 'Teacher Eligibility Certificate (Lifetime Validity)',
    ageLimit: 'Minimum 18 Years (No upper age limit)',
    applicationFee: {
      generalOBC: '₹1000/- (Single Paper) / ₹1200/- (Both Papers)',
      scST: '₹500/- (Single Paper) / ₹600/- (Both Papers)',
      female: 'Category wise as above',
      paymentMode: 'Online Debit/Credit Card/UPI'
    },
    dates: {
      applicationStart: 'Closed',
      applicationEnd: 'Closed',
      examDate: '07 Jul 2026',
      answerKeyDate: '24 Jul 2026',
      resultDate: 'Result Available'
    },
    vacancies: [
      { postName: 'Primary Stage (Paper I - Class 1 to 5)', totalPosts: 0, eligibility: '12th with 50% + 2-Yr D.El.Ed or B.El.Ed' },
      { postName: 'Elementary Stage (Paper II - Class 6 to 8)', totalPosts: 0, eligibility: 'Graduation + 2-Yr D.El.Ed or B.Ed' }
    ],
    officialWebsite: 'https://ctet.nic.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'answer-key-out',
    type: 'answer-key',
    answerKeyStatus: 'Final Answer Key & OMR Sheet Download Live',
    selectionProcess: [
      'Paper-1 for Primary Classes (150 Marks)',
      'Paper-2 for Elementary Classes (150 Marks)',
      'Qualifying Marks: 60% for General (90/150), 55% for Reserved (82/150)'
    ],
    syllabusOverview: [
      'Child Development & Pedagogy (30 Marks)',
      'Language I (Compulsory - 30 Marks)',
      'Language II (Compulsory - 30 Marks)',
      'Mathematics / Science / Social Studies (60 Marks)'
    ],
    postedOn: '18 Sep 2026'
  },
  {
    id: 'nta-cuet-ug-admission-2026',
    title: 'NTA CUET UG Central Universities Admission 2026',
    titleHi: 'सीयूईटी यूजी 2026 केंद्रीय विश्वविद्यालय प्रवेश प्रक्रिया',
    department: 'National Testing Agency (NTA)',
    departmentHi: 'राष्ट्रीय परीक्षा एजेंसी (शिक्षा मंत्रालय)',
    advtNumber: 'NTA/CUET-UG/2026',
    category: 'all',
    state: 'All India',
    qualification: '12th',
    totalVacancies: 250000,
    salaryPayScale: 'Undergraduate Degree Admission (DU, BHU, JNU, AMU)',
    ageLimit: 'No age limit for appearing in CUET UG',
    applicationFee: {
      generalOBC: '₹1000/- (Up to 3 Subjects)',
      scST: '₹800/- (Up to 3 Subjects)',
      female: 'Category wise',
      paymentMode: 'Net Banking / Credit / Debit / UPI'
    },
    dates: {
      applicationStart: '27 Feb 2026',
      applicationEnd: '05 Apr 2026',
      examDate: '15 - 29 May 2026',
      resultDate: 'Scorecard Available'
    },
    vacancies: [
      { postName: 'Delhi University (DU UG Courses)', totalPosts: 71000, eligibility: '12th Pass with subject mapped in CUET' },
      { postName: 'Banaras Hindu University (BHU UG)', totalPosts: 9500, eligibility: '12th Pass with 50% in relevant stream' },
      { postName: 'Jawaharlal Nehru University (JNU UG)', totalPosts: 2500, eligibility: '12th Pass with relevant language/stream' }
    ],
    officialWebsite: 'https://cuetug.ntaonline.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'admission',
    admissionCourse: 'BA, BSc, BCom, BTech, BALLB in 45+ Central Universities',
    selectionProcess: [
      'Computer Based Test (Hybrid mode)',
      'NTA Scorecard Generation and Percentile',
      'Centralized University Counselling & CSAS Seat Allocation'
    ],
    syllabusOverview: [
      'Section IA & IB: Language Proficiency (50 Qs)',
      'Section II: Domain Specific Subjects (Class 12th NCERT Syllabus)',
      'Section III: General Test (GK, Current Affairs, Mental Ability, Quantitative)'
    ],
    postedOn: '22 Sep 2026'
  },
  {
    id: 'neet-ug-counselling-2026',
    title: 'MCC NEET UG Medical (MBBS / BDS / AYUSH) Admission 2026',
    titleHi: 'नीट यूजी एमबीबीएस/बीडीएस ऑनलाइन काउंसिलिंग राउंड-3',
    department: 'Medical Counselling Committee (DGHS, MoHFW)',
    departmentHi: 'चिकित्सा परामर्श समिति (स्वास्थ्य एवं परिवार कल्याण मंत्रालय)',
    advtNumber: 'MCC/UG/2026/R-3',
    category: 'medical',
    state: 'All India',
    qualification: '12th',
    totalVacancies: 108940,
    salaryPayScale: 'Admission to MBBS, BDS, BAMS, BHMS Courses',
    ageLimit: 'Completed 17 Years as on 31 Dec 2026',
    applicationFee: {
      generalOBC: '₹1000/- Registration + ₹10,000 Refundable Security',
      scST: '₹500/- Registration + ₹5,000 Refundable Security',
      female: 'Category wise',
      paymentMode: 'Online Payment Gateway'
    },
    dates: {
      applicationStart: '24 Sep 2026',
      applicationEnd: '02 Oct 2026',
      resultDate: '05 Oct 2026 (Seat Allotment)'
    },
    vacancies: [
      { postName: '15% All India Quota MBBS/BDS Seats', totalPosts: 18500, eligibility: 'NEET UG Qualified Scorecard' },
      { postName: '100% AIIMS & JIPMER MBBS Seats', totalPosts: 2150, eligibility: 'NEET UG Qualified Scorecard' },
      { postName: 'Central Universities & Deemed Medical Colleges', totalPosts: 12000, eligibility: 'NEET UG Qualified' }
    ],
    officialWebsite: 'https://mcc.nic.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'admission',
    admissionCourse: 'MBBS / BDS / B.Sc Nursing in Govt Medical Colleges',
    selectionProcess: [
      'NEET UG Merit Rank verification',
      'Choice Filling and Locking of Medical Colleges',
      'Provisional Seat Allotment Result',
      'Physical Reporting & Document Verification'
    ],
    syllabusOverview: [
      'NEET Merit Rank Card',
      'Class 10th and 12th Certificate & Mark Sheet',
      'Category Certificate (EWS/OBC-NCL/SC/ST)',
      'Provisional Allotment Letter'
    ],
    postedOn: '25 Sep 2026'
  },
  {
    id: 'rpsc-ras-2026',
    title: 'Rajasthan RPSC RAS / RTS Combined Competitive Exam 2026',
    titleHi: 'आरपीएससी आरएएस भर्ती 2026 अधिसूचना (733 पद)',
    department: 'Rajasthan Public Service Commission (RPSC Ajmer)',
    departmentHi: 'राजस्थान लोक सेवा आयोग, अजमेर',
    advtNumber: 'Advt No. 08/Exam/RAS/2026',
    category: 'state-psc',
    state: 'Rajasthan',
    qualification: 'graduate',
    totalVacancies: 733,
    salaryPayScale: 'Pay Matrix Level L-14 (State Services) & L-11 (Subordinate)',
    ageLimit: '21 to 40 Years (Rajasthan domicile relaxations applicable)',
    applicationFee: {
      generalOBC: '₹600/- (One Time Registration OTR)',
      scST: '₹400/- (Rajasthan Resident)',
      female: '₹400/-',
      paymentMode: 'SSO Rajasthan Portal / e-Mitra'
    },
    dates: {
      applicationStart: '19 Sep 2026',
      applicationEnd: '18 Oct 2026',
      examDate: '02 Feb 2027 (Prelims)',
      admitCardDate: '20 Jan 2027'
    },
    vacancies: [
      { postName: 'Rajasthan Administrative Service (RAS)', totalPosts: 67, eligibility: 'Bachelor Degree in any discipline' },
      { postName: 'Rajasthan Police Service (RPS)', totalPosts: 60, eligibility: 'Graduate with physical standards' },
      { postName: 'Rajasthan Accounts Service', totalPosts: 130, eligibility: 'Graduate in any discipline' },
      { postName: 'Subordinate Tehsildar & Commercial Taxes', totalPosts: 476, eligibility: 'Graduate' }
    ],
    officialWebsite: 'https://rpsc.rajasthan.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'job',
    selectionProcess: [
      'Preliminary Examination (200 Marks Objective)',
      'Main Written Examination (4 Papers, 800 Marks)',
      'Personality and Viva-Voce Test (100 Marks)'
    ],
    syllabusOverview: [
      'History, Art, Culture, Literature of Rajasthan (50 Marks)',
      'Indian History & National Movement',
      'Geography of World, India and Rajasthan',
      'Indian Constitution, Political System & Governance',
      'Economic Concepts and Rajasthan Economy'
    ],
    postedOn: '19 Sep 2026'
  },
  {
    id: 'nda-na-ii-2026',
    title: 'UPSC National Defence Academy (NDA & NA II) 2026',
    titleHi: 'एनडीए एवं नौसेना अकादमी (NDA 2) आंसर की व कटऑफ',
    department: 'Union Public Service Commission (UPSC)',
    departmentHi: 'संघ लोक सेवा आयोग (रक्षा मंत्रालय)',
    advtNumber: '10/2026-NDA-II',
    category: 'defence-police',
    state: 'All India',
    qualification: '12th',
    totalVacancies: 404,
    salaryPayScale: 'Stipend ₹56,100/month during training, Lieutenant rank on commission',
    ageLimit: 'Born not earlier than 02 Jan 2008 and not later than 01 Jan 2011',
    applicationFee: {
      generalOBC: '₹100/-',
      scST: '₹0/- (Exempted)',
      female: '₹0/- (Exempted)',
      paymentMode: 'Online Payment'
    },
    dates: {
      applicationStart: 'Closed',
      applicationEnd: 'Closed',
      examDate: '01 Sep 2026',
      answerKeyDate: '23 Sep 2026',
      resultDate: 'October 2026 (Written Result Expected)'
    },
    vacancies: [
      { postName: 'Army Wing of NDA', totalPosts: 208, eligibility: '12th Class pass of the 10+2 pattern' },
      { postName: 'Air Force Wing of NDA', totalPosts: 120, eligibility: '12th Pass with Physics and Mathematics' },
      { postName: 'Navy Wing of NDA', totalPosts: 42, eligibility: '12th Pass with Physics and Mathematics' },
      { postName: '10+2 Cadet Entry Scheme (Naval Academy)', totalPosts: 34, eligibility: '12th Pass with Physics and Mathematics' }
    ],
    officialWebsite: 'https://upsc.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'answer-key-out',
    type: 'answer-key',
    answerKeyStatus: 'Official Question Paper & Solution Keys Released',
    selectionProcess: [
      'Written Examination (Mathematics 300 + GAT 600 = 900 Marks)',
      'SSB Interview & Psychological Assessment (900 Marks)',
      'Medical Board Evaluation at Military Hospitals'
    ],
    syllabusOverview: [
      'Paper 1: Mathematics (Algebra, Matrices, Trigonometry, Calculus - 300 Marks)',
      'Paper 2: General Ability Test (English 200 Marks + GK/Science 400 Marks)'
    ],
    postedOn: '23 Sep 2026'
  },
  {
    id: 'ssc-gd-constable-2026',
    title: 'SSC GD Constable in BSF, CISF, CRPF, ITBP, SSB 2026',
    titleHi: 'एसएससी जीडी कांस्टेबल 39,481 पद भर्ती ऑनलाइन फॉर्म',
    department: 'Staff Selection Commission (MHA Forces)',
    departmentHi: 'कर्मचारी चयन आयोग (केंद्रीय सशस्त्र पुलिस बल)',
    advtNumber: 'F.No. 3/1/2026-P&P-I',
    category: 'defence-police',
    state: 'All India',
    qualification: '10th',
    totalVacancies: 39481,
    salaryPayScale: 'Pay Level 3 (₹21,700 - ₹69,100)',
    ageLimit: '18 to 23 Years as on 01 Jan 2026 (Relaxation applicable)',
    applicationFee: {
      generalOBC: '₹100/-',
      scST: '₹0/-',
      female: '₹0/-',
      paymentMode: 'BHIM UPI, Net Banking, Cards'
    },
    dates: {
      applicationStart: '05 Sep 2026',
      applicationEnd: '14 Oct 2026',
      feeLastDate: '15 Oct 2026',
      examDate: 'Jan - Feb 2027 (CBE)',
      admitCardDate: 'Jan 2027'
    },
    vacancies: [
      { postName: 'CISF Constable GD', totalPosts: 13632, eligibility: '10th High School Pass' },
      { postName: 'BSF Constable GD', totalPosts: 15654, eligibility: '10th High School Pass' },
      { postName: 'CRPF Constable GD', totalPosts: 6245, eligibility: '10th High School Pass' },
      { postName: 'ITBP & SSB Constable GD', totalPosts: 3950, eligibility: '10th High School Pass' }
    ],
    officialWebsite: 'https://ssc.gov.in',
    notificationPdfUrl: '#',
    applyOnlineUrl: '#',
    status: 'active',
    type: 'job',
    selectionProcess: [
      'Computer Based Examination (80 Questions / 160 Marks / 60 Mins)',
      'Physical Standard Test (PST: Height 170cm Male, 157cm Female)',
      'Physical Efficiency Test (PET: 5km run in 24 mins Male)',
      'Detailed Medical Examination (DME)'
    ],
    syllabusOverview: [
      'General Intelligence and Reasoning (20 Qs / 40 Marks)',
      'General Knowledge and General Awareness (20 Qs / 40 Marks)',
      'Elementary Mathematics (20 Qs / 40 Marks)',
      'English / Hindi (20 Qs / 40 Marks)'
    ],
    postedOn: '05 Sep 2026'
  }
];

export const MOCK_STUDY_MATERIAL: StudyMaterialItem[] = [
  {
    id: 'mat-ssc-cgl-syllabus',
    title: 'SSC CGL Complete Syllabus & Chapter-wise Weightage PDF',
    titleHi: 'एसएससी सीजीएल विस्तृत पाठ्यक्रम एवं विषयवार अंक विभाजन',
    category: 'ssc',
    type: 'syllabus',
    examTarget: 'SSC CGL Tier 1 & 2',
    pagesOrDuration: '28 Pages',
    fileSize: '3.4 MB',
    description: 'Official detailed topic-wise syllabus covering Maths, Reasoning, English, General Awareness, Computer Proficiency and typing guidelines.',
    topicsCovered: ['Arithmetic & Advanced Maths', 'Analytical Reasoning', 'Grammar & Vocab Rules', 'Indian Polity & Science Notes', 'Tier-2 Sectional Cutoffs'],
    downloadCount: 42560
  },
  {
    id: 'mat-rrb-ntpc-pyq',
    title: 'RRB NTPC Previous 5 Years Solved Papers with Solutions (Hindi/English)',
    titleHi: 'रेलवे एनटीपीसी पिछले 5 वर्षों के हल प्रश्न पत्र',
    category: 'railways',
    type: 'pyq',
    examTarget: 'RRB NTPC CBT-1 & CBT-2',
    pagesOrDuration: '142 Pages',
    fileSize: '12.8 MB',
    description: 'Comprehensive compilation of 2016-2022 actual question papers with step-by-step mathematical explanations and official answer key validations.',
    topicsCovered: ['Railway GK & General Science', 'Speed Time Distance Short Tricks', 'Coding Decoding & Puzzles', 'Current Affairs Static Formulae'],
    downloadCount: 88400
  },
  {
    id: 'mat-upsc-csat-formula',
    title: 'UPSC Civil Services CSAT Paper-2 Fast Track Revision Handbook',
    titleHi: 'यूपीएससी सीएसैट पेपर-2 त्वरित पुनरीक्षण सूत्र पुस्तिका',
    category: 'upsc',
    type: 'notes',
    examTarget: 'UPSC IAS Prelims',
    pagesOrDuration: '64 Pages',
    fileSize: '5.1 MB',
    description: 'Master qualifying 66 marks effortlessly with reading comprehension inference strategies, syllogisms, probability, and quantitative shortcut sheets.',
    topicsCovered: ['Reading Comprehension Inference', 'Permutation & Combination', 'Data Sufficiency Techniques', 'Logical Deduction'],
    downloadCount: 31200
  },
  {
    id: 'mat-up-police-gk',
    title: 'UP Police Constable Special: Uttar Pradesh GK & Special Acts',
    titleHi: 'यूपी पुलिस विशेष: उत्तर प्रदेश सामान्य ज्ञान व पुलिस प्रणाली',
    category: 'defence-police',
    type: 'notes',
    examTarget: 'UP Police Constable & SI',
    pagesOrDuration: '52 Pages',
    fileSize: '4.8 MB',
    description: 'Essential revision notes on UP districts, rivers, minerals, historical sites, internal security, cybercrime basics, and Human Rights laws.',
    topicsCovered: ['UP Census 2011 & Budget', 'Folk Dances, Fairs & Art of UP', 'Police Administration System', 'Cyber Crime & Human Rights'],
    downloadCount: 96300
  },
  {
    id: 'mat-banking-quant',
    title: 'Banking Quantitative Aptitude Speed Math & Data Interpretation Booklet',
    titleHi: 'बैंक परीक्षा: स्पीड मैथ ट्रिक्स एवं डीआई प्रैक्टिस बुक',
    category: 'banking',
    type: 'mock-pattern',
    examTarget: 'IBPS PO / SBI PO / Clerk',
    pagesOrDuration: '80 Pages',
    fileSize: '6.9 MB',
    description: 'High-speed calculation Vedic maths tricks, quadratic equation sign method, number series logic patterns, and modern caselet DI sets.',
    topicsCovered: ['Square/Cube Root Shortcuts', 'Approximation Techniques', 'Missing & Wrong Series Rules', 'Pie Chart & Radar DI Practice'],
    downloadCount: 51800
  },
  {
    id: 'mat-ctet-pedagogy',
    title: 'CTET Child Development & Pedagogy (CDP) Master Theory Notes',
    titleHi: 'सीटीईटी बाल विकास एवं शिक्षाशास्त्र मास्टर नोट्स',
    category: 'teaching',
    type: 'notes',
    examTarget: 'CTET Paper 1 & 2',
    pagesOrDuration: '46 Pages',
    fileSize: '3.9 MB',
    description: 'Concise summary of Piaget, Vygotsky, Kohlberg theories, Inclusive Education, NEP 2020 concepts, and 200 high-frequency pedagogy questions.',
    topicsCovered: ['Piaget Cognitive Stages', 'Vygotsky ZPD & Scaffolding', 'Kohlberg Moral Development', 'NEP 2020 & NCF 2005 Highlights'],
    downloadCount: 64100
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'UP Police Constable Exam 2026: Result Declared',
    titleHi: 'यूपी पुलिस कांस्टेबल 60,244 भर्ती: परीक्षा परिणाम घोषित',
    body: 'UPPRPB has announced the cut-off marks and list of candidates qualified for DV/PST. Check merit list.',
    bodyHi: 'उत्तर प्रदेश पुलिस भर्ती बोर्ड द्वारा कटऑफ अंक एवं डीवी/पीएसटी हेतु चयनित अभ्यर्थियों की सूची जारी कर दी गई है।',
    timestamp: '15 mins ago',
    type: 'result',
    relatedJobId: 'up-police-constable-2026',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    title: 'RRB NTPC 2026: Last 3 Days to Apply Online',
    titleHi: 'रेलवे एनटीपीसी 2026: ऑनलाइन आवेदन के अंतिम 3 दिन शेष',
    body: 'Registration for 11,558 NTPC posts closes on 20 Oct 2026. Submit your application and pay fees to avoid server rush.',
    bodyHi: '11,558 एनटीपीसी पदों के लिए ऑनलाइन आवेदन 20 अक्टूबर को बंद हो जाएंगे। सर्वर व्यस्तता से बचने के लिए तुरंत आवेदन करें।',
    timestamp: '2 hours ago',
    type: 'alert',
    relatedJobId: 'rrb-ntpc-2026',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif-3',
    title: 'IBPS PO Prelims 2026 Admit Card Released',
    titleHi: 'आईबीपीएस पीओ प्रीलिम्स एडमिट कार्ड जारी',
    body: 'Download your call letter using Registration No and DOB. Exam scheduled for 19 & 20 October.',
    bodyHi: 'पंजीकरण संख्या एवं जन्मतिथि की सहायता से अपना कॉल लेटर डाउनलोड करें। परीक्षा 19 व 20 अक्टूबर को आयोजित होगी।',
    timestamp: 'Yesterday',
    type: 'admit',
    relatedJobId: 'ibps-po-xv-2026',
    isRead: true,
    priority: 'normal'
  },
  {
    id: 'notif-4',
    title: 'CTET July 2026 Official Final Answer Key Live',
    titleHi: 'सीटीईटी जुलाई 2026 फाइनल आंसर की जारी',
    body: 'CBSE has released final evaluated answer key sheets for Paper-1 and Paper-2. Calculate your scores.',
    bodyHi: 'सीबीएसई द्वारा पेपर-1 और पेपर-2 की संशोधित अंतिम उत्तर कुंजी जारी कर दी गई है।',
    timestamp: '2 days ago',
    type: 'job',
    relatedJobId: 'ctet-july-2026',
    isRead: true,
    priority: 'normal'
  },
  {
    id: 'notif-5',
    title: 'BPSC 70th CCE Notification: 1,957 Vacancies',
    titleHi: 'बीपीएससी 70वीं संयुक्त परीक्षा अधिसूचना: 1,957 पद',
    body: 'Online registration started on bpsc.bih.nic.in. SDM, DSP and Block Officers vacancy list released.',
    bodyHi: 'एसडीएम, डीएसपी सहित 1,957 पदों के लिए ऑनलाइन आवेदन शुरू हो चुके हैं। विवरण देखें।',
    timestamp: '3 days ago',
    type: 'job',
    relatedJobId: 'bpsc-70th-cce-2026',
    isRead: true,
    priority: 'normal'
  }
];

export const INDIAN_STATES = [
  'All India',
  'Uttar Pradesh',
  'Bihar',
  'Rajasthan',
  'Madhya Pradesh',
  'Delhi',
  'Haryana',
  'Maharashtra',
  'West Bengal',
  'Punjab',
  'Uttarakhand',
  'Jharkhand',
  'Gujarat'
] as const;

export const JOB_CATEGORIES = [
  { id: 'all', labelEn: 'All Categories', labelHi: 'सभी श्रेणियां' },
  { id: 'ssc', labelEn: 'SSC', labelHi: 'एसएससी' },
  { id: 'railways', labelEn: 'Railways (RRB)', labelHi: 'रेलवे (RRB)' },
  { id: 'banking', labelEn: 'Banking (IBPS/SBI)', labelHi: 'बैंक (IBPS/SBI)' },
  { id: 'defence-police', labelEn: 'Defence & Police', labelHi: 'सेना व पुलिस' },
  { id: 'state-psc', labelEn: 'State PSC', labelHi: 'राज्य लोक सेवा' },
  { id: 'upsc', labelEn: 'UPSC Civil', labelHi: 'यूपीएससी' },
  { id: 'teaching', labelEn: 'Teaching (TET)', labelHi: 'शिक्षक भर्ती' },
  { id: 'medical', labelEn: 'Medical & Health', labelHi: 'चिकित्सा व स्वास्थ्य' }
] as const;

export const QUALIFICATIONS = [
  { id: 'all', labelEn: 'All Qualifications', labelHi: 'सभी योग्यताएं' },
  { id: '10th', labelEn: '10th Pass (Matric)', labelHi: '10वीं पास' },
  { id: '12th', labelEn: '12th Pass (Inter)', labelHi: '12वीं पास' },
  { id: 'graduate', labelEn: 'Any Graduate (Degree)', labelHi: 'स्नातक (ग्रेजुएट)' },
  { id: 'post-graduate', labelEn: 'Post Graduate (PG)', labelHi: 'परास्नातक (पीजी)' },
  { id: 'iti-diploma', labelEn: 'ITI / Polytechnic Diploma', labelHi: 'आईटीआई / डिप्लोमा' },
  { id: 'bed-tet', labelEn: 'B.Ed / D.El.Ed / TET', labelHi: 'बीएड / डीएलएड / टीईटी' },
  { id: 'btech-be', labelEn: 'B.Tech / BE Engineering', labelHi: 'बी.टेक / इंजीनियरिंग' }
] as const;
