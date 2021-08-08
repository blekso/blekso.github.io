import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Nav from "../components/Nav";
import Auth from "../components/Auth";
import UserDashboard from "../components/UserDashboard";

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.user,
        token: action.payload.data.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function MyApp() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div id="app">
        <Nav isAuthenticated={state.isAuthenticated} />
        <div>
          {!state.isAuthenticated ? <Auth /> : <UserDashboard state={state} />}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default MyApp;
