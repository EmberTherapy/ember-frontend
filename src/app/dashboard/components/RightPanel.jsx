import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getFlagsPanelData } from '../../api/fakeApi';
    
export default function RightPanel({ source, onClosePanel, clientId }) {
    const flags = source == "flag" ? getFlagsPanelData(clientId) : null;

    const emergencyContacts = flags ? flags.emergency_contacts : [];
    const userFlags = flags ? flags.user_flags : [];


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
                {emergencyContacts.length > 0 ? emergencyContacts.map((contact) => (
                    <div key={contact.id} className="contact-item">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Relationship:</strong> {contact.relationship}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                    </div>
                )) : <p>No emergency contacts available.</p>}
            </div>
            <button className="resolve-button">Resolve</button>
        </div>
    );

    if (source === "flag") {
        return flagPanel;
    }
    else {
        return null;
    }
}