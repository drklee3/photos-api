// This file handles the authentication state.

import { Session as KratosSession } from "@ory/kratos-client";
import * as SecureStore from "expo-secure-store";
import AsyncStore from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// The key under which the session is being stored
const userSessionKey = "user_session";

export interface KratosSessionWithToken {
  // The session token, undefined if this is on web or if the user is not logged in
  // Session token is not needed on web as it is stored in cookies and should
  // not be accessible via js
  session_token?: string;

  // The session itself, undefined only if user is not logged in.
  session: KratosSession;
}

export interface SessionState {
  session: KratosSessionWithToken | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export enum AuthActionType {
  RestoreSession,
  LogIn,
  SignOut,
}

type AuthAction =
  | {
      type: AuthActionType.RestoreSession;
      session: KratosSessionWithToken | null;
    }
  | { type: AuthActionType.LogIn; session: KratosSessionWithToken }
  | { type: AuthActionType.SignOut };

export interface AuthContextData {
  logIn: (session: KratosSessionWithToken) => void;
  signOut: () => void;

  state: SessionState;
}

export function sessionStateReducer(
  prevState: SessionState,
  action: AuthAction
): SessionState {
  switch (action.type) {
    case AuthActionType.RestoreSession:
      return {
        ...prevState,
        session: action.session,
        isLoading: false,
        isAuthenticated: action.session !== null,
      };
    case AuthActionType.LogIn:
      return {
        ...prevState,
        isAuthenticated: true,
        session: action.session,
      };
    case AuthActionType.SignOut:
      return {
        ...prevState,
        isAuthenticated: false,
        session: null,
      };
  }
}

// getAuthenticatedSession returns a promise with the session of the authenticated user, if the
// user is authenticated or null is the user is not authenticated.
//
// If an error (e.g. network error) occurs, the promise rejects with an error.
export async function getLocalAuthenticatedSession(): Promise<KratosSessionWithToken | null> {
  let sessionStr;
  if (Platform.OS !== "web") {
    // We can use SecureStore if not on web instead!
    sessionStr = await SecureStore.getItemAsync(userSessionKey);
  } else {
    sessionStr = await AsyncStore.getItem(userSessionKey);
  }

  if (!sessionStr) {
    return null;
  }

  return JSON.parse(sessionStr);
}

// Sets the session.
export const setLocalAuthenticatedSession = async (
  session: KratosSessionWithToken
): Promise<void> => {
  if (!session) {
    return deleteLocalAuthenticatedSession();
  }

  if (Platform.OS === "web") {
    // SecureStore is not available on the web platform. We need to use AsyncStore
    // instead.
    return AsyncStore.setItem(userSessionKey, JSON.stringify(session));
  }

  return (
    SecureStore
      // The SecureStore only supports strings so we encode the session.
      .setItemAsync(userSessionKey, JSON.stringify(session))
  );
};

// Removes the session from the store.
export const deleteLocalAuthenticatedSession = () => {
  if (Platform.OS === "web") {
    // SecureStore is not available on the web platform. We need to use AsyncStore
    // instead.
    return AsyncStore.removeItem(userSessionKey);
  }

  return SecureStore.deleteItemAsync(userSessionKey);
};
