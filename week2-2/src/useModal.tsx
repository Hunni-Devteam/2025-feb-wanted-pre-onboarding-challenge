/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import AlertModal, { AlertModalProps } from "./AlertModal";
import { BaseModalProps } from "./types";

// <T extends BaseModalProps>() => [T, (modal: T) => void]
export const useModal = () => {
  const {
    currentModal,
    setCurrentModal,
    setModalProps,
  } = useContext(ModalContext);

  return {
    open: (modal: BaseModalProps) => {
      setCurrentModal(modal.type);
      setModalProps(modal.props);
    },
    close: () => {
      setCurrentModal(null);
      setModalProps({});
    },
    currentModal,
  }
}

const ModalContext = createContext<{
  currentModal: BaseModalProps['type'] | null;
  setCurrentModal: (modal: BaseModalProps['type'] | null) => void;
  modalProps: Record<string, unknown>;
  setModalProps: (props: Record<string, unknown>) => void;
}>({
  currentModal: null,
  setCurrentModal: () => {},
  modalProps: {},
  setModalProps: () => {},
});

const Modals = () => {
  const { currentModal, modalProps } = useContext(ModalContext);

  return <>
    {currentModal === 'alert' && <AlertModal {...(modalProps as AlertModalProps['props'])} />}
  </>
}

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<BaseModalProps['type'] | null>(null);
  const [modalProps, setModalProps] = useState<Record<string, unknown>>({});

  return (
    <ModalContext.Provider value={{
      currentModal,
      setCurrentModal,
      modalProps,
      setModalProps
    }}>
      {children}
      <Modals />
    </ModalContext.Provider>
  );
}

export default useModal;