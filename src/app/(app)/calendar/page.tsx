'use client';

import { useState } from 'react';
import './calendar.css';    
import CalendarContainer from '@/app/(app)/calendar/components/CalendarContainer';
import ModalHost from "@/app/(app)/components/ModalHost";


export default function CalendarPage() {
    return (
            <div className="calendar-page">
                <CalendarContainer />
            </div>
    );
}