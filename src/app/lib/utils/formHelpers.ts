import { ClientForm } from "@/app/lib/types";

export function checkEmailValidity(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function checkPhoneNumberValidity(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
}

export function checkFocusAreasValidity(input: string): boolean {
  if (!input || input.trim() === "") return true; // null/empty is allowed

  const list = input
    .split(",")
    .map(v => v.trim())
    .filter(v => v.length > 0);
    
  return list.length > 0;
}

export function isEmpty(value: any): boolean {
    return (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
    );
}
export function checkRequiredFields(form: ClientForm): true | string[] {
    const missingFields: string[] = [];

    const mandatoryFields: (keyof ClientForm)[] = [
        "first_name",
        "last_name",
        "phone",
        "email",
    ];

    for (const field of mandatoryFields) {
        const value = form[field];

        if (isEmpty(value)) {
            missingFields.push(field as string);
        }
    }

    // check emergency contact object for required fields if it exist
    // console.log('Checking emergency contacts:', form.emergency_contacts);
    form.emergency_contacts.forEach((ec, index) => {
        if (isEmpty(ec.first_name)) missingFields.push(`ec_${index}_first_name`);
        if (isEmpty(ec.last_name))  missingFields.push(`ec_${index}_last_name`);
        if (isEmpty(ec.phone))      missingFields.push(`ec_${index}_phone`);
    });

    return missingFields.length > 0 ? missingFields : true;
}

export function checkFormValidity(form: ClientForm): boolean | string[] | string {
    if (checkRequiredFields(form) != true ) {
        return checkRequiredFields(form);
    }
    else if (!checkEmailValidity(form.email)) {
        return "bad email";
    }
    else if (!checkPhoneNumberValidity(form.phone)) {
        return "bad phone";
    }
    else {
        console.log("Form validation passed");
        return true;
    }
}

export function checkEventFormValidity(form: any): boolean | string[] {
    const empty_fields = [];

    if (!form.title || form.title.trim() === "") {
        empty_fields.push("title");
    }

    if (!form.date || form.date.trim() === "") {
        empty_fields.push("date");
    }

    if (!form.meeting_start_time || form.meeting_start_time.trim() === "") {
        empty_fields.push("meeting_start_time");
    }

    if (!form.meeting_end_time || form.meeting_end_time.trim() === "") {
        empty_fields.push("meeting_end_time");
    }

    if (empty_fields.length > 0) {
        return empty_fields;
    }

    return true;
}

