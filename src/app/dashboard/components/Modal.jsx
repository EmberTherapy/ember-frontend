import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getClientData, getClientRecords, createNewClient } from '../../api/fakeApi';

export default function Modal({ source, onCloseModal, clientId, recordId }) {
    const editMode = source == "editClient";
    const recordMode = source == "viewRecord";

    const client = editMode ? getClientData(clientId) : null;
    const record = recordMode ? getClientRecords(recordId) : null;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [focusAreas, setFocusAreas] = useState([]);
    const [meetingTime, setMeetingTime] = useState("");
    const [aiInstructions, setAIInstructions] = useState("");

    function newClient() {
        const newUser = {
            name: name,
            email: email,
            focus_areas: focusAreas,
            meeting_time: meetingTime,
            ai_instructions: aiInstructions
        };

        createNewClient(newUser);
    }

    const clientForm = (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{editMode ? "Edit Client" : "New Client"}</h1>
                <button className="exit-button" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label>Focus Areas: </label>
                    <input type="text" name="focus_areas" onChange={(e) => setFocusAreas(e.target.value.split(", "))} value={focusAreas.join(", ")} />
                </div>
                <div className="form-group">
                    <label>Meeting Time: </label>
                    <input type="text" name="meeting_time" onChange={(e) => setMeetingTime(e.target.value)} value={meetingTime} />
                </div>
                <div className="form-group">
                    <label>AI Instructions: </label>
                    <textarea
                        id="ai_instructions"
                        name="ai_instructions"
                        placeholder="Please enter any instructions, concerns, or notes for your client's specifically tailored therapist-bot."
                        onChange={(e) => setAIInstructions(e.target.value)}
                        value={aiInstructions}
                        onInput={(e) => {
                            const el = e.target;
                            el.style.height = "auto"; // Reset first so shrinking works
                            el.style.height = `${el.scrollHeight}px`; // Only expand when content exceeds
                        }}
                    />
                </div>
                <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault(); newClient();}}> {editMode ? "Save Changes" : "Add Client"}</button>
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
