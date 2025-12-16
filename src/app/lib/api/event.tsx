import { calendar_events } from "./data";

export async function createEvent(event: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Creating calendar event:", event);

    return true;
}

export async function editEvent(event: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating calendar event:", event);

    return true;
}

export async function deleteEvent(event_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Deleting calendar event:", event_id);

    return true;
}

export async function getEvents() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return calendar_events;
}

export async function getEventById(event_id: number) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let event of calendar_events) {
        if (event.id === event_id) {
            return event;
        }
    }
    return null;
}