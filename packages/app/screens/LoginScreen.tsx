import * as React from "react";
import KratosLogin from "../components/auth/KratosLogin";

import { RootStackScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  return <KratosLogin />;
}
