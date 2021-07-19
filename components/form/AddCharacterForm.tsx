import { Form, Formik } from "formik";
import { object, string } from "yup";
import React, { ReactElement } from "react";
import FormField from "./FormField";
import Backdrop from "../Backdrop";

const validationSchema = object().shape({
  name: string()
    .required("Nazwa postaci jest wymagana")
    .max(255, "Maksymalna długość nazwy postaci to 255 znaków"),
  occupation: string()
    .required("Zajęcie postaci jest wymagane")
    .max(255, "Maksymalna długość zajęcia postaci to 255 znaków"),
  location: string()
    .required("Lokalizacja postaci jest wymagana")
    .max(255, "Maksymalna długość lokalizacji postaci to 255 znaków"),
});

interface Props {
  handleClose: () => void;
}

export default function AddCharacterForm({ handleClose }: Props): ReactElement {
  return (
    <>
      <aside className="fixed lg:ml-24 z-20 top-0 left-0 h-full max-w-2xl w-full p-16 bg-zajavaBlue-900">
        <Formik
          validationSchema={validationSchema}
          validate={() => ({})}
          initialValues={{ name: "", location: "", occupation: "" }}
          onSubmit={values => console.log(values)}
        >
          <Form className="flex flex-col">
            <FormField label="Nazwa postaci" name="name" type="text" />
            <FormField label="Zajęcie" name="occupation" type="text" />
            <FormField label="Lokalizacja" name="location" type="text" />
            {/* <FormField label="Skin" name="skin" type="file" /> */}
          </Form>
        </Formik>
      </aside>
      <Backdrop handleClose={handleClose} />
    </>
  );
}
