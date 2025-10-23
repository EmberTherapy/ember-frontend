export default function ClientDisplay({ id, onOpenPanel }) {

    // if id == 0, return null, else hit API
    // input {id: <id>}
    // expected output
    // expected output {  id: <id>, name: <name> problems: <problems> },
    function getClientData(id) {
        const client_data = [
            { name: "Elie Esses", id: 1, problems: "anxiety, sadness"},
            { name: "Ayelet Cantor", id: 2, problems: "anger, depression"},
            { name: "Elias Sasson", id: 3, problems: "stress, fatigue"},
            { name: "Benjy Diamond", id: 4, problems: "boredom, lack of motivation"},
        ];

        for (let client of client_data) {
            if (client.id === id) {
                return client;
            }
        }
        return null;
    }

    const client = getClientData(id);
    return (
        <div id="client-display">
            {client ? (
                <div>
                    <div className="card">
                        <h2>{client.name}</h2>
                        <button onClick={() => onOpenPanel("editClient")}>Edit Client</button>
                    </div>
                    <div className="card">
                        <p>{client.problems}</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="card">
                            <h2>No Client Selected</h2>
                    </div>
                </div>
            )}
        </div>
    );
}