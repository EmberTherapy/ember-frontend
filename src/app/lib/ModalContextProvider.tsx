"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalMode = string | null; 

type ModalContextType = {
  modalMode: ModalMode;
  setModalMode: (modal_mode: ModalMode) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const value: ModalContextType = 
    {
      modalMode,        
      setModalMode,
    };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const ctxt = useContext(ModalContext);
  if (!ctxt) {
    throw new Error("useModalContext must be used within a ModalContextProvider");
  }
  return ctxt;
}