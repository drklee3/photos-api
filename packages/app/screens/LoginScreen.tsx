import * as React from "react";
import Login from "../components/auth/Login";

import { RootStackScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  return <Login />;
}
