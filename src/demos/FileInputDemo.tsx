import { FormFileInput } from "@hilma/forms";

import React from "react";
import { Divider } from "@mui/material";
import * as yup from "yup";
import {
    useFormConfig,
    useForm,
    useAlert,
    FormProvider,
    FormSubmitButton,
    FormSelect,
    FormSwitch,
} from "@hilma/forms";
import { useFiles } from "@hilma/fileshandler-client";
import { provide } from "@hilma/tools";

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const FILE_TYPES = ["file", "gif", "image", "audio", "video"] as const;
type FileType = (typeof FILE_TYPES)[number];

function isFileType(str: any): str is FileType {
    return FILE_TYPES.includes(str);
}

const schema = yup.object({
    file: yup.string().required(),

    settings: yup.object({
        type: yup.mixed({ check: isFileType }).required().default("file"),
        rounded: yup.boolean().required(),
    }),
});

const names = schema.names();

type FormValues = yup.InferType<typeof schema>;

const FileInputDemo: React.FC = () => {
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
            <FormFileInput
                name={names.file}
                label={t((i18n) => i18n.labels.file)}
                inputText={t((i18n) => i18n.labels.file)}
                typeErrorMsg={t((i18n) => i18n.errors.fileType)?.replace(
                    "{?}",
                    values.settings.type,
                )}
                filesUploader={filesUploader}
                {...values.settings}
            />

            <FormSubmitButton sx={{ mt: 5 }}>{t((i18n) => i18n.misc.submit)}</FormSubmitButton>

            <Divider sx={{ mb: 10 }} />

            <FormSelect
                name={names.settings.type}
                label={t((i18n) => i18n.misc.settings.fileType)}
                options={FILE_TYPES.map((value) => ({
                    value,
                    content: t((i18n) => i18n.misc.fileTypes[value]),
                }))}
            />

            <FormSwitch
                name={names.settings.rounded}
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
])(FileInputDemo);
