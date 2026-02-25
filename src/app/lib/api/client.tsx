import { Client, EmergencyContact } from "@/app/lib/types";
import { emergency_contacts, clients } from "./db/data";
import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function createClient(client: Client) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Creating new client:", client);

    return true;
}

export async function editClient(client: Client) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating client:", client);

    return true;
}

export async function deleteClient(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Deleting client:", client_id);

    return true;
}

export async function getClientList() {
    const data = await createResponse("get_clients", "GET");
    return data.clients;
}

export async function getClientData(client_id: number) {
    const body = {
        "client_id": client_id
    }
    const data = await createResponse('get_client_data', "POST", body);
    return data.client_data;
}

export async function getClientFormData(client_id: number) {
    const body = {
        "client_id": client_id
    }
    const data = await createResponse('get_client_form_data', "POST", body);
    console.log("Received form data:", data);
    return data.form_data;
}

export async function getClientNames() {
    const data = await createResponse('get_client_names', "GET", {});
    return data.client_names;
}

export async function getClientNameById(client_id: number) {
    const body = {
        "client_id": client_id
    }
    const data = await createResponse('get_client_name_by_id', "POST", body);
    return data.full_name;
}