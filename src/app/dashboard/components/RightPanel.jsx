import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getClientData } from '../../api/fakeApi';
    
export default function RightPanel({ source, onClosePanel, clientId }) {
    const client = source == "editClient" ? getClientData(clientId) : null;

    const editPanel = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Client Info</h1>
                <button className="exit-button" onClick={onClosePanel}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" name="name" defaultValue={client?.name} />
                </div>
                <div className="form-group">
                    <label>Problems: </label>
                    <input type="text" name="problems" defaultValue={client?.problems.join(", ")} />
                </div>
                <div className="form-group">
                    <label>Meeting Time: </label>
                    <input type="text" name="meeting_time" defaultValue={client?.meeting_time} />
                </div>
                <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault();}}>Save</button>
            </form>
        </div>
    );

    const flagPanel = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Flag Info</h1>
                <button className="exit-button" onClick={onClosePanel}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <p>Client ID: {clientId}</p>
        </div>
    );

    const newClient = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>New Client</h1>
                <button className="exit-button" onClick={onClosePanel}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" name="name" defaultValue="" />
                </div>
                <div className="form-group">
                    <label>Problems: </label>
                    <input type="text" name="problems" defaultValue="" />
                </div>
                <div className="form-group">
                    <label>Meeting Time: </label>
                    <input type="text" name="meeting_time" defaultValue="" />
                </div>
                <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault();}}>Add Client</button>
            </form>
        </div>
    );

    if (source === "editClient") {
        return editPanel;
    }
    else if (source === "clientFlagInfo") {
        return flagPanel;
    }
    else if (source === "newClient") {
        return newClient;
    }
    else {
        return null;
    }
}