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

import { noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import { FormsDevtools } from "@hilma/forms-devtools";

const schema = yup.object({
  checkbox: yup.boolean().isTrue("errors.isTrue.f|fields.checkbox|"),

  settings: yup.object({
    disabled: yup.boolean().required(),
  }),
});

type FormValues = yup.InferType<typeof schema>;

const CheckboxDemo: React.FC = () => {
  const { values } = useForm<FormValues>();

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
      <FormCheckbox
        name={"checkbox"}
        {...values.settings}
        label={t((i18n) => i18n.labels.checkbox)}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormSwitch
        name={"settings.disabled"}
        label={t((i18n) => i18n.misc.settings.disabled)}
      />

      <FormsDevtools buttonPosition="bottom-right" />
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
