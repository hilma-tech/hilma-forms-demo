import { FormTextInput, FormPassword } from "@hilma/forms";

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
    textInput: yup.string().required().min(3),
    password: yup.string().required().min(3),

    settings: yup.object({
        disabled: yup.boolean().required(),
        fast: yup.boolean().required(),
        isLoading: yup.boolean().required(),
        rounded: yup.boolean().required(),
        maxLength: yup.number().required().nullable(),
        placeholder: yup.string().required(),
    }),
});

const names = schema.names();

type FormValues = yup.InferType<typeof schema>;

const TextInputDemo: React.FC = () => {
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
            <FormTextInput
                name={names.textInput}
                {...values.settings}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.textInput)}
            />
            <FormPassword
                name={names.password}
                {...values.settings}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.password)}
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
])(TextInputDemo);
