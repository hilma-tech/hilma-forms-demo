import { FormTextArea } from "@hilma/forms";

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
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import FormSlider from "../components/custom-forms/FormSlider";

const schema = yup.object({
    textArea: yup.string().required().min(10).max(240),

    settings: yup.object({
        disabled: yup.boolean(),
        fast: yup.boolean(),
        isLoading: yup.boolean(),
        rows: yup
            .tuple([yup.number().nullable(), yup.number().nullable()])
            .required()
            .default([3, 7]),
        maxLength: yup.number().nullable(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const TextAreaDemo: React.FC = () => {
    const { values } = useForm<FormValues>();

    const showAlert = useAlert();
    const t = useTranslate();
    const dir = useDirection();

    function handleSubmit(values: FormValues) {
        showAlert(
            t((i18n) => i18n.misc.onSubmit),
            "success",
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
            <FormTextArea
                name="textArea"
                {...values.settings}
                minRows={values.settings.rows[0] ?? undefined}
                maxRows={values.settings.rows[1] ?? undefined}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.textArea)}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox
                name="settings.disabled"
                label={t((i18n) => i18n.misc.settings.disabled)}
            />
            <FormCheckbox name="settings.fast" label={t((i18n) => i18n.misc.settings.fast)} />
            <FormCheckbox
                name="settings.isLoading"
                label={t((i18n) => i18n.misc.settings.isLoading)}
            />
            <FormSlider
                name="settings.rows"
                label={`${t((i18n) => i18n.misc.settings.minRows)} - ${t(
                    (i18n) => i18n.misc.settings.maxRows,
                )}`}
                displayValue={(value) => {
                    if (!Array.isArray(value)) return `${value}`;

                    return <span dir="ltr">{value.join(" - ")}</span>;
                }}
                stepSize={1}
                maxValue={10}
            />
            <FormSlider
                name="settings.maxLength"
                label={t((i18n) => i18n.misc.settings.maxLength)}
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
])(TextAreaDemo);
