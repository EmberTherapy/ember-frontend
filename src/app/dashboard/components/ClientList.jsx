import { getClientList } from '../../api/fakeApi';

export default function ClientList({ onClick, selected }) {
  const clients = getClientList();
  
  return (
    <div className="left-panel">
      {clients.map((client) => (
        <div 
          className={`left-panel-item ${selected === client.id ? "left-panel-item-active" : ""} ${client.flagged ? "flagged" : ""} `} 
          key={client.id} 
          onClick={() => onClick(client.id)}>
            {client.name}
        </div>
      ))}
    </div>
  );
}