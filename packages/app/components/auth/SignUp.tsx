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
} from "native-base";
import {
  SignupMutationVariables,
  useSignupMutation,
} from "../../client/reactQuery";
import { client } from "../../client/graphqlClient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "./AuthProvider";

export default function Register() {
  const navigation = useNavigation();

  const authCtx = useAuthContext();
  const { mutateAsync, status, isLoading } = useSignupMutation(client);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupMutationVariables>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupMutationVariables) => {
    const res = await mutateAsync({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!res.signup?.token) {
      throw new Error("failed to login, missing token");
    }

    authCtx?.logIn(res.signup.token);

    console.log(data);
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
          <FormControl isRequired>
            <FormControl.Label>Username</FormControl.Label>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  ref={ref}
                  placeholder="bun"
                />
              )}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  ref={ref}
                  placeholder="bun@example.com"
                  type="email"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  ref={ref}
                  type="password"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="blue"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Register
          </Button>
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
