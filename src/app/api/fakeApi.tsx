const client_data = [
    {
        id: 1, 
        name: "Elie Esses",
        problems: ["anxiety", "sadness"],
        meeting_time: "3pm Monday",
        flagged: false
    },
    {
        id: 2,
        name: "Ayelet Cantor",
        problems: ["anger", "depression"],
        meeting_time: "4pm Tuesday",
        flagged: false
    },
    {
        id: 3,
        name: "Elias Sasson",
        problems: ["stress", "fatigue"],
        meeting_time: "5pm Wednesday",
        flagged: true
    },
    {
        id: 4,
        name: "Benjy Diamond",
        problems: ["boredom", "lack of motivation"],
        meeting_time: "2pm Thursday",
        flagged: false
    },
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
    const sortedClients = [...client_data] 
    .sort((a, b) => {
        const lastA = a.name?.trim().split(" ").pop()?.toLowerCase() || "";
        const lastB = b.name?.trim().split(" ").pop()?.toLowerCase() || "";
        return lastA.localeCompare(lastB);
    })
    .map(client => ({
        id: client.id,
        name: client.name,
        flagged: client.flagged
    }));

    return sortedClients;
}