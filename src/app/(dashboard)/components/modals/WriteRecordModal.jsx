import { use, useEffect, useState } from "react";
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useContextProvider } from "@/app/lib/contextProvider";
import { formatDate, formatTime, getCurrentDate } from "@/app/lib/utils/dateHelpers";
import { getClientRecords } from "@/app/lib/api/record";
import { createRecord, editRecord, getRecordById} from "@/app/lib/api/record";


export default function WriteRecordModal({ mode, clientId, recordId, closeModal, attemptCloseModal }) {
    const [record, setRecord] = useState(null);
    const [content, setContent] = useState();
    const [date, setDate] = useState("");
    const { deleteState, setDeleteState } = useContextProvider();
    const { setRefreshKey } = useContextProvider();

    useEffect(() => {
        if (mode != "edit") {
            setDate(getCurrentDate());
            return;
        }
        getRecordById(recordId).then(record_data => {
            setRecord(record_data);
            setContent(record_data.content.content);
            setDate(record_data.created_at.split("T")[0]);
        }).catch(console.error);
      }, [recordId]);

    async function handleNewSave(e) {
        e.preventDefault();
        
        const toastId = toast.loading("Creating Record...");
        console.log(clientId, content, date);
        if (await createRecord(clientId, 3, content, date)) {
            toast.dismiss(toastId);
            closeModal();
            setRefreshKey(prev => prev + 1);    
            toast.success("Record saved!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
    }

    async function handleEditSave(e) {
        e.preventDefault();
        
        const toastId = toast.loading("Saving changes...");
        const new_record = {clientId, recordId, content, date};
        if (await editRecord(new_record)) {
            toast.dismiss(toastId);
            closeModal();
            setRefreshKey(prev => prev + 1);    
            toast.success("Changes saved!");    
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
    }

    return (
        <div id="modal-content">
            <div className="top-bar">
                {(mode === "new" || mode === "edit") && (
                    <h1>
                        {mode === "new" ? "New Record" : "Edit Record"} [
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
                    {mode == "edit" ? <button className="red-button" onClick={() => setDeleteState({ visible: true, type: 'record', id: recordId })}><FontAwesomeIcon icon={faTrashCan} /></button> : null}
                    <button className="exit-button" onClick={attemptCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
            <form className="record-form">
                <div
                    className="record_textarea"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => setContent(e.currentTarget.textContent)}
                >
                {record ? content : ""}
                </div>
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={mode === "new" ? handleNewSave : handleEditSave }>Save</button>
                </div>
            </form>
        </div>
    )
}