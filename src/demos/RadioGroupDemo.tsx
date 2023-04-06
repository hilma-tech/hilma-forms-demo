import { FormRadioGroup, FormSelect } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import { useFormConfig, useForm, useAlert, FormProvider, FormSubmitButton } from "@hilma/forms";
import { provide } from "@hilma/tools";

import { COLORS, noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
    radioGroup: yup.string().required().oneOf(COLORS),

    settings: yup.object({
        disabledOptions: yup.array().of(yup.number()),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const RadioGroupDemo: React.FC = () => {
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

    const options = COLORS.map((value, i) => ({
        value,
        content: t((i18n) => i18n.misc.colors[value]),
        disabled: values.settings.disabledOptions?.includes(i),
    }));

    return (
        <>
            <FormRadioGroup
                name="radioGroup"
                options={options}
                label={t((i18n) => i18n.labels.radioGroup)}
            />

            <FormSubmitButton sx={{ mt: 5 }}>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider sx={{ mb: 10 }} />

            <FormSelect
                multiple
                name="settings.disabledOptions"
                options={COLORS.map((_, i) => ({ value: i, content: `${i + 1}` }))}
                label={t((i18n) => i18n.misc.settings.disabledOptions)}
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
])(RadioGroupDemo);
