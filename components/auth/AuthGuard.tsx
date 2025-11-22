"use client";

import { useEffect, useState, ReactNode } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = "/" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const currentAccount = useCurrentAccount();
  const router = useRouter();

  useEffect(() => {
    if (!currentAccount) {
      router.push(redirectTo);
    } else {
      setIsLoading(false);
    }
  }, [currentAccount, router, redirectTo]);

  if (isLoading || !currentAccount) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto mb-6"></div>
          <p className="font-mono text-sm uppercase tracking-wider text-black">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
