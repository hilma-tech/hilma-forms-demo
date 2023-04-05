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
        disabled: yup.boolean(),
        fast: yup.boolean(),
        isLoading: yup.boolean(),
        rounded: yup.boolean(),
        maxLength: yup.number().nullable(),
        placeholder: yup.string(),
    }),
});

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
                name="textInput"
                {...values.settings}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.textInput)}
            />
            <FormPassword
                name="password"
                {...values.settings}
                maxLength={values.settings.maxLength ?? undefined}
                label={t((i18n) => i18n.labels.password)}
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
            <FormCheckbox name="settings.rounded" label={t((i18n) => i18n.misc.settings.rounded)} />
            <FormSlider
                name="settings.maxLength"
                label={t((i18n) => i18n.misc.settings.maxLength)}
            />
            <FormTextInput
                fast
                name="settings.placeholder"
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
