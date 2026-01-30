import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { on } from 'events';
import { toast } from 'sonner';

import { deleteEvent } from '@/app/lib/api/event';
import { deleteClient } from '@/app/lib/api/client';
import { deleteRecord } from '@/app/lib/api/record';

import { useModalContext } from "@/app/lib/contextProvider";
import { set } from 'date-fns';

export default function DeleteHost( ) {
    const { deleteState, setDeleteState } = useModalContext();
    const { modalState, setModalState } = useModalContext();

    const ignoreFirstEscapeUp = useRef(true); 

    async function handleDeleteRecord(id) {
        const toastId = toast.loading("Deleting client record...");
        
        const delete_status = await deleteRecord(deleteState.id);

        if (delete_status) {
            toast.dismiss(toastId);
            toast.success("Client record deleted successfully.");
            setDeleteState({ visible: false, type: null, id: null });
            setModalState(null);
        }
    }

    async function handleDeleteClient(id) {
        const toastId = toast.loading("Deleting client...");

        const delete_status = await deleteClient(deleteState.id);

        if (true) {
            toast.dismiss(toastId);
            toast.success("Client deleted successfully.");
            setDeleteState({ visible: false, type: null, id: null });
            setModalState({ mode: null, type: null, id: null });
        }
    }

    async function handleDeleteEvent(id) {
        const toastId = toast.loading("Deleting event...");
        
        const delete_status = await deleteEvent(deleteState.id);

        if (true) {
            toast.dismiss(toastId);
            toast.success("Event deleted successfully.");
            setDeleteState({ visible: false, type: null, id: null });
            setModalState(null);
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
            setDeleteState({ visible: false, type: null, id: null }); // now respond to *new* Escapes
        }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, []);

    if (deleteState.visible == false) {
        return null;
    }

    return (
            <div className="exit-prompt-overlay" onClick={() => setDeleteState({ visible: false, type: null, id: null })}>
                <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                    <h3>Delete?</h3>
                    <div className = "button-group">
                        <button className="prompt-btn edit" onClick={() => setDeleteState({ visible: false, type: null, id: null })}>Cancel</button>
                        <button className="prompt-btn exit" onClick={
                            deleteState.type == "record" ? () => handleDeleteRecord(deleteState.id) : 
                            deleteState.type == "client" ? () => handleDeleteClient(deleteState.id) : 
                            deleteState.type == "event" ? () => handleDeleteEvent(deleteState.id) : undefined}>Delete</button>
                    </div>
                </div>
            </div>
    );
}