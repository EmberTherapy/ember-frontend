import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useContextProvider } from "@/app/(dashboard)/contextProvider";

import { getClientList } from '@/app/lib/api/client';

export default function ClientList({ onChangeDisplay }) {
  const [clients, setClients] = useState([]);

  const { openNewClientModal, refreshKey, selectedClientId } = useContextProvider();
  
  useEffect(() => {
    getClientList().then(clients => {
      setClients(clients);
    }).catch(console.error);
  }, [refreshKey]);
  
  return (
    <div className="left-panel">
      {clients.map((client) => (
        <div 
          className={`left-panel-item ${selectedClientId === client.client_id ? "left-panel-item-active" : ""} ${client.flag_severity == 2 ? "flagged_high" : ""} ${client.flag_severity == 1 ? "flagged_medium" : ""}`} 
          key={client.client_id} 
          onClick={() => onChangeDisplay(client.client_id)}>
            {client.first_name} {client.last_name}
        </div>
      ))}
      <div className="add-client" onClick={() => openNewClientModal()}>
        Add Client <FontAwesomeIcon icon={faPlus} />
      </div>

    </div>
  );
}