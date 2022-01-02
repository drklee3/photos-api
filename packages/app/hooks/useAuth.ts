import {
  useEffect,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from "react";
import * as React from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const AuthContext = createContext<AuthContextData>({
  logIn: (token: string) => {},
  signOut: () => {},
  state: {
    isLoading: true,
    isLoggedIn: false,
    token: "",
  },
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export enum AuthActionType {
  RestoreToken,
  LogIn,
  SignOut,
}

type AuthAction =
  | {
      type: AuthActionType.RestoreToken;
      token: string | null;
      isLoggedIn: boolean;
    }
  | { type: AuthActionType.LogIn; token: string }
  | { type: AuthActionType.SignOut };

export interface AuthActionState {
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export interface AuthContextData {
  logIn: (token: string) => void;
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
        isLoggedIn: action.isLoggedIn,
      };
    case AuthActionType.LogIn:
      return {
        ...prevState,
        isLoggedIn: true,
        token: action.token,
      };
    case AuthActionType.SignOut:
      return {
        ...prevState,
        isLoggedIn: false,
        token: null,
      };
  }
}

export default function useAuth(): AuthContextData {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isLoggedIn: false,
    token: null,
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      if (Platform.OS !== "web") {
        try {
          userToken = await SecureStore.getItemAsync("userToken");
        } catch (e) {
          // Restoring token failed
          console.log("Failed to restore user token");
        }
      }

      let loggedIn = false;
      try {
        loggedIn = (await AsyncStorage.getItem("loggedIn")) === "true";
      } catch (e) {
        console.error("failed to get loggedIn state");
      }

      // This might be signed in or not, just loads if there is an existing token
      // then sets if we are currently logged in
      dispatch({
        type: AuthActionType.RestoreToken,
        token: userToken || null,
        isLoggedIn: loggedIn,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      logIn: async (token: string) => {
        if (Platform.OS !== "web") {
          await SecureStore.setItemAsync("userToken", token);
        }

        try {
          await AsyncStorage.setItem("loggedIn", "true");
        } catch (e) {
          console.error("failed to save loggedIn state");
        }

        dispatch({ type: AuthActionType.LogIn, token });
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
