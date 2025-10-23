export default function ClientList({ onClick, selected }) {
  const clients = [
    { name: "Elie Esses", id: 1 },
    { name: "Ayelet Cantor", id: 2 },
    { name: "Elias Sasson", id: 3 },
    { name: "Benjy Diamond", id: 4 },
  ];

  return (
    <div className="left-panel">
      {clients.map((client) => (
        <div className={`left-panel-item ${selected === client.id ? "left-panel-item-active" : ""}`} key={client.id} onClick={() => onClick(client.id)}>
          {client.name}
        </div>
      ))}
    </div>
  );
}