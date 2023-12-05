import React, { FC, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  Spinner,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { apiService } from "../api/apiService";
import { Note } from "../model/note/Note";

export enum FormType {
  EDIT,
  CREATE,
}

export const EditNoteScreen: FC = () => {
  const [note, setNote] = useState<Note>({
    content: "",
    title: "",
    id: -1,
    modificationDate: [],
  });
  const navigation = useNavigation();
  const route = useRoute();
  const [formType, setFormType] = useState<FormType>(FormType.CREATE);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const makeInitialNoteUpdateCall = async (noteId?: number) => {
    try {
      setLoading(true);

      await apiService.get<Note>(`/api/note/${noteId}`).then((result) => {
        setNote(result.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    try {
      setLoading(true);
      let noteDTO: Note;
      if (formType === FormType.CREATE) {
        await apiService
          .post<Note>("/api/note", { title: note.title, content: note.content })
          .then((result) => {
            setNote(result.data);
            noteDTO = result.data;
          });
      } else {
        await apiService
          .put<Note>("/api/note", {
            id: note.id,
            title: note.title,
            content: note.content,
          })
          .then((result) => {
            setNote(result.data);
            noteDTO = result.data;
          });
      }
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>
                  Note {`${FormType.EDIT === formType ? "updated" : "created"}`}{" "}
                  successfully
                </ToastTitle>
                <ToastDescription>
                  The note with title {note.title}{" "}
                  {`${FormType.EDIT === formType ? "updated" : "created"}`}{" "}
                  successfully!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });

      if (formType === FormType.EDIT) {
        navigation.navigate("read-note", { noteId: note.id });
      } else {
        navigation.navigate("note-main-screen");
      }
    } catch (error) {
      console.log(error);

      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>
                  Note {`${FormType.EDIT === formType ? "update" : "creation"}`}{" "}
                  error
                </ToastTitle>
                <ToastDescription>
                  An error occurred when{" "}
                  {`${FormType.EDIT === formType ? "updating" : "creating"}`}{" "}
                  note!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (!!route.params && !!route.params?.noteId) {
      setFormType(FormType.EDIT);
      // @ts-ignore
      makeInitialNoteUpdateCall(route.params?.noteId);
      return;
    }

    setFormType(FormType.CREATE);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3b3c36" }}>
      <View style={{ padding: 15 }}>
        <Button
          size="md"
          p="$3.5"
          bg="$indigo600"
          borderRadius={"$full"}
          borderColor="$indigo600"
          onPress={() => navigation.navigate("note-main-screen", { param: "" })}
        >
          <ButtonIcon as={ArrowLeftIcon} />
        </Button>
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 32,
            includeFontPadding: true,
            color: "white",
            textAlign: "center",
          }}
        >
          {FormType.EDIT === formType ? "Edit Note" : "Create New Note"}
        </Text>
      </View>
      <ScrollView style={{ padding: 10 }}>
        <VStack space={"md"}>
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: "violet",
            }}
          >
            Title of note
          </Text>
          <TextInput
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "bold",
              marginBottom: 16,
              maxWidth: "100%",
            }}
            placeholder="Enter Note Title"
            placeholderTextColor="#8a8a8a"
            value={note?.title}
            multiline
            numberOfLines={5}
            onChangeText={(text) => setNote({ ...note, title: text })}
          />
        </VStack>
        <VStack space={"sm"}>
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: "violet",
            }}
          >
            Content of note
          </Text>
          <TextInput
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "white",
              fontWeight: "bold",
              marginBottom: 10,
            }}
            placeholder="Enter Note Content"
            placeholderTextColor="#8a8a8a"
            multiline
            numberOfLines={10}
            value={note.content}
            onChangeText={(text) => setNote({ ...note, content: text })}
          />
        </VStack>
      </ScrollView>
      <View style={{ padding: 15 }}>
        <Button
          size="md"
          p="$3.5"
          bg="$indigo600"
          borderRadius={"$full"}
          borderColor="$indigo600"
          onPress={handleSaveNote}
        >
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {formType === FormType.CREATE ? "Create" : "Edit"} Note
          </Text>
          {loading && <Spinner />}
        </Button>
      </View>
    </SafeAreaView>
  );
};
