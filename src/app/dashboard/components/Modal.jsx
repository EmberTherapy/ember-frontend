import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getClientData, getClientRecords, createNewClient } from '../../api/fakeApi';

export default function Modal({ source, onCloseModal, clientId, recordId }) {
    const editMode = source == "editClient";
    const recordMode = source == "viewRecord";

    const client = editMode ? getClientData(clientId) : null;
    const record = recordMode ? getClientRecords(recordId) : null;

    const [name, setName] = useState(editMode ? client.name : "");
    const [email, setEmail] = useState(editMode ? client.email : "");
    const [focusAreas, setFocusAreas] = useState(editMode ? client.focus_areas : []);
    const [meetingTime, setMeetingTime] = useState(editMode ? client.meeting_time : "");
    const [aiInstructions, setAIInstructions] = useState(editMode ? client.ai_instructions : "");

    const [emergencyContactName, setEmergencyContactName] = useState(editMode && client.emergency_contact ? client.emergency_contact.name : "");
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState(editMode && client.emergency_contact ? client.emergency_contact.relationship : "");
    const [emergencyContactEmail, setEmergencyContactEmail] = useState(editMode && client.emergency_contact ? client.emergency_contact.email : "");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState(editMode && client.emergency_contact ? client.emergency_contact.phone : "");

    function newClient() {
        const newUser = {
            name: name,
            email: email,
            focus_areas: focusAreas,
            meeting_time: meetingTime,
            ai_instructions: aiInstructions,
            emergency_contact: {
                name: emergencyContactName,
                relationship: emergencyContactRelationship,
                email: emergencyContactEmail,
                phone: emergencyContactPhone
            }
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
                <div className = "form-section">    
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Focus Areas: </label>
                        <input type="text" name="focus_areas" value={focusAreas.join(", ")} onChange={(e) => setFocusAreas(e.target.value.split(", "))} />
                    </div>
                    <div className="form-group">
                        <label>Meeting Time: </label>
                        <input type="text" name="meeting_time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>AI Instructions: </label>
                        <textarea
                            id="ai_instructions"
                            name="ai_instructions"
                            placeholder="Please enter any instructions, concerns, or notes for your client's specifically tailored therapist-bot."
                            value={aiInstructions}
                            onChange={(e) => {
                                setAIInstructions(e.target.value);

                                const el = e.target;

                                if (el.scrollHeight > el.clientHeight) {
                                    el.style.height = "auto";
                                    el.style.height = `${el.scrollHeight}px`;
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="form-section-emergency">
                    <h2>Emergency Contact</h2>
                    <div className="emergency-contact-grid">
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" name="emergency_contact_name" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Relationship: </label>
                            <input type="text" name="emergency_contact_relationship" value={emergencyContactRelationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" name="emergency_contact_email" value={emergencyContactEmail} onChange={(e) => setEmergencyContactEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number: </label>
                            <input type="text" name="emergency_contact_phone" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} />
                        </div>
                    </div>
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
