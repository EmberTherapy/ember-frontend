import {useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getRecordById } from '@/app/lib/api/fakeApi';

export default function RecordModal({ mode, closeModal, recordId }) {
    const [record, setRecord] = useState(null);

    useEffect(() => {
        getRecordById(recordId).then(setRecord);
    }, [recordId]);

    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>View Record</h1>
                <button className="exit-button" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            {record ? (
                <div className="record-details">
                    <p>{record.date}</p>
                    <p>{record.content}</p>
                </div>
            ) 
            : (
                <div className='loading'>
                    <p>Loading</p>
                </div>
            )}
        </div>
    )
}