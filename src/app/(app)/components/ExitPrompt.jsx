import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ExitPrompt({ onExit, onContinueEditing }) {
    // const ignoreFirstEscapeUp = useRef(true); 

    // useEffect(() => {
    //     function handleKeyUp(e) {
    //     if (e.key === 'Escape') {
    //         e.preventDefault();
    //         if (ignoreFirstEscapeUp.current) {
    //         ignoreFirstEscapeUp.current = false;
    //         return;
    //         }
    //         onContinueEditing?.(); // now respond to *new* Escapes
    //     }
    //     }

    //     window.addEventListener('keyup', handleKeyUp);
    //     return () => window.removeEventListener('keyup', handleKeyUp);
    // }, [onExit, onContinueEditing]);

    return (
        <div className="exit-prompt-overlay" onClick={onContinueEditing}>
            <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                 <h3>Unsaved Changes</h3>
                 <div className = "button-group">
                     <button className="prompt-btn edit" onClick={onContinueEditing}>Continue Editing</button>
                     <button className="prompt-btn exit" onClick={onExit}>Exit</button>
                 </div>
            </div>
        </div>
    );
}
