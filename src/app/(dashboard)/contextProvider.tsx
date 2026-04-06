"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalState = {
  mode: "view" | "edit" | "new";
  type: "record" | "client" | "event";
  client_id?: string | number;
  record_id?: string | number;
  event_id?: string | number;
} | null;

type DeleteState = {
  type: "record" | "client" | "event" | null;
  id?: string | number;
};

type RightPanelState = {
  type: "flag";
};

type ContextType = {
  selectedClientId: string | null;
  setSelectedClientId: React.Dispatch<React.SetStateAction<string | null>>;

  modalState: ModalState | null;
  setModalState: (state: ModalState | null) => void;

  deleteState: DeleteState | null;
  setDeleteState: (state: DeleteState | null) => void;

  rightPanelState: RightPanelState | null;
  setRightPanelState: (state: RightPanelState | null) => void;

  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;

  closeModal: () => void;
  closeRightPanel: () => void;

  openNewClientModal: () => void;
  openEditClientModal: () => void;

  openNewRecordModal: (client_id: string) => void;
  openEditRecordModal: (record_id: string, client_id: string) => void;
  openViewRecordModal: (record_id: string) => void;

  openNewEventModal: () => void;
  openEditEventModal: (event_id: string) => void;

  closeDeleteModal: () => void;
  openDeleteRecord: (record_id: string) => void;
};

const AppContext = createContext<ContextType | null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [rightPanelState, setRightPanelState] = useState<RightPanelState | null>(null);
  const [deleteState, setDeleteState] = useState<DeleteState | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  function closeModal() {
    setModalState(null);
  }
  function openNewClientModal() {
    setModalState({ mode: "new", type: "client" });
  }

  function openEditClientModal() {
    setModalState({ mode: "edit", type: "client", client_id: selectedClientId! });
  }

  function openNewRecordModal() {
    setModalState({ mode: "new", type: "record",  client_id: selectedClientId! });
  }

  function openEditRecordModal(record_id: string) {
    setModalState({ mode: "edit", type: "record", record_id, client_id: selectedClientId! });
  }

  function openViewRecordModal(record_id: string) {
    setModalState({ mode: "view", type: "record", record_id });
  }

  function openNewEventModal() {
    setModalState({ mode: "new", type: "event" });
  }

  function openEditEventModal(event_id: string) {
    setModalState({ mode: "edit", type: "event", event_id });
  }

  function closeRightPanel() {
    setRightPanelState(null);
  }

  function openDeleteRecord(record_id: string) {
    setDeleteState({ type: "record", id: record_id });
  }

  function closeDeleteModal() {
    setDeleteState(null);
  }

  return (
    <AppContext.Provider
      value={{
        selectedClientId,
        setSelectedClientId,
        modalState, setModalState,
        deleteState,
        setDeleteState,
        rightPanelState,
        setRightPanelState,
        refreshKey,
        setRefreshKey,
        closeModal,
        openNewClientModal,
        openEditClientModal,
        openNewRecordModal,
        openEditRecordModal,
        openViewRecordModal,
        openNewEventModal,
        openEditEventModal,
        closeRightPanel,
        closeDeleteModal,
        openDeleteRecord
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