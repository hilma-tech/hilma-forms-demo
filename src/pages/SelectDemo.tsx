import { FormSelect } from "@hilma/forms";

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

const SELECT_VALUES = ["red", "green", "orange", "blue", "purple", "yellow"] as const;

const schema = yup.object({
    select: yup.string().oneOf(SELECT_VALUES).required(),
    multipleSelect: yup
        .array()
        .of(yup.string().oneOf(SELECT_VALUES).required())
        .min(1, "errors.required|fields.multipleSelect|"),

    settings: yup.object({
        disabled: yup.boolean(),
        rounded: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const SelectDemo: React.FC = () => {
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

    const options = SELECT_VALUES.map((value) => ({
        value,
        content: t((i18n) => i18n.misc.colors[value]),
    }));

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
            <FormSelect
                name="select"
                {...values.settings}
                options={options}
                label={t((i18n) => i18n.labels.select)}
            />

            <FormSelect
                name="multipleSelect"
                {...values.settings}
                options={options}
                multiple
                label={t((i18n) => i18n.labels.multipleSelect)}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox
                name="settings.disabled"
                label={t((i18n) => i18n.misc.settings.disabled)}
            />
            <FormCheckbox name="settings.rounded" label={t((i18n) => i18n.misc.settings.rounded)} />
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
])(SelectDemo);
