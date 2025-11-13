import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getClientData } from "@/app/lib/api/fakeApi";
import { formatTime } from "@/app/lib/dataUtils";

export default function ClientCard({ client_id, onOpenPanel, onOpenModal }) {
    const [client, setClient] = useState(null);
    const [inviteStatus, setInviteStatus] = useState(null);

    useEffect(() => {
    getClientData(client_id).then(setClient);
    }, [client_id]);

    useEffect(() => {
        if (!client) return;

        if (client.invite_status === "pending") {
            setInviteStatus("pending");
            return;
        }

        if (client.invite_status === "accepted") {
            const accepted = new Date(client.accepted_date);
            const now = new Date();

            const diffInMs = now - accepted;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            if (diffInDays <= 14) {
                setInviteStatus("accepted");
            } else {
                setInviteStatus(null);
            }
        }
    }, [client]);

    function formatFocusArea(area) {
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
                <div className = "left-group">
                    <h2>{client.first_name} {client.last_name}</h2>
                    {inviteStatus == "pending" && <span className="invite-status pending">Pending Invitation</span>}
                    {inviteStatus == "accepted" && <span className="invite-status accepted">Accepted Invitation</span>}
                </div>
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
                <p className="client-card-content">{formatTime(client.meeting_time)}</p>
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