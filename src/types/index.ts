export type SectionType =
  | 'jobs'
  | 'search'
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
  dateFormatted?: string;
  type: 'job' | 'result' | 'admit' | 'alert';
  category?: 'jobs' | 'results' | 'admit-cards' | 'urgent';
  relatedJobId?: string;
  isRead: boolean;
  priority: 'high' | 'normal';
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt?: string;
  modified?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected?: boolean;
  };
  excerpt: {
    rendered: string;
    protected?: boolean;
  };
  featured_media?: number;
  meta?: {
    [key: string]: any;
    _department?: string;
    _department_hi?: string;
    _advt_number?: string;
    _total_vacancies?: number | string;
    _qualification?: string;
    _state?: string;
    _salary?: string;
    _age_limit?: string;
    _last_date?: string;
    _start_date?: string;
    _exam_date?: string;
    _apply_url?: string;
    _notification_pdf_url?: string;
    _official_website?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressApiConfig {
  baseUrl: string;
  endpointType: 'posts' | 'jobs' | 'sarkari-jobs';
  useCustomUrl: boolean;
  perPage: number;
  lastSyncTime?: string;
  connectionStatus: 'connected' | 'disconnected' | 'error' | 'idle';
  errorMessage?: string;
}

export interface AdvancedSearchFilter {
  query: string;
  department: string;
  qualification: QualificationLevel;
  state: IndianState;
  category: JobCategory;
  lastDateWindow: 'all' | '3-days' | '7-days' | '15-days' | 'this-month';
  sortBy: 'latest' | 'closing-soon' | 'vacancies' | 'title-asc' | 'dept-asc';
}

export interface AdItem {
  id: string;
  sponsorName: string;
  title: string;
  description: string;
  callToAction: string;
  url: string;
  tag: string;
  badge: string;
}

export interface FilterState {
  searchQuery: string;
  category: JobCategory;
  state: IndianState;
  qualification: QualificationLevel;
  sortBy: 'latest' | 'closing-soon' | 'vacancies';
}

export type Language = 'en' | 'hi';

