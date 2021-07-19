import { Field } from "formik";
import React, { ReactElement } from "react";

interface Props {
  name: string;
  type: string;
  label: string;
}

export default function FormField({ name, type, label }: Props): ReactElement {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field type={type} name={name} />
    </>
  );
}
