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
import { FormsDevtools } from "@hilma/forms-devtools";

const schema = yup.object({
  image: yup.string().required(),

  settings: yup.object({
    disableDragNDrop: yup.boolean().required(),
    singleUpload: yup.boolean().required(),
    rounded: yup.boolean().required(),
  }),
});

const names = schema.names();

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
      dir
    );

    console.log(values);
  }

  useFormConfig<FormValues>(
    (form) => {
      form.onSubmit = handleSubmit;
      form.dir = dir;
      form.translateFn = t;
    },
    [dir, t]
  );

  return (
    <>
      <FormImageInput
        name={names.image}
        filesUploader={filesUploader}
        buttonText={t((i18n) => i18n.labels.image)}
        label={t((i18n) => i18n.labels.image)}
        {...values.settings}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormCheckbox
        name={names.settings.rounded}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />
      <FormCheckbox
        name={names.settings.disableDragNDrop}
        label={t((i18n) => i18n.misc.settings.disableDragNDrop)}
      />
      <FormCheckbox
        name={names.settings.singleUpload}
        label={t((i18n) => i18n.misc.settings.singleUpload)}
      />

      <FormsDevtools noEditor buttonPosition="top-left" />
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
