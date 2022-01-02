import * as React from "react";
import {
  Box,
  Center,
  Heading,
  VStack,
  HStack,
  Input,
  FormControl,
  Link,
  Button,
  Text,
  Spacer,
  WarningOutlineIcon,
} from "native-base";
import {
  useLogInMutation,
  LogInMutationVariables,
} from "../../client/reactQuery";
import { client } from "../../client/graphqlClient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import useToastAlert from "../../hooks/useToastAlert";
import { useAuthContext } from "./AuthProvider";

export default function Login() {
  const navigation = useNavigation();

  const authCtx = useAuthContext();
  const toast = useToastAlert();
  const { mutateAsync, status, isLoading } = useLogInMutation(client);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LogInMutationVariables>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LogInMutationVariables) => {
    let res;
    try {
      res = await mutateAsync({
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      });
    } catch (e) {
      toast.show({
        id: "login:mutationfailed",
        status: "error",
        title: "Login failed",
        description: "Check if your username / email and password is correct",
      });

      return;
    }

    if (!res?.login?.token) {
      toast.show({
        id: "login:notoken",
        status: "error",
        title: "Login failed",
        description: "Missing token, try this again?",
      });

      return;
    }

    authCtx?.logIn(res.login.token);

    console.log(data);
  };

  console.log(errors);

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
        <Heading
          size="xl"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Hi there!
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          size="xs"
        >
          Please sign in to continue
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={!!errors.emailOrUsername}>
            <FormControl.Label>Username or email</FormControl.Label>
            <Controller
              control={control}
              name="emailOrUsername"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your email or username",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="bun@example.com"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.emailOrUsername?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  type="password"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.password?.message}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "blue.400",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="blue"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid}
          >
            Sign in
          </Button>
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
        </VStack>
      </Box>
    </Center>
  );
}
