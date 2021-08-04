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
}

interface Props {
  children: React.ReactNode;
}

const initialValues = {
  characters: [],
  isLoading: true,
};

const CharacterContext = createContext<valueTypes>(initialValues);

export function useCharacter() {
  return useContext(CharacterContext);
}

export function CharacterProvider({ children }: Props): ReactElement {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.characters
      .get()
      .then(res => {
        setCharacters(res.docs.map(doc => db.formatDoc(doc)));
        setIsLoading(false);
      })
      .catch(() => {
        setCharacters([]);
        setIsLoading(false);
      });
  }, []);

  const value: valueTypes = {
    characters,
    isLoading,
  };
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}
