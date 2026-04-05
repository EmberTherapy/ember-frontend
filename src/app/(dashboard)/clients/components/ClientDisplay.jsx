import { on } from 'events';
import { useEffect, useState } from 'react';
import RecordsCard from './displayCards/RecordsCard';
import ClientCard from './displayCards/ClientCard';
import { getClientRecords } from '@/app/lib/api/record';
import { getClientData } from '@/app/lib/api/client';
import { getUserFirstName } from '@/app/lib/api/user';

export default function ClientDisplay({ selected_id, onOpenPanel }) {

    const [userFirstName, setUserFirstName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        async function fetchUserFirstName() {
            const firstName =  await getUserFirstName();
            setUserFirstName(firstName);
            setIsLoaded(true);
        }
        fetchUserFirstName();
    }, []);

    if (!isLoaded) {
        return (
            <div id="client-display">
                <div>
                    <div className="card">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (!selected_id) {
        return (
            <div id="client-display">
                <div>
                    <div className="card">
                        <h2>Welcome back, {userFirstName}!</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="client-display">
            <div>
                <ClientCard client_id={selected_id} onOpenPanel={onOpenPanel} />
                <RecordsCard client_id={selected_id}  />
            </div>
        </div>
    );
}