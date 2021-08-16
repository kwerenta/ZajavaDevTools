import { Action, State } from "../contexts/CharacterContext";

export const charactersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SUCCESS":
      return {
        isLoading: false,
        characters: action.characters,
      };
    case "ERROR":
      return {
        isLoading: false,
        characters: [],
        error: action.error,
      };
    case "CREATE":
      return {
        ...state,
        characters: [...state.characters, action.character!].sort((a, b) =>
          a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
        ),
      };
  }
};
