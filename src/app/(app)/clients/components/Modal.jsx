import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientFormModal from './modals/ClientFormModal';
import RecordModal from './modals/RecordModal';
import { on } from 'events';

export default function Modal({ mode, onCloseModal, onEarlyClose, clientId, recordId }) {

    const recordModes = ["viewRecord"];
    const isRecordMode = recordModes.includes(mode);
    const clientModes = ["newClient", "editClient"];
    const isClientMode = clientModes.includes(mode);

    const writeModes = ["newClient", "editClient"];
    const isWriteMode = writeModes.includes(mode);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') onEarlyClose();
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCloseModal]);

    return (
        <div className="modal-overlay" onClick={isWriteMode ? onEarlyClose : onCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}> 
                {isClientMode && <ClientFormModal mode={mode} clientId={clientId} onCloseModal={onCloseModal} onEarlyClose={onEarlyClose} />}
                {isRecordMode && <RecordModal mode={mode} recordId={recordId} closeModal={onCloseModal} />}
            </div>
        </div>
    );
}
