import { Client, ClientRecord, EmergencyContact, Flag } from "../../types";

const emergency_contacts: EmergencyContact[] = [
    { id: 1, client_id: 1, name: "Sharon Esses", relationship: "Mother", phone: "555-123-0462", email: "sarah@example.com" },
    { id: 2, client_id: 2, name: "Michael Cantor", relationship: "Father", phone: "555-567-0462", email: "david@example.com" },
    { id: 3, client_id: 3, name: "Barb Sasson", relationship: "Sister", phone: "555-876-0462", email: "rachel@example.com" },
    { id: 4, client_id: 4, name: "David Diamond", relationship: "Father", phone: "555-432-0462", email: "david@example.com" },
    { id: 5, client_id: 5, name: "Linda Fleicher", relationship: "Mother", phone: "555-246-0462", email: "linda@example.com" },
    { id: 6, client_id: 6, name: "Sarah Fox", relationship: "Sister", phone: "555-135-0462", email: "sarah@example.com" },
    { id: 7, client_id: 7, name: "Miriam Hirsch", relationship: "Mother", phone: "555-975-0462", email: "miriam@example.com" },
];
    
const flags: Flag[] = [
    {
        id: 1,
        client_id: 3,
        type: "Self-Harm",
        severity: 2,
        chat_snippet: "Client mentioned feeling hopeless and having thoughts of self-harm during in chat.",
        date_flagged: "1/10/2025, 1:23 PM"
    },
    {
        id: 2,
        client_id: 5,
        type: "Substance Abuse",
        severity: 1,
        chat_snippet: "Client disclosed using alcohol more frequently to cope with stress.",
        date_flagged: "1/12/2024, 2:45 PM"
    },
    {
        id: 3,
        client_id: 3,
        type: "Mental Health Crisis",
        severity: 1,
        chat_snippet: "Client described panic attacks and avoidance behaviors impacting daily life.",
        date_flagged: "1/15/2024, 3:30 PM"
    }
];

const clients: Client[] = [
    {
        id: 1, 
        name: "Elie Esses",
        email: "elie@example.com",
        focus_areas: ["anxiety", "sadness"],
        meeting_time: "3pm Monday",
        ai_instructions: "Please provide extra support around social anxiety and coping mechanisms. Client has a tendency to overthink social situations. Blah blah blah this needs to be longer so the text area looks filled up. Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 2,
        name: "Ayelet Cantor",
        email: "ayelet@example.com",
        focus_areas: ["anger", "depression"],
        meeting_time: "4pm Tuesday",
        ai_instructions: "Please provide extra support around anger management and coping strategies.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 3,
        name: "Elias Sasson",
        email: "elias@example.com",
        focus_areas: ["stress", "fatigue"],
        meeting_time: "5pm Wednesday",
        ai_instructions: "Please do not focus on stress management techniques.",
        flagged: true,
        flag_severity: 2
    },
    {
        id: 4,
        name: "Benjy Diamond",
        email: "benjy@example.com", 
        focus_areas: ["boredom", "lack of motivation"],
        meeting_time: "2pm Thursday",
        ai_instructions: "Please provide extra support around motivation and engagement strategies.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 5,
        name: "Joshua Fleicher",
        email: "joshua@example.com",
        focus_areas: ["insomnia", "restlessness"],
        meeting_time: "1pm Friday",
        ai_instructions: "Do not let the client discuss work-related stress.",
        flagged: true,
        flag_severity: 1
    },
    {
        id: 6,
        name: "Yehudah Pepper Fox",
        email: "yehudah@example.com",
        focus_areas: ["anxiety", "stress"],
        meeting_time: "10am Friday",
        ai_instructions: "Client tends to get anxious about social situations. Provide extra support in this area.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 7,
        name: "Yakir Hirsch",
        email: "yakir@example.com", 
        focus_areas: ["insecurity about his tiny dick", "social anxiety"],
        meeting_time: "11am Monday",
        ai_instructions: "Client has expressed significant insecurity about his body image, particularly regarding his genitalia. Please approach this topic with sensitivity and provide supportive strategies to help improve his self-esteem.",
        flagged: false,
        flag_severity: null
    }
];

const client_records: ClientRecord[] = [
    { id: 1, client_id: 1, date: "2024-01-22", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." },
    { id: 2, client_id: 1, date: "2024-01-15", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 3, client_id: 1, date: "2024-01-08", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 4, client_id: 1, date: "2023-12-30", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 5, client_id: 1, date: "2023-12-20", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 6, client_id: 2, date: "2023-12-10", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 7, client_id: 2, date: "2023-12-01", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 8, client_id: 2, date: "2023-11-22", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 1, client_id: 2, date: "2024-01-22", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." },
    { id: 2, client_id: 2, date: "2024-01-15", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 3, client_id: 2, date: "2024-01-08", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 4, client_id: 3, date: "2023-12-30", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 5, client_id: 3, date: "2023-12-20", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 6, client_id: 4, date: "2023-12-10", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 7, client_id: 4, date: "2023-12-01", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 8, client_id: 4, date: "2023-11-22", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 9, client_id: 5, date: "2024-01-15", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 10, client_id: 5, date: "2024-01-08", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 11, client_id: 6, date: "2023-12-30", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 12, client_id: 6, date: "2023-12-20", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 13, client_id: 6, date: "2023-12-10", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 14, client_id: 6, date: "2023-12-01", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 15, client_id: 6, date: "2023-11-22", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 16, client_id: 6, date: "2024-01-22", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." }
];

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

        const lastA = (a.name ?? "").split(" ").pop()?.toLowerCase() ?? "";
        const lastB = (b.name ?? "").split(" ").pop()?.toLowerCase() ?? "";
        return lastA.localeCompare(lastB);
        })
        .map(client => ({
            id: client.id,
            name: client.name ?? "",
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
    await new Promise((resolve) => setTimeout(resolve, 50));
    const records = client_records.filter(record => record.client_id === id);
    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    console.log("Resolving flags for client ID:", client_id);

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