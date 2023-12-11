import { FormImageInput, FormSwitch } from "@hilma/forms";

import { useFiles } from "@hilma/fileshandler-client";
import {
  FormProvider,
  FormSubmitButton,
  useAlert,
  useForm,
  useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";
import { Divider } from "@mui/material";
import React from "react";
import * as yup from "yup";

import { FormsDevtools } from "@hilma/forms-devtools";
import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";

const schema = yup.object({
  image: yup.string().required(),

  settings: yup.object({
    disableDragNDrop: yup.boolean().required(),
    singleUpload: yup.boolean().required(),
    rounded: yup.boolean().required(),
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
        name={"image"}
        filesUploader={filesUploader}
        buttonText={t((i18n) => i18n.labels.image)}
        label={t((i18n) => i18n.labels.image)}
        {...values.settings}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormSwitch
        name={"settings.rounded"}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />
      <FormSwitch
        name={"settings.disableDragNDrop"}
        label={t((i18n) => i18n.misc.settings.disableDragNDrop)}
      />
      <FormSwitch
        name={"settings.singleUpload"}
        label={t((i18n) => i18n.misc.settings.singleUpload)}
      />

      <FormsDevtools noEditor buttonPosition="bottom-right" />
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
