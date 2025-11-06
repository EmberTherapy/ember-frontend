"use client"

import { useState } from "react";
import "./dashboard.css"; 
import { ModalMode, PanelSource } from "../../types";
import ClientList from "./Components/ClientList";
import ClientDisplay from "./Components/ClientDisplay";
import RightPanel from "./Components/RightPanel";
import Modal from "./Components/Modal";
import { isFlagged } from "@/app/api/fakeApi";


export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const [modalMode, setmodalMode] = useState<ModalMode>(null);

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
        <header className="header">
          <h1>Ember</h1>
        </header>

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
          <Modal mode={modalMode} onCloseModal={closeModal} clientId={selectedId} recordId={selectedRecordId}/>
        )}
    </div>
  );
}