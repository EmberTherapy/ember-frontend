import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import EllipsesActions from "../EllipsesActions";
import { formatDate } from "@/app/lib/dataUtils";

export default function RecordsCard({ client_id, onOpenModal, onOpenRecord, onDeleteRecord }) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
      getClientRecords(client_id).then(setRecords);
    }, [client_id]);

    function handleCreateRecord() {
        onOpenModal("newRecord");
    }

    function handleDeleteRecord(recordId) {
        console.log("Delete record with ID:", recordId);
        onDeleteRecord(recordId);
    }

    return (
        <div className="card">
            <div className="top-bar">
                <h2>Client Records</h2>
                <div className="button-group">
                    <button className="edit-button" onClick={handleCreateRecord}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
            <table className="records-table">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Content</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {records.length > 0 ? records.map((record, index) => (
                        <tr className={`record-row ${record.flag_severity == 2 ? "flagged_high" : (record.flag_severity == 1 ? "flagged_medium" : "")}`} key={index} onClick={() => { onOpenModal("viewRecord", record.id); }}>
                            <td>{formatDate(record.date)}</td>
                            <td>{record.type == "chat_summary" ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.length > 100 ? record.content.substring(0, 100) + "..." : record.content}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <EllipsesActions
                                    onEdit={() => onOpenModal("editRecord", record.id)}
                                    onDelete={() => handleDeleteRecord(record.id)}
                                />
                            </td>
                            <td className="placeholder"></td>
                        </tr>
                    )) : <tr>
                            <td colSpan="5">No records available.</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    );
}