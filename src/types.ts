export type PanelSource = "flag" | null;
export type ModalMode = "editClient" | "newClient" | "viewRecord" | null;

export interface Client {
  id: number;
  name: string;
  email: string;
  focus_areas: string[];
  meeting_time: string;
  ai_instructions: string;
  flagged: boolean;
  flag_severity: 1 | 2 | null;
  emergency_contact?: EmergencyContact;
}

export interface ClientRecord {
  id: number;
  client_id: number;
  date: string;
  type: "chat_summary" | "session_note";
  content: string;
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