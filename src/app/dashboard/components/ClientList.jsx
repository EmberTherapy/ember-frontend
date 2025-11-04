import { getClientList } from '../../api/fakeApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function ClientList({ selected, onChangeDisplay, onOpenModal }) {
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    getClientList().then(setClients);
  });
  
  return (
    <div className="left-panel">
      {clients.map((client) => (
        <div 
          className={`left-panel-item ${selected === client.id ? "left-panel-item-active" : ""} ${client.flag_severity == 2 ? "flagged_high" : ""} ${client.flag_severity == 1 ? "flagged_medium" : ""}`} 
          key={client.id} 
          onClick={() => onChangeDisplay(client.id)}>
            {client.name}
        </div>
      ))}
      <div className="add-client" onClick={() => onOpenModal("newClient")}>
        Add Client <FontAwesomeIcon icon={faPlus} />
      </div>

    </div>
  );
}