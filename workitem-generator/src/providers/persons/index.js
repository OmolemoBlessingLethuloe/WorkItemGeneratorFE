import React, { useReducer, useContext } from "react";
import { PersonReducer } from "./reducer";
import { PersonContext, PersonActionsContext, INITIAL_STATE } from "./context";
import {
  personRegisterRequestAction,
  personLoginRequestAction,
  getPersonsRequestAction,
  errorMessageRequestAction,
} from "./action";

const PersonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PersonReducer, INITIAL_STATE);

  const registerPersonFetchedValues = async (payload) => {
    await fetch("https://localhost:44311/api/services/app/Person/Register", {
      method: "POST",
      body: payload,
    }).then((responseData) => {
      responseData.json().then(async (info) => {
        if (info.success) {
          dispatch(personRegisterRequestAction(info.result));
        } else if (info.error) {
          dispatch(errorMessageRequestAction(info.error.message));
        }
      });
    });
  };

  const personLoginFetchedValues = async (payload) => {
    await fetch("https://localhost:44311/api/services/app/Person/Login", {
      method: "POST",
      body: payload,
    }).then((responseData) => {
      responseData.json().then(async (info) => {
        if (info.success) {
          dispatch(personLoginRequestAction(info.result));
        } else if (info.error) {
          dispatch(errorMessageRequestAction(info.error.message));
        }
      });
    });
  };

  const getPersonFetchedValues = async (id) => {
    await fetch(
      `https://localhost:44311/api/services/app/Person/GetUsers?id=${id}`,
      {
        method: "GET",
      }
    ).then((responseData) => {
      responseData.json().then((info) => {
        dispatch(getPersonsRequestAction(info.result));
      });
    });
  };

  return (
    <PersonContext.Provider value={state}>
      <PersonActionsContext.Provider
        value={{
          registerPersonFetchedValues,
          personLoginFetchedValues,
          getPersonFetchedValues,
        }}
      >
        {children}
      </PersonActionsContext.Provider>
    </PersonContext.Provider>
  );
};

function usePersonState() {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function usePersonActions() {
  const context = useContext(PersonActionsContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function usePersons() {
  return {
    ...usePersonState(),
    ...usePersonActions(),
  };
}

export { PersonProvider, usePersonState, usePersonActions, usePersons };
