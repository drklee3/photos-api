import {
  useEffect,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from "react";
import * as React from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext<AuthContextData | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export enum AuthActionType {
  RestoreToken,
  SignIn,
  SignOut,
}

type AuthAction =
  | { type: AuthActionType.RestoreToken; token: string | null }
  | { type: AuthActionType.SignIn; token: string }
  | { type: AuthActionType.SignOut };

export interface AuthActionState {
  token: string | null;
  isLoading: boolean;
  isSignedIn: boolean;
}

export interface AuthContextData {
  signIn: (token: string) => void;
  signOut: () => void;
  state: AuthActionState;
}

function authReducer(
  prevState: AuthActionState,
  action: AuthAction
): AuthActionState {
  switch (action.type) {
    case AuthActionType.RestoreToken:
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
      };
    case AuthActionType.SignIn:
      return {
        ...prevState,
        isSignedIn: false,
        token: action.token,
      };
    case AuthActionType.SignOut:
      return {
        ...prevState,
        isSignedIn: true,
        token: null,
      };
  }
}

export default function useAuth(): AuthContextData {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignedIn: false,
    token: null,
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
        console.log("Failed to restore user token");
      }

      // This might be signed in or not, just loads if there is an existing token
      dispatch({ type: AuthActionType.RestoreToken, token: userToken || null });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: AuthActionType.SignIn, token });
      },
      signOut: () => dispatch({ type: AuthActionType.SignOut }),
    }),
    []
  );

  return {
    ...authContext,
    state,
  };
}
