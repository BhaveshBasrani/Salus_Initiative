import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import { DynamicIsland } from '@/components/dynamic-island';
import { Footer } from '@/components/footer';
import { GrainOverlay } from '@/components/grain-overlay';
import { StoryModal } from '@/components/story-modal';
import { VolunteerWizard } from '@/components/volunteer-wizard';
import { LoadingScreen } from '@/components/loading-screen';
import { ThemeInitializer } from '@/components/theme-initializer';
import { Toaster } from 'sonner';

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lf9R2ktAAAAAFR1Q-8N_bO9F-R6u2W35yuJyoC7';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://salusinitiative.org'),
  title: 'Salus Initiative — Youth Mental Health & Emotional Well-Being',
  description: 'Salus Initiative is a peer-led mental health advocacy platform. Exploring emotional resilience, community storytelling, and youth empowerment.',
  openGraph: {
    title: 'Salus Initiative — Youth Mental Health Platform',
    description: 'Empowering students, parents, and schools through stories, whispers, and peer support.',
    url: 'https://salusinitiative.org',
    siteName: 'Salus Initiative',
    images: [{ url: '/Logo.png', width: 800, height: 600 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salus Initiative — Youth Mental Health',
    description: 'Stories, resources, and community for mental well-being.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[var(--app-bg)] text-[var(--text-main)] antialiased selection:bg-[var(--primary-accent)] selection:text-[var(--button-text)]">
        <ThemeInitializer />
        <LoadingScreen />
        <GrainOverlay />
        <DynamicIsland />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <StoryModal />
        <VolunteerWizard />
        <Toaster position="top-right" theme="dark" />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
