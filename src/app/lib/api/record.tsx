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

export async function editRecord(record_id: string, client_id: string, record_type_id: number, content: string, created_at: string) {
    const body = {
        "record_id": record_id,
        "client_id": client_id,
        "record_type_id": record_type_id,
        "content": content,
        "created_at": created_at
    };

    const response = await createResponse("edit_record", "POST", body);
    return response.status == "success";
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