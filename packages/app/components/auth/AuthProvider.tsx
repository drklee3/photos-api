import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  deleteLocalAuthenticatedSession,
  sessionStateReducer,
  getLocalAuthenticatedSession,
  AuthActionType,
  SessionState,
  KratosSessionWithToken,
  setLocalAuthenticatedSession,
  AuthContextData,
} from "./helpers/state";
import axios, { AxiosError } from "axios";
import { newKratosSdk } from "./helpers/sdk";
import { Session as KratosSession } from "@ory/kratos-client";
import { ProjectContext } from "./ProjectProvider";

export const AuthContext = createContext<AuthContextData>({
  logIn: () => {},
  signOut: () => {},
  state: {
    isLoading: true,
    didFetch: false,
    isAuthenticated: false,
    session: null,
  },
});

interface AuthContextProps {
  children: ReactNode;
}

export default ({ children }: AuthContextProps) => {
  const { project } = useContext(ProjectContext);

  const [state, dispatch] = useReducer(sessionStateReducer, {
    session: null,
    isLoading: true,
    didFetch: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      const session = await getLocalAuthenticatedSession();

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

        // Logged in!
        dispatch({
          type: AuthActionType.LogIn,
          session: {
            // New session data
            session: session,
            // Reuse old token
            session_token: auth.session_token,
          },
        });
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
    // Can't sign out if there isn't already a session token
    if (!state.session?.session_token) {
      return;
    }

    const sdk = newKratosSdk(project);
    await sdk.submitSelfServiceLogoutFlowWithoutBrowser({
      session_token: state.session?.session_token,
    });

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
          didFetch: state.isLoading,
          isAuthenticated: !!state.session?.session_token,
          isLoading: state.isLoading,
          session: state.session,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
