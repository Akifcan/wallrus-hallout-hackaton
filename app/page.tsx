"use client";

import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchHero from "@/components/research/ResearchHero";
import FeaturesGrid from "@/components/research/FeaturesGrid";
import ResearchFooter from "@/components/research/ResearchFooter";

export default function ResearchPage() {
  return (
    <main className="bg-[#f5f5f3]">
      <ResearchHeader />
      <ResearchHero />
      <FeaturesGrid />
      <ResearchFooter />
    </main>
  );
}
