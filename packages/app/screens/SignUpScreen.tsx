import * as React from "react";
import SignUp from "../components/auth/SignUp";

import { RootStackScreenProps } from "../types";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  return <SignUp />;
}
