export type PanelSource = "clientFlagInfo" | null;
export type ModalSource = "editClient" | "newClient" | "viewRecord" | null;

export interface Client {
  id: number;
  name: string;
  email: string;
  focus_areas: string[];
  meeting_time: string;
  ai_instructions: string;
  flagged: boolean;
}

export interface ClientRecord {
  id: number;
  client_id: number;
  date: string;
  type: "chat_summary" | "session_note";
  content: string;
}