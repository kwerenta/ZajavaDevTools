import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";

export interface Character {
  location: string;
  skin: string;
  name: string;
  occupation: string;
  createdBy: string;
  uid: string;
}

interface valueTypes {
  characters: Character[];
  isLoading: boolean;
  addCharacter: (
    characterDoc: firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData>
  ) => void;
}

interface Props {
  children: React.ReactNode;
}

const initialValues = {
  characters: [],
  isLoading: true,
  addCharacter: () => {},
};

const CharacterContext = createContext<valueTypes>(initialValues);

export function useCharacter() {
  return useContext(CharacterContext);
}

export function CharacterProvider({ children }: Props): ReactElement {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addCharacter = async (
    data: firebase.default.firestore.DocumentData
  ) => {
    const doc = await data.get();
    if (!doc) return;
    const character = db.formatDoc<Character>(doc);
    setCharacters(prevCharacters =>
      [...prevCharacters, character].sort((a, b) =>
        a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
      )
    );
  };

  useEffect(() => {
    db.characters
      .orderBy("name")
      .get()
      .then(res => {
        setCharacters(res.docs.map(doc => db.formatDoc(doc)));
        setIsLoading(false);
      })
      .catch(err => {
        setCharacters([]);
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const value: valueTypes = {
    characters,
    isLoading,
    addCharacter,
  };
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}
