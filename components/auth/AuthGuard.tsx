"use client";

import { Suspense, ReactNode } from "react";
import AuthGuardContent from "./AuthGuardContent";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = "/" }: AuthGuardProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto mb-6"></div>
            <p className="font-mono text-sm uppercase tracking-wider text-black">
              Loading...
            </p>
          </div>
        </main>
      }
    >
      <AuthGuardContent redirectTo={redirectTo}>
        {children}
      </AuthGuardContent>
    </Suspense>
  );
}
