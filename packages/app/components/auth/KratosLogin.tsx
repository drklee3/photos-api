// This file renders the login screen.
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from "@ory/kratos-client";

import { SelfServiceFlow } from "./SelfServiceFlow";
import { newKratosSdk } from "./helpers/sdk";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { handleFormSubmitError } from "./helpers/form";
import ProjectPicker from "./ProjectPicker";
import { ProjectContext } from "./ProjectProvider";
import { SessionContext } from "./helpers/state";
import { Box, Center, Heading, Link, Text } from "native-base";

interface Params {
  refresh: boolean;
  aal: string;
}

interface RouteOptions {
  key: string;
  name: string;
  path?: string | undefined;
  params: Params;
}

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteOptions>();

  const { project } = useContext(ProjectContext);
  const { setSession, session, sessionToken } = useContext(AuthContext);
  const [flow, setFlow] = useState<SelfServiceLoginFlow | undefined>(undefined);

  const initializeFlow = () =>
    newKratosSdk(project)
      .initializeSelfServiceLoginFlowWithoutBrowser(
        route.params?.refresh,
        route.params?.aal,
        sessionToken
      )
      .then((response) => {
        const { data: flow } = response;

        // The flow was initialized successfully, let's set the form data:
        setFlow(flow);
      })
      .catch(console.error);

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
  const onSubmit = (payload: SubmitSelfServiceLoginFlowBody) =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceLoginFlow(flow.id, sessionToken, payload)
          .then(({ data }) => Promise.resolve(data as SessionContext))
          .then(setSession)
          .catch(handleFormSubmitError(setFlow, initializeFlow))
      : Promise.resolve();

  return (
    <Box>
      <Box>
        <Heading>Sign in to your account</Heading>
        <SelfServiceFlow flow={flow} onSubmit={onSubmit} />
      </Box>

      <Center mt="6">
        <Text
          fontSize="sm"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
        >
          Don't have an account?
        </Text>
        <Link
          _text={{
            color: "blue.400",
            fontWeight: "medium",
            fontSize: "sm",
            textDecoration: "none",
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign up
        </Link>
      </Center>

      <ProjectPicker />
    </Box>
  );
};

export default Login;
