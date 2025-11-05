"use client"

import { useState } from "react";

import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import Modal from "./components/Modal";

import { isFlagged } from "../api/fakeApi";

import { ModalMode, PanelSource } from "../../types";

import "./dashboard.css"; 

export default function App() {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const [modalMode, setmodalMode] = useState<ModalMode>(null);

  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }

  function openModal(mode: ModalMode) {
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

  function openRecord(record_id: number) {
    setSelectedRecordId(record_id);
    openModal("viewRecord");
  }
  
  return (
    <div className="page">
        <header className="header">
          <h1>Ember</h1>
        </header>

        <ClientList onChangeDisplay={changeClientDisplay} selected={selectedId} onOpenModal={openModal} />

        <main className="main">
          <div className="main-content">
            <ClientDisplay id={selectedId} onOpenPanel={openPanel} onOpenModal={openModal} onOpenRecord={openRecord} />
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