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
import { AuthContext, useAuthContext } from "./AuthProvider";
import { handleFormSubmitError } from "./helpers/form";
import ProjectPicker from "./ProjectPicker";
import axios from "axios";
import { ProjectContext } from "./ProjectProvider";
import { KratosSessionWithToken } from "./helpers/state";
import { Box, Center, Heading, Link, Text } from "native-base";
import useToastAlert from "../../hooks/useToastAlert";

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
  const { logIn, signOut, state } = useAuthContext();
  const [flow, setFlow] = useState<SelfServiceLoginFlow | undefined>(undefined);

  const toast = useToastAlert();

  const initializeFlow = async () => {
    try {
      const res = await newKratosSdk(
        project
      ).initializeSelfServiceLoginFlowWithoutBrowser(
        route.params?.refresh,
        route.params?.aal,
        state.session?.session_token
      );

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
  const onSubmit = async (payload: SubmitSelfServiceLoginFlowBody) => {
    if (!flow) {
      return;
    }

    try {
      const res = await newKratosSdk(project).submitSelfServiceLoginFlow(
        flow.id,
        state.session?.session_token,
        payload
      );

      if (!res.data.session_token) {
        console.error("missing session token");
        return;
      }

      logIn({
        session: res.data.session,
        session_token: res.data.session_token,
      });
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        console.error(err);
        return;
      }

      await handleFormSubmitError(
        setFlow,
        initializeFlow,
        toast.show,
        signOut
      )(err);
    }
  };

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
