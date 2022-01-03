import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  deleteLocalAuthenticatedSession,
  sessionStateReducer,
  getLocalAuthenticatedSession,
  AuthActionType,
  KratosSessionWithToken,
  setLocalAuthenticatedSession,
  AuthContextData,
} from "./helpers/state";
import axios from "axios";
import { newKratosSdk } from "./helpers/sdk";
import { ProjectContext } from "./ProjectProvider";

export const AuthContext = createContext<AuthContextData>({
  logIn: () => {},
  signOut: () => {},
  state: {
    isLoading: true,
    isAuthenticated: false,
    session: null,
  },
});

export function useAuthContext() {
  return useContext(AuthContext);
}

interface AuthContextProps {
  children: ReactNode;
}

export default ({ children }: AuthContextProps) => {
  const { project } = useContext(ProjectContext);

  const [state, dispatch] = useReducer(sessionStateReducer, {
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      const session = await getLocalAuthenticatedSession();
      console.log("fetched local session:", session?.session.id);

      // This might be signed in or not, fetches locally saved state
      dispatch({
        type: AuthActionType.RestoreSession,
        session: session,
      });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const updateStoreAsync = async () => {
      // Not initial load (session needs to be loaded first)
      if (!state.isLoading && !state.session) {
        await deleteLocalAuthenticatedSession();
      }

      if (state.session) {
        console.log("saving session id:", state.session.session.id);
        await setLocalAuthenticatedSession(state.session);
      }
    };

    updateStoreAsync();
  }, [state.session]);

  useEffect(() => {
    const syncSession = async (auth: KratosSessionWithToken) => {
      try {
        // whoami() returns the session belonging to the session_token:
        const { data: session } = await newKratosSdk(project).toSession(
          auth.session_token
        );

        console.log("current session", session);

        // Don't need to do anything with this really, just to check if it's valid
      } catch (err) {
        if (!axios.isAxiosError(err)) {
          console.error(err);
          return;
        }

        if (err.response?.status === 401) {
          // The user is no longer logged in (hence 401)
          console.log("Session is not authenticated:", err);
        } else {
          // A network or some other error occurred
          console.error(err);
        }

        // Remove the session / log the user out.
        dispatch({ type: AuthActionType.SignOut });
      }
    };

    if (!state.session) {
      return;
    }

    syncSession(state.session);
  }, [state.session]);

  const signOut = async () => {
    // Can't sign out if there isn't already a session. Token can be undefined
    // if on web
    if (!state.session?.session) {
      return;
    }

    dispatch({ type: AuthActionType.SignOut });
  };

  const logIn = async (auth: KratosSessionWithToken) => {
    dispatch({ type: AuthActionType.LogIn, session: auth });
  };

  return (
    <AuthContext.Provider
      value={{
        signOut,
        logIn,
        state: {
          isAuthenticated: Boolean(state.session?.session),
          isLoading: state.isLoading,
          session: state.session,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
