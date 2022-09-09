import { PersonActionTypesEnums } from "./action";

export function PersonReducer(incomingState, action) {
  const { type, payload } = action;

  switch (type) {
    case PersonActionTypesEnums.personRegisterRequest:
    case PersonActionTypesEnums.personLoginRequest:
    case PersonActionTypesEnums.getPersonsRequest:
    case PersonActionTypesEnums.errorMessageRequest:
      return {
        ...incomingState,
        ...payload,
      };
    default: {
      return incomingState;
    }
  }
}
