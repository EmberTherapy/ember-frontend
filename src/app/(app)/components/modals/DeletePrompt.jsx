import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { on } from 'events';
import { toast } from 'sonner';
import { deleteClientRecord } from '@/app/lib/api/fakeApi';

export default function DeletePrompt( {recordId, onCancel, closeModal } ) {
    const ignoreFirstEscapeUp = useRef(true); 

    async function deleteRecord(recordId) {
        const toastId = toast.loading("Deleting client record...");
        closeModal();
        const delete_status = await deleteClientRecord(recordId);

        if (delete_status) {
            toast.dismiss(toastId);
            toast.success("Client record deleted successfully.");
            onCancel?.();
        }
    }
    useEffect(() => {
        function handleKeyUp(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            if (ignoreFirstEscapeUp.current) {
            // this is the release of the Escape that *opened* the modal — skip it
            ignoreFirstEscapeUp.current = false;
            return;
            }
            onCancel?.(); // now respond to *new* Escapes
        }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [onCancel]);

    return (
        <div className="exit-prompt-overlay" onClick={onCancel}>
            <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                 <h3>Delete?</h3>
                 <div className = "button-group">
                     <button className="prompt-btn edit" onClick={onCancel}>Cancel</button>
                     <button className="prompt-btn exit" onClick={() => deleteRecord(recordId)}>Delete</button>
                 </div>
            </div>
        </div>
    );
}
