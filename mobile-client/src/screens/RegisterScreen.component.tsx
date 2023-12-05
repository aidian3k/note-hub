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
  Spinner,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { registerValidationSchema } from "../validators/RegisterScreen.validation";
import { UserRegistrationRequest } from "../model/auth/UserRegistrationRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorText } from "@gluestack-ui/themed/build/components/FormControl/styled-components";
import { authenticationService } from "../api/apiService";

export const RegisterScreen: FC = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRegistrationRequest>({
    resolver: yupResolver(registerValidationSchema),
  });

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleUserCreation = async (
    userRegistrationRequest: UserRegistrationRequest
  ) => {
    try {
      setLoading(true);
      await authenticationService.post<void>(
        "/api/auth/register",
        userRegistrationRequest
      );

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
                <ToastTitle>Registration success</ToastTitle>
                <ToastDescription>
                  Successfully registered an account!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });

      navigation.navigate("Login");
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
                <ToastTitle>Registration error</ToastTitle>
                <ToastDescription>
                  An unexpected error has occured during registration. Please
                  try again later
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
            <Input isInvalid={!!errors.email}>
              <InputField onChangeText={(email) => setValue("email", email)} />
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
              First name
            </Text>
            <Input isInvalid={!!errors.firstName}>
              <InputField
                onChangeText={(firstName) => setValue("firstName", firstName)}
              />
            </Input>
            {errors.firstName && (
              <ErrorText>{errors.firstName.message}</ErrorText>
            )}
          </VStack>
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Last name
            </Text>
            <Input isInvalid={!!errors.lastName}>
              <InputField
                onChangeText={(lastName) => setValue("lastName", lastName)}
              />
            </Input>
            {errors.lastName && (
              <ErrorText>{errors.lastName.message}</ErrorText>
            )}
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
                onChangeText={(password) => setValue("password", password)}
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
          <VStack space={"xs"}>
            <Text
              color="$text500"
              lineHeight="$xl"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Confirm password
            </Text>
            <Input isInvalid={!!errors.confirmationPassword}>
              <InputField
                type={showPassword ? "text" : "password"}
                onChangeText={(text) => setValue("confirmationPassword", text)}
              />
              <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            {errors.confirmationPassword && (
              <ErrorText>{errors.confirmationPassword.message}</ErrorText>
            )}
          </VStack>
          <Box justifyContent={"center"} marginTop={20}>
            <Button
              style={{ borderRadius: 20 }}
              onPress={handleSubmit(handleUserCreation)}
            >
              <HStack space={"md"}>
                <ButtonText style={{ fontSize: 20, color: "white" }}>
                  Register an account
                </ButtonText>
                {loading && <Spinner />}
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
