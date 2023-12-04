import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserSliceState } from "../redux/user-slice/user-slice.type";
import { NavigationContainer } from "@react-navigation/native";
import { MainNoteScreen } from "../screens/MainNoteScreen.component";
import { ReadNoteScreen } from "../screens/ReadNoteScreen.component";

const UnauthenticatedStack = createStackNavigator();
const AuthorizatedStack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const userSliceState: UserSliceState = useSelector(
    (state: RootState) => state.user
  );

  if (!userSliceState.userDetails) {
    return (
      <NavigationContainer>
        <AuthorizatedStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"note-main-screen"}
        >
          <AuthorizatedStack.Screen
            name={"note-main-screen"}
            component={MainNoteScreen}
            initialParams={{ userSliceState }}
          />
          <AuthorizatedStack.Screen
            name={"read-note"}
            component={ReadNoteScreen}
            initialParams={{ userSliceState }}
          />
        </AuthorizatedStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <UnauthenticatedStack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <UnauthenticatedStack.Screen
          name={"Login"}
          component={LoginScreen}
          initialParams={{ userSliceState }}
        />
        <UnauthenticatedStack.Screen
          name={"Register"}
          component={RegisterScreen}
          initialParams={{ userSliceState }}
        />
      </UnauthenticatedStack.Navigator>
    </NavigationContainer>
  );
};
