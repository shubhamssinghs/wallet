import { createContext, useContext, useState } from "react";
import { useModal } from "./modal-context";

import FullScreenLoader, {
  FullScreenLoaderProps,
} from "@/components/fullscreen-loader";

interface LoaderContextType {
  isLoading?: boolean;
  showLoader?: (loaderProps?: FullScreenLoaderProps) => void;
  hideLoader?: () => void;
}

interface LoaderProviderProps {
  children: React.ReactNode;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
};

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const { showModal, hideModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = (loaderProps?: FullScreenLoaderProps) => {
    setIsLoading(true);
    showModal(<FullScreenLoader {...loaderProps} />);
  };

  const hideLoader = () => {
    hideModal();
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
