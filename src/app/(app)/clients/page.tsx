"use client"

import { useState } from "react";
import "./clients.css"; 
import { ModalMode, PanelSource } from "@/app/lib/types";
import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import Modal from "./components/Modal";
import ExitPrompt from "./components/ExitPrompt";
import DeletePrompt from "./components/DeletePrompt";
import { isFlagged } from "@/app/lib/api/fakeApi";


export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const [modalMode, setmodalMode] = useState<ModalMode>(null);
  const [exitPrompt, setExitPrompt] = useState<boolean>(false);
  const [deletePrompt, setDeletePrompt] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);
  
  function handleDeleteRecord(record_id: number) {
    setRecordToDelete(record_id);
    setDeletePrompt(true);
  }

  function handleExitPromptQuit() {
    closeModal();
    setExitPrompt(false);
  }

  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }

  function openModal(mode: ModalMode, record_id: number | null = null) {
    if (mode == "viewRecord" || mode == "editRecord" || mode == "newRecord") {
      setSelectedRecordId(record_id);
    }
    if (mode == "newClient") {
      closePanel();
    }
    setmodalMode(mode);
  }

  function closeModal() {
    setmodalMode(null);
  }
  
  async function changeClientDisplay(id: number) {
    setSelectedId(id);

    if (!await isFlagged(id)) {
      setPanelSource(null);
    }
  }
  
  return (
    <div className="page">
        <ClientList onChangeDisplay={changeClientDisplay} selected={selectedId} onOpenModal={openModal} />

        <main className="main">
          <div className="main-content">
            <ClientDisplay selected_id={selectedId} onOpenPanel={openPanel} onOpenModal={openModal} onDeleteRecord={handleDeleteRecord} />
          </div>

          {panelSource && (
            <aside className="right-panel">
              <RightPanel source={panelSource} onClosePanel={closePanel} clientId={selectedId} openModal={openModal}/>
            </aside>
          )}
        </main>

        {modalMode && (
          <Modal mode={modalMode} onCloseModal={closeModal} onEarlyClose={() => setExitPrompt(true)} onOpenModal={openModal} clientId={selectedId} recordId={selectedRecordId} onDeleteRecord={handleDeleteRecord}/>
        )}
        {exitPrompt && <ExitPrompt onExit={handleExitPromptQuit} onContinueEditing={() => setExitPrompt(false)} />}
        {deletePrompt && <DeletePrompt closeModal={closeModal} recordId={recordToDelete} onCancel={() => { setDeletePrompt(false); setRecordToDelete(null); }} />}
    </div>
  );
}