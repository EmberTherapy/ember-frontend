'use client'
import '../chat.css'
import { useEffect, useRef, useState } from 'react';
import { getUserFirstName } from '@/app/lib/api/user';
import { getDefaultConvoId , getChatHistory, sendMessage } from '@/app/lib/api/chat';
import { Message } from '@/app/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ChatPage() {
    const [clientName, setClientName] = useState('');
    const [history, setHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [convoId, setConvoId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        async function fetchStuff() {
            const firstName =  await getUserFirstName();
            setClientName(firstName);
            const id = await getDefaultConvoId();
            setConvoId(id);
            const chatHistory = await getChatHistory(id);
            setHistory(chatHistory);
            setLoading(false);
        }
        fetchStuff();
    }, []);

    async function handleSubmit() {   
        if (!input.trim()) return;
        if (!convoId) return;
        const ll_res = await sendMessage(convoId, input);
        // setHistory(prev => [...prev, {role: 'user', content: input}, {role: 'assistant', content: ll_res}]);
        setRefreshing(true);
        const chatHistory = await getChatHistory(convoId);
        setHistory(chatHistory);
        setInput('');
    }

    const textareaRef = useRef(null);

    // function handleInputChange(e) {
    //     const value = e.target.value;
    //     setInput(value);

    //     const el = textareaRef.current;
    //     if (!el) return;

    //     el.style.height = "auto";
    //     el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
    // }

    if (loading) {
        return (
            <div>
                <h1>Chat page</h1>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="chat-shell">
        <ul className="message-list">
            {history.map((msg, index) => (
            <li
                key={index}
                className={`message ${msg.role === "user" ? "user-message" : "assistant-message"}`}
            >
                <div className={msg.role === "user" ? "client-message" : "assistant-message-bubble"}>
                {msg.content}
                </div>
            </li>
            ))}
        </ul>

        <form className="chat-input-bar" onSubmit={e => {
            e.preventDefault();
            handleSubmit();
        }}>
            <textarea
            ref={textareaRef}
            className="message-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="How are you feeling today?"
            rows={1}
            />
            <button className="send-button" type="submit" disabled={!input.trim()}>
                <FontAwesomeIcon icon={faCircleArrowUp} />
            </button>
        </form>
        </div>
    )
}