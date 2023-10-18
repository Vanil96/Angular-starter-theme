export type Option = { label: string, value: string | number, isDisabled?: boolean; };

export type CheckboxOption = {
    label: string;
    value?: string | number | null;
    isChecked?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    labelPosition?: 'before' | 'after';
};

