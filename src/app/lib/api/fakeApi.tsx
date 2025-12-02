import { Client, EmergencyContact, ClientRecord, Flag } from "@/app/lib/types";
import { emergency_contacts, flags, clients, client_records, calendar_events } from "./data";

export async function authenticateUser(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: true, token: "fake-jwt-token" };
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: true };
}


export async function getClientList() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...clients]
        .sort((a, b) => {
        if (a.flagged && !b.flagged) return -1;
        if (!a.flagged && b.flagged) return 1;

        if (a.flagged && b.flagged) {
            if ((a.flag_severity ?? 0) > (b.flag_severity ?? 0)) return -1;
            if ((a.flag_severity ?? 0) < (b.flag_severity ?? 0)) return 1;
        }
        const lastA = a.last_name.toLowerCase();
        const lastB = b.last_name.toLowerCase();
        return lastA.localeCompare(lastB);
    })
    .map(client => ({
        id: client.id,
        first_name: client.first_name ?? "",
        last_name: client.last_name ?? "",
        flagged: client.flagged ?? false,
        flag_severity: client.flag_severity ?? null
        }));
}

export async function getClientData(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let client of clients) {
        if (client.id === client_id) {
            return client;
        }
    }
    return null;
}

export async function getClientFormData(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const client = await getClientData(client_id);
    const emergency_contact = emergency_contacts.find(ec => ec.client_id === client_id) || null;

    return {
        client: client,
        emergency_contact: emergency_contact
    };
}

export async function getClientRecords(id: number) {
    // sort by flag_severity descending, then date descending
    await new Promise((resolve) => setTimeout(resolve, 50));

    const records = client_records.filter(record => record.client_id === id);

    records.sort((a, b) => {
        if (b.flag_severity !== a.flag_severity) {
            return (b.flag_severity ?? 0) - (a.flag_severity ?? 0);
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return records;
}

export async function createNewClient(client: Client) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Creating new client:", client);

    return true;
}

export async function updateClient(client: Client) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating client:", client);

    return true;
}

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

export async function getRecordById(record_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let record of client_records) {
        if (record.id === record_id) {
            return record;
        }
    }
    return null;
}

export async function createClientRecord(text: string, client_id: number, date: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Creating new client record:", text, date, client_id);
    
    return true;
}

export async function updateClientRecord(record: ClientRecord) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating client record:", record);

    return true;
}

export async function deleteClientRecord(record_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Deleting client record:", record_id);

    return true;
}

export async function getUserInfo() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return {
        first_name: "Elie",
        last_name: "Esses"
    }
}

export async function getCalendarEvents() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return calendar_events;
}

export async function getClientNames() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return clients.map(client => ({
        id: client.id,
        first_name: client.first_name ?? "",
        last_name: client.last_name ?? ""
    }));
}

export async function createCalendarEvent(event: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Creating calendar event:", event);

    return true;
}