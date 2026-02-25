import { useEffect, useState } from "react";
import { getClientRecords } from "@/app/lib/api/record";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import EllipsesActions from "../EllipsesActions";
import { formatDate } from "@/app/lib/utils/dateHelpers";

import { useModalContext } from "@/app/lib/contextProvider";

export default function RecordsCard({ client_id }) {
    const { modalState, setModalState } = useModalContext();
    const { deleteState, setDeleteState } = useModalContext();

    const [records, setRecords] = useState();

    useEffect(() => {
        getClientRecords(client_id).then(records => {
            setRecords(records);
        }).catch(err => console.error("Error fetching client records: ", err));
    }, [client_id]);

    function handleCreateRecord() {
        setModalState({ visible: true, mode: 'new', type: 'record'});
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
                        <tr className={`record-row ${record.flag_severity == 2 ? "flagged_high" : (record.flag_severity == 1 ? "flagged_medium" : "")}`} key={index} onClick={() => { setModalState({ visible: true, mode: 'view', type: 'record', id: record.id }); }}>
                            <td>{formatDate(record.created_at)}</td>
                            <td>{record.record_type_id == 1 ? "Chat Summary" : "Session Note"}</td>
                            <td>{record.content.content.length > 100 ? record.content.content.substring(0, 100) + "..." : record.content.content}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <EllipsesActions
                                    onEdit={() => setModalState({ visible: true, mode: 'edit', type: 'record', id: record.id })}
                                    onDeleteRecord={() => setDeleteState({ visible: true, type: 'record', id: record.id })}
                                    recordId={record.id}
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