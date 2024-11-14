import { createContext, useContext, useEffect, useState } from "react";
import { Modal, ModalProps } from "react-native";

interface ModalContextType {
  isVisible?: boolean;
  showModal?: (content: React.ReactNode, modalProps?: ModalProps) => void;
  hideModal?: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalProps, setModalProps] = useState<ModalProps>(null);

  const showModal = (content: React.ReactNode, modalProps?: ModalProps) => {
    setModalContent(content);
    setModalProps(modalProps);
    setIsVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setModalProps(null);
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ isVisible, showModal, hideModal }}>
      <Modal {...modalProps} visible={isVisible}>
        {modalContent}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
