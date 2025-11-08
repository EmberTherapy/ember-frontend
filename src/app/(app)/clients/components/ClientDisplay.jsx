import { on } from 'events';
import { useEffect, useState } from 'react';
import RecordsCard from './displayCards/RecordsCard';
import ClientCard from './displayCards/ClientCard';
import { getClientData, getClientRecords } from '@/app/lib/api/fakeApi';

export default function ClientDisplay({ selected_id, onOpenPanel, onOpenModal }) {
    if (!selected_id) {
        return (
            <div id="client-display">
                <div>
                    <div className="card">
                        <h2>Welcome back!</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="client-display">
            <div>
                <ClientCard client_id={selected_id} onOpenPanel={onOpenPanel} onOpenModal={onOpenModal} />
                <RecordsCard client_id={selected_id} onOpenModal={onOpenModal} />
            </div>
        </div>
    );
}