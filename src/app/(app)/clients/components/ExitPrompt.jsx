import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClientFormModal from './modals/ClientFormModal';
import RecordModal from './modals/RecordModal';

export default function ExitPrompt( {onExit, onContinueEditing} ) {
    return (
        <div className="exit-prompt-overlay">
            <div className="exit-prompt">
                 <h3>Unsaved Changes</h3>
                 <div className = "button-group">
                     <button className="prompt-btn edit" onClick={onContinueEditing}>Continue Editing</button>
                     <button className="prompt-btn exit" onClick={onExit}>Exit</button>
                 </div>
            </div>
        </div>
    );
}
