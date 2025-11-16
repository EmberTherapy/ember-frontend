"use client";

import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

import { localizer } from "@/app/lib/calendarLocalizer";
export default function TherapistCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Session with Sarah",
      start: new Date(2025, 10, 15, 13, 0),
      end: new Date(2025, 10, 15, 14, 0),
    },
  ]);

  function handleEventResize({ event, start, end }) {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  }

  function handleEventDrop({ event, start, end }) {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  }

  return (
    <Calendar
        className="calendar"
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        step={30}
        timeslots={2}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        draggableAccessor={() => true}
    />
  );
}