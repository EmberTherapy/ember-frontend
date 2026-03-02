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
    return response.status == "success";
}

export async function editRecord(record: ClientRecord) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating client record:", record);

    return true;
}

export async function deleteRecord(record_id: number) {
    const body = {
        "record_id": record_id
    }
    const data = await createResponse("delete_record", "POST", body);
    return data.status == "success";
}

export async function getClientRecords(client_id: number) {
    const body = {
        "client_id": client_id
    }
    const data = await createResponse("get_client_records", "POST", body);
    return data.records;
}

export async function getRecordById(record_id: number) {
    const body = {
        "record_id": record_id
    }
    const data = await createResponse("get_record_by_id", "POST", body);
    return data.record;
}