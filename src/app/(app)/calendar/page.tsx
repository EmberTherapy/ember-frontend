'use client';

import { useState } from 'react';
import './calendar.css';    
import { ModalContextProvider } from '@/app/lib/ModalContextProvider';
import TherapistCal from '@/app/(app)/calendar/components/TherapistCal';
import ModalHost from '@/app/(app)/calendar/components/ModalHost';


export default function CalendarPage() {
    return (
        <ModalContextProvider>
            <div className="calendar-page">
                <TherapistCal />
                <ModalHost />
            </div>
        </ModalContextProvider>
    );
}