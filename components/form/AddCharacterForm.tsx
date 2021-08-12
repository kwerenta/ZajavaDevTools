import { addDoc, serverTimestamp, Timestamp } from "firebase/firestore/lite";
import { Form, Formik } from "formik";
import React, { ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCharacter } from "../../contexts/CharacterContext";
import { db } from "../../firebase";
import Backdrop from "../Backdrop";
import Button from "../Button";
import FormField from "./FormField";

interface Props {
  handleClose: () => void;
}

export default function AddCharacterForm({ handleClose }: Props): ReactElement {
  const { currentUser } = useAuth();
  const { addCharacter } = useCharacter();
  return (
    <>
      <aside className="fixed lg:left-24 z-20 top-20 lg:top-0 left-0 bottom-0 md:max-w-2xl w-full md:p-16 p-20 bg-zajavaBlue-900">
        <Formik
          validate={values => {
            const errors: any = {};
            Object.entries(values).forEach(([key, value]) => {
              if (!value.length) errors[key] = "To pole jest wymagane";
              else if (value.length > 255)
                errors[key] = "Maksymalna długość to 255 znaków";
            });
            return errors;
          }}
          initialValues={{ name: "", location: "", occupation: "" }}
          onSubmit={async ({ location, name, occupation }) => {
            if (!currentUser) return;
            try {
              const data = {
                name,
                location,
                occupation,
                createdBy: currentUser.uid,
                createdAt: serverTimestamp() as Timestamp,
              };
              const { id: uid } = await addDoc(db.characters, data);
              addCharacter({ ...data, uid });
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
