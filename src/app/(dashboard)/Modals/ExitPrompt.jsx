import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientFormModal from './modals/ClientFormModal';
import RecordModal from './modals/ViewRecordModal';
import { on } from 'events';

import { useModalContext } from "@/app/(dashboard)/contextProvider";;

export default function ExitPrompt( {closeModal, continueEditing} ) {

    const ignoreFirstEscapeUp = useRef(true); 

    useEffect(() => {
        function handleKeyUp(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            if (ignoreFirstEscapeUp.current) {
            // this is the release of the Escape that *opened* the modal — skip it
            ignoreFirstEscapeUp.current = false;
            return;
            }
            continueEditing(); // now respond to *new* Escapes
        }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, []);

    return (
        <div className="exit-prompt-overlay" onClick={continueEditing}>
            <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                 <h3>Unsaved Changes</h3>
                 <div className = "button-group">
                     <button className="prompt-btn edit" onClick={continueEditing}>Continue Editing</button>
                     <button className="prompt-btn exit" onClick={closeModal}>Exit</button>
                 </div>
            </div>
        </div>
    );
}
