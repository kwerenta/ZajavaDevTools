import { useEffect, useState } from "react";
import { db } from "../firebase";

export interface Character {
  location: string;
  skin: string;
  name: string;
  occupation: string;
  createdBy: string;
  uid: string;
}

type Type = [Character[], boolean];

export function useCharacter(): Type {
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

  return [characters, isLoading];
}
