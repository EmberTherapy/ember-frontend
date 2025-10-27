import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getClientData } from '../../api/fakeApi';

export default function Modal({ source, onCloseModal, clientId }) {
    const client = source == "editClient" ? getClientData(clientId) : null;

    const newClient = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>New Client</h1>
                <button className="icon-button-default" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
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

    const editClient = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Client Info</h1>
                <button className="icon-button-default" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
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

    const viewRecord = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Record Details</h1>
                <button className="icon-button-default" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className="form-group">
                <label>Record details would go here...</label>
            </div>
        </div>
    );


    return (
        <div className="modal-overlay">
          <div className="modal">
            {source == "newClient" && newClient}
            {source == "editClient" && editClient}
            {source == "viewRecord" && viewRecord}
          </div>
        </div>
    )
}
