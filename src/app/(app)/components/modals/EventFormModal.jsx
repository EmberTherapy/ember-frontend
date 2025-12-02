import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown, faLink } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

import { getClientNames, createCalendarEvent } from '@/app/lib/api/fakeApi';
import { checkEventFormValidity } from '@/app/lib/dataUtils';

export default function EventFormModal({attemptCloseModal, closeModal, mode, eventId}) {

    const event_template = {
        title: "",
        notes: "",
        meeting_type: "Appointment",
        client_name: "",
        meeting_link: "",
        date: "",
        meeting_start_time: "",
        meeting_end_time: ""
    };

    const [eventData, setEventData] = useState(event_template);

    const [clientList, setClientList] = useState([]);

    function validateForm(form) {
        const validationResult = checkEventFormValidity(form);
        if (validationResult !== true) {
            for (const field of validationResult) {
                const el = document.getElementById(field);
                if (el) {
                    el.classList.add("mandatory-field");
                }
            }
        }

        else {
            return true;
        }
    }

    async function handleCreateNewEvent() {
        const newEvent = {
            title: eventData.title,
            notes: eventData.notes,
            meeting_type: eventData.meeting_type,
            client_name: eventData.client_name,
            meeting_link: eventData.meeting_link,
            date: eventData.date,
            meeting_start_time: eventData.meeting_start_time,
            meeting_end_time: eventData.meeting_end_time
        };

        if (!validateForm(newEvent)) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        const toastId = toast.loading("Creating event...");
        if (await createCalendarEvent(newEvent)) {
            toast.dismiss(toastId);
            closeModal();
            toast.success("Event created successfully!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
    }
    
    useEffect(() => {
        async function fetchClients() {
            try {
                const clients = await getClientNames();
                setClientList(clients);
            } catch (error) {
                toast.error("Failed to fetch client list.");
            }
        }
        fetchClients();
    }, []);

    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{mode === "edit" ? "Edit Event" : mode === "new" ? "New Event" : ""}</h1>
                <h2>{eventId}</h2>
                <button className="exit-button" onClick={attemptCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="form event-form">
                    <div className="form-group">
                        <label>Title: </label>
                        <input id="title" type="text" name="title" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Notes: </label>
                        <input id="notes" type="text" name="notes" value={eventData.notes} onChange={e => setEventData({...eventData, notes: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <div className="double-input">
                            <div className="dropdown-wrapper">
                                <select
                                id="meeting_type"
                                className="dropdown-select half-input"
                                name="meeting_type"
                                value={eventData.meeting_type}
                                onChange={(e) => {
                                    setEventData({ ...eventData, meeting_type: e.target.value });
                                    console.log(e.target.value);
                                    }}
                                >
                                {["Appointment", "Other"].map((type) => (
                                    <option key={type} value={type}>
                                    {type}
                                    </option>
                                ))}
                                </select>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="dropdown-icon"
                                />
                            </div>
                            {eventData.meeting_type == "Appointment" ? (
                                <div className="with-client">
                                    <span className="with-client-label">with</span>
                                    <div className="dropdown-wrapper">
                                        <select
                                        id="client_name"
                                        className="dropdown-select"
                                        name="client_name"
                                        value={eventData.client_name}
                                        onChange={(e) => setEventData({ ...eventData, client_name: e.target.value })}
                                        >
                                        <option value="">Client</option>
                                        {clientList.map((client) => (
                                            <option key={client.id} value={client.id}>
                                            {client.first_name} {client.last_name}
                                            </option>
                                        ))}
                                        </select>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="dropdown-icon"
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Link: </label>
                        <div className="input-with-icon">
                            <input 
                                id="meeting_link"
                                type="text"
                                name="meeting_link"
                                value={eventData.meeting_link}
                                onChange={(e) =>
                                    setEventData({ ...eventData, meeting_link: e.target.value })
                                }
                            />
                            <FontAwesomeIcon icon={faLink} className="input-icon" />
                        </div>
                        
                    </div>                    

                    <div className="form-group">
                        <label>Date: </label>
                        <input id="date" type="date" name="date" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <div className="double-input">
                            <input id="meeting_start_time" className="meeting-time" type="time" name="meeting_start_time" value={eventData.meeting_start_time} onChange={e => setEventData({...eventData, meeting_start_time: e.target.value})} />
                            <span className="to-label"> to </span>
                            <input id="meeting_end_time" className="meeting-time" type="time" name="meeting_end_time" value={eventData.meeting_end_time} onChange={e => setEventData({...eventData, meeting_end_time: e.target.value})} />
                        </div>  
                    </div>
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault(); handleCreateNewEvent();}}>{mode === "edit" ? "Save Changes" : mode === "new" ? "Create Event" : ""}</button>
                </div>
            </form>
        </div>
    )
}