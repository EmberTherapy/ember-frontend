"use client";
import "../rbc.css";
import { useState, useEffect, useCallback } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, Views } from "react-big-calendar";
import Toolbar from "./Toolbar";
import { useContextProvider } from "@/app/(dashboard)/contextProvider";
import { getEvents } from "@/app/lib/api/event";
import { localizer } from "@/app/lib/utils/calendarLocalizer";

const DnDCalendar = withDragAndDrop(Calendar);

export default function CalendarContainer() {
  const [events, setEvents] = useState([]);
  const { openEditEventModal } = useContextProvider();

  useEffect(() => {
    getEvents()
      .then((events) => {
        setEvents(
          events.map(e => ({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
          }))
        );
      })
      .catch(console.error);
  }, []);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);

  const minTime = new Date(1970, 0, 1, 8, 0, 0);
  const maxTime = new Date(1970, 0, 1, 20, 0, 0);

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
  }, []);


  return (
    <div className="calendar-wrapper">
      <DnDCalendar
        className="calendar"
        localizer={localizer}
        components={{ toolbar: Toolbar }}
        events={events}
        date={date}
        view={view}
        resizable={false}
        min={minTime}
        max={maxTime}
        timeslots={2}
        step={30}
        onNavigate={setDate}
        onView={setView}
        onEventDrop={moveEvent}
        onSelectEvent={(event) =>
          openEditEventModal(event.id)
        }
      />
    </div>
  );
}
