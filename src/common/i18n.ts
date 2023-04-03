import { createTextFunctions, createI18nHooksAndProvider } from "@hilma/i18n";
import { errors as formsErrors } from "@hilma/forms";

export enum Languages {
    En = "en",
    He = "he",
}

const { createI18nText, createI18n } = createTextFunctions(Languages);

const fields = createI18nText({
    he: {
        switch: "המתג",
        checkbox: "תיבת הסימון",
        textInput: "שדה הטקסט",
        password: "שדה הסיסמא",
        textArea: "אזור הטקסט",
    },
    en: {
        switch: "the switch",
        checkbox: "the checkbox",
        textInput: "the text input",
        password: "the password field",
        textArea: "the text area",
    },
});

const errors = createI18nText({
    he: {
        ...formsErrors.he,
        isTrue: { m: "{!} צריך להיות דלוק", f: "{!} צריכה להיות דלוקה" },
    },
    en: {
        ...formsErrors.en,
        isTrue: { m: "{!} must be turned on", f: "{!} must be turned on" },
    },
});

const misc = createI18nText({
    he: {
        submit: "הגשה",
        onSubmit: "כל הכבוד!",
        settings: {
            disabled: "כבוי",
            fast: "מהיר",
            isLoading: "טעינה",
            maxLength: "אורך מירבי",
            maxRows: "כמות שורות מירבית",
            minRows: "כמות שורות מינימלית",
        },
    },
    en: {
        submit: "Submit",
        onSubmit: "Well done!",
        settings: {
            disabled: "Disabled",
            fast: "Fast",
            isLoading: "Loading State",
            maxLength: "Maximum Length",
            maxRows: "Maximum Rows",
            minRows: "Minimum Rows",
        },
    },
});

const labels = createI18nText({
    he: {
        switch: "מתג",
        checkbox: "תיבת סימון",
        textInput: "שדה טקסט",
        password: "שדה סיסמא",
        textArea: "אזור טקסט",
    },
    en: {
        switch: "Switch",
        checkbox: "Checkbox",
        textInput: "Text Input",
        password: "Password",
        textArea: "Text Area",
    },
});

const i18n = createI18n({ errors, fields, misc, labels });

type I18n = typeof i18n;

const { I18nProvider, useDirection, useSwitchedPath, usePathLanguage, createTranslateHook } =
    createI18nHooksAndProvider(Languages, i18n);

const useTranslate = createTranslateHook<I18n>();

export { I18nProvider, useDirection, useTranslate, useSwitchedPath, usePathLanguage };
