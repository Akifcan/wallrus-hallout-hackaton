import { ReactNode } from "react";
import AuthGuard from "../auth/AuthGuard";
import ResearchHeader from "../research/ResearchHeader";

export default function DashboardLayout({ title, children }: { title: string, children: ReactNode }) {
    return <AuthGuard>
        <main className="min-h-screen bg-[#f5f5f3]">
            <ResearchHeader />
            <div className="max-w-[1600px] mx-auto px-8 py-12 pt-40">
                {/* Dashboard Header */}
                <div className="mb-12">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 mb-6">
                                <div className="w-3 h-3 bg-black" />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                                    {title}
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-24 h-24 border-2 border-black bg-black rotate-[-4deg]" />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </main>
    </AuthGuard>
}