import { FormRecording } from "@hilma/forms";

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
import { useFiles } from "@hilma/fileshandler-client";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
    recording: yup.string().nullable().required(),

    settings: yup.object({
        rounded: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const RecordingDemo: React.FC = () => {
    const { values } = useForm<FormValues>();

    const filesUploader = useFiles();

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
            <FormRecording
                name="recording"
                filesUploader={filesUploader}
                label={t((i18n) => i18n.labels.recording)}
                {...values.settings}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox
                name={schema.key((values) => values.settings.rounded)}
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
])(RecordingDemo);
