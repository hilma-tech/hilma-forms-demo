import { FormTimeInput, FormDateInput } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import {
    useFormConfig,
    useForm,
    useAlert,
    FormProvider,
    FormSubmitButton,
    FormCheckbox,
    FormTextInput,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { key as _key } from "@hilma/forms";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

function isValidTime(value: unknown): value is Date {
    if (!value) return true;

    if (value instanceof Date) {
        return true;
    } else {
        return false;
    }
}

const schema = yup.object({
    date: yup
        .mixed({ check: isValidTime })
        .nullable()
        .required()
        .test({
            test: (value) => {
                return !isNaN(value.getTime());
            },
            message: "errors.invalidDate|fields.date|",
            name: "validDate",
        }),
    time: yup
        .mixed({ check: isValidTime })
        .nullable()
        .required()
        .test({
            test: (value) => {
                return !isNaN(value.getTime());
            },
            message: "errors.invalidTime|fields.time|",
            name: "validTime",
        }),

    placeholders: yup.object({
        time: yup.string().default("hh:mm"),
        date: yup.string().default("dd/mm/yyyy"),
    }),

    settings: yup.object({
        rounded: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const key = _key<FormValues>;

const TimeAndDateInputsDemo: React.FC = () => {
    const { values } = useForm<FormValues>();

    const showAlert = useAlert();
    const t = useTranslate();
    const dir = useDirection();

    function handleSubmit(values: FormValues) {
        showAlert(
            t((i18n) => i18n.misc.onSubmit),
            "success",
            dir,
        );

        console.log(values);
    }

    useFormConfig<FormValues>(
        (form) => {
            form.onSubmit = handleSubmit;
            form.dir = dir;
            form.translateFn = t;
        },
        [dir, t],
    );

    return (
        <>
            <FormTimeInput
                name={key("time")}
                {...values.settings}
                placeholder={values.placeholders.time}
                label={t((i18n) => i18n.labels.time)}
            />
            <FormDateInput
                name={key("date")}
                {...values.settings}
                placeholder={values.placeholders.date}
                label={t((i18n) => i18n.labels.date)}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox name={key("settings.rounded")} label={t((i18n) => i18n.misc.settings.rounded)} />

            <FormTextInput
                fast
                name={key("placeholders.time")}
                label={`${t((i18n) => i18n.misc.settings.placeholder)} - ${t(
                    (i18n) => i18n.labels.time,
                )}`}
            />
            <FormTextInput
                fast
                name={key("placeholders.date")}
                label={`${t((i18n) => i18n.misc.settings.placeholder)} - ${t(
                    (i18n) => i18n.labels.date,
                )}`}
            />
        </>
    );
};

export default provide([
    FormProvider<FormValues>,
    {
        initialValues: schema.initialize(),
        onSubmit: noop,
        validationSchema: schema,
    },
])(TimeAndDateInputsDemo);
