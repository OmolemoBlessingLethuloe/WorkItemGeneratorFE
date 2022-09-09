import React, { useReducer, useContext } from "react";
import {
  createPersonProjectRequestAction,
  getAllPersonProjectsRequestAction,
  errorMessageRequestAction,
} from "./action";
import { PersonProjectsReducer } from "./reducer";
import {
  INITIAL_STATE,
  PersonProjectContext,
  PersonProjectActionsContext,
} from "./context";

const PersonProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PersonProjectsReducer, INITIAL_STATE);

  const createPersonProjectFetchedValues = async (payload) => {
    await fetch(
      "https://localhost:44311/api/services/app/PersonProject/CreateProject",
      {
        method: "POST",
        body: payload,
      }
    )
      .then((responseData) => responseData.json())
      .then((info) => {
        if (info.success) {
          dispatch(createPersonProjectRequestAction(info.result));
        } else if (info.error) {
          dispatch(errorMessageRequestAction(info.error.message));
        }
      });
  };

  const getAllPersonProjectsFetchedValues = async () => {
    await fetch(
      "https://localhost:44311/api/services/app/PersonProject/GetProject",
      {
        method: "GET",
      }
    )
      .then((responseData) => responseData.json())
      .then(async (info) => {
        if (info.success) {
          dispatch(getAllPersonProjectsRequestAction(info.result));
        } else if (info.error) {
          dispatch(errorMessageRequestAction(info.error.message));
        }
      });
  };

  return (
    <PersonProjectContext.Provider value={state}>
      <PersonProjectActionsContext.Provider
        value={{
          createPersonProjectFetchedValues,
          getAllPersonProjectsFetchedValues,
        }}
      >
        {children}
      </PersonProjectActionsContext.Provider>
    </PersonProjectContext.Provider>
  );
};

function usePersonProjectState() {
  const context = useContext(PersonProjectContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function usePersonProjectActions() {
  const context = useContext(PersonProjectActionsContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function usePersonProjects() {
  return {
    ...usePersonProjectState(),
    ...usePersonProjectActions(),
  };
}

export {
  PersonProjectProvider,
  usePersonProjectState,
  usePersonProjectActions,
  usePersonProjects,
};
