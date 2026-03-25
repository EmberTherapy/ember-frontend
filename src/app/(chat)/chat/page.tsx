'use client'
import '../chat.css'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { validateLinkToken } from '@/app/lib/api/auth';
import { getClientNameById } from '@/app/lib/api/client';
import { useEffect, useState } from 'react';

export default function ChatPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [clientId, setClientId] = useState('');
    const [clientName, setClientName] = useState('');

    useEffect(() => {
        const validateToken = async () => {
            console.log("Validating token:", token);
            const token_validation = await validateLinkToken(token ?? '');

            if (token_validation.status == 'failure') {
                router.replace("/invalid");
                return;
            }

            if (!token_validation.client_id) {
                router.replace("/invalid");
                return;
            }
            
            if (token_validation.status == 'success') {
                setClientId(token_validation.client_id);
                const name = await getClientNameById(token_validation.client_id);
                setClientName(name);
            }
        }

        validateToken();
    }, [token, router]);

    if (clientName !== '') {
        return (
             <div>
                <h1>Chat page</h1>
                <p>Welcome, {clientName.split(" ")[0]}!</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}