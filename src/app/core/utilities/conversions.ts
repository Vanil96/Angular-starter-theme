import { Option, CheckboxOption, RadioOption } from '@app/core/models/option.model';

export function convertToOptionList<T>(
    list: T[],
    labelKey: keyof T & string,
    valueKey: keyof T & (string | number)
): Option[] {
    return list.map(item => ({
        label: String(item[labelKey]),
        value: item[valueKey] as string | number
    }));
}

export function convertToCheckboxOptionList<T>(
    list: T[],
    labelKey: keyof T & string,
    valueKey: keyof T & (string | number),
    isCheckedKey: keyof T & string
): CheckboxOption[] {
    return list.map(item => ({
        label: String(item[labelKey]),
        value: item[valueKey] as string | number,
        isChecked: item[isCheckedKey] as boolean
    }))
}

export function convertToRadioOptionList<T>(
    list: T[],
    labelKey: keyof T & string,
    valueKey: keyof T & (string | number),
    isCheckedKey: keyof T & string
): RadioOption[] {
    return list.map(item => ({
        label: String(item[labelKey]),
        value: item[valueKey] as string | number,
        isChecked: item[isCheckedKey] as boolean
    }))
}