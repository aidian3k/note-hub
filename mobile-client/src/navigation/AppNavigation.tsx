import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserSliceState } from "../redux/user-slice/user-slice.type";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SignInScreen } from "../screens/SignInScreen.component";
import { SignUpScreen } from "../screens/SignUpScreen.component";

const UnauthenticatedStack = createStackNavigator();
const AppNavigator: React.FC = () => {
  const userSliceState: UserSliceState = useSelector(
    (state: RootState) => state.user
  );

  if (userSliceState.userDetails) {
    return (
      <View>
        <Text>Authenticated</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <UnauthenticatedStack.Navigator
        initialRouteName={"Register"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <UnauthenticatedStack.Screen
          name={"Login"}
          component={SignInScreen}
          initialParams={{ userSliceState }}
        />
        <UnauthenticatedStack.Screen
          name={"Register"}
          component={SignUpScreen}
          initialParams={{ userSliceState }}
        />
      </UnauthenticatedStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
