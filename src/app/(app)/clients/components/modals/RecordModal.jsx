import {useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { getRecordById } from '@/app/lib/api/fakeApi';

export default function RecordModal({ mode, closeModal, recordId }) {
    const [record, setRecord] = useState(null);

    function formatType(type) {
        return type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function formatDateForRecord(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    }

    useEffect(() => {
        getRecordById(recordId).then(setRecord);
    }, [recordId]);

    return (
        <div className="modal-content">
            <div className="top-bar">
                <h2>{record ? <span className="type">{formatType(record.type)}</span> : "View Record"}</h2>
                <button className="exit-button" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            {record ? (
                <div className="record-details">
                    <p><strong>{formatDateForRecord(record.date)}</strong></p>
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