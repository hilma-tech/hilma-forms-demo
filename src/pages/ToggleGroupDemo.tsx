import { FormToggleGroup } from "@hilma/forms";

import React from "react";
import { Divider, useTheme } from "@mui/material";
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
import { key as _key } from "@hilma/forms";

import { COLORS, COLORS_TO_HEX, noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
    toggleGroup: yup.string().required().oneOf(COLORS),

    settings: yup.object({
        rounded: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const key = _key<FormValues>;

const ToggleGroupDemo: React.FC = () => {
    const { values } = useForm<FormValues>();

    const showAlert = useAlert();
    const t = useTranslate();
    const dir = useDirection();
    const theme = useTheme();

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

    const options = COLORS.map((value) => ({
        value: value,
        content: t((i18n) => i18n.misc.colors[value]),
        chosenSx: {
            backgroundColor: value,
        },
        chosenTextColor: theme.palette.getContrastText(COLORS_TO_HEX[value]),
    }));

    return (
        <>
            <FormToggleGroup
                name={key("toggleGroup")}
                {...values.settings}
                options={options}
                label={t((i18n) => i18n.labels.toggleGroup)}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox
                name={key("settings.rounded")}
                label={t((i18n) => i18n.misc.settings.rounded)}
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
])(ToggleGroupDemo);
