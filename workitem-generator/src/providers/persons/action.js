import { createAction } from "redux-actions";

// action types
export const PersonActionTypesEnums = {
  personRegisterRequest: "PERSON_REGISTER_REQUEST",
  personLoginRequest: "PERSON_LOGIN_REQUEST",
  getPersonsRequest: "GET_PERSONS_REGUEST",
  errorMessageRequest: "ERROR_MESSAGE_REQUEST",
};

export const personRegisterRequestAction = createAction(
  PersonActionTypesEnums.personRegisterRequest,
  (personDtoInfo) => ({ personDtoInfo })
);

export const personLoginRequestAction = createAction(
  PersonActionTypesEnums.personLoginRequest,
  (personLoginDtoInfo) => ({ personLoginDtoInfo })
);

export const getPersonsRequestAction = createAction(
  PersonActionTypesEnums.getPersonsRequest,
  (allPersonInfo) => ({ allPersonInfo })
);

export const errorMessageRequestAction = createAction(
  PersonActionTypesEnums.errorMessageRequest,
  (errorMsg) => ({ errorMsg })
);
