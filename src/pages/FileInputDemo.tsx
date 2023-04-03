import { FormTextInput } from "@hilma/forms";

import React from "react";
import { useFormConfig, useForm, FormProvider } from "@hilma/forms";
import { provide } from "@hilma/tools";
import * as yup from "yup";

import { noop } from "../common/helpers";

const schema = yup.object({});

type FormValues = yup.InferType<typeof schema>;

const TextInputDemo: React.FC = () => {
    return <></>;
};

export default provide([
    FormProvider<FormValues>,
    {
        initialValues: schema.initialize(),
        onSubmit: noop,
        validationSchema: schema,
    },
])(TextInputDemo);
