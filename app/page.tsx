"use client";

import { useState } from "react";
import ResearchDesk from "@/components/academic/ResearchDesk";
import ResearchPaper from "@/components/academic/ResearchPaper";
import ResearchNav from "@/components/academic/ResearchNav";
import AcademicHeader from "@/components/academic/AcademicHeader";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  const papers = [
    {
      title: "Advanced Search Intelligence for Academic Research",
      abstract:
        "This platform introduces a novel approach to academic information retrieval using Google dork optimization techniques combined with artificial intelligence. Our system rewrites queries, applies advanced search operators, and filters results with unprecedented precision.",
      content: [
        {
          heading: "Query Optimization Engine",
          text: "The search intelligence module employs advanced Google dork techniques to construct highly specific queries. Boolean operators, file type filters, and domain-specific targeting ensure researchers find exactly what they need. The system supports temporal filtering, language detection, and semantic understanding of research intent.",
        },
        {
          heading: "Multi-Source Integration",
          text: "Our platform seamlessly integrates with academic databases, institutional repositories, and open-access journals. Real-time indexing across multiple sources ensures comprehensive coverage of scholarly literature. The system prioritizes peer-reviewed sources while maintaining access to preprints and working papers.",
        },
        {
          heading: "Performance Metrics",
          text: "Empirical testing demonstrates 98.7% search precision with an average response time of 0.34 seconds. The system processes millions of documents daily, with relevance scoring algorithms trained on academic citation patterns. User studies show a 70% reduction in time spent searching for relevant literature.",
        },
      ],
    },
    {
      title: "Neural Summarization and Content Analysis",
      abstract:
        "We present a state-of-the-art AI system for academic document analysis. Built on transformer architecture with custom fine-tuning on scholarly corpora, our model provides context-aware summarization, citation extraction, and semantic understanding of research papers.",
      content: [
        {
          heading: "AI Architecture",
          text: "The neural engine consists of 128 layers trained on over 500TB of academic corpus. Our model combines GPT-4 architecture with domain-specific fine-tuning for academic writing styles. The system understands discipline-specific terminology, methodological descriptions, and research contributions.",
        },
        {
          heading: "Summarization Capabilities",
          text: "Context-aware abstractive summarization preserves key findings, methodology, and conclusions. The system extracts structured information including research questions, hypotheses, experimental designs, and statistical results. Multi-document synthesis enables literature review automation with proper citation management.",
        },
        {
          heading: "Quality Assurance",
          text: "Validation against human expert summaries shows 94.3% accuracy in preserving essential information. The system processes 1,000 documents per minute while maintaining semantic fidelity. Automated fact-checking and citation verification ensure research integrity.",
        },
      ],
    },
    {
      title: "Decentralized Research Storage on Walrus Blockchain",
      abstract:
        "This paper describes the integration of blockchain technology for permanent, secure academic data storage. Built on the Walrus decentralized network, our system ensures research permanence, cryptographic security, and distributed redundancy for scholarly work.",
      content: [
        {
          heading: "Blockchain Infrastructure",
          text: "The Walrus network comprises 10,247 active nodes providing distributed storage with 99.999% redundancy. All documents are encrypted using AES-256 before storage, with keys managed through secure multi-party computation. IPFS integration enables content-addressable storage with cryptographic verification.",
        },
        {
          heading: "Data Permanence",
          text: "Unlike traditional cloud storage, blockchain-based systems guarantee perpetual data availability. Research outputs remain accessible indefinitely without recurring costs or vendor lock-in. The immutable ledger prevents unauthorized modifications while maintaining version history.",
        },
        {
          heading: "Security and Privacy",
          text: "Military-grade encryption protects sensitive research data. Access control mechanisms enable fine-grained permissions for collaborative projects. The decentralized architecture eliminates single points of failure, ensuring 99.97% uptime. Regular security audits and penetration testing maintain system integrity.",
        },
      ],
    },
    {
      title: "Complete Research Platform: Features and Capabilities",
      abstract:
        "DocScout represents a comprehensive solution for modern academic research. This paper provides an overview of the integrated platform, including search intelligence, AI analysis, decentralized storage, citation management, collaboration tools, and analytics dashboard.",
      content: [
        {
          heading: "Platform Overview",
          text: "DocScout serves over 10,000 researchers worldwide, processing 5 million queries monthly across 1 million indexed documents. The platform integrates six core modules: search engine, AI summarization, blockchain storage, citation generator, collaboration hub, and analytics dashboard. All components work seamlessly to accelerate research workflows.",
        },
        {
          heading: "Collaboration Features",
          text: "Real-time collaborative workspaces enable research teams to share documents, annotations, and insights. Version control tracks changes across team members. Integrated communication tools support asynchronous and synchronous collaboration. Project management features include task assignment, milestone tracking, and deadline management.",
        },
        {
          heading: "Future Development",
          text: "Upcoming features include enhanced machine learning models for hypothesis generation, expanded multi-lingual support, and integration with laboratory information management systems. The Q2 2025 update will introduce automated systematic review tools and meta-analysis capabilities. Community feedback drives continuous improvement of the platform.",
        },
      ],
    },
  ];

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header */}
      <AcademicHeader />

      {/* 3D Research Desk */}
      <ResearchDesk activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Navigation Sidebar */}
      <ResearchNav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Research Paper Display */}
      <ResearchPaper
        title={papers[activeSection].title}
        abstract={papers[activeSection].abstract}
        content={papers[activeSection].content}
        isActive={true}
      />

      {/* Instructions Overlay */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            Click on floating papers to explore different research sections
          </p>
        </div>
      </div>
    </main>
  );
}
