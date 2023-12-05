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
  Spinner,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { UserLoginRequest } from "../model/auth/UserLoginRequest";
import { loginValidationSchema } from "../validators/LoginScreen.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorText } from "@gluestack-ui/themed/build/components/FormControl/styled-components";
import { authenticationService } from "../api/apiService";
import { User } from "../model/auth/User";
import { setUserDetails } from "../redux/user-slice/user.slice";
import { useDispatch } from "react-redux";

export const LoginScreen: FC = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserLoginRequest>({
    resolver: yupResolver(loginValidationSchema),
  });

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLoginRequest = async (userLoginRequest: UserLoginRequest) => {
    try {
      setLoading(true);
      console.log(userLoginRequest);
      await authenticationService
        .post<User>("/api/auth/login", {
          username: userLoginRequest.email,
          password: userLoginRequest.password,
        })
        .then((result) => {
          dispatch(setUserDetails(result.data));
        });

      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>Login success</ToastTitle>
                <ToastDescription>Successfully logged in!</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      navigation.navigate("note-main-screen");
    } catch (error) {
      console.log(error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>Login error</ToastTitle>
                <ToastDescription>
                  An error occurred when logging in!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
            <Input isInvalid={!!errors.email}>
              <InputField onChangeText={(text) => setValue("email", text)} />
              <InputSlot pr="$3">
                <InputIcon as={PhoneIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </VStack>
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Password
            </Text>
            <Input isInvalid={!!errors.password}>
              <InputField
                type={showPassword ? "text" : "password"}
                onChangeText={(text) => setValue("password", text)}
              />
              <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </VStack>
          <Box justifyContent={"center"} marginTop={20}>
            <Button
              style={{ borderRadius: 20 }}
              onPress={handleSubmit(handleLoginRequest)}
            >
              <HStack space={"md"}>
                <ButtonText style={{ fontSize: 20, color: "white" }}>
                  Login
                </ButtonText>
                {loading && <Spinner />}
              </HStack>
            </Button>
          </Box>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            You do not have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ fontWeight: "bold", textAlign: "center", fontSize: 15 }}
            >
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
