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
import { questsReducer } from "../reducers/questsRedcuer";
import { useAuth } from "./AuthContext";

export interface Quest {
  uid: string;
  name: string;
  requirements: string;
  status: number;
}

export interface QuestState {
  quests: Quest[];
  isLoading: boolean;
  error?: string;
}

export type QuestAction =
  | { type: "SUCCESS"; quests: Quest[] }
  | {
      type: "ERROR";
      error: string;
    }
  | { type: "CREATE"; quest: Quest };

interface QuestValue extends QuestState {}

const initialValue: QuestValue = {
  quests: [],
  isLoading: true,
};

interface Props {
  children: React.ReactNode;
}

const QuestContext = createContext<QuestValue>(initialValue);

export function useQuest() {
  return useContext(QuestContext);
}

export function QuestProvider({ children }: Props): ReactElement {
  const [state, dispatch] = useReducer(questsReducer, {
    isLoading: true,
    quests: [],
  });

  const { isLoading, currentUser } = useAuth();

  useEffect(() => {
    if (!isLoading && currentUser) {
      const q = query(db.quests("4YzDsre5CT52wVFMnlxI"), orderBy("name"));
      getDocs(q)
        .then(res => {
          dispatch({
            type: "SUCCESS",
            quests: res.docs.map(doc => db.formatDoc(doc)),
          });
        })
        .catch(error => {
          dispatch({ type: "ERROR", error: error.code });
        });
    }
  }, [isLoading, currentUser]);

  return (
    <QuestContext.Provider value={{ ...state }}>
      {children}
    </QuestContext.Provider>
  );
}
