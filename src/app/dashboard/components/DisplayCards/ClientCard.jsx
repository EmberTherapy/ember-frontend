import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFlag, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getClientData } from "@/app/api/fakeApi";

export default function ClientCard({ client_id, onOpenPanel, onOpenModal }) {
    const [client, setClient] = useState(null);

    useEffect(() => {
      getClientData(client_id).then(setClient);
    }, [client_id]);

    if (!client) {
        return <div className="card">Loading client data...</div>;
    }

    return (
        <div className="card">
            <div className="top-bar">
                <h2>{client.first_name} {client.last_name}</h2>
                <div className="button-group">
                    {client.flagged && 
                    <button className="flag-button" onClick={() => onOpenPanel("flag")}>
                        <FontAwesomeIcon icon={faFlag} />
                    </button>}
                    <button className="edit-button" onClick={() => onOpenModal("editClient")}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
            </div>
            <h3>Meeting Time:</h3>
            <p>{client.meeting_time}</p>
            <h3>Focus Areas:</h3>
            {client.focus_areas.map((area, index) => (
                <p key={index}>- {area}</p>
            ))}
        </div>
    );
}