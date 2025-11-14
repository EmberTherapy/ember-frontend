import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { on } from 'events';

export default function DeletePrompt( {onDelete, onCancel} ) {
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
            onContinueEditing?.(); // now respond to *new* Escapes
        }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [onDelete, onCancel]);

    return (
        <div className="exit-prompt-overlay" onClick={onCancel}>
            <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                 <h3>Delete?</h3>
                 <div className = "button-group">
                     <button className="prompt-btn edit" onClick={onCancel}>Cancel</button>
                     <button className="prompt-btn exit" onClick={onDelete}>Delete</button>
                 </div>
            </div>
        </div>
    );
}
