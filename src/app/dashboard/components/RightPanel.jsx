export default function RightPanel({ source, onClosePanel, clientId}) {
    return (
        <div id="right-panel">
            <h1>{source}</h1>
            <p>Client ID: {clientId}</p>
            <button onClick={onClosePanel}>Close</button>
        </div>
    );
}