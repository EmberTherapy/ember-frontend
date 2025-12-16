import { Client, EmergencyContact } from "@/app/lib/types";
import { emergency_contacts, clients } from "./data";

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

export async function getClientNames() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return clients.map(client => ({
        id: client.id,
        first_name: client.first_name ?? "",
        last_name: client.last_name ?? ""
    }));
}

export async function getClientNameById(client_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const client = clients.find(c => c.id === client_id);
    if (client) {
        return `${client.first_name ?? ""} ${client.last_name ?? ""}`.trim();
    }
    return "Unknown Client";
}