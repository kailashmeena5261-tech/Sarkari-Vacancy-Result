export type SectionType =
  | 'jobs'
  | 'results'
  | 'admit-cards'
  | 'answer-keys'
  | 'admissions'
  | 'study-material'
  | 'favorites'
  | 'notifications'
  | 'settings'
  | 'kotlin-code';

export type JobCategory =
  | 'all'
  | 'upsc'
  | 'ssc'
  | 'banking'
  | 'railways'
  | 'defence-police'
  | 'teaching'
  | 'state-psc'
  | 'medical'
  | 'engineering';

export type QualificationLevel =
  | 'all'
  | '10th'
  | '12th'
  | 'iti-diploma'
  | 'graduate'
  | 'post-graduate'
  | 'bed-tet'
  | 'btech-be';

export type IndianState =
  | 'all'
  | 'All India'
  | 'Uttar Pradesh'
  | 'Bihar'
  | 'Rajasthan'
  | 'Madhya Pradesh'
  | 'Delhi'
  | 'Haryana'
  | 'Maharashtra'
  | 'West Bengal'
  | 'Punjab'
  | 'Uttarakhand'
  | 'Jharkhand'
  | 'Gujarat';

export interface ImportantDates {
  applicationStart?: string;
  applicationEnd?: string;
  feeLastDate?: string;
  examDate?: string;
  admitCardDate?: string;
  resultDate?: string;
  answerKeyDate?: string;
}

export interface FeeStructure {
  generalOBC: string;
  scST: string;
  female: string;
  phDivyang?: string;
  paymentMode: string;
}

export interface VacancyDetail {
  postName: string;
  totalPosts: number;
  eligibility: string;
}

export interface JobItem {
  id: string;
  title: string;
  titleHi: string;
  department: string;
  departmentHi: string;
  advtNumber: string;
  category: JobCategory;
  state: IndianState;
  qualification: QualificationLevel;
  totalVacancies: number;
  salaryPayScale: string;
  ageLimit: string;
  applicationFee: FeeStructure;
  dates: ImportantDates;
  vacancies: VacancyDetail[];
  officialWebsite: string;
  notificationPdfUrl: string;
  applyOnlineUrl: string;
  status: 'active' | 'closing-soon' | 'result-declared' | 'admit-card-live' | 'answer-key-out' | 'closed';
  type: 'job' | 'result' | 'admit-card' | 'answer-key' | 'admission';
  resultStatus?: string;
  admitCardStatus?: string;
  answerKeyStatus?: string;
  admissionCourse?: string;
  selectionProcess: string[];
  syllabusOverview: string[];
  postedOn: string;
  isUrgent?: boolean;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  titleHi: string;
  category: JobCategory;
  type: 'syllabus' | 'pyq' | 'notes' | 'mock-pattern';
  examTarget: string;
  pagesOrDuration: string;
  fileSize: string;
  description: string;
  topicsCovered: string[];
  downloadCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleHi: string;
  body: string;
  bodyHi: string;
  timestamp: string;
  type: 'job' | 'result' | 'admit' | 'alert';
  relatedJobId?: string;
  isRead: boolean;
  priority: 'high' | 'normal';
}

export interface FilterState {
  searchQuery: string;
  category: JobCategory;
  state: IndianState;
  qualification: QualificationLevel;
  sortBy: 'latest' | 'closing-soon' | 'vacancies';
}

export type Language = 'en' | 'hi';
