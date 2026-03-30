import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function authenticateUser(email: string, password: string){
    const body = {
        email: email,
        passkey: password
    }

    const data = await createResponse("login", "POST", body);
    return data;
}

export async function logoutUser() {
    const data = await createResponse("logout", "POST");
    return data.status === "success";
}

export async function validateSession() {
    const data = await createResponse("validate_session", "POST");
    return data;
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
    const body = {
        email: email,
        passkey: password,
        first_name: firstName,
        last_name: lastName
    };

    const data = await createResponse("create_user", "POST", body);
    return data;
}

export async function createClient(email: string, password: string, firstName: string, lastName: string, client_id: string) {
    const body = {
        email: email,
        passkey: password,
        client_id: client_id,
        first_name: firstName,
        last_name: lastName
    };

    const data = await createResponse("create_client", "POST", body);
    return data;
}


export async function validateLinkToken(token: string) {
    const body = {
        token: token,
    };

    const data = await createResponse("validate_link_token", "POST", body);
    return data;
}

