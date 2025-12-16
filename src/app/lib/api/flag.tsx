import { emergency_contacts, flags, clients } from "./data";

export async function getFlagsPanelData(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const user_flags = flags.filter(flag => flag.client_id === client_id);
    const contact = emergency_contacts.find(ec => ec.client_id === client_id) || null;

    const payload = {
        user_flags: user_flags,
        emergency_contact: contact
    }

    return payload;
}

export async function isFlagged(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let client of clients) {
        if (client.id === client_id) {
            return client.flagged;
        }
    }
    return false;
}

export async function resolveFlags(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));

    return true;
}