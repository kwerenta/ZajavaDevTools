import { getDocs, orderBy, query, Timestamp } from "firebase/firestore/lite";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { db } from "../firebase";
import { charactersReducer } from "../reducers/charactersReducer";

export interface Character {
  uid: string;
  location: string;
  name: string;
  occupation: string;
  createdBy: string;
  createdAt?: Timestamp;
  skin?: string;
}

export interface State {
  characters: Character[];
  isLoading: boolean;
  error?: string;
}

export type Action =
  | { type: "SUCCESS"; characters: Character[] }
  | {
      type: "ERROR";
      error: string;
    }
  | { type: "CREATE"; character: Character };

const initialValue: State = {
  characters: [],
  isLoading: true,
};

interface Props {
  children: React.ReactNode;
}

const CharacterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialValue,
  dispatch: () => null,
});

export function useCharacter() {
  return useContext(CharacterContext);
}

export function CharacterProvider({ children }: Props): ReactElement {
  const [state, dispatch] = useReducer(charactersReducer, {
    isLoading: true,
    characters: [],
  });

  useEffect(() => {
    const q = query(db.characters, orderBy("name"));

    getDocs(q)
      .then(res => {
        dispatch({
          type: "SUCCESS",
          characters: res.docs.map(doc => db.formatDoc(doc)),
        });
      })
      .catch(error => {
        dispatch({ type: "ERROR", error });
      });
  }, []);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
}
