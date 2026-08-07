import React from 'react';
import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingHero } from '@/components/landing/LandingHero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { IdeaSection } from '@/components/landing/IdeaSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ProductPreviewSection } from '@/components/landing/ProductPreviewSection';
import { ContentTypesSection } from '@/components/landing/ContentTypesSection';
import { AISection } from '@/components/landing/AISection';
import { RediscoverySection } from '@/components/landing/RediscoverySection';
import { PersonalStatementSection } from '@/components/landing/PersonalStatementSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

export const metadata: Metadata = {
  title: 'GoAtlas — Your Personal Internet OS',
  description:
    'GoAtlas helps you save, organize, search, and rediscover everything worth remembering from the Internet.',
  openGraph: {
    title: 'GoAtlas — Your Personal Internet OS',
    description:
      'GoAtlas helps you save, organize, search, and rediscover everything worth remembering from the Internet.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <LandingNavbar />
      <main>
        <LandingHero />
        <ProblemSection />
        <IdeaSection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <ContentTypesSection />
        <AISection />
        <RediscoverySection />
        <PersonalStatementSection />
      </main>
      <LandingFooter />
    </div>
  );
}
