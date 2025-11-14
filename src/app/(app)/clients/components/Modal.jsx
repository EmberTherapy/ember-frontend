import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientFormModal from './modals/ClientFormModal';
import ViewRecordModal from './modals/ViewRecordModal';
import WriteRecordModal from './modals/WriteRecordModal';
import { on } from 'events';

export default function Modal({ mode, onCloseModal, onOpenModal, onEarlyClose, clientId, recordId, onDelete}) {

    const recordWriteModes = ["newRecord", "editRecord"];
    const isRecordWriteMode = recordWriteModes.includes(mode);

    const clientModes = ["newClient", "editClient"];
    const isClientMode = clientModes.includes(mode);

    const writeModes = ["newClient", "editClient", "newRecord", "editRecord"];
    const isWriteMode = writeModes.includes(mode);

    function openEditFromView(mode, recordId=null) {
        onCloseModal();
        onOpenModal(mode, recordId);
    }
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape' && isWriteMode) {
                onEarlyClose();
            }
            else if (e.key === 'Escape') {
                onCloseModal();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCloseModal]);

    return (
        <div className="modal-overlay" onClick={isWriteMode ? onEarlyClose : onCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}> 
                {isClientMode && <ClientFormModal mode={mode} clientId={clientId} onCloseModal={onCloseModal} onEarlyClose={onEarlyClose} />}
                {mode == "viewRecord" && <ViewRecordModal mode={mode} recordId={recordId} closeModal={onCloseModal} onOpenModal={openEditFromView} />}
                {isRecordWriteMode && <WriteRecordModal mode={mode} clientId={clientId} recordId={recordId} onCloseModal={onCloseModal} onEarlyClose={onEarlyClose} onDelete={onDelete} />}
            </div>
        </div>
    );
}
