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
        select: "הסלקט",
        multipleSelect: "הסלקט",
        radioGroup: "שדה זה",
        toggleGroup: "שדה זה",
        time: "שדה הזמן",
        date: "שדה התאריך",
    },
    en: {
        switch: "the switch",
        checkbox: "the checkbox",
        textInput: "the text input",
        password: "password",
        textArea: "the text area",
        select: "the select input",
        multipleSelect: "the select input",
        radioGroup: "the radio group",
        toggleGroup: "the toggle group",
        time: "the time input",
        date: "the date input",
    },
});

const labels = createI18nText({
    he: {
        switch: "מתג",
        checkbox: "תיבת סימון",
        textInput: "שדה טקסט",
        password: "שדה סיסמא",
        textArea: "אזור טקסט",
        select: 'ברר ("סלקט")',
        multipleSelect: 'ברר ("סלקט") רב-אפשרויות',
        radioGroup: "קבוצת כפתורי רדיו",
        toggleGroup: 'קבוצת בחירה ("טוגל")',
        time: "בחירת שעה / זמן",
        date: "בחירת תאריך",
    },
    en: {
        switch: "Switch",
        checkbox: "Checkbox",
        textInput: "Text Input",
        password: "Password",
        textArea: "Text Area",
        select: "Select",
        multipleSelect: "Multi-Select",
        radioGroup: "Radio Button Group",
        toggleGroup: "Toggle Group",
        time: "Time Input",
        date: "Date Input",
    },
});
const errors = createI18nText({
    he: {
        ...formsErrors.he,
        isTrue: { m: "{!} צריך להיות דלוק", f: "{!} צריכה להיות דלוקה" },
        invalidTime: "{!} צריך להיות זמן תקף",
        invalidDate: "{!} צריך להיות תאריך תקף",
    },
    en: {
        ...formsErrors.en,
        isTrue: { m: "{!} must be turned on", f: "{!} must be turned on" },
        invalidTime: "{!} must be a valid time",
        invalidDate: "{!} must be a valid date",
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
            rounded: "מעוגל",
            maxLength: "אורך מירבי",
            maxRows: "כמות שורות מירבית",
            minRows: "כמות שורות מינימלית",
            placeholder: "ממלא מקום",
            noneOption: 'אופציה ריקה ("ניקוי")',
            disabledOptions: "אפשרויות כבויות",
        },
        colors: {
            yellow: "צהוב",
            red: "אדום",
            orange: "כתום",
            purple: "סגול",
            blue: "כחול",
            green: "ירוק",
        },
    },
    en: {
        submit: "Submit",
        onSubmit: "Well done!",
        settings: {
            disabled: "Disabled",
            fast: "Fast",
            isLoading: "Loading State",
            rounded: "Rounded",
            maxLength: "Maximum Length",
            maxRows: "Maximum Rows",
            minRows: "Minimum Rows",
            placeholder: "Placeholder",
            noneOption: 'None ("Clear") Option',
            disabledOptions: "Disabled Options",
        },
        colors: {
            yellow: "Yellow",
            red: "Red",
            orange: "Orange",
            purple: "Purple",
            blue: "Blue",
            green: "Green",
        },
    },
});

const i18n = createI18n({ errors, fields, misc, labels });

type I18n = typeof i18n;

const { I18nProvider, useDirection, useSwitchedPath, usePathLanguage, createTranslateHook } =
    createI18nHooksAndProvider(Languages, i18n);

const useTranslate = createTranslateHook<I18n>();

export { I18nProvider, useDirection, useTranslate, useSwitchedPath, usePathLanguage };
