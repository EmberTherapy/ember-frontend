"use client"

import { useState } from "react";

import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import Modal from "./components/Modal";

import { ModalSource, PanelSource } from "../../types";

import "./dashboard.css"; 

export default function App() {
  const [selectedId, setSelectedId] = useState(0);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const [modalSource, setModalSource] = useState<ModalSource>(null);

  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }

  function openModal(source: ModalSource) {
    setModalSource(source);
  }

  function closeModal() {
    setModalSource(null);
  }
  function changeClientDisplay(id: number) {
    setSelectedId(id);
    closePanel();
  }

  function openRecord(record: any) {
    console.log("Opening record:", record);
  }
  
  return (
    <div className="page">
        <header className="header">
          <h1>Ember</h1>
        </header>

        <ClientList onChangeDisplay={changeClientDisplay} selected={selectedId} onOpenModal={openModal} />

        <main className="main">
          <div className="main-content">
            <ClientDisplay id={selectedId} onOpenPanel={openPanel} onOpenModal={openModal} />
          </div>

          {panelSource && (
            <aside className="right-panel">
              <RightPanel source={panelSource} onClosePanel={closePanel} clientId={selectedId}/>
            </aside>
          )}
        </main>

        {modalSource && (
          <Modal source={modalSource} onCloseModal={closeModal} clientId={selectedId} recordId={null}/>
        )}
    </div>
  );
}