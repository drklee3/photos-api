import * as React from "react";
import KratosSignUp from "../components/auth/KratosSignUp";

import { RootStackScreenProps } from "../types";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  return <KratosSignUp />;
}
