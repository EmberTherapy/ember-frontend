'use client'
import '../chat.css'
import { useEffect, useState } from 'react';
import { getUserFirstName } from '@/app/lib/api/user';
import { getDefaultConvoId , getChatHistory, sendMessage } from '@/app/lib/api/chat';

export default function ChatPage() {
    const [clientName, setClientName] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStuff() {
            const firstName =  await getUserFirstName();
            setClientName(firstName);
            const convoId = await getDefaultConvoId();
            const chatHistory = await getChatHistory(convoId);
            setHistory(chatHistory);
            setLoading(false);
        }
        fetchStuff();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Chat page</h1>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Chat page</h1>
            <p>Welcome, {clientName}!</p>
            <h2>Chat History:</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.role}:</strong> {entry.message}
                    </li>
                ))}
            </ul>
        </div>
    )
}