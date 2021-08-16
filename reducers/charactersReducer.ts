import { Action, State } from "../contexts/CharacterContext";

export const charactersReducer = (
  state: State,
  { type, payload }: Action
): State => {
  switch (type) {
    case "SUCCESS":
      return {
        isLoading: false,
        characters: payload.characters || [],
      };
    case "ERROR":
      return {
        isLoading: false,
        characters: [],
        error: payload.error,
      };
    case "CREATE":
      return {
        ...state,
        characters: [...state.characters, payload.character!].sort((a, b) =>
          a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
        ),
      };
  }
};
