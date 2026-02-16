import Hero from "@/components/Hero";
import BuySection from "@/components/BuySection";
import ClaimSection from "@/components/ClaimSection";
import Tokenomics from "@/components/Tokenomics";
import AdminDashboard from "@/components/AdminDashboard";
import LiveStats from "@/components/LiveStats";
import Roadmap from "@/components/Roadmap";
import Story from "@/components/Story";
import Community from "@/components/Community";
import Security from "@/components/Security";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <LiveStats />
      {/* Buy & Claim Section */}
      <section id="buy-section" className="py-20 relative bg-black/60 backdrop-blur-md border-t border-purple-900/30 overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ClaimSection />
            <BuySection />
          </div>
        </div>
      </section>
      <Tokenomics />
      <Roadmap />
      <Story />
      <Community />
      <Security />
      <FAQ />
      <AdminDashboard />
      <Footer />
    </main>
  );
}
