import { useState, useEffect } from "react";
import { useModalContext } from "@/app/lib/ModalContextProvider";

import ExitPrompt from "@/app/(app)/components/ExitPrompt";

import NewEventModal from './modals/NewEventModal';

export default function ModalHost() {

  const { modalState, setModalState } = useModalContext();
  const modalStateString = modalState?.mode + "-" + modalState?.type;

  const writeMode = modalState?.mode === 'edit' || modalState?.mode === 'new';
  const readMode = modalState?.mode === 'read';

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
    setModalState(null);
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
      <div className="modal-overlay" onClick={attemptCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}> 
              {modalStateString === 'new-event' && <NewEventModal attemptCloseModal={attemptCloseModal} />}
          </div>
      </div>

  if (modalState) {
    return (
      <div>
        {ModalContainer}
        {showExitPrompt && <ExitPrompt onExit={closeModal} onContinueEditing={() => {setShowExitPrompt(false)}} />}
      </div>
    );
  }

  return (
      null
  );
}