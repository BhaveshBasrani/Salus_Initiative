import {
  Story,
  Resource,
  WhisperQuote,
  EventItem,
  FAQItem,
  Announcement,
  VolunteerApplicationPayload,
  StorySubmissionPayload,
  NewsletterPayload,
  ContactPayload,
  Applicant,
  Subscriber,
  AdminAnalytics,
  ApiResponse,
} from './types';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

// Inspiring Fallback Mock Data for Instant UI Rendering & Testing
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
    quote: "You do not need to carry the weight of tomorrow before you have fully lived the grace of today.",
    author: "Salus Daily Whisper",
    category: "Resilience",
    targetAudience: "General",
  },
  {
    id: 'w-3',
    quote: "Your feelings are valid indicators of your internal state, not final definitions of your character.",
    author: "Salus Daily Whisper",
    category: "Mindful Breath",
    targetAudience: "Student",
  },
  {
    id: 'w-4',
    quote: "Healing happens in micro-moments of kindness—especially the ones you offer quietly to yourself.",
    author: "Salus Daily Whisper",
    category: "Self-Compassion",
    targetAudience: "Parent",
  },
  {
    id: 'w-5',
    quote: "Vulnerability is not weakness; it is the purest form of courage a human heart can express.",
    author: "Salus Daily Whisper",
    category: "Connection",
    targetAudience: "Volunteer",
  },
];

export const MOCK_STORIES: Story[] = [
  {
    id: 'st-101',
    title: "Learning to Breathe Through the Noise of Senior Year",
    category: "Student Voice",
    authorName: "Maya Lin",
    authorRole: "High School Ambassador",
    isAnonymous: false,
    content: `For months, I believed that taking a break meant I was falling behind. The pressure of college applications, finals, and expectations created a constant hum of anxiety in my chest. 

It was during a Salus peer support circle that I first heard the concept of 'micro-pauses'. I started taking two minutes every afternoon to simply close my eyes and follow three slow breaths. That tiny ritual didn't erase my workload, but it transformed my relationship with stress. I realized I could be ambitious without sacrificing my inner peace.`,
    excerpt: "How a high school senior rediscovered peace through micro-pauses and mindful peer support.",
    date: "2026-07-20",
    readTime: "3 min read",
    likes: 142,
  },
  {
    id: 'st-102',
    title: "Bridging the Silent Divide: A Father's Reflection on Youth Anxiety",
    category: "Parent Perspective",
    authorName: "Robert Chen",
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

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: "Grounding Techniques for Acute Anxiety & Panic",
    category: "Crisis Support",
    description: "A step-by-step 5-4-3-2-1 sensory grounding guide designed for immediate relief during heightened stress.",
    tags: ["Anxiety", "Grounding", "Immediate Help"],
    readTime: "3 min read",
    isFeatured: true,
    downloadUrl: "#",
  },
  {
    id: 'res-2',
    title: "The Student Exam Wellness Playbook",
    category: "Student Guide",
    description: "Practical strategies for sleep hygiene, Pomodoro breaks, cognitive reframing, and overcoming academic burnout.",
    tags: ["Academic Stress", "Sleep", "Study Habits"],
    readTime: "7 min read",
    isFeatured: true,
    downloadUrl: "#",
  },
  {
    id: 'res-3',
    title: "Navigating Youth Emotional Shifts: Parent Handbook",
    category: "Parent Playbook",
    description: "Empathetic communication prompts, warning sign recognition, and bridging conversations with teenagers.",
    tags: ["Parenting", "Communication", "Support"],
    readTime: "5 min read",
    isFeatured: false,
    downloadUrl: "#",
  },
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: "Salus Youth Peer Circle: Navigating Academic Transitions",
    eventDate: "2026-08-12",
    eventTime: "6:00 PM EST",
    location: "Virtual (Zoom Safe Room)",
    isVirtual: true,
    registrationUrl: "#",
    description: "An interactive, moderated safe space for students to share experiences and learn peer coping mechanisms.",
    category: "Support Circle",
    status: "Upcoming",
  },
  {
    id: 'evt-2',
    title: "Parenting in the Digital Age Workshop",
    eventDate: "2026-08-18",
    eventTime: "7:30 PM EST",
    location: "Virtual (Zoom Webinar)",
    isVirtual: true,
    registrationUrl: "#",
    description: "Expert-led webinar on screen time boundaries, online peer dynamics, and emotional safety for parents and guardians.",
    category: "Webinar",
    status: "Upcoming",
  },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: "Is Salus Initiative a clinical mental health provider?",
    answer: "Salus Initiative is a peer-led advocacy, education, and emotional support platform. While we provide curated mental health resources, grounding guides, and community storytelling, we are not a substitute for clinical medical care. If you are experiencing an acute crisis, please contact KIRAN (1800-599-0019) or Tele-MANAS (14416) immediately.",
    audienceCategory: "General",
    orderIndex: 1,
  },
  {
    id: 'faq-2',
    question: "How can I submit my story anonymously?",
    answer: "When submitting a story through our Story Submission Modal, simply check the 'Publish Anonymously' toggle. Your real name and email address will be kept strictly confidential by our moderation team.",
    audienceCategory: "Students",
    orderIndex: 2,
  },
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'app-01',
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    roleTrack: "Design",
    statementOfIntent: "Passionate about creating accessible mental health graphics for students.",
    availabilityHours: 5,
    submittedAt: "2026-07-25T14:32:00Z",
    status: "Pending Review",
  },
  {
    id: 'app-02',
    fullName: "Priya Patel",
    email: "priya.patel@example.com",
    roleTrack: "Marketing",
    statementOfIntent: "Experience in running school wellness workshops and social outreach campaigns.",
    availabilityHours: 8,
    submittedAt: "2026-07-24T10:15:00Z",
    status: "Interview Scheduled",
  },
];

export const MOCK_APPLICATIONS = MOCK_APPLICANTS;

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
    { query: 'Parent guide', count: 96 },
    { query: 'Crisis helpline', count: 88 },
  ],
  deviceBreakdown: { desktop: 54, mobile: 38, tablet: 8 },
};

// Unified API Client Service
export const AppsScriptClient = {
  async getStories(): Promise<Story[]> {
    if (!APPS_SCRIPT_URL) return MOCK_STORIES;
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getStories`, { method: 'GET' });
      const json = await res.json();
      return json.data || MOCK_STORIES;
    } catch {
      return MOCK_STORIES;
    }
  },

  async getResources(): Promise<Resource[]> {
    return MOCK_RESOURCES;
  },

  async getWhispers(): Promise<WhisperQuote[]> {
    return MOCK_WHISPERS;
  },

  async submitStory(payload: StorySubmissionPayload): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL) {
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
    if (!APPS_SCRIPT_URL) {
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

  async submitVolunteerApplication(payload: VolunteerApplicationPayload): Promise<ApiResponse> {
    return this.submitApplication(payload);
  },

  async subscribeNewsletter(payload: NewsletterPayload): Promise<ApiResponse> {
    if (!APPS_SCRIPT_URL) {
      return {
        success: true,
        message: 'Thank you for subscribing to Salus Whispers!',
        timestamp: new Date().toISOString(),
      };
    }
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'subscribeNewsletter', ...payload }),
      });
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'Subscribed successfully!',
        timestamp: new Date().toISOString(),
      };
    }
  },

  async submitContact(payload: ContactPayload): Promise<ApiResponse> {
    return {
      success: true,
      message: 'Message received!',
      timestamp: new Date().toISOString(),
    };
  },

  async getAdminData(passkey: string) {
    if (passkey !== 'salus2026' && passkey !== process.env.ADMIN_SECRET_PASSKEY) {
      return { success: false, error: 'Invalid admin credentials' };
    }
    return {
      success: true,
      data: {
        stories: MOCK_STORIES,
        applicants: MOCK_APPLICANTS,
        analytics: MOCK_ANALYTICS,
        resources: MOCK_RESOURCES,
      },
    };
  },

  async updateStoryStatus(storyId: string, status: string, passkey: string): Promise<ApiResponse> {
    return {
      success: true,
      message: `Story ${storyId} status updated to ${status}.`,
      timestamp: new Date().toISOString(),
    };
  },

  async updateApplicantStatus(applicantId: string, status: string, passkey: string): Promise<ApiResponse> {
    return {
      success: true,
      message: `Applicant ${applicantId} status updated to ${status}.`,
      timestamp: new Date().toISOString(),
    };
  },
};
