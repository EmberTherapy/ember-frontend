"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalState = {
  visible: boolean;
  mode: "view" | "edit" | "new";
  type: "record" | "client" | "event";
  client_id?: string | number;
  record_id?: string | number;
  event_id?: string | number;
} | null;

type DeleteState = {
  visible: boolean;
  type: "record" | "client" | "event" | null;
  id?: string | number;
};

type ContextType = {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;

  deleteState: DeleteState;
  setDeleteState: (state: DeleteState) => void;

  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

const AppContext = createContext<ContextType | null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<DeleteState>({
    visible: false,
    type: null,
    id: undefined,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <AppContext.Provider
      value={{
        modalState, setModalState,
        deleteState,
        setDeleteState,
        refreshKey,
        setRefreshKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useContextProvider() {
  const ctxt = useContext(AppContext);
  if (!ctxt) throw new Error("AppContext must be used within a ContextProvider");
  return ctxt;
}