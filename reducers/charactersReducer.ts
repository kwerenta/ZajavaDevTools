import { CharacterAction, CharacterState } from "../contexts/CharacterContext";

export const charactersReducer = (
  state: CharacterState,
  action: CharacterAction
): CharacterState => {
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
        characters: [...state.characters, action.character].sort((a, b) =>
          a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
        ),
      };
    case "SORT":
      return {
        ...state,
        characters: [...state.characters].sort((a, b) =>
          a[action.sortBy]!.toLocaleLowerCase() >
          b[action.sortBy]!.toLocaleLowerCase()
            ? 1
            : -1
        ),
      };
  }
};
