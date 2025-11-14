import { UserFormData } from "@/app/lib/types";

export function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    }

export function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

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

export function formatTime (timeString: string): string {
    const [hour, minute] = timeString.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${String(minute).padStart(2, '0')} ${period}`;
}