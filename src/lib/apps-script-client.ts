import { Story, Applicant, Resource, WhisperQuote, FAQItem, EventItem, AdminAnalytics, ApiResponse, TeamMember, MainTeamInfo } from './types';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

export interface StorySubmissionPayload {
  title: string;
  category: string;
  authorName?: string;
  authorEmail?: string;
  isAnonymous?: boolean;
  content: string;
  imageFileName?: string;
  imageBase64?: string;
  recaptchaToken?: string;
}

export interface VolunteerApplicationPayload {
  fullName: string;
  email: string;
  schoolOrOrg?: string;
  schoolCollege?: string;
  grade?: string;
  gradeOrTitle?: string;
  roleInterest?: string;
  roleTrack?: string;
  selectedTeam?: string;
  motivationStatement?: string;
  statementOfIntent?: string;
  whyThisTeam?: string;
  phone?: string;
  phoneNumber?: string;
  instagram?: string;
  instagramId?: string;
  primarySkill?: string;
  preferredWorkStyle?: string;
  pastExperience?: string;
  comfortSensitiveTopics?: string;
  resumeDriveUrl?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeBase64?: string;
  cvBase64?: string;
  cvFileName?: string;
  mimeType?: string;
  recaptchaToken?: string;
}

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is Salus Initiative a clinical therapy service?',
    answer: 'No. Salus Initiative is a non-clinical, peer-led emotional sanctuary and educational movement. We provide grounding toolkits, anonymous story sharing, and peer advocacy circles. If you are experiencing an immediate mental health emergency, please consult our crisis helpline directory.',
    audienceCategory: 'Students',
    orderIndex: 1,
  },
  {
    id: 'faq-2',
    question: 'How are shared peer stories moderated for safety?',
    answer: 'All submitted narratives undergo a 2-step review by trained student moderators and adult mentors to ensure they contain no triggering descriptions or unsafe content before being published.',
    audienceCategory: 'Students',
    orderIndex: 2,
  },
  {
    id: 'faq-3',
    question: 'Can parents participate in Salus events and workshops?',
    answer: 'Yes! We offer dedicated parent guidance Playbooks, monthly reflection zines, and joint school-community wellness forums designed to bridge student-parent communication.',
    audienceCategory: 'Parents & Schools',
    orderIndex: 3,
  },
  {
    id: 'faq-4',
    question: 'How can a high school or college charter a Salus Chapter?',
    answer: 'Schools can apply through our Volunteer & Fellowship portal. Approved chapters receive starter funding, executive board toolkits, and leadership coaching.',
    audienceCategory: 'Parents & Schools',
    orderIndex: 4,
  },
];

export const MOCK_WHISPERS: WhisperQuote[] = [
  {
    id: 'w-1',
    quote: "Rest is not a reward for work finished; it is the soil in which your mind recovers its quiet courage.",
    author: "Salus Daily Whisper",
    category: "Self-Compassion",
    targetAudience: "Student",
  },
  {
    id: 'w-2',
    quote: "You do not have to carry the whole weight of your academic future in a single quiet evening.",
    author: "Salus Daily Whisper",
    category: "Academic Peace",
    targetAudience: "Student",
  },
  {
    id: 'w-3',
    quote: "Listening to your teenager without immediately trying to fix their pain is the deepest form of love.",
    author: "Salus Daily Whisper",
    category: "Parent Guidance",
    targetAudience: "Parent",
  },
];

export const MOCK_STORIES: Story[] = [];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'APP-901',
    fullName: "Aarav Sharma",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    roleInterest: "Design",
    roleTrack: "Design",
    schoolOrOrg: "DPS R.K. Puram",
    statementOfIntent: "Passionate about creating student zines and high-contrast mental health toolkits.",
    availabilityHours: 5,
    submittedAt: "2026-07-26T14:30:00Z",
    status: "Submitted",
  },
];

export const MOCK_APPLICATIONS = MOCK_APPLICANTS;

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: "Grounding Techniques for Acute Panic",
    category: "Crisis Support",
    description: "5-4-3-2-1 sensory grounding guide for immediate relief.",
    tags: ["Anxiety", "Grounding"],
    readTime: "3 min read",
    isFeatured: true,
    downloadUrl: "#",
  },
];

export const MOCK_ANALYTICS: AdminAnalytics = {
  totalVisitors: 4820,
  newsletterSubscribers: 1240,
  storiesSubmitted: 89,
  approvedStories: 64,
  applicantsTotal: 42,
  applicantsAccepted: 28,
  topSearchQueries: [
    { query: 'Anxiety relief', count: 184 },
    { query: 'Exam stress', count: 142 },
  ],
  deviceBreakdown: { desktop: 54, mobile: 38, tablet: 8 },
};

// Unified API Client Service
export const AppsScriptClient = {
  /**
   * Fetch approved stories for general view
   */
  async getStories(): Promise<Story[]> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) return [];
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getStories`, { method: 'GET' });
      if (!res.ok) return [];
      const json = await res.json();
      const rawList = json.data || [];

      return rawList.map((item: any) => ({
        id: String(item.ID || item.id || `st-${Math.random()}`),
        title: item.Title || item.title || 'Untitled Story',
        category: item.Category || item.category || 'Student Voice',
        authorName: item.AuthorName || item.authorName || (item.IsAnonymous === 'TRUE' ? 'Anonymous' : 'Peer'),
        authorEmail: item.AuthorEmail || item.authorEmail || '',
        isAnonymous: item.IsAnonymous === 'TRUE' || item.isAnonymous === true,
        content: item.Content || item.content || '',
        excerpt: item.Excerpt || item.excerpt || (item.Content ? item.Content.slice(0, 120) + '...' : ''),
        imageUrl: item.ImageUrl || item.imageUrl || '',
        status: item.Status || item.status || 'Approved',
        publishedAt: item.PublishedAt || item.publishedAt || item.Timestamp || item.date || new Date().toISOString(),
        readTime: item.readTime || '3 min read',
        likes: Number(item.Likes || item.likes || 0),
      }));
    } catch (err) {
      console.error('getStories fetch error:', err);
      return [];
    }
  },

  /**
   * Fetch applicant submissions for administrative view
   */
  async getApplicants(passkey: string): Promise<Applicant[]> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) return [];
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getApplicants&passkey=${encodeURIComponent(passkey)}`, { method: 'GET' });
      if (!res.ok) return [];
      const json = await res.json();
      const rawList = json.data || [];

      return rawList.map((item: any) => ({
        id: String(item.ID || item.id || `APP-${Math.random().toString().slice(-4)}`),
        timestamp: item.Timestamp || item.timestamp || item.submittedAt || new Date().toISOString(),
        submittedAt: item.Timestamp || item.timestamp || item.submittedAt || new Date().toISOString(),
        fullName: item.FullName || item.fullName || item.name || 'Anonymous Applicant',
        name: item.FullName || item.fullName || item.name || 'Anonymous Applicant',
        email: item.Email || item.email || '',
        phone: item.PhoneNumber || item.phone || item.phoneNumber || '',
        schoolOrOrg: item.SchoolCollege || item.schoolOrOrg || '',
        schoolCollege: item.SchoolCollege || item.schoolOrOrg || '',
        grade: item.Grade || item.grade || '',
        instagramId: item.InstagramId || item.instagramId || '',
        roleInterest: item.SelectedTeam || item.selectedTeam || item.roleInterest || item.roleTrack || 'Design',
        roleTrack: item.SelectedTeam || item.selectedTeam || item.roleInterest || item.roleTrack || 'Design',
        primarySkill: item.PrimarySkill || item.primarySkill || '',
        preferredWorkStyle: item.WorkStyle || item.preferredWorkStyle || '',
        pastExperience: item.PastExperience || item.pastExperience || '',
        comfortSensitiveTopics: item.ComfortSensitiveTopics || item.comfortSensitiveTopics || '',
        resumeDriveUrl: item.ResumeUrl || item.resumeUrl || item.resumeDriveUrl || '',
        resumeUrl: item.ResumeUrl || item.resumeUrl || item.resumeDriveUrl || '',
        motivationStatement: item.WhyThisTeam || item.whyThisTeam || item.motivationStatement || item.statementOfIntent || '',
        statementOfIntent: item.WhyThisTeam || item.whyThisTeam || item.motivationStatement || item.statementOfIntent || '',
        status: item.Status || item.status || 'Submitted',
        notes: item.AdminNotes || item.adminNotes || item.notes || '',
      }));
    } catch (err) {
      console.error('getApplicants fetch error:', err);
      return [];
    }
  },

  /**
   * Fetch all story submissions for administrative view (including Pending & Revision)
   */
  async getAllStoriesAdmin(passkey: string): Promise<Story[]> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) return [];
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getAdminData&passkey=${encodeURIComponent(passkey)}`, { method: 'GET' });
      if (!res.ok) return [];
      const json = await res.json();
      const rawList = (json.data && Array.isArray(json.data.stories))
        ? json.data.stories
        : (Array.isArray(json.data) ? json.data : []);

      return rawList.map((item: any) => ({
        id: String(item.ID || item.id || `st-${Math.random()}`),
        title: item.Title || item.title || 'Untitled Story',
        category: item.Category || item.category || 'Student Voice',
        authorName: item.AuthorName || item.authorName || (item.IsAnonymous === 'TRUE' || item.isAnonymous === true ? 'Anonymous' : 'Peer'),
        authorEmail: item.AuthorEmail || item.authorEmail || '',
        isAnonymous: item.IsAnonymous === 'TRUE' || item.isAnonymous === true,
        content: item.Content || item.content || '',
        excerpt: item.Excerpt || item.excerpt || (item.Content ? String(item.Content).slice(0, 120) + '...' : ''),
        imageUrl: item.ImageUrl || item.imageUrl || '',
        status: item.Status || item.status || 'Pending',
        publishedAt: item.PublishedAt || item.publishedAt || item.Timestamp || item.date || new Date().toISOString(),
        readTime: item.readTime || '3 min read',
        likes: Number(item.Likes || item.likes || 0),
      }));
    } catch (err) {
      console.error('getAllStoriesAdmin fetch error:', err);
      return [];
    }
  },

  /**
   * Fetch full admin payload (stories, applicants, subscribers, logs)
   */
  async getAdminData(passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) {
      return { success: false, message: 'Backend URL missing', timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getAdminData&passkey=${encodeURIComponent(passkey)}`, { method: 'GET' });
      if (!res.ok) return { success: false, message: 'Server returned error ' + res.status, timestamp: new Date().toISOString() };
      return await res.json();
    } catch (err: any) {
      console.error('getAdminData error:', err);
      return { success: false, message: err?.message || 'Network error', timestamp: new Date().toISOString() };
    }
  },

  /**
   * Submit a community story
   */
  async submitStory(payload: StorySubmissionPayload): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return {
        success: true,
        message: 'Your story has been submitted for peer moderation.',
        timestamp: new Date().toISOString(),
      };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'submitStory', ...payload }),
      });
      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      const json = await res.json();
      return json;
    } catch (err: any) {
      console.error('submitStory error:', err);
      return {
        success: false,
        message: err?.message || 'Failed to submit story to server.',
        error: 'Network or CORS connection failure.',
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Submit a volunteer fellowship application (with CV upload)
   */
  async submitApplication(payload: VolunteerApplicationPayload): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return {
        success: true,
        message: 'Thank you for applying for the Salus Fellowship!',
        data: { applicationId: `APP-${Date.now().toString().slice(-4)}` },
        timestamp: new Date().toISOString(),
      };
    }
    try {
      const base64Data = payload.resumeBase64 || payload.cvBase64 || '';
      const fileName = payload.resumeFileName || payload.cvFileName || 'Resume.pdf';

      const fullPayload = {
        action: 'submitApplication',
        ...payload,
        resumeBase64: base64Data,
        cvBase64: base64Data,
        resumeFileName: fileName,
        cvFileName: fileName,
      };

      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(fullPayload),
      });

      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      const json = await res.json();
      return json;
    } catch (err: any) {
      console.error('submitApplication error:', err);
      return {
        success: false,
        message: err?.message || 'Failed to submit application to server.',
        error: 'Network or CORS connection failure.',
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Update story moderation status (Approved, Rejected, Needs Revision)
   */
  async updateStoryStatus(storyId: string, status: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Story ${storyId} status updated to ${status}.`, timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'updateStoryStatus', storyId, status, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      return await res.json();
    } catch (err: any) {
      console.error('updateStoryStatus error:', err);
      return { success: false, message: 'Network error updating story status.', timestamp: new Date().toISOString() };
    }
  },

  /**
   * Update applicant status (Under Review, Accepted, Rejected)
   */
  async updateApplicantStatus(applicantId: string, status: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Applicant ${applicantId} status updated to ${status}.`, timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'updateApplicantStatus', applicantId, status, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      return await res.json();
    } catch (err: any) {
      console.error('updateApplicantStatus error:', err);
      return { success: false, message: 'Network error updating applicant status.', timestamp: new Date().toISOString() };
    }
  },

  /**
   * Delete an applicant entry from Google Sheets
   */
  async deleteApplicant(applicantId: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Applicant ${applicantId} deleted.`, timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'deleteApplicant', applicantId, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      return await res.json();
    } catch (err: any) {
      console.error('deleteApplicant error:', err);
      return { success: false, message: 'Network error deleting applicant entry.', timestamp: new Date().toISOString() };
    }
  },

  /**
   * Delete a story entry from Google Sheets
   */
  async deleteStory(storyId: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Story ${storyId} deleted.`, timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'deleteStory', storyId, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server HTTP error: ${res.status}`, timestamp: new Date().toISOString() };
      return await res.json();
    } catch (err: any) {
      console.error('deleteStory error:', err);
      return { success: false, message: 'Network error deleting story entry.', timestamp: new Date().toISOString() };
    }
  },
  /**
   * Fetch team info and members list from AppsScript / local storage
   */
  async getTeam(): Promise<{ mainTeamInfo: MainTeamInfo | null; members: TeamMember[] }> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { mainTeamInfo: null, members: [] };
    }
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getTeam`);
      if (!res.ok) return { mainTeamInfo: null, members: [] };
      const json = await res.json();
      return {
        mainTeamInfo: json.mainTeamInfo || null,
        members: json.members || [],
      };
    } catch (err) {
      console.error('getTeam error:', err);
      return { mainTeamInfo: null, members: [] };
    }
  },

  /**
   * Save Main Team hero info to Apps Script
   */
  async updateMainTeamInfo(info: MainTeamInfo, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: 'Main team info updated locally.', timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'updateMainTeamInfo', ...info, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server error: ${res.status}` };
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error updating team info' };
    }
  },

  /**
   * Save all team members to Apps Script
   */
  async saveTeamMembers(members: TeamMember[], passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: 'Team members updated locally.', timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveAllTeamMembers', members, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server error: ${res.status}` };
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error saving team members' };
    }
  },

  /**
   * Delete team member by ID
   */
  async deleteTeamMember(memberId: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Member ${memberId} deleted.`, timestamp: new Date().toISOString() };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'deleteTeamMember', memberId, passkey }),
      });
      if (!res.ok) return { success: false, message: `Server error: ${res.status}` };
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error deleting team member' };
    }
  },
};

export const DEFAULT_MAIN_TEAM_INFO: MainTeamInfo = {
  title: "The Architects of Salus Initiative",
  subtitle: "Founded by students for students. Meet the founders and chief advisor driving our emotional sanctuary and peer mental health advocacy.",
  mainTeamImageUrl: "/team/thanush.jpg",
  narrativeText: "Salus Initiative was born out of a shared vision between high school peers Aarush Kumar Prasad and Thanush Samala, guided by Chief Advisor Raunaq Sinha. Seeing firsthand the silent toll of academic stress and anxiety among students, they established Salus as an open, peer-led space where students can express themselves without judgment and find genuine support.",
  foundingYear: "2024",
  chapterCount: "03",
  totalMembersCount: "03",
};

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Aarush Kumar Prasad",
    role: "Founder",
    category: "Leadership",
    bio: "Hello everyone! I am Aarush Kumar Prasad, co-founder of this initiative, driven by a single, heartfelt aim: to champion the mental wellbeing of people everywhere. Me and Thanush after discussing this issue of stress and the toll it takes on a person's mind came to a conclusion to begin this initiative.\n\nI've immersed myself in Model United Nations conferences, participating in several prestigious events and securing victories on multiple occasions. My leadership shone through as I served on the executive board numerous times, honing skills in diplomacy, debate, and collaboration. Beyond MUN, I was the lead guitarist in our school band, channeling creativity through music and performing for crowds. I also proudly held the role of house Vice Captain, fostering team spirit and guiding my peers. Currently, I'm thriving in grade 11 at Quantium, building on my foundation as an ex-PGIS student.\n\nI have shown lots of interest in drawing and sketching too and I am hoping this initiative will be a success. With these experiences shaping me, I'm excited to unite us in promoting mental health awareness, resilience, and support. Let's make a difference together: 'If you want something done right, do it yourself.'",
    imageUrl: "/team/aarush.png",
    quote: "If you want something done right, do it yourself.",
    email: "aarush@salusinitiative.org",
    orderIndex: 1,
  },
  {
    id: "team-3",
    name: "Raunaq Sinha",
    role: "Chief Advisor",
    category: "Advisors & Mentors",
    bio: "Raunaq is a rising sophomore at O.P. Jindal Global University, pursuing a B. Sc. Economics (Hons.) and hoping to break into the spheres of quantitative finance and banking.\n\nMuch of his experience comes from his time in the world of MUNs and international policy.\n\nOver the past year, he has made his mark at JGU as one of the leading voices at the intersection of policy, economics, and finance.\n\nHe joins Salus to aid the team in every way possible. He is not just the workhorse; he is always ready to be a jockey.",
    imageUrl: "/team/raunaq.jpg",
    quote: "He is not just the workhorse; he is always ready to be a jockey.",
    email: "raunaq@salusinitiative.org",
    orderIndex: 2,
  },
  {
    id: "team-2",
    name: "Thanush Samala",
    role: "Founder",
    category: "Leadership",
    bio: "Hi I am Thanush Samala, a grade 11 student studying at Allen preparing for JEE. Me and Aarush have often seen that many people go through stress and anxiety which they ignore in the beginning and this further leads to the problem getting worse and worse, to prevent this we have created Salus Initiative, an initiative made by students for students.\n\nWe offer a safe place where you can share your stories and express how u feel, be it your overwhelmed or just lost, ur not alone and we are there to listen.\n\nApart from this I am a huge formula 1 fan and support Max Verstappen, I also play the drums which helps me take out my stress. I am an approachable person and you can reach out if you have any problem or you just want to chat, and if you ever feel like giving up, always remember what Alfred told Bruce Wayne 'why do we fall sir so that we can learn to pick ourselves up'. In the coming future I am looking to build on this make conversations on mental health more open.",
    imageUrl: "/team/thanush.jpg",
    quote: "Why do we fall sir, so that we can learn to pick ourselves up.",
    email: "thanush@salusinitiative.org",
    orderIndex: 3,
  },
];

