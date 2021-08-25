import { addDoc, serverTimestamp, Timestamp } from "firebase/firestore/lite";
import { Form, Formik } from "formik";
import React, { ReactElement } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Character, useCharacter } from "../../contexts/CharacterContext";
import { db } from "../../firebase";
import Button from "../Button";
import AsideFormContainer from "./AsideFormContainer";
import FormField from "./FormField";

interface Props {
  handleClose: () => void;
  character?: Character;
}

export default function CharacterForm({ handleClose }: Props): ReactElement {
  const { currentUser } = useAuth();
  const { createCharacter } = useCharacter();
  return (
    <AsideFormContainer handleClose={handleClose}>
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
            const character = { ...data, uid };
            createCharacter(character);
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
    </AsideFormContainer>
  );
}
