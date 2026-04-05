import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function getDefaultConvoId() {
    const data = await createResponse('get_default_convo_id', "GET");
    return data.convo_id;
}

export async function getChatHistory(convo_id: string) {
    const body = {
        "convo_id": convo_id
    }
    const data = await createResponse('get_chat_history', "POST", body);
    return data.chat_history;
}

export async function sendMessage(convo_id: string, message: string) {
    const body = {
        "convo_id": convo_id,
        "message": message
    }
    const data = await createResponse('send_message', "POST", body);
    return data.message;
}