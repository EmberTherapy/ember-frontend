"use client"

import { useState } from "react";

import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";

import { PanelSource } from "../../types";

import "./dashboard.css"; 

export default function App() {
  const [selectedId, setSelectedId] = useState(0);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);

  function changeClientDisplay(id: number) {
    setSelectedId(id);
  }

  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }
  
  return (
    <div className="page">
      <header className="header">
        <h1>Ember</h1>
      </header>
        <ClientList onClick={changeClientDisplay} selected={selectedId}/>

    <main className="main">
      <div className="main-content">
        <ClientDisplay id={selectedId} onOpenPanel={openPanel} />
      </div>

      {panelSource && (
        <aside className="right-panel">
          <RightPanel source={panelSource} onClosePanel={closePanel} clientId={selectedId}/>
        </aside>
      )}
    </main>

    </div>
  );
}