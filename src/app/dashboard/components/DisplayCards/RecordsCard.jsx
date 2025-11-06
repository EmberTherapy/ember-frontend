import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/api/fakeApi";

export default function RecordsCard({ client_id, onOpenModal, onOpenRecord}) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
      getClientRecords(client_id).then(setRecords);
    }, [client_id]);


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
                            <td>{record.date}</td>
                            <td>{record.type == "chat_summary" ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.length > 100 ? record.content.substring(0, 100) + "..." : record.content}</td>
                        </tr>
                    )) : <tr><td colSpan="3">No records available.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}