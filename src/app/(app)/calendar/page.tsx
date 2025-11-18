'use client';

import TherapistCal from '@/app/(app)/calendar/components/TherapistCal';
import './calendar.css';

export default function CalendarPage() {
    return (
        <div className="calendar-page">
            <div className="calendar-wrapper">
                <TherapistCal />
            </div>
        </div>
    );
}