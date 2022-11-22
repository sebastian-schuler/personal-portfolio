export interface LocaleItem { 
    value: string, 
    label: string 
}

export const localeArray: LocaleItem[] = [
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
]

export const getLanguageNameById = (localeId: string) => {
    let res = localeId;
    localeArray.forEach(val => {
        if (localeId === val.value)
            res = val.label;
    })
    return res;
}

export const getLanguageById = (localeId: string) => {
    return localeArray.find(val => val.value === localeId);
}