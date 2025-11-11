import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

import { createNewClient, updateClient, getClientFormData } from '@/app/lib/api/fakeApi';

export default function ClientFormModal({ mode, clientId, onCloseModal, onEarlyClose }) {
    const user_template = {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        phone: "",
        email: "",
        focus_areas: [],
        meeting_time: "",
        ai_instructions: "",
        emergency_contact: { 
            name: "", 
            relationship: "", 
            email: "", 
            phone: "" 
        },
    };

    const [form, setForm] = useState(user_template);

    useEffect(() => {
        if (mode != "editClient") return;

        (async () => {
            const form_data = await getClientFormData(clientId);

            setForm({
                first_name: form_data.client?.first_name ?? "",
                last_name: form_data.client?.last_name ?? "",
                email: form_data.client?.email ?? "",
                date_of_birth: form_data.client?.date_of_birth ?? "",
                phone: form_data.client?.phone ?? "",
                focus_areas: form_data.client?.focus_areas ?? [],
                meeting_time: form_data.client?.meeting_time ?? "",
                ai_instructions: form_data.client?.ai_instructions ?? "",
                emergency_contact: {
                    name: form_data.emergency_contact?.name ?? "",
                    relationship: form_data.emergency_contact?.relationship ?? "",
                    email: form_data.emergency_contact?.email ?? "",
                    phone: form_data.emergency_contact?.phone ?? "",
                },
            });
        })();
    }, [mode, clientId]);

    async function handleCreateNewClient() {
        const newUser = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            date_of_birth: form.date_of_birth,
            phone: form.phone,
            focus_areas: form.focus_areas,
            meeting_time: form.meeting_time,
            ai_instructions: form.ai_instructions,
            emergency_contact: {
                name: form.emergency_contact.name,
                relationship: form.emergency_contact.relationship,
                email: form.emergency_contact.email,
                phone: form.emergency_contact.phone
            }
        };

        const toastId = toast.loading("Creating client...");
        if (await createNewClient(newUser)) {
            toast.dismiss(toastId);
            onCloseModal();
            toast.success("Client created successfully!");    
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
            focus_areas: form.focus_areas,
            meeting_time: form.meeting_time,
            ai_instructions: form.ai_instructions,
            emergency_contact: {
                name: form.emergency_contact.name,
                relationship: form.emergency_contact.relationship,
                email: form.emergency_contact.email,
                phone: form.emergency_contact.phone
            }
        };

        const toastId = toast.loading("Saving changes...");
        if (await updateClient(updatedUser)) {
            toast.dismiss(toastId);
            onCloseModal();
            toast.success("Client updated successfully!");
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
                <h1>{mode === "editClient" ? "Edit Client" : mode === "newClient" ? "New Client" : ""}</h1>
                <button className="exit-button" onClick={onEarlyClose}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form className="client-form">
                <div className = "form-section">   
                    <div className = "emergency-contact-grid">
                        <div className="form-group">
                            <label>First Name: </label>
                            <input type="text" name="first_name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input type="text" name="last_name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                                <label>Phone: </label>
                                <input type="text" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <input type="text" name="date_of_birth" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Focus Areas: </label>
                        <input type="text" name="focus_areas" value={form.focus_areas.join(", ")} onChange={(e) => setForm({ ...form, focus_areas: e.target.value.split(", ") })} />
                    </div>
                    <div className="form-group">
                        <label>Meeting Time: </label>
                        <input type="text" name="meeting_time" value={form.meeting_time} onChange={(e) => setForm({ ...form, meeting_time: e.target.value })} />
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
                    <div className="emergency-contact-grid">
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" name="emergency_contact_name" value={form.emergency_contact.name} onChange={(e) => setForm({ ...form, emergency_contact: { ...form.emergency_contact, name: e.target.value } })} />
                        </div>
                        <div className="form-group">
                            <label>Relationship: </label>
                            <input type="text" name="emergency_contact_relationship" value={form.emergency_contact.relationship} onChange={(e) => setForm({ ...form, emergency_contact: { ...form.emergency_contact, relationship: e.target.value } })} />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" name="emergency_contact_email" value={form.emergency_contact.email} onChange={(e) => setForm({ ...form, emergency_contact: { ...form.emergency_contact, email: e.target.value } })} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number: </label>
                            <input type="text" name="emergency_contact_phone" value={form.emergency_contact.phone} onChange={(e) => setForm({ ...form, emergency_contact: { ...form.emergency_contact, phone: e.target.value } })} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="submit-button" type="submit" onClick={(e) => { e.preventDefault(); mode === "editClient" ? handleUpdateClient() : handleCreateNewClient(); }}> {mode === "editClient" ? "Save Changes" : "Add Client"}</button>
                </div>
            </form>
        </div>
    )
}