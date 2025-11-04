import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

import { getFlagsPanelData, resolveFlags } from '../../api/fakeApi';
    
export default function RightPanel({ source, onClosePanel, clientId }) {

    const [flagPanelData, setFlagPanelData] = useState(null);
    
    useEffect(() => {
        getFlagsPanelData(clientId).then(setFlagPanelData);
    }, [clientId]);

    const emergencyContact = flagPanelData?.emergency_contact ?? null;
    const userFlags = flagPanelData?.user_flags ?? [];

    async function handleResolveFlags() {
        if (await resolveFlags(clientId)) {
            onClosePanel();
            toast.success("Flags resolved successfully!");
        }
        else {
            toast.error("Couldn’t resolve flags. Please try again.");
        }
    }

    const flagPanel = (
        <div className="right-panel-content">
            <div className="top-bar">
                <h1>Flag Information</h1>
                <button className="exit-button" onClick={onClosePanel}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className="section">
                <h2>{userFlags.length > 1 ? "Flags" : "Flag"}</h2>
                {userFlags.map((flag) => (
                    <div key={flag.id} className="flag-item">
                        <div className="section-row">
                            <span className={`severity-label severity-${flag.severity}`}>{flag.severity == 1 ? "Concerning" : "Critical"}</span> 
                            <p><strong>{flag.date_flagged}</strong></p>
                        </div>
                        <p><strong>Type:</strong> {flag.type}</p>
                        <p><strong>Chat Snippet:</strong> {flag.chat_snippet}</p>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2>Emergency Contact</h2>
                {emergencyContact ? 
                    (
                        <div className="contact-item">
                            <p><strong>{emergencyContact.name}</strong>  - <em>{emergencyContact.relationship}</em></p>
                            <p>{emergencyContact.phone}</p>
                        </div>
                    ) : 
                    <p>No emergency contacts available.</p>}
            </div>
            <button className="resolve-button" onClick={() => handleResolveFlags()}>Resolve</button>
        </div>
    );

    if (source === "flag") {
        return flagPanel;
    }
    else {
        return null;
    }
}