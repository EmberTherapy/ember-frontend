'use client';

import { useState } from 'react';
import './calendar.css';    
import CalendarContainer from '@/app/(dashboard)/calendar/components/CalendarContainer';
import ModalHost from "@/app/(dashboard)/components/ModalHost";


export default function CalendarPage() {
    return (
            <div className="calendar-page">
                <CalendarContainer />
            </div>
    );
}