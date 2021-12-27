import * as React from "react";
import Register from "../components/auth/Register";

import { RootStackScreenProps } from "../types";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  return <Register />;
}
