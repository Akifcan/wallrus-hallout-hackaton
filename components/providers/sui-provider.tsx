"use client"
import "@mysten/dapp-kit/dist/index.css";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { ReactNode } from "react";
import networkConfig from "@/lib/network-config";

export default function SuiProvider({ children }: { children: ReactNode }) {
    return <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
            {children}
        </WalletProvider>
    </SuiClientProvider>
}