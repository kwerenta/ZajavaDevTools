import { getDocs, orderBy, query, Timestamp } from "firebase/firestore/lite";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { db } from "../firebase";
import { charactersReducer } from "../reducers/charactersReducer";
import { useAuth } from "./AuthContext";

export interface Character {
  uid: string;
  location: string;
  name: string;
  occupation: string;
  createdBy: string;
  createdAt?: Timestamp;
  skin?: string;
}

export interface CharacterState {
  characters: Character[];
  isLoading: boolean;
  error?: string;
}

export type CharacterAction =
  | { type: "SUCCESS"; characters: Character[] }
  | {
      type: "ERROR";
      error: string;
    }
  | { type: "CREATE"; character: Character }
  | { type: "SORT"; sortBy: keyof Character };

interface CharacterValue extends CharacterState {
  createCharacter: (character: Character) => void;
  sortCharacters: (sortBy: keyof Character) => void;
}

const initialValue: CharacterValue = {
  characters: [],
  isLoading: true,
  createCharacter: () => {},
  sortCharacters: () => {},
};

interface Props {
  children: React.ReactNode;
}

const CharacterContext = createContext<CharacterValue>(initialValue);

export function useCharacter() {
  return useContext(CharacterContext);
}

export function CharacterProvider({ children }: Props): ReactElement {
  const [state, dispatch] = useReducer(charactersReducer, {
    isLoading: true,
    characters: [],
  });

  const { isLoading, currentUser } = useAuth();

  const createCharacter = (character: Character) =>
    dispatch({ type: "CREATE", character });

  const sortCharacters = (sortBy: keyof Character) =>
    dispatch({ type: "SORT", sortBy });

  useEffect(() => {
    if (!isLoading && currentUser) {
      const q = query(db.characters, orderBy("name"));
      getDocs(q)
        .then(res => {
          dispatch({
            type: "SUCCESS",
            characters: res.docs.map(doc => db.formatDoc(doc)),
          });
        })
        .catch(error => {
          dispatch({ type: "ERROR", error: error.code });
        });
    }
  }, [isLoading, currentUser]);

  return (
    <CharacterContext.Provider
      value={{ ...state, createCharacter, sortCharacters }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
