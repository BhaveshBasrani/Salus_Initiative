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
  // Mental Health & Healing (1–15)
  { id: 'q-1', quote: "There is hope, even when your brain tells you there isn't.", author: "John Green", category: "Mental Health & Healing" },
  { id: 'q-2', quote: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman", category: "Mental Health & Healing" },
  { id: 'q-3', quote: "Mental health...is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer", category: "Mental Health & Healing" },
  { id: 'q-4', quote: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn", category: "Mental Health & Healing" },
  { id: 'q-5', quote: "The bravest thing I ever did was continuing my life when I wanted to die.", author: "Juliette Lewis", category: "Mental Health & Healing" },
  { id: 'q-6', quote: "Just because no one else can heal or do your inner work for you doesn't mean you can, should, or need to do it alone.", author: "Lisa Olivera", category: "Mental Health & Healing" },
  { id: 'q-7', quote: "It's okay to not be okay, as long as you are not giving up.", author: "Karen Salmansohn", category: "Mental Health & Healing" },
  { id: 'q-8', quote: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay", category: "Mental Health & Healing" },
  { id: 'q-9', quote: "You are not your illness. You have an individual story to tell.", author: "Julian Seifter", category: "Mental Health & Healing" },
  { id: 'q-10', quote: "What mental health needs is more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close", category: "Mental Health & Healing" },
  { id: 'q-11', quote: "Recovery is not one and done. It is a lifelong journey that takes place one day, one step at a time.", author: "Unknown", category: "Mental Health & Healing" },
  { id: 'q-12', quote: "There is no health without mental health.", author: "David Satcher", category: "Mental Health & Healing" },
  { id: 'q-13', quote: "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.", author: "Brené Brown", category: "Mental Health & Healing" },
  { id: 'q-14', quote: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "Mental Health & Healing" },
  { id: 'q-15', quote: "The only journey is the one within.", author: "Rainer Maria Rilke", category: "Mental Health & Healing" },

  // Resilience & Strength (16–35)
  { id: 'q-16', quote: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne", category: "Resilience & Strength" },
  { id: 'q-17', quote: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling", category: "Resilience & Strength" },
  { id: 'q-18', quote: "The wound is the place where the Light enters you.", author: "Rumi", category: "Resilience & Strength" },
  { id: 'q-19', quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "Resilience & Strength" },
  { id: 'q-20', quote: "Out of difficulties grow miracles.", author: "Jean de La Bruyère", category: "Resilience & Strength" },
  { id: 'q-21', quote: "The struggle you're in today is developing the strength you need for tomorrow.", author: "Robert Tew", category: "Resilience & Strength" },
  { id: 'q-22', quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "Resilience & Strength" },
  { id: 'q-23', quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "Resilience & Strength" },
  { id: 'q-24', quote: "Every storm runs out of rain.", author: "Maya Angelou", category: "Resilience & Strength" },
  { id: 'q-25', quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy", category: "Resilience & Strength" },
  { id: 'q-26', quote: "Tough times never last, but tough people do.", author: "Robert H. Schuller", category: "Resilience & Strength" },
  { id: 'q-27', quote: "I can be changed by what happens to me, but I refuse to be reduced by it.", author: "Maya Angelou", category: "Resilience & Strength" },
  { id: 'q-28', quote: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'", author: "Mary Anne Radmacher", category: "Resilience & Strength" },
  { id: 'q-29', quote: "The oak fought the wind and was broken, the willow bent when it must and survived.", author: "Robert Jordan", category: "Resilience & Strength" },
  { id: 'q-30', quote: "Fall seven times, stand up eight.", author: "Japanese proverb", category: "Resilience & Strength" },
  { id: 'q-31', quote: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche", category: "Resilience & Strength" },
  { id: 'q-32', quote: "When you come out of the storm, you won't be the same person who walked in.", author: "Haruki Murakami", category: "Resilience & Strength" },
  { id: 'q-33', quote: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger", category: "Resilience & Strength" },
  { id: 'q-34', quote: "Difficulties in life are intended to make us better, not bitter.", author: "Dan Reeves", category: "Resilience & Strength" },
  { id: 'q-35', quote: "The human capacity for burden is like bamboo — far more flexible than you'd ever believe.", author: "Jodi Picoult", category: "Resilience & Strength" },

  // Self-Compassion & Acceptance (36–55)
  { id: 'q-36', quote: "Talk to yourself like you would to someone you love.", author: "Brené Brown", category: "Self-Compassion & Acceptance" },
  { id: 'q-37', quote: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha", category: "Self-Compassion & Acceptance" },
  { id: 'q-38', quote: "Be gentle with yourself. You're doing the best you can.", author: "Unknown", category: "Self-Compassion & Acceptance" },
  { id: 'q-39', quote: "Your value doesn't decrease based on someone's inability to see your worth.", author: "Unknown", category: "Self-Compassion & Acceptance" },
  { id: 'q-40', quote: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush", category: "Self-Compassion & Acceptance" },
  { id: 'q-41', quote: "Fill your own cup first.", author: "Unknown", category: "Self-Compassion & Acceptance" },
  { id: 'q-42', quote: "Self-love, my liege, is not so vile a sin as self-neglecting.", author: "William Shakespeare", category: "Self-Compassion & Acceptance" },
  { id: 'q-43', quote: "Comparison is the thief of joy.", author: "Theodore Roosevelt", category: "Self-Compassion & Acceptance" },
  { id: 'q-44', quote: "Nothing is permanent in this wicked world, not even our troubles.", author: "Charlie Chaplin", category: "Self-Compassion & Acceptance" },
  { id: 'q-45', quote: "You don't have to be perfect to be worthy of love and belonging.", author: "Brené Brown", category: "Self-Compassion & Acceptance" },
  { id: 'q-46', quote: "To love oneself is the beginning of a lifelong romance.", author: "Oscar Wilde", category: "Self-Compassion & Acceptance" },
  { id: 'q-47', quote: "Give yourself permission to be a beginner. By definition, you can't be good at something new.", author: "Unknown", category: "Self-Compassion & Acceptance" },
  { id: 'q-48', quote: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "Self-Compassion & Acceptance" },
  { id: 'q-49', quote: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung", category: "Self-Compassion & Acceptance" },
  { id: 'q-50', quote: "You alone are enough. You have nothing to prove to anybody.", author: "Maya Angelou", category: "Self-Compassion & Acceptance" },
  { id: 'q-51', quote: "Forgiving yourself is the first step to healing.", author: "Unknown", category: "Self-Compassion & Acceptance" },
  { id: 'q-52', quote: "Be kind to yourself. It's hard to be alive.", author: "Adele Ahlberg Calhoun", category: "Self-Compassion & Acceptance" },
  { id: 'q-53', quote: "What you think of yourself is much more important than what others think of you.", author: "Seneca", category: "Self-Compassion & Acceptance" },
  { id: 'q-54', quote: "Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from the overflow.", author: "Eleanor Brownn", category: "Self-Compassion & Acceptance" },
  { id: 'q-55', quote: "Don't judge yourself by your worst moments. Judge yourself by the intentions and efforts you make.", author: "Unknown", category: "Self-Compassion & Acceptance" },

  // Mindfulness & Presence (56–75)
  { id: 'q-56', quote: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Alice Morse Earle", category: "Mindfulness & Presence" },
  { id: 'q-57', quote: "Wherever you are, be all there.", author: "Jim Elliot", category: "Mindfulness & Presence" },
  { id: 'q-58', quote: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh", category: "Mindfulness & Presence" },
  { id: 'q-59', quote: "Peace comes from within. Do not seek it without.", author: "Buddha", category: "Mindfulness & Presence" },
  { id: 'q-60', quote: "You must learn to let go. Release the stress. You were never in control anyway.", author: "Steve Maraboli", category: "Mindfulness & Presence" },
  { id: 'q-61', quote: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey", category: "Mindfulness & Presence" },
  { id: 'q-62', quote: "Slow down and everything you are chasing will come around and catch you.", author: "John De Paola", category: "Mindfulness & Presence" },
  { id: 'q-63', quote: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh", category: "Mindfulness & Presence" },
  { id: 'q-64', quote: "The best way to capture moments is to pay attention.", author: "Jon Kabat-Zinn", category: "Mindfulness & Presence" },
  { id: 'q-65', quote: "Mindfulness is a way of befriending ourselves and our experience.", author: "Jon Kabat-Zinn", category: "Mindfulness & Presence" },
  { id: 'q-66', quote: "Wherever you go, there you are.", author: "Jon Kabat-Zinn", category: "Mindfulness & Presence" },
  { id: 'q-67', quote: "Life is available only in the present moment.", author: "Thich Nhat Hanh", category: "Mindfulness & Presence" },
  { id: 'q-68', quote: "Realize deeply that the present moment is all you ever have.", author: "Eckhart Tolle", category: "Mindfulness & Presence" },
  { id: 'q-69', quote: "Silence is a source of great strength.", author: "Lao Tzu", category: "Mindfulness & Presence" },
  { id: 'q-70', quote: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati", category: "Mindfulness & Presence" },
  { id: 'q-71', quote: "Nowhere can man find a quieter or more untroubled retreat than in his own soul.", author: "Marcus Aurelius", category: "Mindfulness & Presence" },
  { id: 'q-72', quote: "The quieter you become, the more you can hear.", author: "Ram Dass", category: "Mindfulness & Presence" },
  { id: 'q-73', quote: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra", category: "Mindfulness & Presence" },
  { id: 'q-74', quote: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse", category: "Mindfulness & Presence" },
  { id: 'q-75', quote: "One moment of patience may ward off great disaster; one moment of impatience may ruin a whole life.", author: "Chinese proverb", category: "Mindfulness & Presence" },

  // Hope & Growth (76–95)
  { id: 'q-76', quote: "This too shall pass.", author: "Persian adage", category: "Hope & Growth" },
  { id: 'q-77', quote: "Every day may not be good, but there's something good in every day.", author: "Alice Morse Earle", category: "Hope & Growth" },
  { id: 'q-78', quote: "The only way out is through.", author: "Robert Frost", category: "Hope & Growth" },
  { id: 'q-79', quote: "Just when the caterpillar thought the world was over, it became a butterfly.", author: "Proverb", category: "Hope & Growth" },
  { id: 'q-80', quote: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu", category: "Hope & Growth" },
  { id: 'q-81', quote: "Not until we are lost do we begin to understand ourselves.", author: "Henry David Thoreau", category: "Hope & Growth" },
  { id: 'q-82', quote: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Hope & Growth" },
  { id: 'q-83', quote: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", category: "Hope & Growth" },
  { id: 'q-84', quote: "The good life is a process, not a state of being. It is a direction, not a destination.", author: "Carl Rogers", category: "Hope & Growth" },
  { id: 'q-85', quote: "Once you choose hope, anything's possible.", author: "Christopher Reeve", category: "Hope & Growth" },
  { id: 'q-86', quote: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson", category: "Hope & Growth" },
  { id: 'q-87', quote: "Where there is no hope, it is incumbent on us to invent it.", author: "Albert Camus", category: "Hope & Growth" },
  { id: 'q-88', quote: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.", author: "Mandy Hale", category: "Hope & Growth" },
  { id: 'q-89', quote: "And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.", author: "Anaïs Nin", category: "Hope & Growth" },
  { id: 'q-90', quote: "It's never too late to be what you might have been.", author: "George Eliot", category: "Hope & Growth" },
  { id: 'q-91', quote: "The wound is where the light enters, and also where your greatest gifts will emerge.", author: "Rumi", category: "Hope & Growth" },
  { id: 'q-92', quote: "Life isn't about waiting for the storm to pass. It's about learning to dance in the rain.", author: "Vivian Greene", category: "Hope & Growth" },
  { id: 'q-93', quote: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo", category: "Hope & Growth" },
  { id: 'q-94', quote: "You must do the thing you think you cannot do.", author: "Eleanor Roosevelt", category: "Hope & Growth" },
  { id: 'q-95', quote: "What we achieve inwardly will change outer reality.", author: "Plutarch", category: "Hope & Growth" },

  // Asking for Help & Connection (96–110)
  { id: 'q-96', quote: "Asking for help is not giving up; it's refusing to give up.", author: "Charlie Mackesy", category: "Asking for Help & Connection" },
  { id: 'q-97', quote: "There is no shame in taking care of your mental health.", author: "Michelle Obama", category: "Asking for Help & Connection" },
  { id: 'q-98', quote: "Vulnerability is not weakness; it's our greatest measure of courage.", author: "Brené Brown", category: "Asking for Help & Connection" },
  { id: 'q-99', quote: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr.", category: "Asking for Help & Connection" },
  { id: 'q-100', quote: "Sometimes reaching out and taking someone's hand is the beginning of a journey. At other times, it is allowing another to take yours.", author: "Vera Nazarian", category: "Asking for Help & Connection" },
  { id: 'q-101', quote: "We are all a little weird and life is a little weird, and when we find someone whose weirdness is compatible with ours, we join up.", author: "Robert Fulghum", category: "Asking for Help & Connection" },
  { id: 'q-102', quote: "No one can help everyone, but everyone can help someone.", author: "Ronald Reagan", category: "Asking for Help & Connection" },
  { id: 'q-103', quote: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard", category: "Asking for Help & Connection" },
  { id: 'q-104', quote: "Connection is why we're here; it's what gives purpose and meaning to our lives.", author: "Brené Brown", category: "Asking for Help & Connection" },
  { id: 'q-105', quote: "Rock bottom is a great foundation to rebuild on, but you don't have to do it alone.", author: "Unknown", category: "Asking for Help & Connection" },
  { id: 'q-106', quote: "Sometimes the bravest and most important thing you can do is just show up.", author: "Brené Brown", category: "Asking for Help & Connection" },
  { id: 'q-107', quote: "The best mirror is an old friend.", author: "George Herbert", category: "Asking for Help & Connection" },
  { id: 'q-108', quote: "People will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou", category: "Asking for Help & Connection" },
  { id: 'q-109', quote: "It takes courage to grow up and become who you really are.", author: "E.E. Cummings", category: "Asking for Help & Connection" },
  { id: 'q-110', quote: "A problem shared is a problem halved.", author: "English proverb", category: "Asking for Help & Connection" },

  // Gratitude & Perspective (111–125)
  { id: 'q-111', quote: "Gratitude turns what we have into enough.", author: "Aesop", category: "Gratitude & Perspective" },
  { id: 'q-112', quote: "Enjoy the little things, for one day you may look back and realize they were the big things.", author: "Robert Brault", category: "Gratitude & Perspective" },
  { id: 'q-113', quote: "Be thankful for what you have; you'll end up having more.", author: "Oprah Winfrey", category: "Gratitude & Perspective" },
  { id: 'q-114', quote: "Gratitude is not only the greatest of virtues but the parent of all others.", author: "Cicero", category: "Gratitude & Perspective" },
  { id: 'q-115', quote: "The more grateful I am, the more beauty I see.", author: "Mary Davis", category: "Gratitude & Perspective" },
  { id: 'q-116', quote: "Acknowledging the good that you already have in your life is the foundation for all abundance.", author: "Eckhart Tolle", category: "Gratitude & Perspective" },
  { id: 'q-117', quote: "When you arise in the morning, think of what a precious privilege it is to be alive.", author: "Marcus Aurelius", category: "Gratitude & Perspective" },
  { id: 'q-118', quote: "Piglet noticed that even though he had a Very Small Heart, it could hold a rather large amount of Gratitude.", author: "A.A. Milne", category: "Gratitude & Perspective" },
  { id: 'q-119', quote: "Gratitude can transform common days into thanksgivings.", author: "William Arthur Ward", category: "Gratitude & Perspective" },
  { id: 'q-120', quote: "There is always, always, always something to be thankful for.", author: "Unknown", category: "Gratitude & Perspective" },
  { id: 'q-121', quote: "Life is not about waiting for the storm to pass, but learning to dance in the rain.", author: "Vivian Greene", category: "Gratitude & Perspective" },
  { id: 'q-122', quote: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius", category: "Gratitude & Perspective" },
  { id: 'q-123', quote: "Perspective is everything when you are experiencing the challenges of life.", author: "Joni Eareckson Tada", category: "Gratitude & Perspective" },
  { id: 'q-124', quote: "It's not what happens to you, but how you react to it that matters.", author: "Epictetus", category: "Gratitude & Perspective" },
  { id: 'q-125', quote: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", category: "Gratitude & Perspective" },

  // Stress, Anxiety & Letting Go (126–145)
  { id: 'q-126', quote: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-127', quote: "You can't calm the storm, so stop trying. What you can do is calm yourself. The storm will pass.", author: "Timber Hawkeye", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-128', quote: "Worrying does not take away tomorrow's troubles, it takes away today's peace.", author: "Randy Armstrong", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-129', quote: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-130', quote: "Do not anticipate trouble, or worry about what may never happen. Keep in the sunlight.", author: "Benjamin Franklin", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-131', quote: "You wouldn't worry so much about what others think of you if you realized how seldom they do.", author: "Eleanor Roosevelt", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-132', quote: "Some of the worst things in my life never even happened.", author: "Mark Twain", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-133', quote: "Let go of the thoughts that don't make you strong.", author: "Karen Salmansohn", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-134', quote: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-135', quote: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-136', quote: "It's not stress that kills us, it is our reaction to it.", author: "Hans Selye", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-137', quote: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-138', quote: "Inhale the future, exhale the past.", author: "Unknown", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-139', quote: "You can't stop the waves, but you can learn to surf.", author: "Jon Kabat-Zinn", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-140', quote: "Stress is caused by being 'here' but wanting to be 'there.'", author: "Eckhart Tolle", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-141', quote: "Feelings are just visitors, let them come and go.", author: "Mooji", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-142', quote: "The mind is everything. What you think you become.", author: "Buddha", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-143', quote: "Do not let the behavior of others destroy your inner peace.", author: "Dalai Lama", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-144', quote: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse", category: "Stress, Anxiety & Letting Go" },
  { id: 'q-145', quote: "One small crack does not mean that you are broken, it means that you were put to the test and you didn't fall apart.", author: "Linda Poindexter", category: "Stress, Anxiety & Letting Go" },

  // Sleep, Rest & Slowing Down (146–155)
  { id: 'q-146', quote: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-147', quote: "Sleep is the best meditation.", author: "Dalai Lama", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-148', quote: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-149', quote: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-150', quote: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day... is by no means a waste of time.", author: "John Lubbock", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-151', quote: "There is virtue in work and there is virtue in rest. Use both and overlook neither.", author: "Alan Cohen", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-152', quote: "Slow down and everything you are chasing will come around and catch you.", author: "John De Paola", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-153', quote: "Sometimes the most productive thing you can do is relax.", author: "Mark Black", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-154', quote: "Rest is a form of resistance because it disrupts the belief that your worth is your productivity.", author: "Tricia Hersey", category: "Sleep, Rest & Slowing Down" },
  { id: 'q-155', quote: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill", category: "Sleep, Rest & Slowing Down" },

  // Nature & Simplicity (156–165)
  { id: 'q-156', quote: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein", category: "Nature & Simplicity" },
  { id: 'q-157', quote: "In every walk with nature, one receives far more than he seeks.", author: "John Muir", category: "Nature & Simplicity" },
  { id: 'q-158', quote: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", category: "Nature & Simplicity" },
  { id: 'q-159', quote: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson", category: "Nature & Simplicity" },
  { id: 'q-160', quote: "The earth has music for those who listen.", author: "William Shakespeare", category: "Nature & Simplicity" },
  { id: 'q-161', quote: "Keep close to Nature's heart... and break clear away, once in a while.", author: "John Muir", category: "Nature & Simplicity" },
  { id: 'q-162', quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "Nature & Simplicity" },
  { id: 'q-163', quote: "The clearest way into the Universe is through a forest wilderness.", author: "John Muir", category: "Nature & Simplicity" },
  { id: 'q-164', quote: "Everything in nature invites us constantly to be what we are.", author: "Gretel Ehrlich", category: "Nature & Simplicity" },
  { id: 'q-165', quote: "Wilderness is not a luxury but a necessity of the human spirit.", author: "Edward Abbey", category: "Nature & Simplicity" },

  // Purpose, Growth & Becoming (166–185)
  { id: 'q-166', quote: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain", category: "Purpose, Growth & Becoming" },
  { id: 'q-167', quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Purpose, Growth & Becoming" },
  { id: 'q-168', quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", category: "Purpose, Growth & Becoming" },
  { id: 'q-169', quote: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "Purpose, Growth & Becoming" },
  { id: 'q-170', quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant, on Aristotle", category: "Purpose, Growth & Becoming" },
  { id: 'q-171', quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Purpose, Growth & Becoming" },
  { id: 'q-172', quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "Purpose, Growth & Becoming" },
  { id: 'q-173', quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Purpose, Growth & Becoming" },
  { id: 'q-174', quote: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi", category: "Purpose, Growth & Becoming" },
  { id: 'q-175', quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "Purpose, Growth & Becoming" },
  { id: 'q-176', quote: "Change your thoughts and you change your world.", author: "Norman Vincent Peale", category: "Purpose, Growth & Becoming" },
  { id: 'q-177', quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll", category: "Purpose, Growth & Becoming" },
  { id: 'q-178', quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "Purpose, Growth & Becoming" },
  { id: 'q-179', quote: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.", author: "Prasad Mahes", category: "Purpose, Growth & Becoming" },
  { id: 'q-180', quote: "What you seek is seeking you.", author: "Rumi", category: "Purpose, Growth & Becoming" },
  { id: 'q-181', quote: "Do the best you can until you know better. Then when you know better, do better.", author: "Maya Angelou", category: "Purpose, Growth & Becoming" },
  { id: 'q-182', quote: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.", author: "Rumi", category: "Purpose, Growth & Becoming" },
  { id: 'q-183', quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "Purpose, Growth & Becoming" },
  { id: 'q-184', quote: "We must be willing to let go of the life we planned so as to have the life that is waiting for us.", author: "Joseph Campbell", category: "Purpose, Growth & Becoming" },
  { id: 'q-185', quote: "It's not about perfect. It's about effort.", author: "Jillian Michaels", category: "Purpose, Growth & Becoming" },

  // Inner Strength & Self-Worth (186–200)
  { id: 'q-186', quote: "Nobody can make you feel inferior without your consent.", author: "Eleanor Roosevelt", category: "Inner Strength & Self-Worth" },
  { id: 'q-187', quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson", category: "Inner Strength & Self-Worth" },
  { id: 'q-188', quote: "You are enough just as you are.", author: "Meghan Markle", category: "Inner Strength & Self-Worth" },
  { id: 'q-189', quote: "The most important relationship you will ever have is the relationship you have with yourself.", author: "Diane Von Furstenberg", category: "Inner Strength & Self-Worth" },
  { id: 'q-190', quote: "I am not what happened to me, I am what I choose to become.", author: "Carl Jung", category: "Inner Strength & Self-Worth" },
  { id: 'q-191', quote: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins", category: "Inner Strength & Self-Worth" },
  { id: 'q-192', quote: "Whatever you are, be a good one.", author: "Abraham Lincoln", category: "Inner Strength & Self-Worth" },
  { id: 'q-193', quote: "Trust yourself. You know more than you think you do.", author: "Benjamin Spock", category: "Inner Strength & Self-Worth" },
  { id: 'q-194', quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Inner Strength & Self-Worth" },
  { id: 'q-195', quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "Inner Strength & Self-Worth" },
  { id: 'q-196', quote: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou", category: "Inner Strength & Self-Worth" },
  { id: 'q-197', quote: "You are the sky. Everything else is just the weather.", author: "Pema Chödrön", category: "Inner Strength & Self-Worth" },
  { id: 'q-198', quote: "Be the energy you want to attract.", author: "Unknown", category: "Inner Strength & Self-Worth" },
  { id: 'q-199', quote: "You are enough. You have always been enough.", author: "Unknown", category: "Inner Strength & Self-Worth" },
  { id: 'q-200', quote: "The soul that sees beauty may sometimes walk alone.", author: "Johann Wolfgang von Goethe", category: "Inner Strength & Self-Worth" },
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

