import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getClientData } from '../../api/fakeApi';

export default function Modal({ source, onCloseModal, clientId }) {
    const editMode = source == "editClient";
    const client = editMode ? getClientData(clientId) : null;

    const clientForm = (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{editMode ? "Edit Client" : "New Client"}</h1>
                <button className="exit-button" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" name="name" defaultValue={client?.name || ""} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" name="email" defaultValue={client?.email || ""} />
                </div>
                <div className="form-group">
                    <label>Focus Areas: </label>
                    <input type="text" name="focus_areas" defaultValue={client?.focus_areas.join(", ") || ""} />
                </div>
                <div className="form-group">
                    <label>Meeting Time: </label>
                    <input type="text" name="meeting_time" defaultValue={client?.meeting_time || ""} />
                </div>
                    <div className="form-group">
                    <label>AI Instructions: </label>
                    <textarea
                        id="ai_instructions"
                        name="ai_instructions"
                        placeholder="Please enter any instructions, concerns, or notes for your client's specifically tailored therapist-bot."
                        defaultValue={client?.ai_instructions || ""}
                    />
                </div>
                <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault();}}> {editMode ? "Save Changes" : "Add Client"}</button>
            </form>
        </div>
    );

    const viewRecord = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Record Details</h1>
                <button className="exit-button" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className="form-group">
                <label>Record details would go here...</label>
            </div>
        </div>
    );


    return (
        <div className="modal-overlay">
          <div className="modal">
            {(source == "newClient" || source == "editClient") && clientForm}
            {source == "viewRecord" && viewRecord}
          </div>
        </div>
    )
}
