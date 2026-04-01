import { useEffect, useState } from "react";
import { getClientRecords, createRecord } from "@/app/lib/api/record";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EllipsesActions from "../EllipsesActions";
import { formatDate } from "@/app/lib/utils/dateHelpers";
import { useContextProvider } from "@/app/lib/contextProvider";

export default function RecordsCard({ client_id }) {
    const { modalState, setModalState } = useContextProvider();
    const { deleteState, setDeleteState } = useContextProvider();
    const { refreshKey} = useContextProvider();

    const [records, setRecords] = useState();

    useEffect(() => {
        getClientRecords(client_id).then(records => {
            setRecords(records);
        }).catch(err => console.error("Error fetching client records: ", err));
    }, [client_id, refreshKey]);

    function handleCreateRecord() {
        setModalState({ visible: true, mode: 'new', type: 'record', client_id: client_id  });
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
                    {records && records.length > 0 ? records.map((record, index) => (
                        <tr className={`record-row ${record.flag_severity == 2 ? "flagged_high" : (record.flag_severity == 1 ? "flagged_medium" : "")}`} key={index} onClick={() => { setModalState({ visible: true, mode: 'view', type: 'record', record_id: record.record_id }); }}>
                            <td>{formatDate(record.created_at)}</td>
                            <td>{record.record_type_id == 1 ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.content.length > 100 ? record.content.content.substring(0, 100) + "..." : record.content.content}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <EllipsesActions
                                    onEdit={() => setModalState({ visible: true, mode: 'edit', type: 'record', record_id: record.record_id, client_id: client_id })}
                                    onDeleteRecord={() => setDeleteState({ visible: true, type: 'record', id: record.record_id })}
                                    recordId={record.record_id}
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