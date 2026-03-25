import './modal.css'
import { useState, useEffect } from "react";
import { useContextProvider } from "@/app/lib/contextProvider";
import ExitPrompt from "@/app/(dashboard)/components/ExitPrompt";
import EventFormModal from './modals/EventFormModal';
import ClientFormModal from './modals/ClientFormModal';
import ViewRecordModal from './modals/ViewRecordModal';
import WriteRecordModal from './modals/WriteRecordModal';

export default function ModalHost() {

  const { modalState, setModalState } = useContextProvider();
  const modalStateString = modalState?.mode + "-" + modalState?.type;

  const writeMode = modalState?.mode === 'edit' || modalState?.mode === 'new';
  const readMode = modalState?.mode === 'view';

  const [showExitPrompt, setShowExitPrompt] = useState(false);
  
  function attemptCloseModal() {
    if (writeMode) {
      setShowExitPrompt(true);
    } 
    
    else {
      closeModal();
    }
  }

  function closeModal() {
    setModalState({visible: false, mode: null, type: null, id: null});
    setShowExitPrompt(false);
  }

  useEffect(() => {
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            attemptCloseModal();
        }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attemptCloseModal]);

  const ModalContainer = 
      <div className={"modal-overlay" + (modalState?.type == "event"? " event-modal-overlay" : "")} onClick={attemptCloseModal}>
          <div className={"modal" + (modalState?.type == "event"? " event-modal" : "")} onClick={e => e.stopPropagation()}> 
              {modalState?.type === 'client' &&  <ClientFormModal attemptCloseModal={attemptCloseModal} closeModal={closeModal} mode={modalState?.mode} clientId={modalState?.client_id} />}
              {modalStateString === 'view-record' &&  <ViewRecordModal closeModal={closeModal} recordId={modalState?.record_id} />}
              {(modalState?.type === 'record' && writeMode) && <WriteRecordModal attemptCloseModal={attemptCloseModal} closeModal={closeModal} mode={modalState?.mode} recordId={modalState?.record_id} clientId={modalState?.client_id} />}
              {modalState?.type  === 'event' && <EventFormModal attemptCloseModal={attemptCloseModal} closeModal={closeModal} mode={modalState?.mode} eventId={modalState?.event_id}/>}
          </div>
      </div>

  if (modalState?.visible) {
    return (
      <div>
        {ModalContainer}
        {showExitPrompt && <ExitPrompt closeModal={closeModal} continueEditing={() => setShowExitPrompt(false)} />}
      </div>
    );
  }

  return (
      null
  );
}