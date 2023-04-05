import { FormTimeRangeInput, FormDateRangeInput } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import {
    useFormConfig,
    useForm,
    useAlert,
    FormProvider,
    FormSubmitButton,
    FormTextInput,
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import { mixedDate } from "../common/schema";

const schema = yup.object({
    dateRange: yup
        .tuple([
            mixedDate("errors.invalidDate|fields.date|"),
            mixedDate("errors.invalidDate|fields.date|"),
        ])
        .required()
        .default([null, null] as [any, any]),
    timeRange: yup
        .tuple([
            mixedDate("errors.invalidTime|fields.time|"),
            mixedDate("errors.invalidTime|fields.time|"),
        ])
        .required()
        .default([null, null] as [any, any]),

    placeholders: yup.object({
        time: yup.object({
            from: yup.string().default("hh:mm"),
            to: yup.string().default("hh:mm"),
        }),
        date: yup.object({
            from: yup.string().default("dd/mm/yyyy"),
            to: yup.string().default("dd/mm/yyyy"),
        }),
    }),

    settings: yup.object({}),
});

type FormValues = yup.InferType<typeof schema>;

const SwitchDemo: React.FC = () => {
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
            <FormTimeRangeInput
                name="timeRange"
                {...values.settings}
                fromPlaceholder={values.placeholders.time.from}
                toPlaceholder={values.placeholders.time.to}
            />
            <FormDateRangeInput
                name="dateRange"
                {...values.settings}
                fromPlaceholder={values.placeholders.date.from}
                toPlaceholder={values.placeholders.date.to}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormTextInput name="placeholders.time.from" />
            <FormTextInput name="placeholders.time.to" />
            <FormTextInput name="placeholders.date.from" />
            <FormTextInput name="placeholders.date.to" />
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
])(SwitchDemo);
