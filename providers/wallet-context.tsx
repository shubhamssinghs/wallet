import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLoader } from "./loader-context";
import transactions from "@/dummy/transactions";

export interface WalletTransaction {
  type?: "credit" | "debit" | "failed";
  amount?: number;
  date?: string;
  name?: string;
  image?: string;
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

  const values = useMemo(
    () => ({ isLoaded, wallet: walletData }),
    [walletData]
  );

  useEffect(() => {
    showLoader({ text: "Please wait...", size: "large" });

    setTimeout(() => {
      hideLoader();
      setWalletData(dummyData);
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};
