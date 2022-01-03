import { SelfServiceLogoutUrl } from "@ory/kratos-client";
import { useContext, useState } from "react";
import { Platform } from "react-native";
import useToastAlert from "../../hooks/useToastAlert";
import Button, { ButtonType } from "../Button";
import { useAuthContext } from "./AuthProvider";
import { newKratosSdk } from "./helpers/sdk";
import { ProjectContext } from "./ProjectProvider";

export default function LogOut() {
  const { project } = useContext(ProjectContext);
  const {
    signOut,
    state,
    state: { session, isAuthenticated },
  } = useAuthContext();

  console.log(state);

  const isWeb = Platform.OS === "web";
  const toast = useToastAlert();

  const onPress = async () => {
    try {
      const sdk = newKratosSdk(project);

      if (isWeb) {
        const res = await sdk.createSelfServiceLogoutFlowUrlForBrowsers();

        await sdk.submitSelfServiceLogoutFlow(res.data.logout_token);
        signOut();
        return;
      }

      if (!session?.session_token) {
        toast.show({
          title: "Cannot log out",
          description: "You aren't signed in!",
          status: "warning",
        });

        return;
      }

      await sdk.submitSelfServiceLogoutFlowWithoutBrowser({
        session_token: session.session_token,
      });

      signOut();
    } catch (e) {
      toast.show({
        title: "Failed to log out",
        description: `${e}`,
        status: "error",
      });
    }
  };

  return (
    <Button
      type={ButtonType.Primary}
      onPress={onPress}
      disabled={!isAuthenticated}
      isDisabled={!isAuthenticated}
    >
      Log Out
    </Button>
  );
}
