import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFlag } from '@fortawesome/free-solid-svg-icons';
import { getClientData } from '../../api/fakeApi';

export default function ClientDisplay({ id, onOpenPanel }) {
    const client = id == 0 ? null : getClientData(id);

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
                                <button className="icon-button-default" onClick={() => onOpenPanel("editClient")}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            </div>
                        </div>
                        <h3>Meeting Time:</h3>
                         <p>{client.meeting_time}</p>
                        <h3>Problems:</h3>
                        {client.problems.map((problem, index) => (
                            <p key={index}>- {problem}</p>
                        ))}
                    </div>
                    <div className="card">
                        <h3>Recent Activity</h3>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="card">
                            <h2>No Client Selected</h2>
                    </div>
                </div>
            )}
        </div>
    );
}