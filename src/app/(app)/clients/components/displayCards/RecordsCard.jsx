import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';

import { formatDate } from "@/app/lib/dataUtils";
import { format } from "path";

export default function RecordsCard({ client_id, onOpenModal, onOpenRecord}) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
      getClientRecords(client_id).then(setRecords);
    }, [client_id]);

    function handleCreateRecord() {
        onOpenModal("newRecord");
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
                        <th className="placeholder"></th>
                    </tr>
                    {records.length > 0 ? records.map((record, index) => (
                        <tr className={`record-row ${record.flag_severity == 2 ? "flagged_high" : (record.flag_severity == 1 ? "flagged_medium" : "")}`} key={index} onClick={() => { onOpenModal("viewRecord", record.id); }}>
                            <td>{formatDate(record.date)}</td>
                            <td>{record.type == "chat_summary" ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.length > 100 ? record.content.substring(0, 100) + "..." : record.content}</td>
                            {record.type != "session_note" ? (
                                <td className="placeholder"></td>
                            ) : (
                                <td className="placeholder edit" onClick={(e) => { e.stopPropagation(); onOpenModal("editRecord", record.id); }}><FontAwesomeIcon icon={faPencil} /></td>
                            )}
                        </tr>
                    )) : <tr><td colSpan="3">No records available.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}