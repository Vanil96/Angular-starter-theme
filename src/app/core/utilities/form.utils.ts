import { ValidationErrors } from "@angular/forms";

interface ErrorMessages {
    [key: string]: string;
}

export function getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) {
        return '';
    }

    const errorMessages: ErrorMessages = {
        required: 'This field is required',
        email: 'Invalid email format',
        pattern: 'Invalid pattern',
        max: 'Value is too high',
        min: 'Value is too low',
        nullValidator: 'Value is null',
        requiredTrue: 'Value must be true',
        default: 'Invalid value'
    };

    // Dynamic error handling
    if (errors["minlength"]) {
        const requiredLength = errors["minlength"].requiredLength;
        return `Value should be at least ${requiredLength} chars long`;
    }

    if (errors["maxlength"]) {
        const requiredLength = errors["maxlength"].requiredLength;
        return `Value should be no more than ${requiredLength} chars long`;
    }

    for (const key of Object.keys(errorMessages)) {
        if (errors[key]) {
            return errorMessages[key];
        }
    }

    return errorMessages["default"];
}
