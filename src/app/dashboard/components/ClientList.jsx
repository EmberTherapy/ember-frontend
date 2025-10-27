import { getClientList } from '../../api/fakeApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ClientList({ selected, onChangeDisplay, onOpenModal }) {
  const clients = getClientList();
  
  return (
    <div className="left-panel">
      {clients.map((client) => (
        <div 
          className={`left-panel-item ${selected === client.id ? "left-panel-item-active" : ""} ${client.flagged ? "flagged" : ""} `} 
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