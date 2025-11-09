import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/fakeApi";

export default function RecordsCard({ client_id, onOpenModal, onOpenRecord}) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
      getClientRecords(client_id).then(setRecords);
    }, [client_id]);

    function formatDateForRecordCard(dateString) {
        // Format date as MM/DD/YYYY
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    }
    return (
        <div className="card">
            <h3>Client Records</h3>
            <table className="records-table">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Content</th>
                    </tr>
                    {records.length > 0 ? records.map((record, index) => (
                        <tr key={index} onClick={() => { onOpenModal("viewRecord", record.id); }}>
                            <td>{formatDateForRecordCard(record.date)}</td>
                            <td>{record.type == "chat_summary" ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.length > 100 ? record.content.substring(0, 100) + "..." : record.content}</td>
                        </tr>
                    )) : <tr><td colSpan="3">No records available.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}