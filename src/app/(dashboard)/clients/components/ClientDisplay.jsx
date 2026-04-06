import { on } from 'events';
import { useEffect, useState } from 'react';
import RecordsCard from './displayCards/RecordsCard';
import ClientCard from './displayCards/ClientCard';
import { getClientRecords } from '@/app/lib/api/record';
import { getClientData } from '@/app/lib/api/client';
import { getUserFirstName } from '@/app/lib/api/user';
import { useContextProvider } from "@/app/(dashboard)/contextProvider";

export default function ClientDisplay({ onOpenPanel }) {

    const [userFirstName, setUserFirstName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { selectedClientId } = useContextProvider();
    
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
    if (!selectedClientId) {
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
                <ClientCard onOpenPanel={onOpenPanel} />
                <RecordsCard client_id={selectedClientId} />
            </div>
        </div>
    );
}