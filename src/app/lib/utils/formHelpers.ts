import { UserFormData } from "@/app/lib/types";

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

export function checkRequiredFields(form: UserFormData): true | string[] {
    const missingFields: string[] = [];

    const mandatoryFields: (keyof UserFormData)[] = [
        'first_name',
        'last_name',
        'phone',
        'email',
    ];

    for (const field of mandatoryFields) {
        const value = form[field];

        const isEmpty =
            value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
            missingFields.push(field as string);
        }
    }

    const emergencyFields: (keyof UserFormData['emergency_contact'])[] = [
        'name',
        'phone',
    ];

    for (const field of emergencyFields) {
        const value = form.emergency_contact[field];

        const isEmpty =
            value === undefined ||
            value === null ||
            value === '';

        if (isEmpty) {
            missingFields.push(
                "ec_"+field as string);
        }
    }
    if (missingFields.length > 0) {
        return missingFields;
    }
    return true;
}

export function checkFormValidity(form: UserFormData): boolean | string[] {
    if (checkRequiredFields(form) != true || !checkEmailValidity(form.email) || !checkPhoneNumberValidity(form.phone)) {
        return checkRequiredFields(form);
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

