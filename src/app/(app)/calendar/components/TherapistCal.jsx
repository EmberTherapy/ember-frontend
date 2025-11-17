"use client";

import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

import { localizer } from "@/app/lib/calendarLocalizer";

export default function TherapistCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Session with Benjy",
      start: new Date(2025, 10, 17, 10, 0),
      end: new Date(2025, 10, 17, 11, 0),
    },
    {
      id: 2,
      title: "Session with Elias",
      start: new Date(2025, 10, 18, 14, 0),
      end: new Date(2025, 10, 18, 15, 0),
    },
    {
      id: 3,
      title: "Session with Cantor",
      start: new Date(2025, 10, 19, 9, 30),
      end: new Date(2025, 10, 19, 10, 30),
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);

  const minTime = new Date(1970, 0, 1, 8, 0, 0);   // 8:00 AM
  const maxTime = new Date(1970, 0, 1, 20, 0, 0);  // 8:00 PM (change if you want)

  return (
    <Calendar
      className="calendar"
      localizer={localizer}
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
  );
}
