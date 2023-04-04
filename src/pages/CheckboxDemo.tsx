import { FormCheckbox } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import {
    useFormConfig,
    useForm,
    useAlert,
    FormProvider,
    FormSubmitButton,
    FormSwitch,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { key as _key } from "@hilma/forms";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
    checkbox: yup.boolean().isTrue("errors.isTrue.f|fields.checkbox|"),

    settings: yup.object({
        disabled: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const key = _key<FormValues>;

const CheckboxDemo: React.FC = () => {
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
            <FormCheckbox
                name={key("checkbox")}
                {...values.settings}
                label={t((i18n) => i18n.labels.checkbox)}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormSwitch
                name={key("settings.disabled")}
                label={t((i18n) => i18n.misc.settings.disabled)}
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
])(CheckboxDemo);
