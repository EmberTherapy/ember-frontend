import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

export default function EventFormModal({attemptCloseModal, mode}) {
    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{mode === "edit" ? "Edit Event" : mode === "new" ? "New Event" : ""}</h1>
                <button className="exit-button" onClick={attemptCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="form">
                <div className = "form-section">   
                    <div className="form-group">
                        <label>Title: </label>
                        <input id="title" type="text" name="title" />
                    </div>
                    <div className="form-group">
                        <label>Notes: </label>
                        <input id="notes" type="text" name="notes" />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input id="date" type="date" name="date" />
                    </div>
                    <div className="form-group">
                        <label> Regular Meeting Time: </label>
                        <div className="meeting-time-inputs">
                            <input type="time" name="meeting_start_time"/>
                            <span className="to-label"> to </span>
                            <input type="time" name="meeting_end_time"/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="submit-button" type="submit"> {mode === "edit" ? "Save Changes" : "Add Event"}</button>
                </div>
            </form>
        </div>
    )
}