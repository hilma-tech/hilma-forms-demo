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
    FormTextInput,
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import FormSlider from "../components/custom-forms/FormSlider";

const schema = yup.object({
    textArea: yup.string().required().min(10).max(240),

    settings: yup.object({
        disabled: yup.boolean().required(),
        fast: yup.boolean().required(),
        isLoading: yup.boolean().required(),
        rounded: yup.boolean().required(),
        rows: yup
            .tuple([yup.number().nullable(), yup.number().nullable()])
            .required()
            .default([3, 7]),
        maxLength: yup.number().required().nullable(),
        placeholder: yup.string().required(),
    }),
});

const names = schema.names();

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
                name={names.textArea}
                {...values.settings}
                minRows={values.settings.rows[0] ?? undefined}
                maxRows={values.settings.rows[1] ?? undefined}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.textArea)}
            />

            <FormSubmitButton sx={{ mt: 5 }}>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider sx={{ mb: 10 }} />

            <FormCheckbox
                name={names.settings.disabled}
                label={t((i18n) => i18n.misc.settings.disabled)}
            />
            <FormCheckbox name={names.settings.fast} label={t((i18n) => i18n.misc.settings.fast)} />
            <FormCheckbox
                name={names.settings.isLoading}
                label={t((i18n) => i18n.misc.settings.isLoading)}
            />
            <FormCheckbox
                name={names.settings.rounded}
                label={t((i18n) => i18n.misc.settings.rounded)}
            />
            <FormSlider
                name={names.settings.rows}
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
                name={names.settings.maxLength}
                label={t((i18n) => i18n.misc.settings.maxLength)}
            />
            <FormTextInput
                fast
                name={names.settings.placeholder}
                label={t((i18n) => i18n.misc.settings.placeholder)}
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
