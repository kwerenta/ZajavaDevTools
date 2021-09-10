import { QuestAction, QuestState } from "../contexts/QuestContext";

export const questsReducer = (
  state: QuestState,
  action: QuestAction
): QuestState => {
  switch (action.type) {
    case "SUCCESS":
      return { quests: action.quests, isLoading: false };

    case "ERROR":
      return { quests: [], isLoading: false, error: action.error };

    case "CREATE":
      return { quests: state.quests, isLoading: false };
  }
};
