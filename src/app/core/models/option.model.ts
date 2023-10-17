export type Option = { label: string, value: string | number };

export type CheckboxOption = {
    label: string;
    value?: string | number | null;
    isChecked?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    labelPosition?: 'before' | 'after';
};

export type RadioOption = Option & {
    isChecked?: boolean;
    isDisabled?: boolean;
};



