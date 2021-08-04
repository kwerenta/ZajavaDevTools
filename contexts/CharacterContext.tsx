import { getDocs, orderBy, query, Timestamp } from "firebase/firestore/lite";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";

export interface Character {
  uid: string;
  location: string;
  name: string;
  occupation: string;
  createdBy: string;
  createdAt?: Timestamp;
  skin?: string;
}

interface valueTypes {
  characters: Character[];
  isLoading: boolean;
  addCharacter: (character: Character) => void;
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

  const addCharacter = async (character: Character) => {
    setCharacters(prevCharacters =>
      [...prevCharacters, character].sort((a, b) =>
        a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
      )
    );
  };

  useEffect(() => {
    const q = query(db.characters, orderBy("name"));

    getDocs(q)
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
