import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
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

export const RegisterScreen: FC = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9314b8" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#9314b8",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 32,
            includeFontPadding: true,
            color: "white",
          }}
        >
          We are glad you are here!
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 32,
            includeFontPadding: true,
            color: "white",
          }}
        >
          Create notes with us!
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderTopRightRadius: 85,
          borderTopLeftRadius: 85,
          paddingLeft: 10,
        }}
      >
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
              fontWeight: "bold",
              fontSize: 32,
              includeFontPadding: true,
              color: "black",
              textAlign: "center",
            }}
          >
            Sign up
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
              First name
            </Text>
            <Input>
              <InputField />
            </Input>
          </VStack>
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Last name
            </Text>
            <Input>
              <InputField />
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
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Confirm password
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
                  Register an account
                </ButtonText>
              </HStack>
            </Button>
          </Box>
          <Text
            style={{ textAlign: "center", textAlign: "center", fontSize: 15 }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{ fontWeight: "bold", textAlign: "center", fontSize: 15 }}
            >
              Login to your account!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
