import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFlag, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getClientData, getClientRecords } from '../../api/fakeApi';
import { on } from 'events';

export default function ClientDisplay({ id, onOpenPanel, onOpenModal }) {
    const client = id == 0 ? null : getClientData(id);
    const records = id == 0 ? [] : getClientRecords(id);

    return (
        <div id="client-display">
            {client ? (
                <div>
                    <div className="card">
                        <div className="top-bar">
                            <h2>{client.name}</h2>
                            <div className="button-group">
                                {client.flagged && 
                                <button className="flag-button" onClick={() => onOpenPanel("clientFlagInfo")}>
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
                    <div className="card">
                        <h3>Client Records</h3>
                            <table className="records-table">
                                <tbody>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Content</th>
                                    </tr>
                                    {records.map((record, index) => (
                                        <tr key={index} onClick={() => onOpenModal("viewRecord")}>
                                            <td>{record.date}</td>
                                            <td>{record.type == "chat_summary" ? "Chat Summary" : "Session Note"}</td>
                                            <td>{record.content.length > 100 ? record.content.substring(0, 100) + "..." : record.content}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="card">
                            <h2>Welcome back!</h2>
                    </div>
                </div>
            )}
        </div>
    );
}