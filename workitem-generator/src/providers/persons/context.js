import { createContext } from "react";

export const INITIAL_STATE = {};

const PersonContext = createContext(INITIAL_STATE);

const PersonActionsContext = createContext(null);

export { PersonContext, PersonActionsContext };
