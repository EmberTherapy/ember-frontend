export type PanelSource = "flag" | null;
export type ModalMode = "editClient" | "newClient" | "viewRecord" | "newRecord" | "editRecord" | null;

export type Message = {
    role: 'user' | 'assistant';
    content: string;
}
export interface ClientForm {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  phone: string;
  focus_areas: string[];
  meeting_day: string;
  meeting_time: string;
  ai_instructions: string;
  emergency_contacts: {
    first_name: string;
    last_name: string;
    relationship: string;
    email: string;
    phone: string;
  }[];
}

export interface ClientRecord {
  id: number;
  client_id: number;
  date: string;
  type: "chat_summary" | "session_note";
  content: string;
  flag_severity: 1 | 2 | null;
}

export interface EmergencyContact {
  id: number;
  client_id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface Flag {
  id: number;
  record_id: number;
  client_id: number;
  severity: 1 | 2 | null;
  type: "Self-Harm" | "Substance Abuse" | "Mental Health Crisis";
  chat_snippet: string;
  date_flagged: string;
}

export interface FlagsPanelData {
  user_flags: Flag[];
  emergency_contacts: EmergencyContact[];
}

export interface UserFormData {
        first_name: string;
        last_name: string;
        date_of_birth: string;
        phone: string;
        email: string;
        focus_areas: string[];
        meeting_time: string;
        ai_instructions: string;
        emergency_contact: EmergencyContact;
    }

export interface CalendarEvent {
  id: number;
  type: "session" | "other";
  client_id: number | null;
  title: string;
  notes: string;
  link: string | null;
  start: Date;
  end: Date;
}