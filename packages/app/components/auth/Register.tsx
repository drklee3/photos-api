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
import { useAuthContext } from "../../hooks/useAuth";
import { useSignupMutationMutation } from "../../client/reactQuery";
import { client } from "../../client/graphqlClient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  const authCtx = useAuthContext();
  const { mutateAsync, status, isLoading } = useSignupMutationMutation(client);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await mutateAsync({
      username: data.username,
      email: data.emailOrUsername,
      password: data.password,
    });

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
          fontWeight="medium"
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
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
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
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder="bun@example.com"
                  type="email"
                />
              )}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  type="password"
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
