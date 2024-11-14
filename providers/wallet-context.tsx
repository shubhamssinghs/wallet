import { createContext, useContext, useEffect, useState } from "react";
import { useLoader } from "./loader-context";
import transactions from "@/dummy/transactions";

export interface WalletTransaction {
  type?: "credit" | "debit" | "failed";
  amount?: number;
  date?: string;
  name?: string;
}

interface WalletData {
  balance?: number;
  topUpOn?: string;
  transactions?: WalletTransaction[];
}

interface WalletContextType {
  isLoaded?: boolean;
  wallet?: WalletData;
}

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [walletData, setWalletData] = useState<WalletData>({});

  const { showLoader, hideLoader } = useLoader();

  const dummyData: WalletData = {
    balance: 265.25,
    topUpOn: "16 Jul 2024",
    transactions,
  };

  useEffect(() => {
    showLoader({ text: "Please wait...", size: 60 });

    setTimeout(() => {
      hideLoader();
      setWalletData(dummyData);
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <WalletContext.Provider value={{ isLoaded, wallet: walletData }}>
      {isLoaded && children}
    </WalletContext.Provider>
  );
};
