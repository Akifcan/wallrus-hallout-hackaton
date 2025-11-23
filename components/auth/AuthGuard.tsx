"use client";

import { useEffect, useState, ReactNode } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";
import instance from "@/lib/api";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = "/" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const currentAccount = useCurrentAccount();
  const router = useRouter();

  useEffect(() => {
    // Wait a bit for wallet to initialize
    const timer = setTimeout(() => {
      setCheckedAuth(true);

      if (!currentAccount) {
        router.push(redirectTo);
      } else {
        instance.defaults.headers['x-wallet-address'] = currentAccount.address;
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentAccount, router, redirectTo]);

  // Update headers when currentAccount changes
  useEffect(() => {
    if (currentAccount && checkedAuth) {
      instance.defaults.headers['x-wallet-address'] = currentAccount.address;
      // Use setTimeout to avoid synchronous setState
      setTimeout(() => setIsLoading(false), 0);
    }
  }, [currentAccount, checkedAuth]);

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
