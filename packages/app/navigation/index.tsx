/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import {
  Box,
  Heading,
  Pressable,
  Center,
  HStack,
  Text,
  useColorModeValue,
} from "native-base";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PhotosScreen from "../screens/PhotosScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuthContext } from "../components/auth/AuthProvider";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {
    state: { isLoading, isAuthenticated },
  } = useAuthContext();

  if (isLoading) {
    // Trying to restore token
    return <Box>Loading...</Box>;
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? MainScreens() : AuthScreens()}
    </Stack.Navigator>
  );
}

function AuthScreens() {
  return (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </>
  );
}

function MainScreens() {
  return (
    <>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Photos"
      tabBar={(props) => <TabBar {...props} />}
    >
      <BottomTab.Screen
        name="Photos"
        component={PhotosScreen}
        options={({ navigation }: RootTabScreenProps<"Photos">) => ({
          title: "Photos",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="photo-library" size={size} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Albums"
        component={TabTwoScreen}
        options={{
          title: "Albums",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="photo-album" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <HStack
      borderTopWidth={1}
      borderTopColor={useColorModeValue("gray.100", "gray.800")}
      alignItems="center"
      safeAreaBottom
      shadow={6}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: [],
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            cursor="pointer"
            opacity={isFocused ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Center>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: "white",
                  focused: isFocused,
                  size: 30,
                })}
              <Text color="white" fontSize="sm" mt="1">
                {label}
              </Text>
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons style={{ marginBottom: -3 }} {...props} />;
}
