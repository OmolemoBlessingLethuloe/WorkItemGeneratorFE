import { createContext } from "react";

export const INITIAL_STATE = {};

const PersonProjectContext = createContext(INITIAL_STATE);

const PersonProjectActionsContext = createContext(null);

export { PersonProjectContext, PersonProjectActionsContext };
