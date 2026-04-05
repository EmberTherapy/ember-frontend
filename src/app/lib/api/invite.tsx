import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function inviteClient(client_id: string) {
    const body = {
        client_id: client_id
    }

    const data = await createResponse("invite_client", "POST", body);
    return data;
}

export async function inviteTherapist(therapistEmail: string, therapistFirstName: string, isFriend: boolean = false) {
    const body = {
        therapist_email: therapistEmail,
        therapist_first_name: therapistFirstName,
        is_friend: isFriend
    };

    const data = await createResponse("invite_therapist", "POST", body);
    return data;
}