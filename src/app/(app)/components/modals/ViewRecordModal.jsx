import {useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';

import { getRecordById } from '@/app/lib/api/fakeApi';

import { useModalContext } from "@/app/lib/ModalContextProvider";

export default function ViewRecordModal({ closeModal, recordId }) {
    const [record, setRecord] = useState(null);
    const { modalState, setModalState } = useModalContext();

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
                <div className='button-group'>
                    {record ?
                        record.type == "session_note" ? (
                            <button className="edit-button" onClick={() => setModalState({ mode: 'edit', type: 'record', id: record.id })}><FontAwesomeIcon icon={faPencil} /></button>
                        ) : null
                     : null
                    }
                    <button className="exit-button" onClick={() => setModalState({ mode: null, type: null, id: null })}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
            {record ? (
                <div className="record-details">
                    <div className="record-header">
                        <p><strong>{formatDateForRecord(record.date)}</strong></p>
                        <span className={`severity-label severity-${record.flag_severity}`}>{record.flag_severity == 1 ? "Concerning" : record.flag_severity == 2 ? "Critical" : ""}</span>
                    </div>
                    <p>{record ? record.content : null}</p>
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