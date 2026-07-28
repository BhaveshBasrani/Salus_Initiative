export type StoryStatus = 'Pending' | 'Approved' | 'Needs Revision' | 'Rejected';
export type ApplicantStatus = 'Submitted' | 'Under Review' | 'Pending Review' | 'Interview Scheduled' | 'Accepted' | 'Rejected' | 'Declined';
export type AdminRole = 'Super Admin' | 'Founder' | 'Moderator' | 'Newsletter Manager' | 'Volunteer Lead';

export interface Story {
  id: string;
  title: string;
  category: string;
  authorName: string;
  authorRole?: string;
  isAnonymous: boolean;
  content: string;
  excerpt: string;
  imageUrl?: string;
  status?: StoryStatus;
  isFeatured?: boolean;
  publishedAt?: string;
  date?: string;
  readTime: string;
  likes: number;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Crisis Support' | 'Student Guide' | 'Parent Playbook' | 'Mindfulness Exercises' | 'School Toolkit';
  description: string;
  contentUrl?: string;
  tags: string[];
  readTime: string;
  isFeatured: boolean;
  downloadUrl?: string;
}

export interface WhisperQuote {
  id: string;
  quote: string;
  author: string;
  category: 'Self-Compassion' | 'Resilience' | 'Hope' | 'Connection' | 'Mindful Breath';
  targetAudience?: 'Student' | 'Parent' | 'Volunteer' | 'General';
}

export interface EventItem {
  id: string;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  isVirtual: boolean;
  registrationUrl: string;
  description: string;
  category: 'Workshop' | 'Webinar' | 'Support Circle' | 'Volunteer Meetup';
  status: 'Upcoming' | 'Completed';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  audienceCategory: 'General' | 'Students' | 'Volunteers' | 'Parents & Schools';
  orderIndex: number;
}

export interface Announcement {
  id: string;
  title: string;
  bannerText: string;
  actionText: string;
  actionUrl: string;
  isActive: boolean;
}

export interface VolunteerApplicationPayload {
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  roleInterest?: string;
  roleTrack?: 'Design' | 'Marketing';
  schoolOrOrg?: string;
  gradeOrTitle?: string;
  motivationStatement?: string;
  statementOfIntent?: string;
  relevantSkills?: string;
  availabilityHours?: number;
  resumeFileName?: string;
  resumeBase64?: string;
  recaptchaToken: string;
}

export interface StorySubmissionPayload {
  title: string;
  category: string;
  authorName: string;
  authorEmail: string;
  isAnonymous: boolean;
  content: string;
  imageFileName?: string;
  imageBase64?: string;
  recaptchaToken: string;
}

export interface NewsletterPayload {
  email: string;
  targetGroup?: 'Student' | 'Parent' | 'Volunteer' | 'Educator';
  recaptchaToken: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

export interface Applicant {
  id: string;
  timestamp?: string;
  submittedAt?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  roleInterest?: string;
  roleTrack?: 'Design' | 'Marketing';
  schoolOrOrg?: string;
  motivationStatement?: string;
  statementOfIntent?: string;
  availabilityHours?: number;
  resumeDriveUrl?: string;
  status: ApplicantStatus;
  notes?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  optInDate: string;
  targetGroup: string;
  status: 'Active' | 'Unsubscribed';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'SECURITY' | 'AUDIT';
  channel: string;
  message: string;
  details?: string;
}

export interface AdminAnalytics {
  totalVisitors: number;
  newsletterSubscribers: number;
  storiesSubmitted: number;
  approvedStories: number;
  applicantsTotal: number;
  applicantsAccepted: number;
  topSearchQueries: { query: string; count: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  applicationId?: string;
}
