import { FormSelect, FormTextInput, FormToggleGroup } from "@hilma/forms";

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

import { COLORS, noop } from "../common/helpers";
import { useDirection, useTranslate } from "../common/i18n";
import { FormsDevtools } from "@hilma/forms-devtools";

const schema = yup.object({
  select: yup.string().oneOf(COLORS).required(),
  multipleSelect: yup
    .array()
    .of(yup.string().oneOf(COLORS).required())
    .min(1, "errors.required|fields.multipleSelect|"),

  settings: yup.object({
    disabled: yup.boolean().default(false),
    rounded: yup.boolean().default(false),
    placeholder: yup.string().default(""),
    noneOption: yup.string().default(""),
  }),

  checkboxes: yup.string().oneOf(["checkbox", "regular"]).default("regular"),
});

const names = schema.names();

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
      dir
    );

    console.log(values);
  }

  const options = COLORS.map((value) => ({
    value,
    content: t((i18n) => i18n.misc.colors[value]),
  }));

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
      <FormSelect
        name={names.select}
        {...values.settings}
        noneOption={values.settings.noneOption ?? undefined}
        options={options}
        label={t((i18n) => i18n.labels.select)}
      />

      <FormSelect
        name={names.multipleSelect}
        {...values.settings}
        noneOption={undefined}
        options={options}
        multiple={values.checkboxes === "checkbox" ? "checkbox" : true}
        label={t((i18n) => i18n.labels.multipleSelect)}
      />

      <FormSubmitButton sx={{ mt: 5 }}>
        {t((i18n) => i18n.misc.submit)}
      </FormSubmitButton>

      <Divider sx={{ mb: 10 }} />

      <FormCheckbox
        name={names.settings.disabled}
        label={t((i18n) => i18n.misc.settings.disabled)}
      />
      <FormCheckbox
        name={names.settings.rounded}
        label={t((i18n) => i18n.misc.settings.rounded)}
      />
      <FormToggleGroup
        name={names.checkboxes}
        label={t((i18n) => i18n.labels.multipleSelect)}
        options={[
          { value: "regular", content: "רגיל" },
          { value: "checkbox", content: "תיבות סימון" },
        ]}
      />
      <FormTextInput
        fast
        name={names.settings.placeholder}
        label={t((i18n) => i18n.misc.settings.placeholder)}
      />
      <FormTextInput
        fast
        name={names.settings.noneOption}
        label={t((i18n) => i18n.misc.settings.noneOption)}
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
])(SelectDemo);
