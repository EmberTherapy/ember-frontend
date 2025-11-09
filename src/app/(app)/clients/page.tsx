"use client"

import { useState } from "react";
import "./clients.css"; 
import { ModalMode, PanelSource } from "@/app/lib/types";
import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import Modal from "./components/Modal";
import ExitPrompt from "./components/ExitPrompt";
import { isFlagged } from "@/app/lib/api/fakeApi";


export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const [modalMode, setmodalMode] = useState<ModalMode>(null);
  const [exitPrompt, setExitPrompt] = useState<boolean>(false);

  function setExitPromptState(state: boolean, source: PanelSource = null) {
    setExitPrompt(state);
  }

  function handleExitPromptQuit() {
    if (modalMode === "newClient" || modalMode === "editClient") {
      closeModal();
      setExitPrompt(false);
    }
  }

  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }

  function openModal(mode: ModalMode, record_id: number | null = null) {
    if (mode == "viewRecord") {
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
            <ClientDisplay selected_id={selectedId} onOpenPanel={openPanel} onOpenModal={openModal}/>
          </div>

          {panelSource && (
            <aside className="right-panel">
              <RightPanel source={panelSource} onClosePanel={closePanel} clientId={selectedId}/>
            </aside>
          )}
        </main>

        {modalMode && (
          <Modal mode={modalMode} onCloseModal={closeModal} onEarlyClose={() => setExitPrompt(true)} clientId={selectedId} recordId={selectedRecordId}/>
        )}
        {exitPrompt && <ExitPrompt onExit={handleExitPromptQuit} onContinueEditing={() => setExitPrompt(false)} />}
    </div>
  );
}