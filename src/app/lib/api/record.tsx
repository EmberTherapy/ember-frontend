import { ClientRecord } from "@/app/lib/types";
import { client_records } from "./db/data";
import { createResponse } from "@/app/lib/utils/apiHelpers";


export async function createRecord(client_id: number, record_type_id: number, content: string) {
    const body = {
        "client_id": client_id,
        "record_type_id": record_type_id,
        "content": content,
    };

    const response = await createResponse("create_record", "POST", body);
    console.log("Response from createRecord:", response);

    return true;
}

export async function editRecord(record: ClientRecord) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating client record:", record);

    return true;
}

export async function deleteRecord(record_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Deleting client record:", record_id);

    return true;
}

// export async function getClientRecords(id: number) {
//     await new Promise((resolve) => setTimeout(resolve, 50));

//     const records = client_records.filter(record => record.client_id === id);

//     records.sort((a, b) => {
//         if (b.flag_severity !== a.flag_severity) {
//             return (b.flag_severity ?? 0) - (a.flag_severity ?? 0);
//         }
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//     });

//     return records;
// }
export async function getClientRecords(client_id: number) {
    const body = {
        "client_id": client_id
    }
    const data = await createResponse("get_client_records", "POST", body);
    return data.records;
}

export async function getRecordById(record_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let record of client_records) {
        if (record.id === record_id) {
            return record;
        }
    }
    return null;
}