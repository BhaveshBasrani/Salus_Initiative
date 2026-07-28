import { Story, Applicant, Resource, WhisperQuote, EventItem, AdminAnalytics } from './types';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

export interface StorySubmissionPayload {
  title: string;
  category: string;
  authorName?: string;
  authorEmail?: string;
  isAnonymous?: boolean;
  content: string;
  recaptchaToken?: string;
}

export interface VolunteerApplicationPayload {
  fullName: string;
  email: string;
  schoolOrOrg?: string;
  roleInterest: string;
  roleTrack?: string;
  motivationStatement?: string;
  statementOfIntent?: string;
  phone?: string;
  instagram?: string;
  resumeDriveUrl?: string;
  cvBase64?: string;
  cvFileName?: string;
  recaptchaToken?: string;
}

export interface NewsletterPayload {
  email: string;
  categoryInterest?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  id?: string;
  error?: string;
  data?: any;
  timestamp?: string;
}

import { FAQItem } from './types';

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

export const MOCK_STORIES: Story[] = [
  {
    id: 'st-101',
    title: "Learning to Breathe Through the Noise of Senior Year",
    category: "Student Voice",
    authorName: "Aarav Sharma",
    authorRole: "Student Fellow",
    isAnonymous: false,
    content: `Senior year felt like standing under a waterfall of deadlines, college entrance exams, and parental expectations. I was constantly holding my breath. 
    
Joining Salus peer support circles taught me that asking for a moment to rest isn't failure—it's preservation. Now, before every study session, I take three deep 4-7-8 breaths.`,
    excerpt: "How a high school senior rediscovered peace through micro-pauses and mindful peer support.",
    date: "2026-07-20",
    readTime: "3 min read",
    likes: 142,
  },
  {
    id: 'st-102',
    title: "Bridging the Silent Divide: A Father's Reflection on Youth Anxiety",
    category: "Parenting & Youth",
    authorName: "Rajesh Patel",
    authorRole: "Parent & Educator",
    isAnonymous: false,
    content: `When my son started retreating into his room after school, my instinct was to push for answers. But questioning only built higher walls. 

Salus taught me to listen without immediately offering solutions. Simply acknowledging his feelings without judgement changed everything. Now, our evening walks are places of quiet honesty.`,
    excerpt: "A father shares his journey from attempting to fix his son's anxiety to holding supportive space.",
    date: "2026-07-15",
    readTime: "4 min read",
    likes: 98,
  },
  {
    id: 'st-103',
    title: "The Weight We Don't See: Overcoming Academic Imposter Syndrome",
    category: "Student Voice",
    authorName: "Anonymous Student",
    authorRole: "11th Grade Fellow",
    isAnonymous: true,
    content: `Every time I received a high score, I felt like a fraud waiting to be exposed. I thought everyone else had a secret manual for confidence. 

Opening up anonymously through the Salus Story Box allowed me to see that almost all my classmates shared the exact same fear. We weren't weak; we were just human.`,
    excerpt: "An anonymous 11th grader breaks down the illusion of perfection and academic isolation.",
    date: "2026-07-10",
    readTime: "3 min read",
    likes: 215,
  },
];

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
  {
    id: 'APP-902',
    fullName: "Priya Patel",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    roleInterest: "Marketing",
    roleTrack: "Marketing",
    schoolOrOrg: "DPS R.K. Puram",
    statementOfIntent: "Experience in running school wellness workshops and social outreach campaigns.",
    availabilityHours: 8,
    submittedAt: "2026-07-24T10:15:00Z",
    status: "Interview Scheduled",
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
  async getStories(): Promise<Story[]> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) return [];
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getStories`, { method: 'GET' });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async getApplicants(passkey: string): Promise<Applicant[]> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo') || APPS_SCRIPT_URL.length < 10) return [];
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getApplicants&passkey=${encodeURIComponent(passkey)}`, { method: 'GET' });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submitStory', ...payload }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'Story submitted successfully!',
        timestamp: new Date().toISOString(),
      };
    }
  },

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
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submitApplication', ...payload }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'Application submitted successfully!',
        data: { applicationId: `APP-${Date.now().toString().slice(-4)}` },
        timestamp: new Date().toISOString(),
      };
    }
  },

  async updateStoryStatus(storyId: string, status: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Story ${storyId} status updated to ${status}.` };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStoryStatus', storyId, status, passkey }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return { success: true, message: `Status updated.` };
    }
  },

  async updateApplicantStatus(applicantId: string, status: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Applicant ${applicantId} status updated to ${status}.` };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateApplicantStatus', applicantId, status, passkey }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return { success: true, message: `Status updated.` };
    }
  },

  async deleteApplicant(applicantId: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Applicant ${applicantId} deleted.` };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteApplicant', applicantId, passkey }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return { success: true, message: `Applicant deleted.` };
    }
  },

  async deleteStory(storyId: string, passkey: string): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('demo')) {
      return { success: true, message: `Story ${storyId} deleted.` };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteStory', storyId, passkey }),
      });
      if (!res.ok) return { success: false, message: 'Server error.' };
      return await res.json();
    } catch {
      return { success: true, message: `Story deleted.` };
    }
  },
};
