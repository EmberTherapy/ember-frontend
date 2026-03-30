import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { checkFormValidity } from '@/app/lib/utils/formHelpers';
import { createClient, editClient, getClientFormData } from '@/app/lib/api/client';
import { emergency_contacts } from '@/app/lib/api/db/data';
import { useContextProvider } from '@/app/lib/contextProvider';

export default function ClientFormModal({ mode, attemptCloseModal, closeModal, clientId}) {
    const { setRefreshKey } = useContextProvider();

    const user_template = {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        phone: "",
        email: "",
        focus_areas: [],
        meeting_day: "",
        meeting_time: "",
        ai_instructions: "",
        emergency_contacts: [ 
            {
                first_name: "", 
                last_name: "", 
                relationship: "", 
                email: "", 
            phone: "" 
        }
    ]
    };
    const [form, setForm] = useState(user_template);

    const [ecCount, setEcCount] = useState(1); // start with 1 emergency contact form

    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    useEffect(() => {
        if (mode != "edit") return;

        (async () => {
            const form_data = await getClientFormData(clientId);

            setForm({
                first_name: form_data.client?.first_name ?? "",
                last_name: form_data.client?.last_name ?? "",
                email: form_data.client?.email ?? "",
                date_of_birth: form_data.client?.date_of_birth ?? "",
                phone: form_data.client?.phone ?? "",
                focus_areas: form_data.client?.focus_areas ?? [],
                meeting_day: form_data.client?.meeting_day ?? "",
                meeting_time: form_data.client?.meeting_time ?? "",
                ai_instructions: form_data.client?.ai_instructions ?? "",
                emergency_contacts: [
                    {
                        first_name: form_data.emergency_contacts?.first_name ?? "",
                        last_name: form_data.emergency_contacts?.last_name ?? "",
                        relationship: form_data.emergency_contacts?.relationship ?? "",
                        email: form_data.emergency_contacts?.email ?? "",
                        phone: form_data.emergency_contacts?.phone ?? "",
                    }
                ],
            });
        })();
    }, [mode, clientId]);

    function splitFocusAreas(focus_areas) {
        if (focus_areas == null || focus_areas == undefined || focus_areas == "") return [];
        return focus_areas
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
    }

    function validateForm(form) {
        const validationResult = checkFormValidity(form);
        if (validationResult !== true) {
            for (const field of validationResult) {
                console.log("Highlighting missing field:", field);
                const el = document.getElementById(field);
                if (el) {
                    el.classList.add("mandatory-field");
                }
            }
        }
        else {
            return true;
        }
    }

    async function handleCreateNewClient() {
        const newUser = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            date_of_birth: form.date_of_birth,
            phone: form.phone,
            focus_areas: splitFocusAreas(form.focus_areas),
            meeting_day: form.meeting_day,
            meeting_time: form.meeting_time,
            ai_instructions: form.ai_instructions,
            emergency_contacts: [{
                first_name: form.emergency_contacts[0]?.first_name,
                last_name: form.emergency_contacts[0]?.last_name,
                relationship: form.emergency_contacts[0]?.relationship,
                email: form.emergency_contacts[0]?.email,
                phone: form.emergency_contacts[0]?.phone
            }]
        };
        console.log("Creating new client with data:", newUser);
        if (!validateForm(newUser)) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        const toastId = toast.loading("Creating client...");
        if (await createClient(newUser)) {
            toast.dismiss(toastId);
            closeModal();
            toast.success("Client created successfully!");    
            setRefreshKey(prev => prev + 1); // trigger refresh of client list
        }
        else {
            toast.error("Couldn’t save. Try again.");
        }
    }

    async function handleUpdateClient() {
        const updatedUser = {
            first_name: form.first_name,
            last_name: form.last_name,
            date_of_birth: form.date_of_birth,
            phone: form.phone,
            email: form.email,
            focus_areas: splitFocusAreas(form.focus_areas),
            meeting_day: form.meeting_day,
            meeting_time: form.meeting_time,
            ai_instructions: form.ai_instructions,
            emergency_contacts: [{
                first_name: form.emergency_contacts.first_name,
                last_name: form.emergency_contacts.last_name,
                relationship: form.emergency_contacts.relationship,
                email: form.emergency_contacts.email,
                phone: form.emergency_contacts.phone
            }]
        };
        if (!validateForm(updatedUser)) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        const toastId = toast.loading("Saving changes...");
        if (await updateClient(updatedUser)) {
            toast.dismiss(toastId);
            closeModal();
            toast.success("Client updated successfully!");
            setRefreshKey(prev => prev + 1); // trigger refresh of client list
        }
        else {
            toast.error("Couldn’t save changes. Please try again.");
        }
    }

    // auto-resize textarea for AI Instructions
    const textareaRef = useRef(null);
    function resizeTextarea() {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";                      // allow shrink
        el.style.height = `${el.scrollHeight}px`;      // fit content
    }
    useLayoutEffect(() => {
        resizeTextarea();
    }, [form.ai_instructions]);

    return (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{mode === "edit" ? "Edit Client" : mode === "new" ? "New Client" : ""}</h1>
                <button className="exit-button" onClick={attemptCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="form">
                <div className = "form-section">   
                    <div className = "grid">
                        <div className="form-group">
                            <label>First Name: </label>
                            <input id="first_name" type="text" name="first_name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input id="last_name" type="text" name="last_name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input id="email" type="text" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input id="phone" type="text" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <input id="date_of_birth" type="date" name="date_of_birth" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Focus Areas: </label>
                        <input type="text" name="focus_areas" placeholder="e.g. anxiety, relationships, trauma" value={form.focus_areas} onChange={(e) => setForm({ ...form, focus_areas: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Regular Meeting Time: </label>
                        <div className="double-input">
                            <div className="dropdown-wrapper">
                                <select
                                id="meeting_day"
                                className="dropdown-select half-input"
                                name="meeting_day"
                                value={form.meeting_day}
                                onChange={(e) => setForm({ ...form, meeting_day: e.target.value })}
                                >
                                <option value="">Select a day</option>
                                {daysOfWeek.map((day) => (
                                    <option key={day} value={day}>
                                    {day}
                                    </option>
                                ))}
                                </select>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="dropdown-icon"
                                />
                            </div>
                            <input className="half-input" type="time" name="meeting_time" value={form.meeting_time} onChange={(e) => setForm({ ...form, meeting_time: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>AI Instructions: </label>
                        <textarea
                            id="ai_instructions"
                            ref={textareaRef}
                            name="ai_instructions"
                            placeholder="Please enter any instructions, concerns, or notes for your client's specifically tailored therapist-bot."
                            value={form.ai_instructions}
                            onChange={(e) => {
                                setForm({ ...form, ai_instructions: e.target.value });
                                const el = e.target;
                                el.style.height = "auto";
                                el.style.height = `${el.scrollHeight}px`;
                            }}
                        />
                    </div>
                </div>
                <div className="form-section-emergency">
                    <h2>Emergency Contact</h2>
                    {Array.from({ length: ecCount }, (_, i) => (
                        <div key={i} className="grid">
                                <div className="form-group">
                                    <label>First Name: </label>
                                    <input type="text" id = {"ec_" + i + "_first_name"} name="emergency_contact_name" value={form.emergency_contacts[i]?.first_name ?? ""} onChange={(e) => setForm(prev => ({ ...prev, emergency_contacts: [{ ...prev.emergency_contacts[0], first_name: e.target.value }] }))} />
                                </div>
                            <div className="form-group">
                                <label>Last Name: </label>
                                <input type="text" id = {"ec_" + i + "_last_name"} name="emergency_contact_last_name" value={form.emergency_contacts[i]?.last_name ?? ""} onChange={(e) => setForm({ ...form, emergency_contacts: form.emergency_contacts.map((ec, idx) => idx === i ? { ...ec, last_name: e.target.value } : ec) })} />
                            </div>
                            <div className="form-group">
                                <label>Relationship: </label>
                                <input type="text" id = {"ec_" + i + "_relationship"} name="emergency_contact_relationship" value={form.emergency_contacts[i]?.relationship ?? ""} onChange={(e) => setForm({ ...form, emergency_contacts: form.emergency_contacts.map((ec, idx) => idx === i ? { ...ec, relationship: e.target.value } : ec) })} />
                            </div>
                            <div className="form-group">
                                <label>Email: </label>
                                <input type="text" id = {"ec_" + i + "_email"} name="emergency_contact_email" value={form.emergency_contacts[i]?.email ?? ""} onChange={(e) => setForm({ ...form, emergency_contacts: form.emergency_contacts.map((ec, idx) => idx === i ? { ...ec, email: e.target.value } : ec) })} />
                            </div>
                            <div className="form-group">
                                <label>Phone Number: </label>
                                <input id = {"ec_" + i + "_phone"} type="text" name="emergency_contact_phone" value={form.emergency_contacts[i]?.phone ?? ""} onChange={(e) => setForm({ ...form, emergency_contacts: form.emergency_contacts.map((ec, idx) => idx === i ? { ...ec, phone: e.target.value } : ec) })} />
                            </div>

                        </div>
                    ))}
                </div>
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={(e) => { e.preventDefault(); mode === "edit" ? handleUpdateClient() : handleCreateNewClient(); }}> {mode === "edit" ? "Save Changes" : "Add & Invite Client"}</button>
                </div>
            </form>
        </div>
    )
}