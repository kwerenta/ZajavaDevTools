import { Field, useField } from "formik";
import React, { ReactElement } from "react";

interface Props {
  name: string;
  type: string;
  label: string;
}

export default function FormField({ name, type, label }: Props): ReactElement {
  const [, meta] = useField(name);
  return (
    <>
      <div className="mt-6 mb-1 flex justify-between">
        <label htmlFor={name}>{label}</label>
        {meta.error && meta.touched && (
          <span className="text-red-500">{meta.error}</span>
        )}
      </div>
      <Field
        type={type}
        name={name}
        id={name}
        className={`bg-zajavaBlue-800 rounded-lg px-3 py-2 ${
          meta.error && meta.touched
            ? "ring-red-500 ring-2"
            : "focus:ring-zajavaBlue-500 focus:ring-2"
        }  focus:outline-none`}
      />
    </>
  );
}
