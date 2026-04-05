import { ClientForm } from "@/app/lib/types";
import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function createClient(new_user: ClientForm) {
    const body = new_user;
    const res = await createResponse('new_client', "POST", body);
    if (res.status != "success") {
        return false;
    }
    const email_body = {
        "client_id": res.client_id
    }

    const email_res = await createResponse('invite_client', "POST", email_body);

    return email_res.status == "success";
}

export async function editClient(client: ClientForm, client_id: number) {
    const body = { ...client, client_id };
    const res = await createResponse('edit_client', "POST", body);
    return res.status == "success";
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
    return data.client_name;
}