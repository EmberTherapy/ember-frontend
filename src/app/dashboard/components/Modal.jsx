import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientFormModal from './Modals/ClientFormModal';
import RecordModal from './Modals/RecordModal';

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
                {(mode == "newClient" || mode == "editClient") && <ClientFormModal mode={mode} clientId={clientId} onCloseModal={onCloseModal} />}
                {mode == "viewRecord" && <RecordModal mode={mode} recordId={recordId} closeModal={onCloseModal} />}
            </div>
        </div>
    );
}
