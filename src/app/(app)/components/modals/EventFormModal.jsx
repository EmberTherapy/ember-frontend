import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

export default function EventFormModal({attemptCloseModal, mode}) {
    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>New Event</h1>
                <button className="exit-button" onClick={attemptCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="event-form">
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <label>
                    Notes:
                    <textarea name="description" />
                </label>
                <label>
                    Date:
                    <input type="date" name="date" />
                </label>
                <label>
                    Start Time:
                    <input type="time" name="time" />
                </label>
                <label>
                    End Time:
                    <input type="time" name="end-time" />
                </label>

                <div className="button-group">
                    <button type="submit" className="save-button">Save</button>
                </div>
            </form>
        </div>
    )
}