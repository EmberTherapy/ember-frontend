import { Client, ClientRecord, EmergencyContact, Flag, CalendarEvent } from "../types";

export const emergency_contacts: EmergencyContact[] = [
  {
    id: 1,
    client_id: 1,
    name: "Sharon Esses",
    relationship: "Mother",
    phone: "555-123-0462",
    email: "sarah@example.com",
  },
  {
    id: 2,
    client_id: 2,
    name: "Michael Cantor",
    relationship: "Father",
    phone: "555-567-0462",
    email: "david@example.com",
  },
  {
    id: 3,
    client_id: 3,
    name: "Barb Sasson",
    relationship: "Sister",
    phone: "555-876-0462",
    email: "rachel@example.com",
  },
  {
    id: 4,
    client_id: 4,
    name: "David Diamond",
    relationship: "Father",
    phone: "555-432-0462",
    email: "david@example.com",
  },
  {
    id: 5,
    client_id: 5,
    name: "Linda Fleicher",
    relationship: "Mother",
    phone: "555-246-0462",
    email: "linda@example.com",
  },
  {
    id: 6,
    client_id: 6,
    name: "Sarah Fox",
    relationship: "Sister",
    phone: "555-135-0462",
    email: "sarah@example.com",
  },
  {
    id: 7,
    client_id: 7,
    name: "Miriam Hirsch",
    relationship: "Mother",
    phone: "555-975-0462",
    email: "miriam@example.com",
  },
];
    
export const flags: Flag[] = [
  {
    id: 1,
    record_id: 3,
    client_id: 1,
    severity: 1,
    type: "Mental Health Crisis",
    chat_snippet: "Client expressed that 'things feel pointless lately' but denied plan or intent. Recommended clinician check-in and scheduled follow-up.",
    date_flagged: "2024-01-08T10:15:00Z"
  },
  {
    id: 2,
    record_id: 15,
    client_id: 4,
    severity: 2,
    type: "Mental Health Crisis",
    chat_snippet: "Client stated 'I can’t do this anymore' during group conflict discussion. Immediate de-escalation initiated and safety contact advised.",
    date_flagged: "2023-12-01T10:30:00Z"
  },
  {
    id: 3,
    record_id: 18,
    client_id: 5,
    severity: 2,
    type: "Self-Harm",
    chat_snippet: "Client used explicit self-harm language following interpersonal conflict. Crisis protocol activated; clinician notified for same-day outreach.",
    date_flagged: "2024-01-08T10:45:00Z"
  }
];

export const clients: Client[] = [
  {
    id: 1,
    first_name: "Elie",
    last_name: "Esses",
    date_of_birth: "1990-01-01",
    phone: "555-123-4567",
    email: "elie@example.com",
    focus_areas: ["anxiety", "sadness"],
    meeting_day: "Monday",
    meeting_time: "15:00",
    ai_instructions: "Provide extra support around social anxiety and coping mechanisms. Client tends to overthink social interactions and benefits from gentle reframing exercises. Encourage mindfulness practices and structured journaling to increase awareness of triggers.",
    flagged: true,
    flag_severity: 1,
    invite_status: "accepted",
    accepted_date: "2024-01-10"
  },
  {
    id: 2,
    first_name: "Ayelet",
    last_name: "Cantor",
    email: "ayelet@example.com",
    date_of_birth: "1992-02-02",
    phone: "555-234-5678",
    focus_areas: ["anger", "depression"],
    meeting_day: "Tuesday",
    meeting_time: "16:00",
    ai_instructions: "Support anger regulation and emotion labeling. Focus on mindfulness-based approaches and short grounding exercises when irritability increases.",
    flagged: false,
    flag_severity: null,
    invite_status: "pending",
    accepted_date: null
  },
  {
    id: 3,
    first_name: "Elias",
    last_name: "Sasson",
    email: "elias@example.com",
    date_of_birth: "1993-03-03",
    phone: "555-345-6789",
    focus_areas: ["stress", "fatigue"],
    meeting_day: "Wednesday",
    meeting_time: "15:00",
    ai_instructions: "Avoid repetitive stress-management techniques; client prefers reflective or meaning-based dialogue. Encourage consistent sleep and daily structure.",
    flagged: false,
    flag_severity: null,
    invite_status: "accepted",
    accepted_date: "2024-01-10"
  },
  {
    id: 4,
    first_name: "Benjy",
    last_name: "Diamond",
    email: "benjy@example.com",
    date_of_birth: "1994-04-04",
    phone: "555-456-7890",
    focus_areas: ["boredom", "lack of motivation"],
    meeting_day: "Thursday",
    meeting_time: "15:00",
    ai_instructions: "Provide motivational enhancement strategies and goal-setting exercises to boost engagement with daily tasks.",
    flagged: true,
    flag_severity: 2,
    invite_status: "accepted",
    accepted_date: "2024-01-10"
  },
  {
    id: 5,
    first_name: "Joshua",
    last_name: "Fleicher",
    email: "joshua@example.com",
    date_of_birth: "1995-05-05",
    phone: "555-567-8901",
    focus_areas: ["insomnia", "restlessness"],
    meeting_day: "Monday",
    meeting_time: "11:00",
    ai_instructions: "Avoid discussions around occupational stress. Encourage good sleep hygiene, relaxation techniques, and body-scan meditation.",
    flagged: true,
    flag_severity: 2,
    invite_status: "accepted",
    accepted_date: "2024-01-10"
  },
  {
    id: 6,
    first_name: "Yehudah",
    last_name: "Pepper Fox",
    email: "yehudah@example.com",
    date_of_birth: "1996-06-06",
    phone: "555-678-9012",
    focus_areas: ["anxiety", "stress"],
    meeting_day: "Tuesday",
    meeting_time: "11:00",
    ai_instructions: "Experiences social anxiety; use a supportive tone and reassurance. Reinforce grounding techniques before and after stressful interactions.",
    flagged: false,
    flag_severity: null,
    invite_status: "accepted",
    accepted_date: "2025-11-10"
    
  },
  {
    id: 7,
    first_name: "Yakir",
    last_name: "Hirsch",
    email: "yakir@example.com",
    date_of_birth: "1997-07-07",
    phone: "555-789-0123",
    focus_areas: ["body image", "social anxiety"],
    meeting_day: "Monday",
    meeting_time: "11:00",
    ai_instructions: "Struggles with body-image-related self-esteem concerns. Approach with empathy and focus on cognitive reframing and self-acceptance exercises.",
    flagged: false,
    flag_severity: null,
    invite_status: "accepted",
    accepted_date: "2025-12-1"
  },
  {
    id: 8,
    first_name: "Leeanne",
    last_name: "Mann",
    email: "leeanne@example.com",
    date_of_birth: "2005-09-26",
    phone: "555-890-1234",
    focus_areas: ["academic stress", "procrastination"],
    meeting_day: "Thursday",
    meeting_time: "15:00",
    ai_instructions: "Help client develop time-management skills and reduce procrastination through structured planning and positive reinforcement.",
    flagged: false,
    flag_severity: null,
    invite_status: "accepted",
    accepted_date: "2024-01-10"
  }
];

export const client_records: ClientRecord[] = [
  // Client 1
  { 
    id: 1, 
    client_id: 1, 
    date: "2024-01-22T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null,
    content: "Client reported improved mood after using a gratitude prompt and a 10-minute task start timer. Suggested a ‘two good things’ evening reflection and a short breathing script when rumination spiked. No risk language detected; user declined escalation. Adherence: 4/7 gratitude entries; plan to continue." 
  },
  { 
    id: 2, 
    client_id: 1, 
    date: "2024-01-15T10:00:00Z", 
    type: "session_note", 
    flag_severity: null,
    content: "Focused on anticipatory anxiety before work. Completed CBT thought record identifying catastrophizing around Monday deadlines. Practiced 4-7-8 breathing and created a Sunday planning ritual. Homework: 2 thought records, graded exposure to unanswered emails. MSE: cooperative, anxious affect congruent, no SI/HI, judgment intact."
  },
  { 
    id: 3, 
    client_id: 1, 
    date: "2024-01-08T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: 1,
    content: "Client described post-holiday sadness and low energy. Behavioral activation recommended: one mastery task (laundry) and one pleasure task (call a friend). Client noted +2 mood lift afterward. Passive hopelessness language noted (“feels pointless lately”) without plan/intent; advised check-in with clinician and scheduled near-term follow-up." 
  },
  { 
    id: 4, 
    client_id: 1, 
    date: "2023-12-30T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Work stress from unclear priorities. Implemented Eisenhower matrix; defined ‘definition of done’ for key tasks. Introduced 45-minute focus blocks and 5-minute shutdown ritual. Plan to review stress metrics next session. Risk: none acute; protective factors stable." },
  { id: 5, client_id: 1, date: "2023-12-20T10:00:00Z", type: "chat_summary", flag_severity: null, content: "Client expressed evening loneliness. Suggested values-based micro-connections: two outreach texts and one structured activity. Provided conversation openers. Client accepted reminders; average connection quality 6/10."
  },

  // Client 7
  { 
    id: 6, 
    client_id: 7, 
    date: "2023-12-10T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Sleep-onset insomnia. Reviewed stimulus control, fixed wake time, and cognitive shuffle technique. Homework: log sleep efficiency; reduce caffeine after noon. MSE: mood ‘tired,’ affect restricted, no SI/HI." },
  { id: 7, client_id: 7, date: "2023-12-01T10:00:00Z", type: "chat_summary", flag_severity: null, content: "Anger after feeling dismissed at work. STOP skill and 90-second pause routine practiced. Drafted assertive ‘I’ statement; client reported improved control next morning. No escalation needed."
  },
  { 
    id: 8, 
    client_id: 7, 
    date: "2023-11-22T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Overwhelm from multiple deadlines. Introduced 10-minute activation rule and self-compassion practice. Homework: task triage twice weekly; rate perceived control pre/post. No safety concerns." },
  { id: 9, client_id: 7, date: "2024-01-22T10:00:00Z", type: "chat_summary", flag_severity: null, content: "Follow-up on sleep routine and task batching. Client reported reduced evening rumination and improved sleep onset. Reinforced consistency and added morning reflection prompt."
  },
  { 
    id: 10, 
    client_id: 7, 
    date: "2024-01-15T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Performance anxiety before presentations. Identified safety behaviors (over-rehearsal, avoiding eye contact). Designed graded exposure and diaphragmatic breathing plan. Homework: track SUDs before/after. No acute risk."
  },
  {
    id: 11, 
    client_id: 7, 
    date: "2024-01-08T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null, 
    content: "Sadness related to family distance. Suggested two small outreach actions (send photo, short call). Reinforced boundary-setting script. Client noted mild mood improvement."
  },

  // Client 3
  { 
    id: 12, 
    client_id: 3, 
    date: "2023-12-30T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Perfectionism causing delay and fatigue. Challenged all-or-nothing beliefs and built ‘good-enough’ rubric for deliverables. Plan to test rubric and review outcomes. MSE: organized, no risk."
  },
  { 
    id: 13, 
    client_id: 3, 
    date: "2023-12-20T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null, 
    content: "Winter isolation. Proposed Sunday open-mic and midweek coworking. Client accepted calendar reminders and reported higher energy."
  },

  // Client 4
  { 
    id: 14, 
    client_id: 4, 
    date: "2023-12-10T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Nighttime phone use delaying sleep. Implemented 60-minute tech curfew and journaling routine. Encouraged consistent wake times. Risk: low, no SI/HI." 
  },
  { 
    id: 15, 
    client_id: 4, 
    date: "2023-12-01T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: 2, 
    content: "Conflict in group project led to intense distress and statements suggesting inability to cope (“can’t do this anymore”). De-escalation steps provided (grounding, breathing, safe-contact outreach). Recommended immediate clinician contact and crisis resources; emergency contacts and safety plan reviewed. Follow-up flagged for same-day check-in."
  },
  { 
    id: 16, 
    client_id: 4, 
    date: "2023-11-22T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Overload from academic and family pressure. Used spheres-of-control mapping to separate controllables vs. accepts. Introduced micro-breaks. Risk screen clear."
  },

  // Client 5
  { 
    id: 17, 
    client_id: 5, 
    date: "2024-01-15T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Anxiety with somatic tension. Practiced box breathing and progressive muscle relaxation. Began values clarification to separate urgency from importance. Homework: PMR 3x/week, tension ratings. No risk."
  },
  { 
    id: 18, 
    client_id: 5, 
    date: "2024-01-08T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: 2, 
    content: "Post-argument distress with explicit self-harm language. Immediate safety protocol initiated: removed means, identified supportive contact, and agreed to same-day clinical outreach. Crisis lines and emergency steps provided. System set to prompt rapid follow-up and alert clinician."
  },

  // Client 6
  { 
    id: 19, 
    client_id: 6, 
    date: "2023-12-30T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Job stress from unclear roles. Drafted clarifying email and weekly meeting agenda. Introduced personal Kanban to track WIP. Plan to monitor throughput and stress levels. MSE stable."
  },
  { 
    id: 20, 
    client_id: 6, 
    date: "2023-12-20T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null, 
    content: "Weekend loneliness. Suggested two anchors (Saturday gym, Sunday coffee) and activation rule for avoidance. Client implemented both; reported improved weekend mood."
  },
  { 
    id: 21, 
    client_id: 6, 
    date: "2023-12-10T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Early-morning awakenings. Out-of-bed protocol, quiet activity, return when sleepy. Reduced alcohol intake to aid REM. Risk negative."
  },
  { 
    id: 22, 
    client_id: 6, 
    date: "2023-12-01T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null, 
    content: "Reported anger during commute. Cue-routine replacement suggested: switch to podcast + breathing at stops. Client noted intensity drop from 3→1. No risk indicators."
  },
  { 
    id: 23, 
    client_id: 6, 
    date: "2023-11-22T10:00:00Z", 
    type: "session_note", 
    flag_severity: null, 
    content: "Pre-finals overwhelm. Created 7-day plan with spaced repetition, added mindful walk breaks. Homework: review mid-week load. No SI/HI; affect stable." 
  },
  { 
    id: 24, 
    client_id: 6, 
    date: "2024-01-22T10:00:00Z", 
    type: "chat_summary", 
    flag_severity: null, 
    content: "Positive update—client maintained study plan and commute routine. Offered monthly reflection template. No flagged language detected; client reported greater control and improved sleep continuity."
  }
];

export const calendar_events: CalendarEvent[] = [
  {
      id: 1,
      type: "session",
      title: "Benjy Diamond",
      notes: "Discuss progress on motivation techniques.",
      link: null,
      client_id: 4,
      start: new Date(2025, 11, 17, 10, 0),
      end: new Date(2025, 10, 17, 11, 0),
    },
    {
      id: 2,
      type: "session",
      title: "Elias Sasson",
      notes: "Bringing wife to session.",
      link: null,
      client_id: 3,
      start: new Date(2025, 11, 2, 14, 0),
      end: new Date(2025, 11, 2, 16, 0),
    },
    {
      id: 3,
      type: "session",
      title: "Ayelet Cantor",
      notes: "Focus on anger management strategies.",
      link: null,
      client_id: 2,
      start: new Date(2025, 11, 3, 9, 30),
      end: new Date(2025, 11, 3, 10, 30),
    },
    {
      id: 4,
      type: "session",
      title: "Leeanne Mann",
      notes: "Discuss academic stress and procrastination.",
      link: null,
      client_id: 1,
      start: new Date(2025, 11, 1, 13, 0),
      end: new Date(2025, 11, 1, 14, 0),
    },
    {
      id: 5,
      type: "session",
      title: "Joshua Fleicher",
      notes: "Review sleep hygiene techniques.",
      link: "https://videocall.example.com/joshua-fleicher",
      client_id: 5,
      start: new Date(2025, 11, 4, 11, 0),
      end: new Date(2025, 11, 4, 12, 0),
    },
    {
      id: 6,
      type: "other",
      title: "Team Meeting",
      notes: "Monthly team sync-up.",
      link: "https://videocall.example.com/team-meeting",
      client_id: null,
      start: new Date(2025, 11, 1, 15, 0),
      end: new Date(2025, 11, 1, 16, 0),
    }
]