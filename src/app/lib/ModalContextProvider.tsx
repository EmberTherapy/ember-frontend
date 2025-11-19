"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalState = {
  mode: "read" | "edit" | "new" ;
  type: "record" | "client" | "event";
  id?: string;
} | null;

type ModalContextType = {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(null);

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
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
