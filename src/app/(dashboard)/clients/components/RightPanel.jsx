import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContextProvider } from "@/app/(dashboard)/contextProvider";
import { formatDate } from "@/app/lib/utils/dateHelpers";
import { getFlagsPanelData, resolveFlags } from '@/app/lib/api/flag';
import { set } from 'date-fns';
    
export default function RightPanel() {
    const { openViewRecordModal, setRefreshKey, rightPanelState, selectedClientId, closeRightPanel } = useContextProvider();
    const FLAG_TYPES = {
        1: "Other",
        2: "Self-Harm",
        3: "Substance Abuse",
        4: "Mental Health Crisis",
        5: "Danger to Others",
        7: "Suicidal Ideation"
    };

    const [flagPanelData, setFlagPanelData] = useState({
        emergency_contacts: [],
        flags: []
    });

    useEffect(() => {
        getFlagsPanelData(selectedClientId).then(panel_data => {
            setFlagPanelData({
                emergency_contacts: panel_data?.emergency_contacts ?? [],
                flags: panel_data?.flags ?? [],
            });
        }).catch(err => console.error("Error fetching flag panel data:", err));
    }, [selectedClientId]);


    async function handleResolveFlags() {
        if (await resolveFlags(selectedClientId)) {
            closeRightPanel();
            setRefreshKey(prev => prev + 1);
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
                <button className="icon-button icon-button--neutral" onClick={() => closeRightPanel()}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            {flagPanelData ? (
                <div className="panel-main-content">
                    <div className="section">
                        <h2>{flagPanelData.flags.length > 1 ? "Flags" : "Flag"}</h2>
                        {flagPanelData.flags.map((flag) => (
                            <div key={flag.flag_id} className="flag-item">
                                <div className="section-row">
                                    <span className={`severity-label severity-${flag.severity}`}>{flag.severity == 1 ? "Concerning" : "Critical"}</span>
                                    <p><strong>{formatDate(flag.date)}</strong></p>
                                </div>
                                <p><strong>Type:</strong> {FLAG_TYPES[flag.flag_type_id] || flag.flag_type_id}</p>
                                <p><strong>Chat Snippet:</strong> "{flag.snippet}"&nbsp;&nbsp;<span className='read-more-flag' onClick={() => openViewRecordModal(flag.record_id)}>read more</span></p>
                            </div>
                        ))}
                    </div>
                    <div className="section">
                        <h2>Emergency Contact</h2>
                        {flagPanelData.emergency_contacts.map((contact) => (
                            <div key={contact.id} className="contact-item">
                                <p><strong>{contact.first_name} {contact.last_name}</strong>  - <em>{contact.relationship}</em></p>
                                <p><strong>Phone:</strong> {contact.phone}</p>
                            </div>
                            ) 
                            ) ||    
                            <p>No emergency contacts available.</p>
                        }
                    </div>
                    <button className="resolve-button" onClick={() => handleResolveFlags()}>Resolve</button>
                </div>
            ) : (
                <div className='loading'>
                    <p>Loading</p>
                </div>
            )}
        </div>
    );

    if (rightPanelState?.type === "flag") {
        return flagPanel;
    }
    else {
        return null;
    }
}