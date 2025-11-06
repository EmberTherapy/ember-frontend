import { Client, ClientRecord, EmergencyContact, Flag } from "../../types";

export const emergency_contacts: EmergencyContact[] = [
    { id: 1, client_id: 1, name: "Sharon Esses", relationship: "Mother", phone: "555-123-0462", email: "sarah@example.com" },
    { id: 2, client_id: 2, name: "Michael Cantor", relationship: "Father", phone: "555-567-0462", email: "david@example.com" },
    { id: 3, client_id: 3, name: "Barb Sasson", relationship: "Sister", phone: "555-876-0462", email: "rachel@example.com" },
    { id: 4, client_id: 4, name: "David Diamond", relationship: "Father", phone: "555-432-0462", email: "david@example.com" },
    { id: 5, client_id: 5, name: "Linda Fleicher", relationship: "Mother", phone: "555-246-0462", email: "linda@example.com" },
    { id: 6, client_id: 6, name: "Sarah Fox", relationship: "Sister", phone: "555-135-0462", email: "sarah@example.com" },
    { id: 7, client_id: 7, name: "Miriam Hirsch", relationship: "Mother", phone: "555-975-0462", email: "miriam@example.com" },
];
    
export const flags: Flag[] = [
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

export const clients: Client[] = [
    {
        id: 1, 
        first_name: "Elie",
        last_name: "Esses",
        date_of_birth: "01/01/1990",
        phone: "555-123-4567",
        email: "elie@example.com",
        focus_areas: ["anxiety", "sadness"],
        meeting_time: "3pm Monday",
        ai_instructions: "Please provide extra support around social anxiety and coping mechanisms. Client has a tendency to overthink social situations. Blah blah blah this needs to be longer so the text area looks filled up. Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 2,
        first_name: "Ayelet",
        last_name: "Cantor",
        email: "ayelet@example.com",
        date_of_birth: "02/02/1992",
        phone: "555-234-5678",
        focus_areas: ["anger", "depression"],
        meeting_time: "4pm Tuesday",
        ai_instructions: "Please provide extra support around anger management and coping strategies.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 3,
        first_name: "Elias",
        last_name: "Sasson",
        email: "elias@example.com",
        date_of_birth: "03/03/1993",
        phone: "555-345-6789",
        focus_areas: ["stress", "fatigue"],
        meeting_time: "5pm Wednesday",
        ai_instructions: "Please do not focus on stress management techniques.",
        flagged: true,
        flag_severity: 2
    },
    {
        id: 4,
        first_name: "Benjy",
        last_name: "Diamond",
        email: "benjy@example.com",
        date_of_birth: "04/04/1994",
        phone: "555-456-7890",
        focus_areas: ["boredom", "lack of motivation"],
        meeting_time: "2pm Thursday",
        ai_instructions: "Please provide extra support around motivation and engagement strategies.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 5,
        first_name: "Joshua",
        last_name: "Fleicher",
        email: "joshua@example.com",
        date_of_birth: "05/05/1995",
        phone: "555-567-8901",
        focus_areas: ["insomnia", "restlessness"],
        meeting_time: "1pm Friday",
        ai_instructions: "Do not let the client discuss work-related stress.",
        flagged: true,
        flag_severity: 1
    },
    {
        id: 6,
        first_name: "Yehudah",
        last_name: "Pepper Fox",
        email: "yehudah@example.com",
        date_of_birth: "06/06/1996",
        phone: "555-678-9012",
        focus_areas: ["anxiety", "stress"],
        meeting_time: "10am Friday",
        ai_instructions: "Client tends to get anxious about social situations. Provide extra support in this area.",
        flagged: false,
        flag_severity: null
    },
    {
        id: 7,
        first_name: "Yakir",
        last_name: "Hirsch",
        email: "yakir@example.com",
        date_of_birth: "07/07/1997",
        phone: "555-789-0123",
        focus_areas: ["insecurity about his tiny dick", "social anxiety"],
        meeting_time: "11am Monday",
        ai_instructions: "Client has expressed significant insecurity about his body image, particularly regarding his genitalia. Please approach this topic with sensitivity and provide supportive strategies to help improve his self-esteem.",
        flagged: false,
        flag_severity: null
    }
];

export const client_records: ClientRecord[] = [
    { id: 1, client_id: 1, date: "1/22/2024, 10:00 AM", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." },
    { id: 2, client_id: 1, date: "1/15/2024, 10:00 AM", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 3, client_id: 1, date: "1/8/2024, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 4, client_id: 1, date: "12/30/2023, 10:00 AM", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 5, client_id: 1, date: "12/20/2023, 10:00 AM", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 6, client_id: 2, date: "12/10/2023, 10:00 AM", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 7, client_id: 2, date: "12/1/2023, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 8, client_id: 2, date: "11/22/2023, 10:00 AM", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 1, client_id: 2, date: "1/22/2024, 10:00 AM", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." },
    { id: 2, client_id: 2, date: "1/15/2024, 10:00 AM", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 3, client_id: 2, date: "1/8/2024, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 4, client_id: 3, date: "12/30/2023, 10:00 AM", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 5, client_id: 3, date: "12/20/2023, 10:00 AM", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 6, client_id: 4, date: "12/10/2023, 10:00 AM", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 7, client_id: 4, date: "12/1/2023, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 8, client_id: 4, date: "11/22/2023, 10:00 AM", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 9, client_id: 5, date: "1/15/2024, 10:00 AM", type: "session_note", content: "Client reported feeling anxious. Discussed potential triggers." },
    { id: 10, client_id: 5, date: "1/8/2024, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of sadness. Explored recent events." },
    { id: 11, client_id: 6, date: "12/30/2023, 10:00 AM", type: "session_note", content: "Client reported stress related to work. Discussed time management techniques." },
    { id: 12, client_id: 6, date: "12/20/2023, 10:00 AM", type: "chat_summary", content: "Client discussed feelings of loneliness. Explored social connection strategies." },
    { id: 13, client_id: 6, date: "12/10/2023, 10:00 AM", type: "session_note", content: "Client reported difficulty sleeping. Discussed sleep hygiene practices." },
    { id: 14, client_id: 6, date: "12/1/2023, 10:00 AM", type: "chat_summary", content: "Client expressed feelings of anger. Explored anger management techniques." },
    { id: 15, client_id: 6, date: "11/22/2023, 10:00 AM", type: "session_note", content: "Client reported feeling overwhelmed. Discussed relaxation techniques." },
    { id: 16, client_id: 6, date: "1/22/2024, 10:00 AM", type: "chat_summary", content: "Client reported feeling more positive. Discussed coping strategies." }
];