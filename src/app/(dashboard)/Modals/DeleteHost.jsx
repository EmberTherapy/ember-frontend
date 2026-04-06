import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { on } from 'events';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContextProvider } from "@/app/(dashboard)/contextProvider";
import { deleteEvent } from '@/app/lib/api/event';
import { deleteClient } from '@/app/lib/api/client';
import { deleteRecord } from '@/app/lib/api/record';

export default function DeleteHost( ) {
    const router = useRouter();
    const { deleteState, closeModal, setRefreshKey, closeDeleteModal } = useContextProvider();

    const ignoreFirstEscapeUp = useRef(true); 

    async function handleDeleteRecord() {
        const toastId = toast.loading("Deleting client record...");
        const delete_status = await deleteRecord(deleteState.id);

        if (delete_status) {
            toast.dismiss(toastId);
            toast.success("Client record deleted successfully.");
            closeDeleteModal();
            closeModal();
            setRefreshKey(prev => prev + 1);
        }
    }

    async function handleDeleteClient() {
        const toastId = toast.loading("Deleting client...");

        const delete_status = await deleteClient(deleteState.id);

        if (true) {
            toast.dismiss(toastId);
            toast.success("Client deleted successfully.");
            closeDeleteModal();
            closeModal();
        }
    }

    async function handleDeleteEvent() {
        const toastId = toast.loading("Deleting event...");
        
        const delete_status = await deleteEvent(deleteState.id);

        if (true) {
            toast.dismiss(toastId);
            toast.success("Event deleted successfully.");
            closeDeleteModal();
            closeModal();
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
            closeDeleteModal(); // now respond to *new* Escapes
        }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, []);

    if (!deleteState) {
        return null;
    }

    return (
            <div className="exit-prompt-overlay" onClick={() => closeDeleteModal()}>
                <div className="exit-prompt" onClick={(e) => e.stopPropagation()}>
                    <h3>Delete?</h3>
                    <div className = "button-group">
                        <button className="prompt-btn edit" onClick={() => closeDeleteModal()}>Cancel</button>
                        <button className="prompt-btn exit" onClick={
                            deleteState.type == "record" ? () => handleDeleteRecord() : 
                            deleteState.type == "client" ? () => handleDeleteClient() : 
                            deleteState.type == "event" ? () => handleDeleteEvent() : undefined}>Delete</button>
                    </div>
                </div>
            </div>
    );
}