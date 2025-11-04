import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { getClientRecords, createNewClient, updateClient, getClientFormData } from '../../api/fakeApi';

export default function Modal({ source, onCloseModal, clientId, recordId }) {
    const editMode = source == "editClient";
    const recordMode = source == "viewRecord";

        const user_template = {
        name: "",
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
        if (!editMode) return;

        (async () => {
            const form_data = await getClientFormData(clientId);

            setForm({
                name: form_data.client?.name ?? "",
                email: form_data.client?.email ?? "",
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
    }, [editMode, clientId]);

    async function newClient() {
        const newUser = {
            name: form.name,
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
            name: form.name,
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

    const clientForm = (
        <div id="modal-content">
            <div className="top-bar">
                <h1>{editMode ? "Edit Client" : "New Client"}</h1>
                <button className="exit-button" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <form>
                <div className = "form-section">    
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
                            name="ai_instructions"
                            placeholder="Please enter any instructions, concerns, or notes for your client's specifically tailored therapist-bot."
                            value={form.ai_instructions}
                            onChange={(e) => {
                                setForm({ ...form, ai_instructions: e.target.value });

                                const el = e.target;

                                if (el.scrollHeight > el.clientHeight) {
                                    el.style.height = "auto";
                                    el.style.height = `${el.scrollHeight}px`;
                                }
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

                <button className="submit-button" type="submit" onClick={(e) => {e.preventDefault(); editMode ? handleUpdateClient() : newClient();}}> {editMode ? "Save Changes" : "Add Client"}</button>
            </form>
        </div>
    );

    const viewRecord = (
        <div id="right-panel">
            <div className="top-bar">
                <h1>Record Details</h1>
                <button className="exit-button" onClick={onCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className="form-group">
                <label>Record details would go here...</label>
            </div>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal">
                {(source == "newClient" || source == "editClient") && clientForm}
                {source == "viewRecord" && viewRecord}
            </div>
        </div>
    );
}
