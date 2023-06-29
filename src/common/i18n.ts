import { createTextFunctions, createI18nHooksAndProvider } from "@hilma/i18n";
import { errors as formsErrors } from "@hilma/forms";

export enum Languages {
  En = "en",
  He = "he",
}

const { createI18nText, createI18n } = createTextFunctions(Languages);

const languages = createI18nText({
  he: {
    changeLanguage: "שנה שפה",
  },
  en: {
    changeLanguage: "Change Language",
  },
});

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
    file: "שדה העלאת קבצים",
    image: "שדה העלאת תמונה",
    recording: "שדה הקלטה",
    autocomplete: "שדה ההשלמה האוטומטית",
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
    file: "the file input",
    image: "the image input",
    recording: "the recording",
    autocomplete: "thehe autocomplete",
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
    timeRange: "טווח זמנים",
    date: "בחירת תאריך",
    dateRange: "טווח תאריכים",
    file: "העלאת קובץ",
    image: "העלאת תמונה",
    recording: "הקלטה",
    autocomplete: "שדה השלמה אוטומטית",
    paginatedTable: "טבלה (עמוד-עמוד)",
    onMountTable: "טבלה (הכל בבת אחת)",
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
    timeRange: "Time Range",
    date: "Date Input",
    dateRange: "Date Range",
    file: "File Input",
    image: "Image Input",
    recording: "Recording",
    autocomplete: "Autocomplete",
    paginatedTable: "Table (Paginated)",
    onMountTable: "Table (On Mount)",
  },
});

const errors = createI18nText({
  he: {
    ...formsErrors.he,
    isTrue: { m: "{!} צריך להיות דלוק", f: "{!} צריכה להיות דלוקה" },
    invalidTime: "{!} צריך להיות זמן תקף",
    invalidDate: "{!} צריך להיות תאריך תקף",
    fileType: "הקובץ חייב להיות מסוג {!}",
  },
  en: {
    ...formsErrors.en,
    isTrue: { m: "{!} must be turned on", f: "{!} must be turned on" },
    invalidTime: "{!} must be a valid time",
    invalidDate: "{!} must be a valid date",
    fileType: "The uploaded file must be {?}",
  },
});

const misc = createI18nText({
  he: {
    submit: "הגשה",
    onSubmit: "כל הכבוד!",
    autocompleteDemoMessage:
      "ליותר אופציות ודוגמאות, ראו את הדמו של MUI על שדה השלמה אוטומטית",
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
      fileType: "סוג קובץ",
      disableDragNDrop: "ביטול גרירה",
      singleUpload: "העלאת רק קובץ אחד",
      freeSolo: "הקלדה חופשית",
      enableDeselect: "ניתן לבטל",
    },
    colors: {
      yellow: "צהוב",
      red: "אדום",
      orange: "כתום",
      purple: "סגול",
      blue: "כחול",
      green: "ירוק",
    },
    fileTypes: {
      file: "קובץ",
      image: "תמונה",
      audio: "שמע",
      gif: "תמונה נעה (GIF)",
      video: "סרטון",
    },
  },
  en: {
    submit: "Submit",
    onSubmit: "Well done!",
    autocompleteDemoMessage:
      "For more properties and options, view MUI's Autocomplete demo",
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
      fileType: "File Type",
      disableDragNDrop: "Disable Drag & Drop",
      singleUpload: "Single Upload",
      freeSolo: "Free Solo",
      enableDeselect: "Enable Deselect",
    },
    colors: {
      yellow: "Yellow",
      red: "Red",
      orange: "Orange",
      purple: "Purple",
      blue: "Blue",
      green: "Green",
    },
    fileTypes: {
      file: "File",
      image: "Image",
      audio: "Audio",
      gif: "GIF",
      video: "Video",
    },
  },
});
const table = createI18nText({
  he: {
    columnLabels: {
      title: "כותרת",
      price: "מחיר",
      stock: "מלאי",
      brand: "מותג",
      rating: "דירוג",
    },
  },
  en: {
    columnLabels: {
      title: "Title",
      price: "Price",
      stock: "Stock",
      brand: "Brand",
      rating: "Rating",
    },
  },
});

const i18n = createI18n({ errors, fields, misc, labels, languages, table });

export type I18n = typeof i18n;

const {
  I18nProvider,
  useDirection,
  useSwitchedPath,
  usePathLanguage,
  createTranslateHook,
} = createI18nHooksAndProvider(Languages, i18n);

const useTranslate = createTranslateHook<I18n>();

export {
  I18nProvider,
  useDirection,
  useTranslate,
  useSwitchedPath,
  usePathLanguage,
};
