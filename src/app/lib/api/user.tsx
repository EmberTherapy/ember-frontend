import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function getUserInitials() {
    const data = await createResponse("get_user_initials", "GET");
    return data.initials;
}

export async function getUserFullName() {
    const data = await createResponse("get_user_full_name", "GET");
    return data.name;
}

export async function getUserFirstName() {
    const data = await createResponse("get_user_first_name", "GET");
    return data.first_name;
}
