"use client"

import { useState } from "react";
import "./clients.css"; 
import { PanelSource } from "@/app/lib/types";
import ClientList from "./components/ClientList";
import ClientDisplay from "./components/ClientDisplay";
import RightPanel from "./components/RightPanel";
import { isFlagged } from "@/app/lib/api/flag";
import { useContextProvider } from "@/app/(dashboard)/contextProvider";


export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [panelSource, setPanelSource] = useState<PanelSource>(null);
  const { selectedClientId, setSelectedClientId, rightPanelState } = useContextProvider();


  function openPanel(source: PanelSource) {
    setPanelSource(source);
  }

  async function changeClientDisplay(id: string) {
    setSelectedId(id);
    setSelectedClientId(id);


    if (!await isFlagged(id)) {
      setPanelSource(null);
    }
  }
  
  return (
    <div className="page">
        <ClientList onChangeDisplay={changeClientDisplay} />
        <main className="main">
          <div className="main-content">
            <ClientDisplay onOpenPanel={openPanel} />
          </div>
          {rightPanelState && (
            <aside className="right-panel">
              <RightPanel />
            </aside>
          )}
        </main>
    </div>
  );
}