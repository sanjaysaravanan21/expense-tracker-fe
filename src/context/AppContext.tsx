// src/context/AppContext.tsx

import React, { createContext, useContext, useReducer } from "react";

// Define the Item interface
interface Item {
  datetime: string; // or Date if you want to handle Date objects
  category: string;
  amount: number;
  type: "expense" | "income";
  date: string; // 'YYYY-MM-DD' format
  time: string; // '24 hr format'
  createdAt: string; // or Date if you want to handle Date objects
  updatedAt: string; // or Date if you want to handle Date objects
}

// Define the UserDetails interface
interface UserDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  token: string;
}

// Define the AppState interface
interface AppState {
  items: Item[];
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: UserDetails | null;
}

// Define the initial state
const initialState: AppState = {
  items: [],
  isLoading: false,
  isAuthenticated: false,
  userDetails: null,
};

// Define actions
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_AUTHENTICATED"; payload: boolean }
  | { type: "SET_USER_DETAILS"; payload: UserDetails }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "LOGOUT_USER" };

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create a reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  let localState = null;
  switch (action.type) {
    case "SET_LOADING":
      localState = { ...state, isLoading: action.payload };
      break;
    case "SET_AUTHENTICATED":
      localState = { ...state, isAuthenticated: action.payload };
      break;
    case "SET_USER_DETAILS":
      localState = { ...state, userDetails: action.payload };
      break;
    case "ADD_ITEM":
      localState = { ...state, items: [...state.items, action.payload] };
      break;
    case "REMOVE_ITEM":
      localState = {
        ...state,
        items: state.items.filter((item) => item.datetime !== action.payload),
      };
      break;
    case "LOGOUT_USER":
      localState = initialState;
      break;
    default:
      localState = state;
  }
  localStorage.setItem("state", JSON.stringify(localState));
  return localState;
};

// Create a provider component
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storageState = localStorage.getItem("state");

  const [state, dispatch] = useReducer(
    appReducer,
    storageState ? JSON.parse(storageState) : initialState
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContext };
