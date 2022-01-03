// This file renders the sign up screen.
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/kratos-client";

import { SelfServiceFlow } from "./SelfServiceFlow";
import { newKratosSdk } from "./helpers/sdk";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext, useAuthContext } from "./AuthProvider";
import { handleFormSubmitError } from "./helpers/form";
import ProjectPicker from "./ProjectPicker";
import axios from "axios";
import { ProjectContext } from "./ProjectProvider";
import Loader from "./Loader";
import { Box, Center, Heading, Link, Text, VStack } from "native-base";
import useToastAlert from "../../hooks/useToastAlert";
import { Platform } from "react-native";
import { isAxiosError } from "../../utils/isAxiosError";
import LogOut from "./LogOut";

export default function Login() {
  const navigation = useNavigation();
  const isWeb = Platform.OS === "web";

  const { project } = useContext(ProjectContext);
  const { logIn } = useAuthContext();
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow | undefined>(
    undefined
  );

  const toast = useToastAlert();

  const initializeFlow = async () => {
    try {
      const sdk = newKratosSdk(project);
      const res = isWeb
        ? await sdk.initializeSelfServiceRegistrationFlowForBrowsers()
        : await sdk.initializeSelfServiceRegistrationFlowWithoutBrowser();

      // Set form data
      setFlow(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // When the component is mounted, we initialize a new use login flow:
  useFocusEffect(
    useCallback(() => {
      initializeFlow();

      return () => {
        setFlow(undefined);
      };
    }, [project])
  );

  // This will update the login flow with the user provided input:
  const onSubmit = async (payload: SubmitSelfServiceRegistrationFlowBody) => {
    if (!flow) {
      return;
    }

    try {
      const res = await newKratosSdk(project).submitSelfServiceRegistrationFlow(
        flow.id,
        payload
      );

      // Session token is not provided on web
      if (!res.data.session) {
        console.error(
          "missing session, ORY Kratos should issue session automatically"
        );
        return;
      }

      if (!res.data.session_token && !isWeb) {
        console.error("missing session token on mobile");
      }

      console.log(res.data);

      logIn({
        session: res.data.session,
        session_token: res.data.session_token,
      });
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        console.error("not axios error", err);
        return;
      }

      await handleFormSubmitError(
        setFlow,
        initializeFlow,
        toast.show
        // No sign out here since there isn't a session to sign out
      )(err);
    }
  };

  return (
    <Center justifyContent="center" flex={1}>
      <Box
        safeArea
        p="8"
        py="12"
        w="90%"
        mb="24"
        maxW="380"
        bg="gray.900"
        borderWidth={1}
        borderColor="gray.800"
        rounded="xl"
      >
        <LogOut />
        <Heading
          size="xl"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome!
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          size="xs"
        >
          Make a new account
        </Heading>

        <VStack space={3} mt="5">
          <Loader visible={flow !== undefined}>
            <SelfServiceFlow flow={flow} onSubmit={onSubmit} />
          </Loader>
          <Center mt="6">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Already have an account?
            </Text>
            <Link
              _text={{
                color: "blue.400",
                fontWeight: "medium",
                fontSize: "sm",
                textDecoration: "none",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Log in
            </Link>
          </Center>
        </VStack>
      </Box>
    </Center>
  );
}
