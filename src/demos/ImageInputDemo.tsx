import { FormImageInput } from "@hilma/forms";

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
    image: yup.string().required(),

    settings: yup.object({
        disableDragNDrop: yup.boolean(),
        singleUpload: yup.boolean(),
        rounded: yup.boolean(),
    }),
});

type FormValues = yup.InferType<typeof schema>;

const ImageInputDemo: React.FC = () => {
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
            <FormImageInput
                name={schema.key((values) => values.image)}
                filesUploader={filesUploader}
                buttonText={t(i18n => i18n.labels.image)}
                label={t(i18n => i18n.labels.image)}
                {...values.settings}
            />

            <FormSubmitButton>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider />

            <FormCheckbox
                name={schema.key((values) => values.settings.rounded)}
                label={t((i18n) => i18n.misc.settings.rounded)}
            />
            <FormCheckbox
                name={schema.key((values) => values.settings.disableDragNDrop)}
                label={t((i18n) => i18n.misc.settings.disableDragNDrop)}
            />
            <FormCheckbox
                name={schema.key((values) => values.settings.singleUpload)}
                label={t((i18n) => i18n.misc.settings.singleUpload)}
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
])(ImageInputDemo);