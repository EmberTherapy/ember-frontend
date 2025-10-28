const client_data = [
    {
        id: 1, 
        name: "Elie Esses",
        focus_areas: ["anxiety", "sadness"],
        meeting_time: "3pm Monday",
        ai_instructions: "Please provide extra support around social anxiety and coping mechanisms.",
        flagged: false
    },
    {
        id: 2,
        name: "Ayelet Cantor",
        focus_areas: ["anger", "depression"],
        meeting_time: "4pm Tuesday",
        ai_instructions: "Please provide extra support around anger management and coping strategies.",
        flagged: false
    },
    {
        id: 3,
        name: "Elias Sasson",
        focus_areas: ["stress", "fatigue"],
        meeting_time: "5pm Wednesday",
        ai_instructions: "Please do not focus on stress management techniques.",
        flagged: true
    },
    {
        id: 4,
        name: "Benjy Diamond",
        focus_areas: ["boredom", "lack of motivation"],
        meeting_time: "2pm Thursday",
        ai_instructions: "Please provide extra support around motivation and engagement strategies.",
        flagged: false
    },
    {
        id: 5,
        name: "Joshua Fleicher",
        focus_areas: ["insomnia", "restlessness"],
        meeting_time: "1pm Friday",
        ai_instructions: "Do not let the client discuss work-related stress.",
        flagged: true
    },
    {
        id: 6,
        name: "Yehudah Pepper Fox",
        focus_areas: ["anxiety", "stress"],
        meeting_time: "10am Friday",
        ai_instructions: "Client tends to get anxious about social situations. Provide extra support in this area.",
        flagged: false
    },
    {
        id: 7,
        name: "Yakir Hirsch",
        focus_areas: ["insecurity about his tiny dick", "social anxiety"],
        meeting_time: "11am Monday",
        ai_instructions: "Client has expressed significant insecurity about his body image, particularly regarding his genitalia. Please approach this topic with sensitivity and provide supportive strategies to help improve his self-esteem.",
        flagged: false
    }
];

const client_records = [
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

export function getClientData(id: number) {
    for (let client of client_data) {
        if (client.id === id) {
            return client;
        }
    }
    return null;
}

export function getClientList() {
  return [...client_data]
    .sort((a, b) => {
      if (a.flagged && !b.flagged) return -1;
      if (!a.flagged && b.flagged) return 1;

      const lastA = (a.name ?? "").split(" ").pop()?.toLowerCase() ?? "";
      const lastB = (b.name ?? "").split(" ").pop()?.toLowerCase() ?? "";
      return lastA.localeCompare(lastB);
    })
    .map(client => ({
      id: client.id,
      name: client.name ?? "",
      flagged: client.flagged ?? false
    }));
}
// sort records by date descending
export function getClientRecords(id: number) {
    const records = client_records.filter(record => record.client_id === id);
    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return records;
}