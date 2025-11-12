import { use, useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { createClientRecord, updateClientRecord, getRecordById } from "@/app/lib/api/fakeApi";
import { formatDate, getCurrentDate } from "@/app/lib/dataUtils";
import { get } from "http";


export default function WriteRecordModal({ mode, clientId, recordId, onCloseModal, onEarlyClose }) {
    const [record, setRecord] = useState(null);
    const [content, setContent] = useState(getCurrentDate());
    const [date, setDate] = useState("");

    useEffect(() => {
        if (mode != "editRecord") return;
        getRecordById(recordId).then(record_data => {
            console.log(record_data);
            setRecord(record_data);
            setContent(record_data.content);
            setDate(record_data.date);
        }).catch(console.error);
      }, [recordId]);

    const custom_date_obj = <h1>Edit Record [MM/DD/YYYY]</h1>;

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
                {mode == "newRecord" && <h1>New Record [{getCurrentDate()}]</h1>}
                {mode == "editRecord" && <h1>Edit Record [{record ? formatDate(record.date) : ""}]</h1>}
                <button className="exit-button" onClick={onEarlyClose}><FontAwesomeIcon icon={faXmark} /></button>
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