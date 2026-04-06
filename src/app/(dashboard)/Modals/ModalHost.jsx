import './modal.css'
import { useState, useEffect } from "react";
import { useContextProvider } from "@/app/(dashboard)/contextProvider";
import ExitPrompt from "@/app/(dashboard)/Modals/ExitPrompt";
import EventFormModal from './modals/EventFormModal';
import ClientFormModal from './modals/ClientFormModal';
import ViewRecordModal from './modals/ViewRecordModal';
import WriteRecordModal from './modals/WriteRecordModal';

export default function ModalHost() {

  const { modalState, closeModal} = useContextProvider();
  const modalStateString = modalState?.mode + "-" + modalState?.type;

  const writeMode = modalState?.mode === 'edit' || modalState?.mode === 'new';
  const readMode = modalState?.mode === 'view';

  const [showExitPrompt, setShowExitPrompt] = useState(false);
  
  function attemptCloseModal() {
    if (writeMode) {
      setShowExitPrompt(true);
    } 
    
    else {
      handleCloseModal();
    }
  }

  function handleCloseModal() {
    closeModal();
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
              {modalState?.type === 'client' &&  <ClientFormModal attemptCloseModal={attemptCloseModal} closeModal={handleCloseModal} mode={modalState?.mode} clientId={modalState?.client_id} />}
              {modalStateString === 'view-record' &&  <ViewRecordModal closeModal={handleCloseModal} recordId={modalState?.record_id} />}
              {(modalState?.type === 'record' && writeMode) && <WriteRecordModal attemptCloseModal={attemptCloseModal} closeModal={handleCloseModal} mode={modalState?.mode} recordId={modalState?.record_id} clientId={modalState?.client_id} />}
              {modalState?.type  === 'event' && <EventFormModal attemptCloseModal={attemptCloseModal} closeModal={handleCloseModal} mode={modalState?.mode} eventId={modalState?.event_id}/>}
          </div>
      </div>

  if (modalState) {
    return (
      <div>
        {ModalContainer}
        {showExitPrompt && <ExitPrompt closeModal={handleCloseModal} continueEditing={() => setShowExitPrompt(false)} />}
      </div>
    );
  }

  return (
      null
  );
}