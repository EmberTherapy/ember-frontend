import { use, useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { createClientRecord, updateClientRecord, getRecordById } from "@/app/lib/api/fakeApi";
import { formatDate, getCurrentDate } from "@/app/lib/dataUtils";

export default function WriteRecordModal({ mode, clientId, recordId, onCloseModal, onEarlyClose, onDelete }) {
    const [record, setRecord] = useState(null);
    const [content, setContent] = useState();
    const [date, setDate] = useState(getCurrentDate());


    useEffect(() => {
        if (mode != "editRecord") return;
        getRecordById(recordId).then(record_data => {
            console.log(record_data);
            setRecord(record_data);
            setContent(record_data.content);
            setDate(record_data.date.slice(0, 10));
        }).catch(console.error);
      }, [recordId]);

    async function handleNewSave(e) {
        e.preventDefault();
        
        const toastId = toast.loading("Creating record...");
        
        if (await createClientRecord({clientId, content, date})) {
            toast.dismiss(toastId);
            onCloseModal();
            toast.success("Record saved!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
        onCloseModal();
    }

    async function handleEditSave(e) {
        e.preventDefault();
        
        const toastId = toast.loading("Saving changes...");
        const new_record = {clientId, recordId, content, date: record.date};
        if (await updateClientRecord(new_record)) {
            toast.dismiss(toastId);
            onCloseModal();
            toast.success("Changes saved!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
        onCloseModal();
    }

    return (
        <div id="modal-content">
            <div className="top-bar">
                {(mode === "newRecord" || mode === "editRecord") && (
                    <h1>
                        {mode === "newRecord" ? "New Record" : "Edit Record"} [
                        <input
                        className="date-inline-input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        />
                        ]
                    </h1>
                )}
                <div className="button-group">
                    <button className="red-button" onClick={onDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
                    <button className="exit-button" onClick={onEarlyClose}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
            <form className="record-form">
                <div
                className="record_textarea"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setContent(e.currentTarget.textContent)}
                >
                {record ? record.content : ""}
                </div>
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={mode === "newRecord" ? handleNewSave : handleEditSave}>Save</button>
                </div>
            </form>
        </div>
    )
}