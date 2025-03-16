/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import AlertModal, { AlertModalProps } from "./AlertModal";
import ConfirmModal, { ConfirmModalProps } from "./ConfirmModal";

export type AllModals = AlertModalProps | ConfirmModalProps;

export const useModal = () => {
  const {
    currentModal,
    setCurrentModal,
  } = useContext(ModalContext);

  return {
    open: (modal: AllModals) => {
      setCurrentModal(modal);
    },
    close: () => {
      setCurrentModal(null);
    },
    currentModal,
  }
}

const ModalContext = createContext<{
  currentModal: AllModals | null;
  setCurrentModal: (modal: AllModals | null) => void;
}>({
  currentModal: null,
  setCurrentModal: () => {},
});

const Modals = () => {
  const { currentModal } = useContext(ModalContext);

  return <>
    {currentModal?.type === 'alert' && <AlertModal {...currentModal.props} />}
    {currentModal?.type === 'confirm' && <ConfirmModal {...currentModal.props} />}
  </>
}

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<AllModals | null>(null);

  return (
    <ModalContext.Provider value={{
      currentModal,
      setCurrentModal,
    }}>
      {children}
      <Modals />
    </ModalContext.Provider>
  );
}

export default useModal;