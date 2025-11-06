import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import RecordModal from './RecordModal';
import ClientForm from './ClientFormModal';


export default function Modal({ mode, onCloseModal, clientId, recordId }) {

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') onCloseModal();
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCloseModal]);

    return (
        <div className="modal-overlay" onClick={onCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}> 
                {(mode == "newClient" || mode == "editClient") && <ClientForm mode={mode} clientId={clientId} onCloseModal={onCloseModal} />}
                {mode == "viewRecord" && <RecordModal mode={mode} recordId={recordId} closeModal={onCloseModal} />}
            </div>
        </div>
    );
}
