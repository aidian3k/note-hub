import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiService, authenticationService } from "../api/apiService";
import { Note } from "../model/note/Note";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../redux/user-slice/user.slice";

export const MainNoteScreen: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [nameOfUser, setUserName] = useState<string>("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const getCurrentDateString: () => string = () => {
    const currentDate: Date = new Date();

    return `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
  };

  const getAllUserNotes = async () => {
    try {
      await apiService.get<Note[]>("/api/note").then((result) => {
        setUserNotes(result.data.reverse());
      });
    } catch (erorr) {
      console.log(error);
    }
  };

  const handleUserNoteSearch = async () => {
    try {
      await apiService
        .get<Note[]>("/api/note/search-word", {
          params: { searchWord: searchText },
        })
        .then((result) => {
          setUserNotes(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = async () => {
    try {
      await apiService.get("/api/profile").then((result) => {
        setUserName(result.data.username);
      });
    } catch (erorr) {
      console.log(error);
    }
  };

  const noteJsxElements = () => {
    const noteElements = [];

    for (let i = 0; i < userNotes.length - 1 && userNotes.length > 1; i += 2) {
      const currentNote: Note = userNotes[i];
      const nextNote: Note = userNotes[i + 1];

      noteElements.push(
        <HStack space={"sm"} style={{ margin: 5, justifyContent: "center" }}>
          <NoteComponent note={currentNote} />
          <NoteComponent note={nextNote} />
        </HStack>
      );
    }

    if (userNotes.length % 2 !== 0) {
      noteElements.push(
        <HStack space={"sm"} style={{ margin: 5, justifyContent: "center" }}>
          <NoteComponent note={userNotes[userNotes.length - 1]} />
        </HStack>
      );
    }

    return noteElements;
  };

  const handleLogoutUser = async () => {
    try {
      await authenticationService
        .post<void>("/api/auth/logout")
        .then((result) => {
          dispatch(clearUserDetails());
          navigation.navigate("Login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserNotes();
    getUserName();
  }, [navigation, route]);

  useEffect(() => {
    handleUserNoteSearch();
  }, [searchText]);

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
          Welcome back {nameOfUser}
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
        <Button
          size="lg"
          p="$3.5"
          bg="$indigo600"
          borderRadius={"$full"}
          borderColor="$indigo600"
          onPress={handleLogoutUser}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Logout
          </Text>
        </Button>
        <HStack
          space={"sm"}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            width: "65%",
          }}
        >
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
              onChangeText={(text) => setSearchText(text)}
            />
          </Input>
          <Button
            borderRadius="$full"
            size="lg"
            p="$3.5"
            bg="$indigo600"
            borderColor="$indigo600"
            onPress={() => handleUserNoteSearch()}
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
        onPress={() => navigation.navigate("edit-note")}
      >
        <ButtonIcon as={AddIcon} />
      </Button>
    </SafeAreaView>
  );
};
