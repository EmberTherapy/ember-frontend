"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalState = {
  visible: boolean;
  mode: "view" | "edit" | "new" ;
  type: "record" | "client" | "event";
  id?: string;
} | null;

type deleteState = {
  visible: boolean
  type: "record" | "client" | null
  id?: string
}

type ModalContextType = {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  
  deleteState: deleteState;
  setDeleteState: (state: deleteState) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<deleteState>({ visible: false, type: null });

  return (
    <ModalContext.Provider value={{ modalState, setModalState, deleteState, setDeleteState }}>
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
