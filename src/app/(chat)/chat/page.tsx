'use client'
import { useEffect, useRef, useState } from 'react';
import { getUserFirstName } from '@/app/lib/api/user';
import { getDefaultConvoId, getChatHistory, sendMessage } from '@/app/lib/api/chat';
import { Message } from '@/app/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '@/app/globalComponents/header.css';

export default function ChatPage() {
    const [startedConvo, setStartedConvo] = useState(false);
    const [clientName, setClientName] = useState('');
    const [history, setHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [convoId, setConvoId] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function fetchStuff() {
            const firstName = await getUserFirstName();
            setClientName(firstName);

            const id = await getDefaultConvoId();
            setConvoId(id);

            const chatHistory = await getChatHistory(id);
            setHistory(chatHistory);

            setLoading(false);
        }

        fetchStuff();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    async function handleSubmit() {
        setStartedConvo(true);
        if (!input.trim()) return;
        if (!convoId) return;

        const messageToSend = input;
        setInput('');

        setHistory(prev => [
            ...prev,
            { role: 'user', content: messageToSend }
        ]);

        const llmRes = await sendMessage(convoId, messageToSend);
        console.log("LLM response:", llmRes);
        setHistory(prev => [
            ...prev,
            { role: 'assistant', content: llmRes }
        ]);
    }
    function handleInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key !== 'Enter' || e.shiftKey) return;

        e.preventDefault();
        handleSubmit();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setInput(value);

        const el = textareaRef.current;
        if (!el) return;

        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="chat-shell">
            <ul className="message-list">
                {history.map((msg, index) => (
                    <li
                        key={index}
                        className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                    >
                        <div className={msg.role === 'user' ? 'client-message' : 'assistant-message-bubble'}>
                            {msg.content}
                        </div>
                    </li>
                ))}
                <div ref={bottomRef} />
            </ul>

            <form
                className="chat-input-bar"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <textarea
                    ref={textareaRef}
                    className="message-input"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={!startedConvo ? "How are you feeling today?" : "Reply..."}
                    rows={1}
                />
                <button className="send-button" type="submit" disabled={!input.trim()}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </form>
        </div>
    );
}
