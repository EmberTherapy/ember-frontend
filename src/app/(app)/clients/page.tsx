"use client"

import { useState } from "react";
import "./clients.css"; 
import { PanelSource } from "@/app/lib/types";
import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import { isFlagged } from "@/app/lib/api/fakeApi";


export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);


  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  function closePanel() {
    setPanelSource(null);
  }
  
  async function changeClientDisplay(id: number) {
    setSelectedId(id);

    if (!await isFlagged(id)) {
      setPanelSource(null);
    }
  }
  
  return (
    <div className="page">
        <ClientList onChangeDisplay={changeClientDisplay} selected={selectedId} />

        <main className="main">
          <div className="main-content">
            <ClientDisplay selected_id={selectedId} onOpenPanel={openPanel} />
          </div>

          {panelSource && (
            <aside className="right-panel">
              <RightPanel source={panelSource} onClosePanel={closePanel} clientId={selectedId} />
            </aside>
          )}
        </main>
    </div>
  );
}