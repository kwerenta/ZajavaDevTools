import { Form, Formik } from "formik";
import { object, string } from "yup";
import React, { ReactElement } from "react";
import FormField from "./FormField";
import Backdrop from "../Backdrop";
import Button from "../Button";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = object().shape({
  name: string()
    .required("To pole jest wymagane")
    .max(255, "Maksymalna długość to 255 znaków"),
  occupation: string()
    .required("To pole jest wymagane")
    .max(255, "Maksymalna długość to 255 znaków"),
  location: string()
    .required("To pole jest wymagane")
    .max(255, "Maksymalna długość to 255 znaków"),
});

interface Props {
  handleClose: () => void;
}

export default function AddCharacterForm({ handleClose }: Props): ReactElement {
  const { currentUser } = useAuth();
  return (
    <>
      <aside className="fixed lg:left-24 z-20 top-20 lg:top-0 left-0 bottom-0 md:max-w-2xl w-full md:p-16 p-20 bg-zajavaBlue-900">
        <Formik
          validationSchema={validationSchema}
          validate={() => ({})}
          initialValues={{ name: "", location: "", occupation: "" }}
          onSubmit={async ({ location, name, occupation }) => {
            if (!currentUser) return;
            try {
              const newCharacter = await db.characters.add({
                name,
                location,
                occupation,
                createdBy: currentUser.uid,
                createdAt: db.getCurrentTimestamp(),
              });
            } catch (e) {
              console.error(e);
            }
            handleClose();
          }}
        >
          {() => (
            <Form className="flex flex-col">
              <h2 className="text-2xl font-bold mb-12">Tworzenie postaci</h2>

              <FormField label="Nazwa postaci" name="name" type="text" />
              <FormField label="Zajęcie" name="occupation" type="text" />
              <FormField label="Lokalizacja" name="location" type="text" />

              <div className="absolute right-0 left-0 px-16 bottom-0 h-24 flex items-center justify-between border-t-2 border-opacity-60 border-zajavaBlue-800">
                <Button type="reset" variant="CANCEL" onClick={handleClose}>
                  Anuluj
                </Button>
                <Button type="submit">Utwórz postać</Button>
              </div>
            </Form>
          )}
        </Formik>
      </aside>
      <Backdrop handleClose={handleClose} />
    </>
  );
}
