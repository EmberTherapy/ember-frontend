import { useState, useEffect } from "react";
import { useModalContext } from "@/app/lib/ModalContextProvider";

export default function ModalHost() {

  const { modalState, setModalState } = useModalContext();
  const modalMode = modalState?.mode + "-" + modalState?.type;

  function exitModal() {
    setModalState(null);
  }

  useEffect(() => {
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            exitModal();
        }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exitModal]);

  const modal_container = 
      <div className="modal-overlay" onClick={exitModal}>
          <div className="modal" onClick={e => e.stopPropagation()}> 
              modalMode: {modalMode}
          </div>
      </div>

  if (modalState) {
    return modal_container
  }

  return (
      null
  );
}