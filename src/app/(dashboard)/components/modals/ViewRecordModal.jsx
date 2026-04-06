import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useContextProvider } from "@/app/lib/contextProvider";
import { getRecordById } from '@/app/lib/api/record';

export default function ViewRecordModal({ closeModal, recordId }) {
    const RECORD_TYPES = {
        1: "Unknown",
        2: "Chat Summary",
        3: "Session Note"
    };

    const [record, setRecord] = useState(null);
    const { modalState, setModalState } = useContextProvider();

    function formatType(type) {
        return RECORD_TYPES[type] || "Unknown";
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
        getRecordById(recordId).then((record) => {
            setRecord(record);
        }).catch(console.error);
    }, [recordId]);

    return (
        <div className="modal-content">
            <div className="top-bar">
                <h2>{record ? <span className="type">{formatType(record.record_type_id)}</span> : "View Record"}</h2>
                <div className='button-group'>
                    {record ?
                        record.record_type_id == 3 ? (
                            <button className="icon-button icon-button--primary" onClick={() => setModalState({ visible: true, mode: 'edit', type: 'record', record_id: recordId, client_id: record.client_id })}><FontAwesomeIcon icon={faPencil} /></button>
                        ) : null
                     : null
                    }
                    <button className="icon-button icon-button--neutral" onClick={() => setModalState({ mode: null, type: null, id: null })}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
            {record ? (
                <div className="record-details">
                    <div className="record-header">
                        <p><strong>{formatDateForRecord(record.created_at)}</strong></p>
                        <span className={`severity-label severity-${record.flag_severity}`}>{record.flag_severity == 1 ? "Concerning" : record.flag_severity == 2 ? "Critical" : ""}</span>
                    </div>
                    <p>{record ? record.content.content : null}</p>
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