import React, { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Box,
  Button,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  PhoneIcon,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen: FC = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <SafeAreaView style={signInStyle.mainContainer}>
      <View style={signInStyle.welcomeToAppContainer}>
        <Text style={signInStyle.welcomeHeadingStyle}>Welcome to Note-Hub</Text>
      </View>
      <View style={signInStyle.loginContainer}>
        <View
          style={{
            width: "90%",
            flex: 1,
            gap: 4,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...signInStyle.welcomeHeadingStyle,
              color: "black",
              textAlign: "center",
            }}
          >
            Sign in
          </Text>
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Email
            </Text>
            <Input>
              <InputField />
              <InputSlot pr="$3">
                <InputIcon as={PhoneIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Password
            </Text>
            <Input>
              <InputField type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
          </VStack>
          <Box justifyContent={"center"} marginTop={20}>
            <Button style={{ borderRadius: 20 }}>
              <HStack space={"md"}>
                <ButtonText style={{ fontSize: 20, color: "white" }}>
                  Login
                </ButtonText>
              </HStack>
            </Button>
          </Box>
          <Text
            style={{ textAlign: "center", textAlign: "center", fontSize: 15 }}
          >
            You do not have an acoount?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ fontWeight: "bold", textAlign: "center", fontSize: 15 }}
            >
              {" "}
              Create an account!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const signInStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#9314b8",
  },
  welcomeToAppContainer: {
    flex: 1,
    backgroundColor: "#9314b8",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  loginContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopRightRadius: 85,
    borderTopLeftRadius: 85,
    paddingLeft: 10,
  },
  welcomeHeadingStyle: {
    fontWeight: "bold",
    fontSize: 32,
    includeFontPadding: true,
    color: "white",
  },
});
