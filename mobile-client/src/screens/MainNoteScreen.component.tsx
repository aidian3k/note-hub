import React, { FC, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  AddIcon,
  Button,
  ButtonIcon,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@gluestack-ui/themed";
import { NoteComponent } from "../components/Note.component";
import { useNavigation } from "@react-navigation/native";

export const MainNoteScreen: FC = () => {
  const [isSearchingEnabled, setIsSearchingEnabled] = useState<boolean>(false);
  const navigation = useNavigation();

  const getCurrentDateString: () => string = () => {
    const currentDate: Date = new Date();

    return `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
  };

  const noteJsxElements = () => {
    const noteElements = [];

    for (let i = 0; i < 10; i += 2) {
      noteElements.push(
        <HStack space={"sm"} style={{ margin: 5, justifyContent: "center" }}>
          <NoteComponent />
          <NoteComponent />
        </HStack>
      );
    }

    if (10 % 2 !== 0) {
      noteElements.push(
        <HStack space={"sm"} style={{ margin: 5, justifyContent: "center" }}>
          <NoteComponent />
        </HStack>
      );
    }

    return noteElements;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3b3c36" }}>
      <HStack
        style={{
          width: "100%",
          justifyContent: "space-evenly",
          paddingHorizontal: 15,
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Welcome back Adrian
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          {getCurrentDateString()}
        </Text>
      </HStack>
      <HStack
        style={{
          width: "100%",
          justifyContent: "space-between",
          paddingTop: 10,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Note-Hub
        </Text>
        <HStack
          space={"sm"}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            width: "65%",
          }}
        >
          {isSearchingEnabled ? (
            <Input
              style={{
                width: "70%",
              }}
              variant={"outline"}
            >
              <InputSlot pl="$3">
                <InputIcon as={SearchIcon} style={{ color: "white" }} />
              </InputSlot>
              <InputField
                placeholder="Search note"
                style={{ color: "white" }}
              />
            </Input>
          ) : (
            <View style={{ width: "70%" }}></View>
          )}
          <Button
            borderRadius="$full"
            size="lg"
            p="$3.5"
            bg="$indigo600"
            borderColor="$indigo600"
            onPress={() => setIsSearchingEnabled(!isSearchingEnabled)}
          >
            <ButtonIcon as={SearchIcon} />
          </Button>
        </HStack>
      </HStack>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 10,
          marginHorizontal: 10,
          paddingBottom: 10,
        }}
      >
        {noteJsxElements()}
      </ScrollView>
      <Button
        size="lg"
        p="$3.5"
        bg="$indigo600"
        borderRadius={"$full"}
        borderColor="$indigo600"
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonIcon as={AddIcon} />
      </Button>
    </SafeAreaView>
  );
};
