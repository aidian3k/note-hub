import { FC, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  VStack,
} from "@gluestack-ui/themed";

export enum FormType {
  EDIT,
  CREATE,
}

export const EditNoteScreen: FC = () => {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const navigation = useNavigation();
  const [formType, setFormType] = useState<FormType>(FormType.CREATE);

  useEffect(() => {
    // if (!!note) {
    //   setFormType(FormType.EDIT);
    //   setNoteTitle(note.title);
    //   setNoteContent(note.content);
    //   return;
    // }
    //
    // setFormType(FormType.CREATE);
  }, []);

  const onSaveNote = () => {
    navigation.navigate("note-main-screen");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3b3c36" }}>
      <View style={{ padding: 15 }}>
        <Button
          size="md"
          p="$3.5"
          bg="$indigo600"
          borderRadius={"$full"}
          borderColor="$indigo600"
          onPress={() => navigation.navigate("note-main-screen")}
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
            value={noteTitle}
            multiline
            numberOfLines={5}
            onChangeText={(text) => setNoteTitle(text)}
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
            value={noteContent}
            onChangeText={(text) => setNoteContent(text)}
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
          onPress={onSaveNote}
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
        </Button>
      </View>
    </SafeAreaView>
  );
};
