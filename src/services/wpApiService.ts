import { JobItem, WordPressPost, WordPressApiConfig, JobCategory, IndianState, QualificationLevel } from '../types';
import { MOCK_JOBS } from '../data/mockData';

const STORAGE_KEY_CONFIG = 'sarkari_wp_config';
const STORAGE_KEY_CACHE = 'sarkari_wp_cache';

export const DEFAULT_WP_CONFIG: WordPressApiConfig = {
  baseUrl: 'https://sarkarivacancyresult.gov.in/wp-json/wp/v2',
  endpointType: 'posts',
  useCustomUrl: false,
  perPage: 6,
  connectionStatus: 'idle',
};

export class WordPressApiService {
  private config: WordPressApiConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  public loadConfig(): WordPressApiConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (stored) {
        return { ...DEFAULT_WP_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse WP config from storage', e);
    }
    return DEFAULT_WP_CONFIG;
  }

  public saveConfig(config: Partial<WordPressApiConfig>): WordPressApiConfig {
    const updated = { ...this.config, ...config };
    this.config = updated;
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save WP config', e);
    }
    return updated;
  }

  public getConfig(): WordPressApiConfig {
    return { ...this.config };
  }

  /**
   * Cleans HTML entities and tags from rendered WordPress strings
   */
  private stripHtml(html: string): string {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  /**
   * Transforms a WordPress Post into a rich JobItem
   */
  public transformPostToJob(post: WordPressPost): JobItem {
    const rawTitle = this.stripHtml(post.title?.rendered || 'Recruitment Notice');
    const rawContent = post.content?.rendered || '';
    const plainContent = this.stripHtml(rawContent);
    const meta = post.meta || {};

    // 1. Department detection
    let department = meta._department || '';
    if (!department) {
      const deptMatch = rawTitle.match(/^([A-Za-z\s]+)\s+Recruitment/i) ||
                        plainContent.match(/Department\s*:\s*([^\n\r<]+)/i) ||
                        plainContent.match(/Commission\s*:\s*([^\n\r<]+)/i);
      department = deptMatch ? deptMatch[1].trim() : 'Government of India';
    }

    // 2. Department Hindi
    const departmentHi = meta._department_hi || `${department} (सरकारी विभाग)`;

    // 3. Advt Number
    let advtNumber = meta._advt_number || '';
    if (!advtNumber) {
      const advtMatch = plainContent.match(/(Advt|Notification|Notice)\s*(No|Ref|Number)?\.?\s*[:\-]?\s*([A-Za-z0-9\/\-_]+)/i);
      advtNumber = advtMatch ? advtMatch[3] : `WP-REC/2026/${post.id}`;
    }

    // 4. Vacancies
    let totalVacancies = 0;
    if (meta._total_vacancies) {
      totalVacancies = parseInt(String(meta._total_vacancies), 10) || 0;
    } else {
      const vacMatch = plainContent.match(/([0-9,]+)\s*(Post|Posts|Vacancy|Vacancies|Pad)/i) ||
                       rawTitle.match(/([0-9,]+)\s*(Post|Posts|Pad)/i);
      if (vacMatch) {
        totalVacancies = parseInt(vacMatch[1].replace(/,/g, ''), 10) || 0;
      }
    }

    // 5. Category classification
    let category: JobCategory = 'ssc';
    const lowerTitle = (rawTitle + ' ' + department + ' ' + plainContent).toLowerCase();
    if (lowerTitle.includes('railway') || lowerTitle.includes('rrb')) category = 'railways';
    else if (lowerTitle.includes('bank') || lowerTitle.includes('ibps') || lowerTitle.includes('sbi')) category = 'banking';
    else if (lowerTitle.includes('police') || lowerTitle.includes('defence') || lowerTitle.includes('army') || lowerTitle.includes('nda')) category = 'defence-police';
    else if (lowerTitle.includes('upsc') || lowerTitle.includes('ias')) category = 'upsc';
    else if (lowerTitle.includes('psc') || lowerTitle.includes('bpsc') || lowerTitle.includes('rpsc') || lowerTitle.includes('uppsc')) category = 'state-psc';
    else if (lowerTitle.includes('teacher') || lowerTitle.includes('tet') || lowerTitle.includes('ctet')) category = 'teaching';
    else if (lowerTitle.includes('medical') || lowerTitle.includes('neet') || lowerTitle.includes('nurse') || lowerTitle.includes('mbbs')) category = 'medical';
    else if (lowerTitle.includes('engineer') || lowerTitle.includes('je') || lowerTitle.includes('ae')) category = 'engineering';
    else category = 'ssc';

    // 6. State
    let state: IndianState = 'All India';
    const statesList: IndianState[] = [
      'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Delhi',
      'Haryana', 'Maharashtra', 'West Bengal', 'Punjab', 'Uttarakhand', 'Jharkhand', 'Gujarat'
    ];
    for (const st of statesList) {
      if (lowerTitle.includes(st.toLowerCase())) {
        state = st;
        break;
      }
    }

    // 7. Qualification
    let qualification: QualificationLevel = 'graduate';
    if (lowerTitle.includes('10th') || lowerTitle.includes('matric')) qualification = '10th';
    else if (lowerTitle.includes('12th') || lowerTitle.includes('intermediate') || lowerTitle.includes('10+2')) qualification = '12th';
    else if (lowerTitle.includes('iti') || lowerTitle.includes('diploma') || lowerTitle.includes('polytechnic')) qualification = 'iti-diploma';
    else if (lowerTitle.includes('b.ed') || lowerTitle.includes('d.el.ed') || lowerTitle.includes('tet')) qualification = 'bed-tet';
    else if (lowerTitle.includes('b.tech') || lowerTitle.includes('b.e.') || lowerTitle.includes('engineering degree')) qualification = 'btech-be';
    else if (lowerTitle.includes('post graduate') || lowerTitle.includes('master') || lowerTitle.includes('pg degree')) qualification = 'post-graduate';
    else qualification = 'graduate';

    // 8. Dates extraction
    const postDate = new Date(post.date || Date.now());
    const postedOnFormatted = postDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    let applicationEnd = meta._last_date || '';
    if (!applicationEnd) {
      const endMatch = plainContent.match(/Last Date\s*(to Apply)?\s*[:\-]?\s*([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4}|[0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{4})/i);
      if (endMatch) {
        applicationEnd = endMatch[2];
      } else {
        // Fallback realistic deadline 3 weeks from publish date
        const exp = new Date(postDate.getTime() + 25 * 24 * 60 * 60 * 1000);
        applicationEnd = exp.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    }

    // 9. Links extraction (Official Notification PDF & Apply Online)
    let applyOnlineUrl = meta._apply_url || '';
    let notificationPdfUrl = meta._notification_pdf_url || '';
    let officialWebsite = meta._official_website || post.link || 'https://sarkarivacancyresult.gov.in';

    // Look inside content for <a> tags with Apply or Notification
    if (!applyOnlineUrl || !notificationPdfUrl) {
      const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;
      let match;
      while ((match = linkRegex.exec(rawContent)) !== null) {
        const href = match[2];
        const text = match[3].toLowerCase();
        if (!applyOnlineUrl && (text.includes('apply') || text.includes('registration') || text.includes('online form'))) {
          applyOnlineUrl = href;
        }
        if (!notificationPdfUrl && (text.includes('notification') || text.includes('pdf') || text.includes('advertisement') || href.endsWith('.pdf'))) {
          notificationPdfUrl = href;
        }
      }
    }

    if (!applyOnlineUrl) applyOnlineUrl = officialWebsite;
    if (!notificationPdfUrl) notificationPdfUrl = `${officialWebsite}#official-notice`;

    // 10. Status determination
    let status: JobItem['status'] = 'active';
    if (lowerTitle.includes('result') || lowerTitle.includes('scorecard')) status = 'result-declared';
    else if (lowerTitle.includes('admit') || lowerTitle.includes('hall ticket')) status = 'admit-card-live';
    else if (lowerTitle.includes('answer key') || lowerTitle.includes('solution')) status = 'answer-key-out';
    else if (lowerTitle.includes('closing soon') || lowerTitle.includes('last day')) status = 'closing-soon';

    return {
      id: `wp-${post.id}`,
      title: rawTitle,
      titleHi: meta._title_hi || `${rawTitle} (ऑनलाइन फॉर्म)`,
      department: department,
      departmentHi: departmentHi,
      advtNumber: advtNumber,
      category: category,
      state: state,
      qualification: qualification,
      totalVacancies: totalVacancies,
      salaryPayScale: meta._salary || 'Pay Matrix Level 4 to Level 8 (₹25,500 - ₹1,12,400)',
      ageLimit: meta._age_limit || '18 to 30 Years (Age relaxation as per central/state govt norms)',
      applicationFee: {
        generalOBC: '₹100/-',
        scST: '₹0/- (Exempted)',
        female: '₹0/- (Exempted)',
        paymentMode: 'Online Net Banking / Debit / Credit / UPI',
      },
      dates: {
        applicationStart: meta._start_date || postedOnFormatted,
        applicationEnd: applicationEnd,
        feeLastDate: applicationEnd,
        examDate: meta._exam_date || 'Dec 2026 / Jan 2027',
      },
      vacancies: [
        {
          postName: `${rawTitle.split('(')[0].trim()} Posts`,
          totalPosts: totalVacancies > 0 ? totalVacancies : 1,
          eligibility: `${qualification.toUpperCase()} in relevant discipline from recognized university/board.`,
        },
      ],
      officialWebsite: officialWebsite,
      notificationPdfUrl: notificationPdfUrl,
      applyOnlineUrl: applyOnlineUrl,
      status: status,
      type: status === 'result-declared' ? 'result' : status === 'admit-card-live' ? 'admit-card' : status === 'answer-key-out' ? 'answer-key' : 'job',
      selectionProcess: [
        'Written Examination (Tier-1 Computer Based Test)',
        'Skill / Typing Test (where applicable)',
        'Document Verification & Medical Examination',
      ],
      syllabusOverview: [
        'General Intelligence & Reasoning',
        'General Awareness & Indian Polity/Economy',
        'Quantitative Aptitude & Mathematics',
        'Language Proficiency (English / Hindi)',
      ],
      postedOn: postedOnFormatted,
      isUrgent: totalVacancies > 5000 || status === 'closing-soon',
    };
  }

  /**
   * Fetches government job posts from WordPress REST API with pagination and fallback
   */
  public async fetchWordPressJobs(params: {
    page?: number;
    perPage?: number;
    search?: string;
    signal?: AbortSignal;
  }): Promise<{
    jobs: JobItem[];
    totalPosts: number;
    totalPages: number;
    fromCache: boolean;
    isMockFallBack: boolean;
    sourceUrl: string;
  }> {
    const page = params.page || 1;
    const perPage = params.perPage || this.config.perPage || 6;
    const search = params.search || '';

    // If user configured a custom URL, try hitting live API
    if (this.config.useCustomUrl && this.config.baseUrl) {
      try {
        const cleanBase = this.config.baseUrl.replace(/\/+$/, '');
        const endpoint = this.config.endpointType || 'posts';
        const url = new URL(`${cleanBase}/${endpoint}`);
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', String(perPage));
        url.searchParams.set('_embed', '1');
        if (search) {
          url.searchParams.set('search', search);
        }

        const response = await fetch(url.toString(), {
          signal: params.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`WordPress REST API HTTP ${response.status}: ${response.statusText}`);
        }

        const totalPostsHeader = response.headers.get('X-WP-Total');
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        const totalPosts = totalPostsHeader ? parseInt(totalPostsHeader, 10) : 50;
        const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : Math.ceil(totalPosts / perPage);

        const posts: WordPressPost[] = await response.json();
        const transformedJobs = posts.map((post) => this.transformPostToJob(post));

        // Update config success state
        this.saveConfig({
          connectionStatus: 'connected',
          errorMessage: undefined,
          lastSyncTime: new Date().toLocaleTimeString(),
        });

        // Cache for offline resilience
        try {
          localStorage.setItem(STORAGE_KEY_CACHE, JSON.stringify(transformedJobs));
        } catch (_) {}

        return {
          jobs: transformedJobs,
          totalPosts,
          totalPages,
          fromCache: false,
          isMockFallBack: false,
          sourceUrl: url.toString(),
        };
      } catch (err: any) {
        if (err.name === 'AbortError') throw err;

        console.warn('WordPress API fetch failed, falling back to simulated REST response:', err);
        this.saveConfig({
          connectionStatus: 'error',
          errorMessage: err.message || 'Network request failed (possibly CORS or invalid endpoint)',
        });
      }
    }

    // Default High-Fidelity WordPress REST API Simulation
    // Matches realistic WordPress response payload and handles pagination seamlessly
    await new Promise((res) => setTimeout(res, 450)); // simulate realistic network roundtrip

    // Filter source items
    let pool = [...MOCK_JOBS];
    if (search.trim()) {
      const q = search.toLowerCase();
      pool = pool.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.qualification.toLowerCase().includes(q) ||
          j.state.toLowerCase().includes(q)
      );
    }

    const totalPosts = pool.length;
    const totalPages = Math.ceil(totalPosts / perPage) || 1;
    const startIndex = (page - 1) * perPage;
    const paginatedJobs = pool.slice(startIndex, startIndex + perPage);

    return {
      jobs: paginatedJobs,
      totalPosts,
      totalPages,
      fromCache: true,
      isMockFallBack: true,
      sourceUrl: `${this.config.baseUrl}/${this.config.endpointType}?page=${page}&per_page=${perPage}`,
    };
  }

  /**
   * Tests connection to a WordPress site's REST API endpoint
   */
  public async testConnection(url: string, endpointType: string): Promise<{
    success: boolean;
    siteName?: string;
    totalPosts?: number;
    message: string;
  }> {
    try {
      const cleanBase = url.replace(/\/+$/, '');
      const testUrl = `${cleanBase}/${endpointType}?per_page=1`;

      const response = await fetch(testUrl, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return {
          success: false,
          message: `Server returned error ${response.status} (${response.statusText}). Check your endpoint URL.`,
        };
      }

      const totalPostsHeader = response.headers.get('X-WP-Total');
      const posts = await response.json();

      return {
        success: true,
        totalPosts: totalPostsHeader ? parseInt(totalPostsHeader, 10) : posts.length,
        message: `Successfully connected to WordPress REST API! Found ${totalPostsHeader || posts.length} posts.`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Connection failed: ${err.message || 'CORS restriction or invalid domain'}. Make sure your WordPress has CORS enabled or REST API public.`,
      };
    }
  }
}

export const wpApiService = new WordPressApiService();
