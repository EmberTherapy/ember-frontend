import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { createClientRecord, updateClientRecord } from "@/app/lib/api/fakeApi";


export default function WriteRecordModal({ mode, clientId, recordId, onCloseModal, onEarlyClose }) {
    const [note, setNote] = useState("");

    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    }

    async function handleNewSave(e) {
        e.preventDefault();
        
        const toastId = toast.loading("Creating client...");
        
        if (await createClientRecord(note, clientId)) {
            toast.dismiss(toastId);
            onCloseModal();
            toast.success("Client created successfully!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
        onCloseModal();
    }

    async function handleEditSave(e) {
        // e.preventDefault();
        
        // const toastId = toast.loading("Creating client...");
        
        // if (await updateClientRecord(recordId, ) {
        //     toast.dismiss(toastId);
        //     onCloseModal();
        //     toast.success("Client created successfully!");    
        // }
        // else {
        //     toast.error("Couldn’t save. Try again.");
        // }
        // onCloseModal();
    }
    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>New Record [{getCurrentDate()}]</h1>
                <button className="exit-button" onClick={onEarlyClose}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="record-form">
        
                <textarea

                    className="record_textarea"
                    name="note"
                    onChange={(e) => setNote(e.target.value)}
                    // value={}
                />
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={mode === "newRecord" ? handleNewSave : handleEditSave}>Save</button>
                </div>
            </form>
        </div>
    )
}