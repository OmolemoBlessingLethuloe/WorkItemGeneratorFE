import { PersonProjectsActionTypesEnums } from "./action";

export function PersonProjectsReducer(incomingState, action) {
  const { type, payload } = action;

  switch (type) {
    case PersonProjectsActionTypesEnums.createPersonProjectRequest:
    case PersonProjectsActionTypesEnums.getAllPersonProjectsRequest:
    case PersonProjectsActionTypesEnums.errorMessageRequest:
      return {
        ...incomingState,
        ...payload,
      };

    default: {
      return incomingState;
    }
  }
}
