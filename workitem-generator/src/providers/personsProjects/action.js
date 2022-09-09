import { createAction } from "redux-actions";

export const PersonProjectsActionTypesEnums = {
  createPersonProjectRequest: "CREATE_PERSON_PROJECT_REQUEST",
  getAllPersonProjectsRequest: "GET_ALL_PERSON_PROJECT_REQUEST",
  errorMessageRequest: "ERROR_MESSAGE_REQUEST",
};

export const createPersonProjectRequestAction = createAction(
  PersonProjectsActionTypesEnums.createPersonProjectRequest,
  (personProjectDtoPayload) => ({ personProjectDtoPayload })
);
export const getAllPersonProjectsRequestAction = createAction(
  PersonProjectsActionTypesEnums.getAllPersonProjectsRequest,
  (allPersonProjectDtoPayload) => ({ allPersonProjectDtoPayload })
); //
export const errorMessageRequestAction = createAction(
  PersonProjectsActionTypesEnums.errorMessageRequest,
  (errorMsg) => ({ errorMsg })
);
