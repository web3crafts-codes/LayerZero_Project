import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// ─── Above-the-fold: load immediately ─────────────────────────────────────
import Hero from '@/components/Hero';
import LiveStats from '@/components/LiveStats';

// ─── Below-the-fold: lazy load to reduce initial JS bundle ─────────────────
const BuySection = dynamic(() => import('@/components/BuySection'));
const ClaimSection = dynamic(() => import('@/components/ClaimSection'));
const Tokenomics = dynamic(() => import('@/components/Tokenomics'));
const Roadmap = dynamic(() => import('@/components/Roadmap'));
const Story = dynamic(() => import('@/components/Story'));
const Community = dynamic(() => import('@/components/Community'));
const Security = dynamic(() => import('@/components/Security'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'));
const Footer = dynamic(() => import('@/components/Footer'));

// Minimal skeleton shown while a lazy section loads
function SectionSkeleton() {
  return <div className="w-full py-20 bg-black/60 animate-pulse" />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Above the fold — always loaded eagerly */}
      <Hero />
      <LiveStats />

      {/* Buy & Claim Section */}
      <section
        id="buy-section"
        className="py-20 relative bg-black/60 backdrop-blur-md border-t border-purple-900/30 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <Suspense fallback={<SectionSkeleton />}>
              <ClaimSection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <BuySection />
            </Suspense>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <Tokenomics />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Roadmap />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Story />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Community />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Security />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AdminDashboard />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Footer />
      </Suspense>
    </main>
  );
}
