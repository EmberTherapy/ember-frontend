import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFlag, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getClientData } from "@/app/lib/api/fakeApi";

export default function ClientCard({ client_id, onOpenPanel, onOpenModal }) {
    const [client, setClient] = useState(null);

    useEffect(() => {
      getClientData(client_id).then(setClient);
    }, [client_id]);

    function formatFocusArea(area) {
        //capitalize first letter of each word in a focus area
        return area
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
    }
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
            <div className="client-card-row">
                <h3 className="client-card-label">Next Meeting:</h3>
                <p className="client-card-content">{client.meeting_time}</p>
            </div>
            <div className="client-card-row client-card-bottom-row">
                <h3 className="client-card-label">Focus Areas:</h3>
                <div className="client-card-content focus-areas">
                    {client.focus_areas.map((area, index) => (
                        <span className="focus-area" key={index}>{formatFocusArea(area)}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}