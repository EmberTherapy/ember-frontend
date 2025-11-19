"use client";

import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Toolbar from './Toolbar';
import "../rbc.css" 
import { useState, useEffect } from "react";
import { getCalendarEvents } from "@/app/lib/api/fakeApi";

import { localizer } from "@/app/lib/calendarLocalizer";

export default function TherapistCalendar() {
  const [events, setEvents] = useState();

  useEffect(() => {
    getCalendarEvents().then(events => {
      setEvents(events);
    }).catch(console.error);
  }, []);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);

  const minTime = new Date(1970, 0, 1, 8, 0, 0);   // 8:00 AM
  const maxTime = new Date(1970, 0, 1, 20, 0, 0);  // 8:00 PM (change if you want)

  return (
    <div className="calendar-wrapper">
      <Calendar
        className="calendar"
        localizer={localizer}
        components={{ toolbar: Toolbar}}
        events={events}
        date={date}
        view={view}
        min={minTime}
        max={maxTime}
        timeslots={2}
        step={30}
        onNavigate={newDate => setDate(newDate)}
        onView={newView => setView(newView)}
      />
    </div>
  );
}
