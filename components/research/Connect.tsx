"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";

export default function Connect() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    disconnect();
    setDropdownOpen(false);
    router.push("/");
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false);
    router.push("/dashboard");
  };

  if (currentAccount) {
    return (
      <div ref={dropdownRef} className="relative">
        <motion.button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-3 h-3 bg-green-500 rounded-full border border-black" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            {formatAddress(currentAccount.address)}
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
            >
              <div className="p-2">
                {/* Dashboard Option */}
                <button
                  onClick={handleDashboardClick}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200 border-b-2 border-black/10"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M2 8H8V2H2V8ZM2 14H8V10H2V14ZM10 14H16V8H10V14ZM10 2V6H16V2H10Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Dashboard
                  </span>
                </button>

                {/* Logout Option */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Logout
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => router.push("/login")}
      className="hidden md:block relative px-10 py-4 bg-black text-white font-mono text-sm font-bold uppercase tracking-wider border-2 border-black group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">Connect Wallet</span>
    </motion.button>
  );
}
