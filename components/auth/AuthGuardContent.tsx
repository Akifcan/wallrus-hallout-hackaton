"use client";

import { useEffect, useState, ReactNode } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/lib/api";

interface AuthGuardContentProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthGuardContent({ children, redirectTo = "/" }: AuthGuardContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const currentAccount = useCurrentAccount();
  const router = useRouter();
  const searchParams = useSearchParams();

  const DEMO_ACCOUNT_ADDRESS = "0xbed1a0d1bb2b8e281d81b838f6c35d7864936f0de3233eb161181ab765e0ea40";
  const isDemoAccount = searchParams.get("demo-account") === "true";

  useEffect(() => {
    // Wait a bit for wallet to initialize
    const timer = setTimeout(() => {
      setCheckedAuth(true);

      if (isDemoAccount) {
        // Demo account login
        instance.defaults.headers['x-wallet-address'] = DEMO_ACCOUNT_ADDRESS;
        setIsLoading(false);
      } else if (!currentAccount) {
        router.push(redirectTo);
      } else {
        instance.defaults.headers['x-wallet-address'] = currentAccount.address;
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentAccount, router, redirectTo, isDemoAccount]);

  // Update headers when currentAccount changes
  useEffect(() => {
    if (currentAccount && checkedAuth && !isDemoAccount) {
      instance.defaults.headers['x-wallet-address'] = currentAccount.address;
      // Use setTimeout to avoid synchronous setState
      setTimeout(() => setIsLoading(false), 0);
    }
  }, [currentAccount, checkedAuth, isDemoAccount]);

  if (isLoading || (!currentAccount && !isDemoAccount)) {
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
